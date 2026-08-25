// Welcome message
console.log("Welcome to NI Honey");

// Add to Cart buttons
const buttons = document.querySelectorAll(".card button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        alert("Product added to cart!");
    });
});

// Contact Form
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Thank you! Your message has been received.");

    form.reset();

});