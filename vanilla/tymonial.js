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
        this.#validateParams(params)

        // validate userId and templateId
    }

    async #isTemplateExist(template_id) {
        const url = await this.#fetch("/")
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
        config = {
            "content-type": "application/json"
        }
        this.#fetchLoading = true;
        const req = await fetch(`${this.#BASE_URL}/${route}`, config)

        const result = await req.json()

        this.#fetchLoading = false;

        return { req, result, loading }
    }

    init() {


        return true;
    }
}



// TEMPLATES

const Montage = () => {


    return `

    <div id="tymonial-cont">
    <div id="tymonial-head">
        <p id="heading">Testimonial</p>
        <br>
        <p id="sub-heading">What People Think About Us.</p>
    </div>
    <br>
    <br>
    <div id="tymonial-slider">
        <div class="tymonial-box">
            <div class="top">
                <img src="https://avatars.dicebear.com/api/micah/t.svg" alt="" class="tymonial-userImage">
                <p class="body">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus quia deleniti hic, nobis quibusdam veritatis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores sunt doloribus ducimus, numquam modi quisquam.</p>
            </div>
            <br>
            <div class="bottom">
                <div class="info">
                    <span class="name">John Doe</span>
                    <span class="career">
                        Frontend Developer
                    </span>
                </div>
                <span id="ratings">
                    <svg class="h-5 w-5 icons rating-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </span>
            </div>
        </div>
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
