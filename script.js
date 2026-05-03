if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("Service Worker Registered"));
}

// ... your existing window.onload and calculate functions ...

// Run this when the page loads
window.onload = function() {
    const savedRate = localStorage.getItem("lastExchangeRate");
    if (savedRate) {
        document.getElementById("exchangeRate").value = savedRate;
    }
};

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        clearForm();
    } else if (event.key === "Enter") {
        calculate();
    }
});

function calculate() {
    var volumeConversion = 3.785;
    var usInput = ele_usPrice();
    var cdnInput = ele_cdnPrice();
    var rateInput = ele_exchangeRate();

    var usPrice = usInput.value;
    var cdnPrice = cdnInput.value;
    var exchangeRate = rateInput.value;

    // Clear previous highlights
    usInput.classList.remove("calculated-field");
    cdnInput.classList.remove("calculated-field");

    if (usPrice && exchangeRate) {
        var result = (usPrice / volumeConversion) * exchangeRate;
        cdnInput.value = result.toFixed(3);
        cdnInput.classList.add("calculated-field");
    } else if (cdnPrice && exchangeRate) {
        var result = (cdnPrice * volumeConversion) / exchangeRate;
        usInput.value = result.toFixed(3);
        usInput.classList.add("calculated-field");
    } else {
        alert("Please enter a price and the exchange rate.");
    }
}

function clearForm() {
    var usInput = ele_usPrice();
    var cdnInput = ele_cdnPrice();

    usInput.value = "";
    usInput.classList.remove("calculated-field");
    cdnInput.value = "";
    cdnInput.classList.remove("calculated-field");

    usInput.focus();
}

// form elements for simplification of code

function ele_usPrice() {
    return document.getElementById('usPrice');
}

function ele_cdnPrice() {
    return document.getElementById('cdnPrice');
}

function ele_exchangeRate() {
    return document.getElementById('exchangeRate');
}