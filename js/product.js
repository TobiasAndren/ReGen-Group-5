document.addEventListener("DOMContentLoaded", function () {
    const numImages = 36; 
    const bottleImages = 5; 
  
    const productImages = document.querySelectorAll(".product-card img");
    const colorButtons = document.querySelectorAll(".color-button");
  
    const productState = {
      jacket: {
        currentFrame: 1,
        currentColor: "beige",
        imgPath: "/assets/products/jacket/",
      },
      pants: {
        currentFrame: 1,
        currentColor: "beige",
        imgPath: "/assets/products/pants/",
      },
      backpack: {
        currentFrame: 1, // Only one color for backpack but will still rotate
        imgPath: "/assets/products/backpack/",
      },
      bottle: {
        currentFrame: 1, // 5 different images for bottle and will not rotate
        imgPath: "/assets/products/bottle/",
      },
    };
  
    // Preload function
    function preloadImages(product, color) {
      if (product === 'backpack') {
        const img = new Image();
        img.src = `${productState[product].imgPath}backpack${1}.png`;
      } else if (product === 'bottle') {
        for (let i = 1; i <= bottleImages; i++) {
          const img = new Image();
          img.src = `${productState[product].imgPath}bottle${i}.png`;
        }
      } else {
        for (let i = 1; i <= numImages; i++) {
          const img = new Image();
          img.src = `${productState[product].imgPath}${product}-${color ? color + '/' : ''}${product}${i}.png`;
        }
      }
    }
  
    Object.keys(productState).forEach((product) => {
      if (product === 'backpack' || product === 'bottle') {
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
        imageElement.src = `${imgPath}bottle${currentFrame}.png`;
      } else if (product === "backpack") {
        imageElement.src = `${imgPath}backpack${currentFrame}.png`;
      } else {
        imageElement.src = `${imgPath}${product}-${currentColor ? currentColor + '/' : ''}${product}${currentFrame}.png`;
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
            productState[product].currentFrame += distance > 0 ? -1 : 1;
  
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
        e.preventDefault();
        isDragging = true;
        hasMoved = false;
        startTouchX = e.touches[0].pageX;
        image.style.cursor = "grabbing";
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
  
        if (product !== 'backpack' && product !== 'bottle') { 
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
  
    // Change picture of bottle with each click
    const bottleCard = document.getElementById("bottle-card");
  
    bottleCard.addEventListener("click", () => {
      productState.bottle.currentFrame++;
      if (productState.bottle.currentFrame > bottleImages) productState.bottle.currentFrame = 1; // Return to first image after clicking on the last image
      updateImage("bottle");
    });
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
    