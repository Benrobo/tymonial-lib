// Tymonial
// Easily collect feedbacks from your clients, control feedback, embedded feedback within your site with ease.

// COPYRIGHT MIT LICENSED

// Creator: Benaiah Alumona 
// Github: https://github.com/benrobo
// Main App: 

// import { Montage } from "./templates/montage.js";

const $ = (el) => document.querySelector(el)
const $all = (el) => document.querySelectorAll(el)
const tymonialSlider = $("#tymonial-slider");

const ratings = (count = 5) => {
    let stars = []
    for (let i = 0; i < count; i++) {
        let star = `
            <svg class="h-5 w-5 icons rating-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        `
        stars.push(star)
    }
    return stars.join("")
}

class TymonialParamsError extends Error {
    constructor(message) {
        super(message)
        this.name = "TymonialParamsError"
    }
}

class Tymonial {

    #BASE_URL = `http://localhost:8080/api`
    #fetchLoading = false
    #error = null;

    constructor(params) {
        this.tymonialParams = params;
        // validate params
        this.#validateParams(params)

        this.containerElement = $(params?.element)
    }

    async #isTemplateAndUserIdExist(template_id, user_id) {
        const { req, result, loading } = await this.#fetch("/user", {
            method: "POST",
            body: JSON.stringify({
                userId: user_id
            })
        })

        if (result.error) {
            throw new TymonialParamsError(result.message)
        }

        const users = result.data;

        if (users.length === 0) {
            throw new TymonialParamsError(`No user was found with this ID "${user_id}" `)
        }

        const templates = users[0].templates;

        if (templates.length === 0) {
            throw new TymonialParamsError(`You dont have any template, create one. `)
        }

        // if theres template, filter it based on templateId
        const filteredTemplate = templates.filter(temp => temp.id === template_id)

        if (filteredTemplate.length === 0) {
            throw new TymonialParamsError(`No template was found with this ID "${template_id}" `)
        }

        this.render = true;
        return true
    }

    #validateParams(params) {
        const isValid = typeof params !== "object" ? false : true;

        // validate parameters passed in

        if (!isValid) {
            this.#error = `Expected a valid Tymonial parameter but got ${params}`

            throw new TymonialParamsError(this.#error)
        }

        if (Object.entries(params).length === 0) {
            this.#error = "Expected a valid parameter, but got none."
            throw new TymonialParamsError(this.#error)
        }

        if (params.element === undefined) {
            this.#error = `Expected a valid HTML "element" parameter, but got none.`
            throw new TymonialParamsError(this.#error)
        }

        if (params.element === undefined || params.element === "") {
            this.#error = `Expected a valid HTML "element" parameter, but got none.`
            throw new TymonialParamsError(this.#error)
        }

        // validate HTML element
        if ($(params?.element) === null) {
            this.#error = `Expected a valid HTML "element" parameter, but got '${params?.element}'.`
            throw new TymonialParamsError(this.#error)
        }
        // validate userId & templateId
        if (params?.user_id === undefined || params?.user_id === "") {
            this.#error = `Expected a valid "user_id" parameter, but got none.`
            throw new TymonialParamsError(this.#error)
        }
        if (params?.template_id === undefined || params?.template_id === "") {
            this.#error = `Expected a valid "template_id" parameter, but got none.`
            throw new TymonialParamsError(this.#error)
        }
    }

    async #fetch(route, config = {}) {
        const validRoute = route.replace("/", "")
        config["headers"] = {
            "content-type": "application/json"
        }
        this.#fetchLoading = true;
        const req = await fetch(`${this.#BASE_URL}/${validRoute}`, config)

        const result = await req.json()

        this.#fetchLoading = false;

        return { req, result, loading: this.#fetchLoading }
    }

    async #getFeedback(params) {
        const { req, result, loading } = await this.#fetch("/feedbacks/get", {
            method: "POST",
            body: JSON.stringify({
                userId: params?.user_id,
                type: "non-user",
                templateId: params?.template_id
            })
        })

        if (result.error) {
            throw new TymonialParamsError(result.message)
        }

        const feedbacks = result.data;

        if (feedbacks.length === 0) {
            console.error(`It either you dont have a feedback for this template ID "${params?.template_id}"`)
            console.error("OR")
            console.error("No feedbacks found yet.")
            return feedbacks
        }

        return feedbacks;
    }

    async init() {
        // validate userId and templateId
        const params = this.tymonialParams;
        const isValidUserData = await this.#isTemplateAndUserIdExist(params?.template_id, params?.user_id)

        if (isValidUserData) {
            const userFeedbacks = await this.#getFeedback(params);
            if (userFeedbacks.length > 0) {
                const montageType = Montage(params, userFeedbacks);
                this.containerElement.innerHTML = montageType;
            }
        }
        return true;
    }
}



// TEMPLATES

const Montage = (tymonialParams, feedbacks) => {

    const validHeading = tymonialParams?.heading === "" || tymonialParams?.heading === undefined ? false : true;
    const validSubHeading = tymonialParams?.sub_heading === "" || tymonialParams?.sub_heading === undefined ? false : true;

    const tymonialElements = []
    feedbacks.map((list) => {
        const box = document.createElement("div");
        box.innerHTML = `
            <div class="tymonial-box">
            <div class="top">
                <img src="${list.profileImg}" ${list.profileImg === "" ? "hidden" : ""} class="tymonial-userImage" />
                <p class="body">${list.message}</p>
            </div>
            <br>
            <div class="bottom">
                <div class="info">
                    <span class="name">${list.name}</span>
                    <span class="career">
                        ${list.userCareer}
                    </span>
                </div>
                <span id="ratings">
                    ${ratings(parseInt(list.ratings))}
                </span>
            </div>
            </div>
        `
        tymonialElements.push(box)
    })

    return `

    <div id="tymonial-cont">
    <div id="tymonial-head">
        <p id="heading">
            ${validHeading ? tymonialParams?.heading : "Testimonial"}
        </p>
        <br>
        <p id="sub-heading">
            ${validSubHeading ? tymonialParams?.sub_heading : "What People Think About Us."}    
        </p>
    </div>
    <br>
    <br>
    <div id="tymonial-slider">
        ${tymonialElements.map(elm => elm.innerHTML).join("")}
    </div>
    <br>
    <div id="tymonial-control">
        <button id="prev" class="tymonial-btn">
            <svg class="h-5 w-5 icons arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd" />
            </svg>
        </button>
        <button id="next" class="tymonial-btn">
            <svg class="h-5 w-5 icons arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </div>
    </div>
    
    `
}
