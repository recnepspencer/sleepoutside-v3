<script>
  import { quartIn } from "svelte/easing";
  import { getLocalStorage } from "../utils.mjs";
  import { format } from "prettier";
  const BASE_URL = import.meta.env.VITE_SERVER_URL
  const form = document.querySelector('form');

  let quantity = 0;
  let subtotal = 0;

  let cart = getLocalStorage("so-cart");

  cart.forEach((item) => {
    quantity += item.quantity;
    subtotal += item.quantity * item.FinalPrice;
  });

  let shipping = 10 + (quantity - 1) * 2;
  let tax = subtotal * 0.06;
  let orderTotal = subtotal + tax + shipping;

  function packageItems() {
    let itemPackage = {
      orderDate: new Date(),
      fname: form.fname.value,
      lname,
      street,
      city,
      state,
      zip,
      cardNumber,
      expiration,
      code,
      orderTotal,
      shipping,
      tax,
      items: []
    };
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
 

  function handleSubmit(e) {
    const itemPackage = packageItems(items);
    console.log(packageItems(items))

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemPackage),
    };

    fetch(`${BASE_URL}/checkout`, options);
    
  }
</script>

<form>
  <fieldset class="checkoutForm-shipping">
    <legend>Shipping</legend>
    <label for="fname">First Name</label>
    <input type="text" name="fname" value="Bob" />
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
