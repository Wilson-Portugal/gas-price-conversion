if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("Service Worker Registered"));
}

// this line now exists in your /var/www/html/gas-price-conversion/config-app-version.php file
// and is loaded  in your builder/app.php script into your index.html code
// const appVersion = 'v1.2'; // Matches your sw.js cacheName

// ... your existing window.onload and calculate functions ...

// Run this when the page loads
window.onload = function() {
    const savedRate = localStorage.getItem("lastExchangeRate");
    if (savedRate) {
        document.getElementById("exchangeRate").value = savedRate;
    }

    // Add this to your window.onload function
    ele_exchangeRate().addEventListener("input", function() {
        // Save the rate to storage as they type
        localStorage.setItem("lastExchangeRate", this.value);
        
        // Trigger your new state-aware calculation logic
        calculate(); 
    });

    document.getElementById("app_ver").innerHTML = appVersion;

    const baseYear = 2026;
    const currentYear = new Date().getFullYear();
    let copyrightYear = currentYear;
    
    if (currentYear > baseYear) {
        copyrightYear = baseYear + "-" + currentYear;
    }
    
    document.getElementById("copyright_year").innerHTML = copyrightYear;
};

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        clearForm();
    } else if (event.key === "Enter") {
        event.preventDefault(); // Stop any browser default behaviour
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

    // Logic: Which field is currently the "Calculated" one?
    var isCdnCalculated = cdnInput.classList.contains("calculated-field");
    var isUsCalculated = usInput.classList.contains("calculated-field");

    if (exchangeRate > 0) {
        // If US was entered by the user (or was the last master), update CAD
        if (usPrice && (!isUsCalculated || isCdnCalculated)) {
            var result = (usPrice / volumeConversion) * exchangeRate;
            cdnInput.value = result.toFixed(3);
            
            usInput.classList.remove("calculated-field");
            cdnInput.classList.add("calculated-field");
        } 
        // If CAD was the master, update US
        else if (cdnPrice) {
            var result = (cdnPrice * volumeConversion) / exchangeRate;
            usInput.value = result.toFixed(3);
            
            cdnInput.classList.remove("calculated-field");
            usInput.classList.add("calculated-field");
        }
    }
}

function calculateButton() {
    calculate();
    document.activeElement.blur();
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
