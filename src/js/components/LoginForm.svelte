<script>
    import { getParam } from '../utils.mjs';
  
    let email = '';
    let password = '';
  
    function handleLogin(event) {
      event.preventDefault();
      const redirect = getParam('redirect');
      login(email, password, redirect);
    }
  
    function login(email, password, redirect) {
      // Implement the login functionality here
      // You might send a request to your server to authenticate the user
      console.log('Logging in with:', email, password);
      if (redirect) {
        window.location.href = redirect;
      } else {
        // Redirect to a default page after login
        window.location.href = '/orders';
      }
    }
  </script>
  
  <style>
    /* Add your styles here */
    .login-form {
      max-width: 400px;
      margin: auto;
      padding: 1em;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f9f9f9;
    }
  
    .login-form input {
      width: 100%;
      padding: 0.5em;
      margin: 0.5em 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .login-form button {
      width: 100%;
      padding: 0.5em;
      margin: 0.5em 0;
      border: none;
      border-radius: 4px;
      background: #007bff;
      color: white;
      cursor: pointer;
    }
  
    .login-form button:hover {
      background: #0056b3;
    }
  </style>
  
  <div class="login-form">
    <form on:submit={handleLogin}>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  