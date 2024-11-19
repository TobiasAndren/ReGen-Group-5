// Parallax scroll function

document.addEventListener("scroll", function() {

    // No parallax for mobile
    if (window.innerWidth > 768) {

    let scrollPosition = window.scrollY;

    // Parallax background
    let background = document.querySelector('.background');
    background.style.transform = `translateY(${scrollPosition * 0.2}px) scale(${1 + scrollPosition * 0.00002})`;

    // Parallax middle/side mountains
    let middle = document.querySelector('.middle');
    middle.style.transform = `scale(${1 + scrollPosition * 0.0002})`; 

    // ReGen title text slide
    document.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;
        let h1 = document.querySelector('.hero h1'); 
        let movement = scrollPosition * 0.8; 
    
        if (scrollPosition > 0) {
            h1.style.transform = `translateY(calc(-100% + ${movement}px))`; 
        } else {
            h1.style.transform = `translateY(-100%)`; 
        }
    });
}
})
