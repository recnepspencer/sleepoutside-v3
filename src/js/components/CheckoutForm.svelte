<script>
  import { quartIn } from "svelte/easing";
  import { getLocalStorage } from "../utils.mjs";
  import { format } from "prettier";
  import {checkout} from '../externalServices.mjs'

  const BASE_URL = import.meta.env.VITE_SERVER_URL
  const form = document.querySelector('form');

  let quantity = 0;
  let subtotal = 0;
  let cart = []
  let shipping = 0
  let tax = 0
  let orderTotal = 0

  function init() {
    cart = getLocalStorage("so-cart");
    shipping = 10 + (quantity - 1) * 2;
    tax = subtotal * 0.06;
    orderTotal = subtotal + tax + shipping;
    cart.forEach((item) => {
      quantity += item.quantity;
      subtotal += item.quantity * item.FinalPrice;
    });
  }



  function packageItems(cart) {
    let itemPackage = []

    cart.forEach((item) => {
      itemPackage.items.push({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: item.quantity
      })
    });

    return itemPackage;
  }
 

  async function handleSubmit(e) {
    console.log(this)
    console.log(e.target)


    const itemsSimple = packageItems(cart);

    let dataPackage = {
      orderDate: new Date(),
      fname: form.fname.value,
      lname: form.lname.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      cardNumber: form.cardNumber.value,
      expiration: form.expiration.value,
      code: form.code.value,
      orderTotal: form.orderTotal.value,
      shipping: form.shipping.value,
      tax: form.tax.value,
      items: itemsSimple
    };

    try {
      const res = await checkout(dataPackage)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    
  }

  init()
</script>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset class="checkoutForm-shipping">
    <legend>Shipping</legend>
    <label for="fname">First Name</label>
    <input type="text" name="fname" />
    <label for="lname">Last Name</label>
     <input type="text" name="lname" />
    <label for="street">Street</label>
    <input type="text" name="street" />
    <label for="city">City</label>
    <input type="text" name="city" />
    <label for="state">State</label>
    <input type="text" name="state" />
    <label for="zip">Zip</label>
    <input type="number" name="zip" />
  </fieldset>
  <fieldset class="checkoutForm-payment">
    <legend>Payment</legend>
    <label for="cardNumber">Card Number</label>
    <input type="number" name="cardNumber" />
    <label for="expiration">Expiration</label>
    <input type="date" name="expiration" />
    <label for="code">Security Code</label>
    <input type="number" name="code" />
  </fieldset>
  <fieldset class="checkoutForm-summary">
    <legend>Order Summary</legend>
    <p>Item Subtotal({quantity})</p>
    <p>${subtotal}</p>
    <p>Shipping Estimate</p>
    <p>${shipping}</p>
    <p>Tax</p>
    <p>${tax}</p>
    <p>Order Total</p>
    <p>${orderTotal}</p>
  </fieldset>
  <button type="submit" class="checkout">Checkout</button>
</form>
