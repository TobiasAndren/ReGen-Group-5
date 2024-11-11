document.addEventListener("scroll", function() {
    let scrollPosition = window.scrollY;

    // Parallax för bakgrund
    let background = document.querySelector('.background');
    background.style.transform = `translateY(${1.09 + scrollPosition * 0.0004})`; // Långsamt rörelse uppåt

    // Parallax för middle (berg på var sin sida)
    let middle = document.querySelector('.middle');
    middle.style.transform = `scale(${1 + scrollPosition * 0.0002})`; // Gör större vid scroll

    // Texten som kommer in från sidan
    let h1 = document.querySelector('h1');
    if (scrollPosition > 50) {
        h1.style.opacity = 1;
        h1.style.transform = `translateX(0)`;
    }
});