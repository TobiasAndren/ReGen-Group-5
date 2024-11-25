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

// Slideshow for motivation page

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.getElementById("prev-button-long");
    const nextButton = document.getElementById("next-button-long");
    const slideCounter = document.getElementById("slide-image-counter");
    let currentSlide = 0;
    let autoSlideInterval; // Variabel för intervallet
    const autoSlideTime = 5000; // Tid mellan slides i millisekunder

    function updateSlides() {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slides[currentSlide].classList.add("active");
        slideCounter.textContent = `${currentSlide + 1}/${slides.length}`;
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }, autoSlideTime);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval); // Stoppa intervallet
    }

    function resetAutoSlide() {
        stopAutoSlide(); // Stoppa nuvarande intervall
        startAutoSlide(); // Starta om intervallet
    }

    prevButton.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
        resetAutoSlide(); // Återställ intervallet
    });

    nextButton.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
        resetAutoSlide(); // Återställ intervallet
    });

    updateSlides(); // Visa första sliden
    startAutoSlide(); // Starta automatisk slideväxling
});

