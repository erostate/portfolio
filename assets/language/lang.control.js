import language from './lang.data.json' assert { type: "json" };

// Change the language of elements on the page
function displayLang() {
    for (const content in language) {
        var newValue = language[content][document.getElementById('currentLanguageInp').value];
        document.querySelector(`[data-lang="${content}"]`).innerHTML = newValue;
    }
}

// Récupérer la langue actuelle dans le cookie au lancement de la page
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
