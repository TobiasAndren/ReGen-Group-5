document.addEventListener("DOMContentLoaded", function () {
  const numImages = 36;
  const bottleImages = 2;

  const productImages = document.querySelectorAll(".product-card img");
  const colorButtons = document.querySelectorAll(".color-button");

  const productState = {
    jacket: {
      currentFrame: 1,
      currentColor: "beige",
      imgPath: "assets/products/jacket/",
    },
    pants: {
      currentFrame: 1,
      currentColor: "beige",
      imgPath: "assets/products/pants/",
    },
    backpack: {
      currentFrame: 1, // Only one color for backpack but will still rotate
      imgPath: "assets/products/backpack/",
    },
    bottle: {
      currentFrame: 1, // 5 different images for bottle and will not rotate
      imgPath: "assets/products/bottle/",
    },
  };

  // Preload function
  function preloadImages(product, color) {
    if (product === "backpack") {
      const img = new Image();
      img.src = `${productState[product].imgPath}backpack${1}.webp`;
    } else if (product === "bottle") {
      for (let i = 1; i <= bottleImages; i++) {
        const img = new Image();
        img.src = `${productState[product].imgPath}bottle${i}.webp`;
      }
    } else {
      for (let i = 1; i <= numImages; i++) {
        const img = new Image();
        img.src = `${productState[product].imgPath}${product}-${color ? color + "/" : ""}${product}${i}.webp`;
      }
    }
  }

  Object.keys(productState).forEach((product) => {
    if (product === "backpack" || product === "bottle") {
      preloadImages(product);
    } else {
      preloadImages(product, "beige");
      preloadImages(product, "green");
    }
  });

  function updateImage(product) {
    const { currentFrame, currentColor, imgPath } = productState[product];
    const imageElement = document.getElementById(`${product}-image`);

    if (product === "bottle") {
      imageElement.src = `${imgPath}bottle${currentFrame}.webp`;
    } else if (product === "backpack") {
      imageElement.src = `${imgPath}backpack${currentFrame}.webp`;
    } else {
      imageElement.src = `${imgPath}${product}-${currentColor ? currentColor + "/" : ""}${product}${currentFrame}.webp`;
    }
  }

  // Rotation on mouseinteraction for all except bottle
  productImages.forEach((image) => {
    let isDragging = false;
    let hasMoved = false;
    let startX = 0;

    const product = image.id.split("-")[0];

    if (product === "bottle") return;

    image.setAttribute("draggable", "false");
    image.style.userSelect = "none";

    // Start drag
    image.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      hasMoved = false;
      startX = e.pageX;
    });

    // Release mousebutton
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Drag to rotate
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        const distance = e.pageX - startX;
        if (Math.abs(distance) > 10) {
          hasMoved = true;
          productState[product].currentFrame += distance > 0 ? 1 : -1;

          if (productState[product].currentFrame < 1) productState[product].currentFrame = numImages;
          if (productState[product].currentFrame > numImages) productState[product].currentFrame = 1;

          updateImage(product);
          startX = e.pageX; // Update starting point
        }
      }
    });

    // Rotation on touchscreen (mobile)
    let startTouchX = 0;
    image.addEventListener("touchstart", (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
        isDragging = true;
        hasMoved = false;
        startTouchX = e.touches[0].pageX;
        image.style.cursor = "grabbing";
      }
    });

    image.addEventListener("touchend", () => {
      isDragging = false;
      if (!hasMoved) {
        image.style.cursor = "grab";
      }
    });

    image.addEventListener("touchmove", (e) => {
      if (isDragging) {
        const distance = e.touches[0].pageX - startTouchX;
        if (Math.abs(distance) > 10) {
          hasMoved = true;
          productState[product].currentFrame += distance > 0 ? -1 : 1;

          if (productState[product].currentFrame < 1) productState[product].currentFrame = numImages;
          if (productState[product].currentFrame > numImages) productState[product].currentFrame = 1;

          updateImage(product);
          startTouchX = e.touches[0].pageX; // Update starting point for touch
        }
      }
    });
  });

  // Change color on button click (for items with multiple colors)
  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;
      const color = button.dataset.color;

      if (product !== "backpack" && product !== "bottle") {
        productState[product].currentColor = color;
        productState[product].currentFrame = 1;
        updateImage(product);
      }
    });
  });

  // Initiate all pictures with first color / frame
  Object.keys(productState).forEach((product) => {
    updateImage(product);
  });

  // Function to update bottle images on arrowclick
  const bottleImage = document.getElementById("bottle-image"); // Själva flaskbilden
  const imageCounter = document.getElementById("image-counter"); // Räkneelementet
  const prevButton = document.getElementById("prev-button"); // Vänster pil
  const nextButton = document.getElementById("next-button"); // Höger pil

  // Update bottle image and counter
  function updateBottleImage() {
    const { currentFrame, imgPath } = productState.bottle;
    bottleImage.src = `${imgPath}bottle${currentFrame}.png`;
    imageCounter.textContent = `${currentFrame}/${bottleImages}`;
  }

  function nextBottleImage() {
    productState.bottle.currentFrame++;
    if (productState.bottle.currentFrame > bottleImages) productState.bottle.currentFrame = 1;
    updateBottleImage();
  }

  function prevBottleImage() {
    productState.bottle.currentFrame--;
    if (productState.bottle.currentFrame < 1) productState.bottle.currentFrame = bottleImages;
    updateBottleImage();
  }

  prevButton.addEventListener("click", (e) => {
    e.stopPropagation();
    prevBottleImage();
  });

  nextButton.addEventListener("click", (e) => {
    e.stopPropagation();
    nextBottleImage();
  });

  bottleImage.addEventListener("click", () => {
    nextBottleImage();
  });

  updateBottleImage();
});

// Tooltip to let user know how to rotate items on mobile
document.addEventListener("DOMContentLoaded", () => {
  const tooltips = document.querySelectorAll(".tooltip");

  tooltips.forEach((tooltip) => {
    const closeButton = tooltip.querySelector(".tooltip-close");

    // Start automatic closing
    const startCountdown = () => {
      const autoCloseTimeout = setTimeout(() => {
        tooltip.classList.add("hidden");
      }, 5000);

      // Turn off tooltip manually when X is clicked
      closeButton.addEventListener("click", () => {
        tooltip.classList.add("hidden");
        clearTimeout(autoCloseTimeout); // Manual closing overrides automatic closing
      });
    };

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCountdown(); // Start automatic closing countdown when tooltip is visible
            observer.unobserve(tooltip);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(tooltip);
  });
});

  