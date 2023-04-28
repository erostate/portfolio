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

    window.addEventListener('wheel', (event) => {
        event.preventDefault();

        const direction = event.deltaY > 0 ? 'down' : 'up';
      
        const scrollPosition = window.scrollY;
      
        sections.forEach((section, index) => {
            const sectionPosition = section.offsetTop;
            console.log(sectionPosition)
        
            if (scrollPosition >= sectionPosition) {
                if (direction === 'down' && sections[index + 1]) {
                    sections[index + 1].scrollIntoView({ behavior: 'smooth' });
                    console.log(sections[index + 1])

                    const icon = document.querySelector(`.menuIcon:nth-of-type(${index + 2})`);
            
                    icon.classList.add('active');
            
                    const otherIcons = document.querySelectorAll('.menuIcon:not(:nth-of-type(' + (index + 2) + '))');
                    otherIcons.forEach((otherIcon) => {
                        otherIcon.classList.remove('active');
                    });
                    return;
                }

                if (direction === 'up' && sections[index - 1]) {
                    sections[index - 1].scrollIntoView({ behavior: 'smooth' });
                    console.log(sections[index - 1])

                    const icon = document.querySelector(`.menuIcon:nth-of-type(${index})`);
            
                    icon.classList.add('active');
            
                    const otherIcons = document.querySelectorAll('.menuIcon:not(:nth-of-type(' + (index) + '))');
                    otherIcons.forEach((otherIcon) => {
                        otherIcon.classList.remove('active');
                    });
                    return;
                }
            }
        });
    }, {passive: false});
});