import CheckoutForm from "./components/CheckoutForm.svelte"

document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkoutForm')

    new CheckoutForm({
        target: checkoutForm,
    });
})