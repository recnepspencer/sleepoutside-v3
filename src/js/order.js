import OrderList from './components/OrderList.svelte';
import { checkLogin } from './auth.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // Ensure the user is logged in
  checkLogin();

  // Find the main element with class orders-page
  const mainElement = document.querySelector('.orders-page');

  // Render the OrderList component inside the main element
  new OrderList({
    target: mainElement
  });
});
