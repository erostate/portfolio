function moveSect(sect) {
    window.location.href='#'+sect+'-sect';
}


document.addEventListener('DOMContentLoaded', function() {
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

    // window.addEventListener('wheel', (event) => {
    //     event.preventDefault();

    //     const direction = event.deltaY > 0 ? 'down' : 'up';
      
    //     const scrollPosition = window.scrollY;
      
    //     sections.forEach((section, index) => {
    //         const sectionPosition = section.offsetTop;
    //         console.log(sectionPosition)
        
    //         if (scrollPosition >= sectionPosition) {
    //             if (direction === 'down' && sections[index + 1]) {
    //                 sections[index + 1].scrollIntoView({ behavior: 'smooth' });
    //                 console.log(sections[index + 1])

    //                 const icon = document.querySelector(`.menuIcon:nth-of-type(${index + 2})`);
            
    //                 icon.classList.add('active');
            
    //                 const otherIcons = document.querySelectorAll('.menuIcon:not(:nth-of-type(' + (index + 2) + '))');
    //                 otherIcons.forEach((otherIcon) => {
    //                     otherIcon.classList.remove('active');
    //                 });
    //                 return;
    //             }

    //             if (direction === 'up' && sections[index - 1]) {
    //                 sections[index - 1].scrollIntoView({ behavior: 'smooth' });
    //                 console.log(sections[index - 1])

    //                 const icon = document.querySelector(`.menuIcon:nth-of-type(${index})`);
            
    //                 icon.classList.add('active');
            
    //                 const otherIcons = document.querySelectorAll('.menuIcon:not(:nth-of-type(' + (index) + '))');
    //                 otherIcons.forEach((otherIcon) => {
    //                     otherIcon.classList.remove('active');
    //                 });
    //                 return;
    //             }
    //         }
    //     });
    // }, {passive: false});
});


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

    setTimeout(() => {
        document.getElementById('baguette-sect').remove();
        document.getElementById('baguette-menu').remove();
        window.location.href='#profile-sect';
    }, 10000);
}