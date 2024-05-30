<script>
    import { getLocalStorage } from "../utils.mjs";

    let quantity = 0;
    let subtotal = 0;
    
    getLocalStorage("so-cart").forEach((item) => {
        quantity += item.quantity
        subtotal += item.quantity * item.FinalPrice
    });

    let shipping = 10 + (quantity - 1) * 2
    let tax = subtotal * .06;
    let orderTotal = subtotal + tax + shipping;
</script>


<form>
    <fieldset class="checkoutForm-shipping">
        <legend>Shipping</legend>
        <label for="fname">First Name</label>
            <input type="text" name="fname">
        <label for="lname">Last Name</label>
            <input type="text" name="lname">
        <label for ="street">Street</label>
            <input type="text" name="street">
        <label for="city">City</label>
            <input type="text" name="city">
        <label for="state">State</label>
            <input type="text" name="state">
        <label for ="zip">Zip</label>
            <input type="number" name="zip">
    </fieldset>
    <fieldset class="checkoutForm-payment">
        <legend>Payment</legend>
        <label for="cardNumber">Card Number</label>
            <input type="number" name="cardNumber">
        <label for="expiration">Expiration</label>
            <input type="date" name="expiration">
        <label for ="code">Security Code</label>
            <input type="number" name="code">
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