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

function calculate(event) {
    // Prevent the page from refreshing on form submit
    if (event) event.preventDefault();

    var volumeConversion = 3.785;
    var usInput = document.getElementById("usPrice");
    var cdnInput = document.getElementById("cdnPrice");
    var rateInput = document.getElementById("exchangeRate");

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