import language from './lang.data.json' assert { type: "json" };

// Change the language of elements on the page
function displayLang() {
    // Get the number of languages in the JSON file
    const langDataCount = Object.keys(language).length;

    // Get all elements with the attribute data-lang
    const langElements = document.querySelectorAll('[data-lang]');

    // Change the language of each element
    var LangCount = 0;
    langElements.forEach(element => {
        // Get the content attribute value
        const content = element.getAttribute('data-lang');

        // Check if the content exists in the language JSON
        if (language[content]) {
            // Change the language of the element
            var newValue = language[content][document.getElementById('currentLanguageInp').value];
            element.innerHTML = newValue;

            // Increment the number of items changed
            LangCount++;
        } else {
            console.error(`Error: The content "${content}" does not exist in the language JSON.`);
        }
    });

    // Check if the number of modified items is equal to the number of items in the JSON file
    if (LangCount < langDataCount) {
        console.error(`Error: The number of items changed is less than the number of items in the JSON file. ${LangCount} gotted / ${langDataCount} expected`);
    }
}

// Get the current language in the cookie
if (getCookie('lang') == 'fr') {
    changeLang('fr');
    displayLang();
} else if (getCookie('lang') == 'en') {
    changeLang('en');
    displayLang();
}

// Change the language of the page when the user clicks on the flag
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('flag-change-lang')) {
        displayLang();
    }
});
