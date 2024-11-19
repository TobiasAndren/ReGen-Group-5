// Autoscroll to next section arrow

const scrollArrow = document.querySelector('.scroll-arrow');

scrollArrow.addEventListener('click', () => {
    const nextSection = document.querySelector('.underhero'); // Change this to motivation when section exists
    nextSection.scrollIntoView({ behavior: 'smooth' });
});

// Toggles flag/selected language

document.querySelector('.lang-toggle').addEventListener('click', function () {
    const ukFlag = document.getElementById('uk-flag');
    const seFlag = document.getElementById('se-flag');

    if (ukFlag.classList.contains('visible')) {
        ukFlag.classList.remove('visible');
        seFlag.classList.add('visible');
    } else {
        seFlag.classList.remove('visible');
        ukFlag.classList.add('visible');
    }
});

