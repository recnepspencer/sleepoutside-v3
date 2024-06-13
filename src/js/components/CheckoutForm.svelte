<script>
  import { quartIn } from "svelte/easing";
  import { getLocalStorage } from "../utils.mjs";
  import { format } from "prettier";
  import { checkout } from "../externalServices.mjs";
  import { alertMessage } from "../utils.mjs";

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

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
      quantity: item.quantity,
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
      items: items,
    };

    console.log(dataPackage.items);

    try {
      const res = await checkout(dataPackage);
      const successMessage = `Order was successfully placed!`;
      alertMessage(successMessage);
      localStorage.removeItem("so-cart");
      console.log(res);
    } catch (error) {
      if (error.name === "servicesError") {
        let errorMessage = "Error: <br>";
        if (typeof error.message === 'object') {
          for (let key in error.message) {
            errorMessage += `${error.message[key]}<br>`;
          }
        } else {
          errorMessage += error.message;
        }
        alertMessage(errorMessage, true);
      } else {
        alertMessage("An unexpected error occurred. Please try again.", true);
      }
    }
  }

  init();
</script>

<form on:submit={handleSubmit} class="form-container">
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

<style>
  :root {
  --font-body: Arial, Helvetica, sans-serif;
  --font-headline: Haettenschweiler, "Arial Narrow Bold", sans-serif;
  /* colors */
  --primary-color: #f0a868;
  --secondary-color: #525b0f;
  --tertiary-color: #a4b8c4;
  --light-grey: #d0d0d0;
  --dark-grey: #303030;

  /* sizes */
  --font-base: 18px;
  --small-font: 0.8em;
  --large-font: 1.2em;
}

/* Checkout Form Styles */
.checkoutForm-shipping,
.checkoutForm-payment,
.checkoutForm-summary {
  border: 1px solid var(--light-grey);
  border-radius: 5px;
  padding: 1em;
  margin: 1em 0;
}

.checkoutForm-shipping legend,
.checkoutForm-payment legend,
.checkoutForm-summary legend {
  font-weight: bold;
  color: var(--secondary-color);
}

.checkoutForm-shipping label,
.checkoutForm-payment label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.checkoutForm-shipping input,
.checkoutForm-payment input {
  width: calc(100% - 10px);
  padding: 0.5em;
  border: 1px solid var(--light-grey);
  border-radius: 5px;
  margin-bottom: 1em;
}

.checkoutForm-summary p {
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
  font-weight: bold;
}

.checkoutForm-summary p:last-child {
  border-top: 1px solid var(--light-grey);
  padding-top: 1em;
  margin-top: 1em;
  font-size: var(--large-font);
}

.checkoutForm-summary p:nth-child(odd) {
  color: var(--secondary-color);
}

.checkout {
  width: 100%;
  padding: 1em;
  background-color: var(--primary-color);
  color: white;
  font-size: var(--large-font);
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1em;
  display: block;
  text-align: center;
}

.checkout:hover {
  background-color: #d4895e;
}

.checkout:active {
  background-color: white; 
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

/* Responsive Styles */
@media screen and (min-width: 768px) {
  .checkoutForm-shipping,
  .checkoutForm-payment,
  .checkoutForm-summary {
    width: 45%;
    margin: 1em auto;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .checkout {
    width: auto;
    max-width: 300px;
    margin: 1em auto 0 auto;
    text-align: center;
    margin-bottom: 40px;
  }

  .form-container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}

</style>
