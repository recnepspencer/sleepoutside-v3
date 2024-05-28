import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calculate and display total price
  const totalPrice = calculateTotalPrice(cartItems);
  document.querySelector(
    ".total-price"
  ).textContent = `Total Price: $${totalPrice.toFixed(2)}`;

  // add an event listener to removeItem for all the remove-cart-btn buttons
  document.querySelectorAll(".remove-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeItem(btn);
    });
  });
}

function applyDiscount(product) {
  if (product.IsClearance) {
    const discountedPrice = product.FinalPrice * 0.8;
    return { finalPrice: discountedPrice, displayPrice: `<span class="strikethrough">${product.ListPrice}</span> $${discountedPrice.toFixed(2)}` };
  }
  return { finalPrice: product.FinalPrice, displayPrice: `$${product.FinalPrice}` };
}

function cartItemTemplate(item) {
  const colorName = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "No color";
  const { displayPrice } = applyDiscount(item);

  return `<li class="cart-card divider">
    <span class="remove-cart-btn" data-id="${item.Id}">X</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">Quantity: ${item.quantity}</p>
    <p class="cart-card__price">${displayPrice}</p>
  </li>`;
}

function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => {
    const { finalPrice } = applyDiscount(item);
    return total + (finalPrice || 0) * item.quantity;
  }, 0);
}

function removeItem(btn) {
  // btn: the button element that removes the item
  const id = btn.dataset.id;
  let cart = getLocalStorage("so-cart");

  let itemRemoved = false;
  cart = cart.filter((item) => {
    if (!itemRemoved && item.Id === id) {
      itemRemoved = true;
      return false;
    } else {
      return true;
    }
  });

  setLocalStorage("so-cart", cart);
  renderCartContents();
}

renderCartContents();
