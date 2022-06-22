## Tymonial
A intuitive UI `library` which ease the process of `collecting` and `viewing` users `feedbacks` within yourt web applications.

Easily collect feedbacks from your `clients`, `Friends` & `Families` and display them nicely within your application.


<center>

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/benrobo/tymonial/main?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/benrobo/tymonial?style=for-the-badge)
![GitHub Repo stars](https://img.shields.io/github/stars/benrobo/tymonial?style=for-the-badge)
![GitHub watchers](https://img.shields.io/github/watchers/benrobo/tymonial?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/benrobo/tymonial?style=for-the-badge)

</center>

### Getting Started.

- Simply copy the `javascript` and `css` tags below

```html
    <!-- Tymonial CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tymonial/assets/css/tymonial.css">

    <!-- Tymonial Javascript -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/tymonial@1.0.0/tymonial.js">
```

- Initialize Tymonial

Initialize tymonial `Object` within a new `<script>` tag before the closing `</body>` tag in your `.html` file.

```js
        new Tymonial({
            element: ".example-cont",
            user_id: "fa54431c-47e3-443e-907f-65c7e2489344",
            template_id: "temp_c112ad",
            heading: "My Feedbacks.",
            tymonialBgColor: "#ccc",
            subheadingColor: "#000",
            headingColor:"#777",
            cardBgColor: "#fff",
            cardBodyTextColor:"#777",
            cardUsernameTextColor: "#000",
            cardRatingColor: "#fd336d",
            controlsBgColor: "#fff",
            controlsColor: "#000"
        })
        .init()
```

### Tymonial Params.
Tymonial requires that yiou provide a `proper` and `valid` parameters when initializing it. Below shows and explains what each paramenters does.

The result should look like the picture below if done properly.