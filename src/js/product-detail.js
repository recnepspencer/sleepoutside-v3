import { findProductById } from "./externalServices.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (productId) {
      initializeProductPage(productId);
    }
  });

  async function initializeProductPage(productId) {
    try {
      const product = await fetchProductData(productId);
      if (product) {
        displayProduct(product);
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error initializing product page:", error);
    }
  }

  async function fetchProductData(productId) {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'default-category';
    try {
      const product = await findProductById(productId, category);
      return product;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
  }
  function getProperImageSize(product) {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
      return product.Images.PrimarySmall;
    } else if (screenWidth <= 768) {
      return product.Images.PrimaryMedium;
    } else if (screenWidth <= 1024) {
      return product.Images.PrimaryLarge;
    } else {
      return product.Images.PrimaryExtraLarge;
    }
  }

  function applyDiscount(product) {
    if (product.IsClearance == true) {
      product.FinalPrice = product.FinalPrice * 0.8;
      return `<span class="strikethrough">${product.ListPrice}</span> $${product.FinalPrice.toFixed(2)}`;
    }
    return product.FinalPrice;
  }

  function applyReviews(product) {
    if (product.Reviews.ReviewCount === 0) {
      return "No reviews yet.";
    } else {
      return `${product.Reviews.AverageRating}/5`;
    }
  }

  function createColorButtons(product) {
    const colorContainer = document.getElementById('color-options');
    product.Colors.forEach(color => {
      const colorButton = document.createElement('button');
      colorButton.textContent = color.ColorName;
      colorButton.classList.add('color-button');
      colorButton.onclick = function() {
        document.querySelectorAll('.color-button').forEach(btn => btn.style.backgroundColor = 'white');
        this.style.backgroundColor = 'gray';
      };
      colorContainer.appendChild(colorButton);
    });
  }

  function displayOtherImages(product) {
    let htmlContent = '';
    if (product.Images.ExtraImages) {
      htmlContent += `
      <figure>
        <img src="${getProperImageSize(product)}" alt="${product.Name}" class="extra-image" data-index="main"/>
        <figcaption>Main Image</figcaption>
      </figure>
    `;
      product.Images.ExtraImages.forEach((item, index) => {
        htmlContent += `
          <figure>
            <img src="${item.Src}" alt="${item.Title}" class="extra-image" data-index="${index}"/>
            <figcaption>${item.Title}</figcaption>
          </figure>
        `;
      });
    }
    return htmlContent;
  }

  function setupImageSwitching(product) {
    document.querySelectorAll('.extra-image').forEach(element => {
      element.addEventListener('click', () => {
        const index = element.getAttribute('data-index');
        if (index === 'main') {
          // If the main image is clicked, reset to the default main image size
          changeMainImage(getProperImageSize(product), product.Name);
        } else {
          // For extra images, switch to the clicked image
          const selectedImage = product.Images.ExtraImages[index];
          changeMainImage(selectedImage.Src, selectedImage.Title);
        }
      });
    });
  }

  function changeMainImage(src, alt) {
    const mainImageElement = document.querySelector('#main-image');
    mainImageElement.src = src;
    mainImageElement.alt = alt;
  }

  function changeQuantity(change) {
    const quantityElement = document.getElementById("quantity");
    let quantity = parseInt(quantityElement.textContent);

    quantity += change;

    // Prevent the quantity from going below 1
    if (quantity < 1) quantity = 1;

    quantityElement.textContent = quantity;
  }

  function setupQuantityControls() {
    const decreaseButton = document.querySelector('#quantity-control button.decrease');
    const increaseButton = document.querySelector('#quantity-control button.increase');

    decreaseButton.addEventListener('click', () => changeQuantity(-1));
    increaseButton.addEventListener('click', () => changeQuantity(1));
  }

  function setupAddToCartButton(productId) {
    const addToCartButton = document.getElementById('addToCart');
    addToCartButton.addEventListener('click', () => addToCartHandler(productId));
  }

  function displayProduct(product) {

    const container = document.getElementById("product-container");

    const properImageSrc = getProperImageSize(product);

    container.innerHTML = `
      <h1>${product.Name}</h1>
      <img id="main-image" src="${properImageSrc}" alt="${product.Name}"/>
      <p>${product.DescriptionHtmlSimple}</p>
      <p>Price: $${applyDiscount(product)}</p>
      <p>Rating: ${applyReviews(product)}</p>
      <div class="extra-images" id="extra-images">
        ${displayOtherImages(product)}
      </div>
      <p>Colors:</p>
      <div id="color-options"></div>
      <div id="quantity-control">
        <button class="decrease">-</button>
        <span id="quantity">1</span>
        <button class="increase">+</button>
      </div>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    `;

    createColorButtons(product);
    setupImageSwitching(product);
    setupQuantityControls();
    setupAddToCartButton(product.Id);

  }

function addToCartHandler() {
  const productContainer = document.getElementById("product-container");
  const quantity = document.getElementById("quantity").textContent;
  const colorButtons = document.querySelectorAll('.color-button');
  let selectedColor = '';

  // Find which color button is selected
  colorButtons.forEach(button => {
    if (button.style.backgroundColor === 'gray') {
      selectedColor = button.textContent;
    }
  });

  // Assuming product details are stored in a data attribute or some accessible variable
  const productId = document.getElementById("addToCart").getAttribute('data-id');

  const productDetails = {
    productId: productId,
    quantity: quantity,
    selectedColor: selectedColor,
  };

  console.log("Adding to cart:", productDetails);
}
