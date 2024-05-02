import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Calculate and display total price
  const totalPrice = calculateTotalPrice(cartItems);
  document.querySelector(".total-price").textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  
}

function cartItemTemplate(item) {
  const colorName = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : 'No color';
  const finalPrice = item.FinalPrice ? `$${item.FinalPrice.toFixed(2)}` : 'Price not available';

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">${finalPrice}</p>
  </li>`;

}

function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => total + (item.FinalPrice || 0), 0);
}

renderCartContents();
