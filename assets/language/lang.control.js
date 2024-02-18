import language from './language.json' assert { type: "json" };

function displayLang() {
    for (const content in language) {
        var newValue = language[content][document.getElementById('currentLanguageInp').value];
        document.querySelector(`[data-lang="lang.${content}"]`).innerHTML = newValue;
    }
}
displayLang();

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('flag-change-lang')) {
        displayLang();
    }
});
