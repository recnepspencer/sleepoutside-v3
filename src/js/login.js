import LoginForm from './components/LoginForm.svelte';
import { getParam } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // Find the main element for the login form
  const mainElement = document.querySelector('.login-page');

  // Render the login form inside the main element
  new LoginForm({
    target: mainElement,
    props: {
      email: getParam('email') || ''
    }
  });
});