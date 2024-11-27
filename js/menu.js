// Autoscroll to next section arrow

const scrollArrow = document.querySelector('.scroll-arrow');

scrollArrow.addEventListener('click', () => {
    const nextSection = document.querySelector('.motivation'); // Change this to motivation when section exists
    nextSection.scrollIntoView({ behavior: 'smooth' });
});

// Toggles flag/selected language

document.querySelector('.lang-toggle').addEventListener('click', function () {
    const ukFlag = document.getElementById('uk-flag');
    const seFlag = document.getElementById('se-flag');

    if (ukFlag.classList.contains('visible')) {
        window.location.href = 'index.html';
    } else {
        window.location.href = 'indexen.html';
    }
});

// Scroll back to top function 

const scrollUp = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {

    const scrollY = window.scrollY;

    if (scrollY > window.innerHeight) {
        scrollUp.style.visibility = 'visible';
        scrollUp.style.opacity = '1';
    } else {
        scrollUp.style.visibility = 'hidden';
        scrollUp.style.opacity = '0';
    }
})