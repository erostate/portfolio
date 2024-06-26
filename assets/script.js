// Savoir si un cookie portant le nom passé en paramètre existe
function getCookie(name) {
    if (document.cookie.length == 0)
        return null;
    
    var regSepCookie = new RegExp('(; )', 'g');
    var cookies = document.cookie.split(regSepCookie);

    for (var i = 0; i < cookies.length; i++) {
        var regInfo = new RegExp('=', 'g');
        var infos = cookies[i].split(regInfo);
        if (infos[0] == name) {
            return unescape(infos[1]);
        }
    }
}

// Ouvrir le menu de changement de langue
function openLangPanel() {
    if (document.getElementById('ulLanguage')) {
        document.getElementById('ulLanguage').remove();
        document.getElementById('divLanguage').classList.remove('div-language');
    } else {
        divL = document.getElementById('divLanguage');
        divL.classList.add('div-language');

        ulL = document.createElement('ul');
        ulL.id = 'ulLanguage';
        divL.appendChild(ulL);

        // Create "li"
        liEnL = document.createElement('li');
        liFrL = document.createElement('li');
        ulL.appendChild(liEnL);
        ulL.appendChild(liFrL);

        // Create "img"
        imgEnL = document.createElement('img');
        imgFrL = document.createElement('img');
        imgEnL.src = 'https://asset.blms.fr/picture/flag/en.png';
        imgFrL.src = 'https://asset.blms.fr/picture/flag/fr.png';
        imgEnL.alt = 'FLag En';
        imgFrL.alt = 'FLag Fr';
        imgEnL.classList.add('flag-change-lang');
        imgFrL.classList.add('flag-change-lang');
        imgEnL.onclick = function() { changeLang('en'); };
        imgFrL.onclick = function() { changeLang('fr'); };
        liEnL.appendChild(imgEnL);
        liFrL.appendChild(imgFrL);
    }
}

// Changer la langue
function changeLang(lang) {
    const existingLang = ['en', 'fr'];
    if (!existingLang.includes(lang)) {
        lang = 'en';
    }
    document.cookie = "lang="+lang;

    const currentLanguage = document.getElementById('currentLanguage');
    if (lang == 'fr') {
        currentLanguage.src = 'https://asset.blms.fr/picture/flag/fr.png';
        currentLanguage.alt = 'Flag Fr';
    } else if (lang == 'en') {
        currentLanguage.src = 'https://asset.blms.fr/picture/flag/en.png';
        currentLanguage.alt = 'Flag En';
    }

    document.getElementById('currentLanguageInp').value = lang;
}

// Bouton pour changer de section
function moveSect(sect) {
    window.location.href='#'+sect+'-sect';
}

// Event Listener sur le Document
document.addEventListener('click', function(e) {
    if (document.getElementById('ulLanguage')) {
        if (!document.getElementById('noot').contains(e.target)) {
            document.getElementById('ulLanguage').remove();
            document.getElementById('divLanguage').classList.remove('div-language');
        }
    }
})
// Event Listener Chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    if (getCookie('lang') == 'fr') {
        document.cookie = "lang=fr";
    } else if (getCookie('lang') == 'en') {
        document.cookie = "lang=en";
    }

    const sections = document.querySelectorAll('.section');

    const firstIcon = document.querySelector(`.menuIcon:nth-of-type(1)`);
    firstIcon.classList.add('active');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach((section, index) => {
            const sectionPosition = section.offsetTop - 50;

            if (scrollPosition >= sectionPosition) {
                const icon = document.querySelector(`.menuIcon:nth-of-type(${index + 1})`);

                icon.classList.add('active');

                const otherIcons = document.querySelectorAll('.menuIcon:not(:nth-of-type(' + (index + 1) + '))');
                otherIcons.forEach((otherIcon) => {
                    otherIcon.classList.remove('active');
                });
            }
        });
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp') {
        const uri = window.location.hash;
        var currentPage = null;
        var previousPage = null;
        if (uri) {
            // Get the current page
            currentPage = uri.substring(1).replace('-sect', '');

            // Get all page
            const allPage = document.querySelectorAll('.menuIcon');
            var prevItem = null;
            allPage.forEach((page) => {
                if (page.id == 'nav-'+currentPage) {
                    previousPage = prevItem;
                } else {
                    prevItem = page;
                }
            });
        } else {
            // Get the current page
            currentPage = document.querySelector('.menuIcon.active');

            // Get the next page
            previousPage = currentPage.previousElementSibling;
        }

        if (previousPage) {
            // Get the previous page
            var page = previousPage.id.replace('nav-', '');
            // Scroll to the page
            setTimeout(() => {
                moveSect(page);
            }, 200);
            console.log('prev page: '+previousPage.id.replace('nav-', ''))
        }
    } else if (e.key == 'ArrowDown') {
        const uri = window.location.hash;
        var currentPage = null;
        var nextPage = null;
        if (uri) {
            // Get the current page
            currentPage = uri.substring(1).replace('-sect', '');

            // Get all page
            const allPage = document.querySelectorAll('.menuIcon');
            var item = 0;
            var nextItem = 0;
            allPage.forEach((page) => {
                if (page.id == 'nav-'+currentPage) {
                    nextItem = item+1;
                }
                if (item == nextItem) {
                    nextPage = page;
                }
                item++;
            });
        } else {
            // Get the current page
            currentPage = document.querySelector('.menuIcon.active');

            // Get the next page
            nextPage = currentPage.nextElementSibling;
        }

        if (nextPage) {
            // Get the next page
            var page = nextPage.id.replace('nav-', '');
            // Scroll to the page
            setTimeout(() => {
                moveSect(page);
            }, 200);
            console.log('next page: '+nextPage.id.replace('nav-', ''))
        }
    }
});

function setMyAge() {
    const dateOfBirth = new Date("2004-11-10");
    const currentDate = new Date();

    // Get the difference
    const diff = currentDate - dateOfBirth;

    // Convert in years
    const age = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));

    // Foreach span with class "age"
    const ageClass = document.querySelectorAll('.setMyAge');
    ageClass.forEach((ageItem) => {
        ageItem.innerHTML = age;
    });
    return age;
}
setMyAge();

function openModal(modalName, type = 'block') {
    document.getElementById(modalName).style.display = type;
}
// Close the modal
function closeModal(modalName) {
    document.getElementById(modalName).style.display = 'none';
}
// Close the modal when clicking outside
window.onclick = function(event) {
    if (event.target.className == 'modal') {
        event.target.style.display = 'none';
    }
}

// Check if the data in the input is an email
function checkIfEmail(event) {
    const email = event.target.value;
    if (email.includes('@') && email.includes('.')) {
        document.getElementById('errorLogin').innerHTML = "";
        document.getElementById('btnSendContact').disabled = false;
    } else {
        document.getElementById('errorLogin').innerHTML = "Invalid email address";
        if (email == "") {
            document.getElementById('errorLogin').innerHTML = "";
            return;
        }
        document.getElementById('btnSendContact').disabled = true;
    }
}
document.getElementById("email").addEventListener("keyup", checkIfEmail);

// Check if the data in the input is not empty
function checkIfContactFormNotEmpty() {
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (email != "" && subject != "" && message != "") {
        document.getElementById('btnSendContact').disabled = false;
        checkIfEmail({target: {value: email}});
    } else {
        document.getElementById('btnSendContact').disabled = true;
        checkIfEmail({target: {value: email}});
    }
}
document.getElementById("subject").addEventListener("keyup", checkIfContactFormNotEmpty);
document.getElementById("message").addEventListener("keyup", checkIfContactFormNotEmpty);

// Send the contact form
function performSendContact() {
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (email == "" || subject == "" || message == "") {
        document.getElementById('errorLogin').innerHTML = "Missing parameters";
        return;
    }

    const data = {
        email: email,
        subject: subject,
        message: message
    };

    fetch('https://report.blms.fr/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            document.getElementById('email').value = "";
            document.getElementById('subject').value = "";
            document.getElementById('message').value = "";
            document.getElementById('errorLogin').innerHTML = "<b style='color: green;'>Success! You will received a response soon</b>";
        } else {
            document.getElementById('errorLogin').innerHTML = "Soory :/ An error occured";
        }
    });

}

// Create the arrow to the "after school" section
function createArrowToAfterSchoolSect() {
    const startItem = document.getElementById('afterSchool-startItem');
    const otherItems = document.getElementById('cont-studies-sect').querySelectorAll('.card:not(.start) .item');

    otherItems.forEach(item => {
        new LeaderLine(
            startItem,
            item,
            {
                color: 'white',
                size: 3,
                endPlug: 'arrow2',
                endPlugSize: 2,
            }
        );
    })
}
createArrowToAfterSchoolSect();

// Create the arrow to the "my school" section for timeline
function createArrowToSchoolTimeline() {
    const schoolItems = document.querySelectorAll('.school-item');

    console.log(schoolItems);

    nbItems = 1;
    schoolItems.forEach(item => {
        const timeline = document.getElementsByClassName('timeline-school-'+nbItems)[0];
        const date = item.getElementsByTagName('p')[0].innerText;
        new LeaderLine(
            item,
            timeline,
            {
                color: 'white',
                size: 3,
                endPlug: 'disc',
                endPlugSize: 2,
                path: 'straight',
                endLabel: LeaderLine.captionLabel(date, {color: 'white', offset: [-130, 10]})
            }
        );
        nbItems++;
    })
}
createArrowToSchoolTimeline();

// Over the "info-aboutMe" section
document.getElementById('btn-frenchDev').addEventListener('mouseover', function() {
    document.getElementById('info-frenchDev').style.display = 'block';
});
document.getElementById('btn-myAge').addEventListener('mouseover', function() {
    document.getElementById('info-myAge').style.display = 'block';
});
document.getElementById('btn-sdmis').addEventListener('mouseover', function() {
    document.getElementById('info-sdmis').style.display = 'block';
});
document.getElementById('btn-blms').addEventListener('mouseover', function() {
    document.getElementById('info-blms').style.display = 'block';
});
document.getElementById('btn-frenchDev').addEventListener('mouseout', function() {
    document.getElementById('info-frenchDev').style.display = 'none';
});
document.getElementById('btn-myAge').addEventListener('mouseout', function() {
    document.getElementById('info-myAge').style.display = 'none';
});
document.getElementById('btn-sdmis').addEventListener('mouseout', function() {
    document.getElementById('info-sdmis').style.display = 'none';
});
document.getElementById('btn-blms').addEventListener('mouseout', function() {
    document.getElementById('info-blms').style.display = 'none';
});

// Over the "info-techWatch" section
document.getElementById('btn-griffon').addEventListener('mouseover', function() {
    const card = document.getElementById('btn-griffon');
    card.getElementsByTagName('img')[0].style.filter = 'brightness(0.3)';
    card.getElementsByClassName('info')[0].style.display = 'flex';
});
document.getElementById('btn-griffon').addEventListener('mouseout', function() {
    const card = document.getElementById('btn-griffon');
    card.getElementsByTagName('img')[0].style.filter = 'none';
    card.getElementsByClassName('info')[0].style.display = 'none';
});
document.getElementById('btn-jaguar').addEventListener('mouseover', function() {
    const card = document.getElementById('btn-jaguar');
    card.getElementsByTagName('img')[0].style.filter = 'brightness(0.3)';
    card.getElementsByClassName('info')[0].style.display = 'flex';
});
document.getElementById('btn-jaguar').addEventListener('mouseout', function() {
    const card = document.getElementById('btn-jaguar');
    card.getElementsByTagName('img')[0].style.filter = 'none';
    card.getElementsByClassName('info')[0].style.display = 'none';
});
document.getElementById('btn-serval').addEventListener('mouseover', function() {
    const card = document.getElementById('btn-serval');
    card.getElementsByTagName('img')[0].style.filter = 'brightness(0.3)';
    card.getElementsByClassName('info')[0].style.display = 'flex';
});
document.getElementById('btn-serval').addEventListener('mouseout', function() {
    const card = document.getElementById('btn-serval');
    card.getElementsByTagName('img')[0].style.filter = 'none';
    card.getElementsByClassName('info')[0].style.display = 'none';
});


// EASTER EGG
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function yeetQuaso() {
    const nbQuaso = 24;
    const containerQuaso = document.getElementById('containerQuaso');
    for (let i = 1; i <= nbQuaso; i++) {
        quaso = document.createElement('img');
        if (getRandomInt(0, 10) <= 5) {
            quaso.src = "assets/img/quaso.png";
        } else {
            quaso.src = "assets/img/chocolatine.png";
        }
        quaso.id = "quaso-"+i;
        quaso.style.marginTop = "-300px";
        quaso.style.width = "300px";
        quaso.style.position = "absolute";
        quaso.style.userSelect = "none";
        containerQuaso.appendChild(quaso);
    }

    var leftSpacing = -300;
    for (let i = 1; i <= nbQuaso; i++) {
        setTimeout(function() {
            if (leftSpacing == 1800) {
                leftSpacing = 0;
            } else {
                leftSpacing = leftSpacing + 300;
            }
            quasoName = 'quaso-'+i;
            quaso = document.getElementById(quasoName);
            quaso.style.transition = 'margin-top '+getRandomArbitrary(0.50, 3)+'s ease-in-out, transform '+getRandomArbitrary(2, 4)+'s ease-in-out';
            quaso.style.marginTop = '1000px';
            quaso.style.marginLeft = leftSpacing+'px';
            quaso.style.transform = 'rotate('+getRandomArbitrary(-360, 360)+'deg)';
        }, 500);
    }

    setTimeout(function() {
        containerQuaso.innerHTML = "";
        // yeetQuaso();
    }, 3000);
}
// EASTER EGG 2
function yeetMe() {
    const nbMe = 24;
    const containerMe = document.getElementById('containerMe');
    for (let i = 1; i <= nbMe; i++) {
        me = document.createElement('img');
        me.src = "assets/img/me_raining.png";
        me.id = "me-"+i;
        me.style.marginTop = "-300px";
        me.style.width = "300px";
        me.style.position = "absolute";
        me.style.userSelect = "none";
        containerMe.appendChild(me);
    }

    var leftSpacing = -300;
    for (let i = 1; i <= nbMe; i++) {
        setTimeout(function() {
            if (leftSpacing == 1800) {
                leftSpacing = 0;
            } else {
                leftSpacing = leftSpacing + 300;
            }
            meName = 'me-'+i;
            me = document.getElementById(meName);
            me.style.transition = 'margin-top '+getRandomArbitrary(0.50, 3)+'s ease-in-out, transform '+getRandomArbitrary(2, 4)+'s ease-in-out';
            me.style.marginTop = '1000px';
            me.style.marginLeft = leftSpacing+'px';
            me.style.transform = 'rotate('+getRandomArbitrary(-360, 360)+'deg)';
        }, 500);
    }

    setTimeout(function() {
        containerMe.innerHTML = "";
        // yeetMe();
    }, 3000);
}
// EASTER EGG 3
function baguette() {
    // CONTAINER
    const container = document.getElementById('container');
    // MENU
    const menu = document.getElementById('menu');

    // CREATE baguette section
    baguSect = document.createElement('section');
    baguSect.id = 'baguette-sect';
    baguSect.classList.add('section');
    container.appendChild(baguSect);
    // CREATE baguette image
    baguImg = document.createElement('img');
    baguImg.src = "assets/img/baguette_left.png";
    baguSect.appendChild(baguImg);
    // CREATE baguette image
    baguImg = document.createElement('img');
    baguImg.src = "assets/img/baguette_right.png";
    baguSect.appendChild(baguImg);
    // CREATE cat image
    baguImg = document.createElement('img');
    baguImg.src = "https://report.blms.fr/assets/img/ee/cat7.png";
    baguSect.appendChild(baguImg);

    // CREATE baguette menu li
    liMenuBagu = document.createElement('li');
    liMenuBagu.id = 'baguette-menu';
    liMenuBagu.classList.add('menuIcon');
    liMenuBagu.onclick = function() { window.location.href='#baguette-sect'; };
    menu.appendChild(liMenuBagu);
    // CREATE baguette menu i
    iMenuBagu = document.createElement('i');
    iMenuBagu.classList.add('fa-solid');
    iMenuBagu.classList.add('fa-bread-slice');
    liMenuBagu.appendChild(iMenuBagu);

    // REDIRECTION
    window.location.href='#baguette-sect';

    // RETRAIT de la page après 5 secondes
    setTimeout(() => {
        document.getElementById('baguette-sect').remove();
        document.getElementById('baguette-menu').remove();
        window.location.href='#profile-sect';
    }, 2000);
}
// EASTER EGG 4
function kikiHasSpawned() {
    // CONTAINER
    const container = document.getElementById('containerKiki');
    
    // CREATE img
    kiki = document.createElement('img');
    kiki.src = "assets/img/kiki.jpg";
    kiki.id = "kikiImg";
    kiki.style.marginTop = "1000px";
    kiki.style.width = "100vw";
    kiki.style.position = "absolute";
    kiki.style.userSelect = "none";
    container.appendChild(kiki);

    // UP kiki's img
    setTimeout(function() {
        kikiAct = document.getElementById('kikiImg');
        kikiAct.style.transition = 'all 3s ease-in-out';
        kikiAct.style.marginTop = '0';
    }, 1000);

    // DOWN kiki's img
    setTimeout(function() {
        kikiAct = document.getElementById('kikiImg');
        kikiAct.style.transition = 'all 3s ease-in-out';
        kikiAct.style.marginTop = '1000px';
    }, 5000);

    // DELETE kiki's img
    setTimeout(function() {
        container.innerHTML = "";
    }, 8000);
}
// EASTER EGG 5
function kikiHasGrued() {
    // CONTAINER
    const container = document.getElementById('containerKiki');
    
    // CREATE img
    kiki = document.createElement('img');
    kiki.src = "assets/img/kiki.jpg";
    kiki.id = "kikiImg";
    kiki.style.marginTop = "1000px";
    kiki.style.width = "100vw";
    kiki.style.position = "absolute";
    kiki.style.userSelect = "none";
    container.appendChild(kiki);

    // UP kiki's img
    setTimeout(function() {
        kikiAct = document.getElementById('kikiImg');
        kikiAct.style.transition = 'all 3s ease-in-out';
        kikiAct.style.marginTop = '0';
    }, 1000);

    // DOWN kiki's img
    setTimeout(function() {
        kikiAct = document.getElementById('kikiImg');
        kikiAct.style.transition = 'all 3s ease-in-out';
        kikiAct.style.marginTop = '1000px';
    }, 5000);

    // DELETE kiki's img
    setTimeout(function() {
        container.innerHTML = "";
    }, 8000);
}


// DELETE COOKIE
function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}