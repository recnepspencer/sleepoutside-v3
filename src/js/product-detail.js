import { addToCartHandler } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

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
        setupAddToCartButton(product.Id);
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error initializing product page:", error);
    }
  }
  
  async function fetchProductData(productId) {
    const category = "sleeping-bags";
    try {
      const product = await findProductById(productId, category);
      return product;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null; 
    }
  }
  
  
  function displayProduct(product) {
      const container = document.getElementById("product-container");
      container.innerHTML = `
        <h1>${product.Name}</h1>
        <img src="${product.Images.PrimaryLarge}" alt="${product.Name}"/>
        <p>${product.DescriptionHtmlSimple}</p>
        <p>Price: $${product.FinalPrice}</p>
        <p>Colors:</p>
        <div id="color-options"></div>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      `;
  
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
  
      setupAddToCartButton(product.Id); // Setup the Add to Cart button
  }
  
  function setupAddToCartButton(productId) {
    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.addEventListener("click", (e) => {
        addToCartHandler(e, "sleeping-bags");  // Pass 'sleeping-bags' as the category
      });
    }
  }