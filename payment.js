// Get stored price or fallback to 0
const grossPrice = parseInt(localStorage.getItem("price")) || 0;
const cartCount = parseInt(localStorage.getItem("data")) || 0;

// DOM Elements
const checkbox = document.getElementById('coupon-check');
const couponDiv = document.querySelector('.apply-coupon');
const couponDiscountDiv = document.querySelector(".discount");
const subTotal = document.querySelector('.subtotal');
const deliveryCharges = document.querySelector('.delivery-charges');
const couponDiscount = document.querySelector('.coupon-discount');
const priceTaxes = document.querySelector('.price-taxes');
const summaryTotal = document.querySelector('.price-summary-total');
const applyCouponBtn = document.querySelector('.apply-btn');
const inputCoupon = document.querySelector(".input-coupon");
const placeOrderBtn = document.querySelector(".final-button");


// Pricing Constants
const delivery = 5 * cartCount;
const taxRate = 0.18;
const validCouponCode = {
    "api1000": 1000,
    "api2000": 2000,
    "api800": 800,
    "api500": 500,
    "api200": 200
};

// Initial calculation
const taxes = grossPrice * taxRate;
let appliedDiscount = 0;
let total = grossPrice + delivery + taxes - appliedDiscount;

// Display prices initially
subTotal.textContent = `$${grossPrice.toFixed(2)}`;
deliveryCharges.textContent = `$${delivery.toFixed(2)}`;
couponDiscount.textContent = `−$${appliedDiscount.toFixed(2)}`;
priceTaxes.textContent = `$${taxes.toFixed(2)}`;
summaryTotal.textContent = `$${total.toFixed(2)}`;

// Show/hide coupon input
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        couponDiv.style.display = 'flex';
        couponDiscountDiv.classList.remove("invisible");
    } else {
        couponDiv.style.display = 'none';
        couponDiscountDiv.classList.add("invisible");
    }
});

// Apply coupon logic
applyCouponBtn.addEventListener('click', () => {
    const enteredCode = inputCoupon.value.trim();
    let newTotal = grossPrice + delivery + taxes;
    let discountToApply = 0;

    if (enteredCode === "") {
        alert("Please enter a coupon code.");
    } else if (validCouponCode.hasOwnProperty(enteredCode)) {
        discountToApply = validCouponCode[enteredCode];
        if ((newTotal - discountToApply) < 0) {
            alert("Coupon can't be applied. Total cannot be negative.");
            discountToApply=0;
        } else {
            newTotal -= discountToApply;
            alert(`Coupon applied! You saved $${discountToApply}`);
        }
    } else {
        alert("Invalid coupon code.");
    }

    // Reset the input field
    inputCoupon.value = "";

    // Update UI
    couponDiscount.textContent = discountToApply > 0 ? `−$${discountToApply.toFixed(2)}` : "−$0.00";
    summaryTotal.textContent = `$${(newTotal - discountToApply > 0 ? newTotal : grossPrice + delivery + taxes - discountToApply).toFixed(2)}`;
});


placeOrderBtn.addEventListener('click', () => {
    // Reset all values
    localStorage.setItem("data", 0);
    localStorage.setItem("price", 0);
    appliedDiscount = 0;
    alert("Order placed successfully! Thank you for shopping with us.");
    window.location.href = "./index.html";
});


const addresSet = {
    1: {
        name: "Jane Doe",
        line1: "419 King's Road",
        line2: "Chelsea,London,SW3 4ND",
        line3: "United Kingdom"
    },
    2: {
        name: "Sarah Donnelly",
        line1: "1847 Maple",
        line2: "Hollow Drive, Greenfield",
        line3: "OH45123"
    },
    3: {
        name: "Marcus Linwood",
        line1: "72 Clearwater Bend",
        line2: "Riverview",
        line3: "OR 97053"
    }
}

const paymentMode = {
    1: "Visa", 2: "Mastercard", 3: "American Express"
}


const adressList = document.querySelector(".address-list");
const addressBtns = document.querySelectorAll(".address");

addressBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.key
        const address = addresSet[key];

        adressList.innerHTML = '';

        adressList.innerHTML = `
    <li><strong>${address.name}</strong></li>
    <li>${address.line1}</li>
    <li>${address.line2}</li>
    <li>${address.line3}</li>`;
    });
});


const paymentList = document.querySelector('.payment-list');
const paymentBtn = document.querySelectorAll('.mode');
paymentList.innerHTML = '';

paymentBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const payment = paymentMode[key];

        paymentList.innerHTML = `<li><strong>${payment}</strong></li>`


    })
})






