<script>
  import { quartIn } from "svelte/easing";
  import { getLocalStorage } from "../utils.mjs";
  import { format } from "prettier";
  import { checkout } from '../externalServices.mjs'

  const BASE_URL = import.meta.env.VITE_SERVER_URL

  let quantity = 0;
  let subtotal = 0;
  let cart = [];
  let shipping = 0;
  let tax = 0;
  let orderTotal = 0;

  function init() {
    cart = getLocalStorage("so-cart") || [];
    cart.forEach((item) => {
      quantity += item.quantity;
      subtotal += item.quantity * item.FinalPrice;
    });
    shipping = 10 + (quantity - 1) * 2;
    tax = subtotal * 0.06;
    orderTotal = subtotal + tax + shipping;
  }

  function packageItems(cart) {
    return cart.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice.toFixed(2),
      quantity: item.quantity
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const items = packageItems(cart);

    let dataPackage = {
      orderDate: new Date().toISOString(),
      fname: form.fname.value,
      lname: form.lname.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      cardNumber: form.cardNumber.value,
      expiration: form.expiration.value,
      code: form.code.value,
      orderTotal: orderTotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      items: items
    };

    console.log(dataPackage.items);

    try {
      const res = await checkout(dataPackage);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  init();
</script>

<form on:submit={handleSubmit}>
  <fieldset class="checkoutForm-shipping">
    <legend>Shipping</legend>
    <label for="fname">First Name</label>
    <input type="text" name="fname" required />
    <label for="lname">Last Name</label>
    <input type="text" name="lname" required />
    <label for="street">Street</label>
    <input type="text" name="street" required />
    <label for="city">City</label>
    <input type="text" name="city" required />
    <label for="state">State</label>
    <input type="text" name="state" required />
    <label for="zip">Zip</label>
    <input type="number" name="zip" required />
  </fieldset>
  <fieldset class="checkoutForm-payment">
    <legend>Payment</legend>
    <label for="cardNumber">Card Number</label>
    <input type="text" name="cardNumber" required />
    <label for="expiration">Expiration</label>
    <input type="text" name="expiration" placeholder="MM/YY" required />
    <label for="code">Security Code</label>
    <input type="number" name="code" required />
  </fieldset>
  <fieldset class="checkoutForm-summary">
    <legend>Order Summary</legend>
    <p>Item Subtotal({quantity})</p>
    <p>${subtotal.toFixed(2)}</p>
    <p>Shipping Estimate</p>
    <p>${shipping.toFixed(2)}</p>
    <p>Tax</p>
    <p>${tax.toFixed(2)}</p>
    <p>Order Total</p>
    <p>${orderTotal.toFixed(2)}</p>
  </fieldset>
  <button type="submit" class="checkout">Checkout</button>
</form>
