document.addEventListener("DOMContentLoaded", function () {
    const productData = [1000, 950, 400, 120, 55, 5000, 1500, 999, 1800];

    const cartCounter = document.querySelector(".counter");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const resetButton = document.getElementById("reset-btn");
    const goToCart = document.querySelector(".cart");

    
    let cartCount = parseInt(localStorage.getItem("data")) || 0;
    let grossPrice = parseInt(localStorage.getItem("price")) || 0;


    cartCounter.textContent = cartCount;

    
    addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const productId = parseInt(this.value);

        if (!isNaN(productId) && productId >= 1 && productId <= productData.length) {
            cartCount++;
            grossPrice += productData[productId - 1];

            cartCounter.textContent = cartCount;
            localStorage.setItem("data", cartCount);
            localStorage.setItem("price", grossPrice);

            console.log(`Added product ${productId}, Total: ${grossPrice}`);
        } else {
            console.warn("Invalid productId from button value:", productId);
        }
    });
});


    
    goToCart.addEventListener("click", function () {
        window.location.href = "payment.html";
    });

    
    resetButton.addEventListener("click", function () {
        cartCount = 0;
        grossPrice = 0;

        cartCounter.textContent = cartCount;

        localStorage.setItem("data", cartCount);
        localStorage.setItem("price", grossPrice);

        console.log("Cart reset");
    });
});
