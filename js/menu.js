// Autoscroll to next section arrow

const scrollArrow = document.querySelector('.scroll-arrow');

scrollArrow.addEventListener('click', () => {
    const nextSection = document.querySelector('.underhero');
    nextSection.scrollIntoView({ behavior: 'smooth' });
});