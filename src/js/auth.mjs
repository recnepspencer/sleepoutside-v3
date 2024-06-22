import { jwtDecode } from 'jwt-decode';
import { loginRequest } from './externalServices.mjs';
// import jwt_decode from 'jwt-decode';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

const tokenKey = 'so_token';
export async function login(creds, redirect = '../orders/index.html') {
  try {
    const token = await loginRequest(creds);
    console.log('token:', token);
    console.log(creds)
    setLocalStorage(tokenKey, token);
    console.log('token:', token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message);
  }
}

// Function to check if the token is valid (not expired)
function isTokenValid(token) {
    // check to make sure a token was actually passed in.
    if (token) {
        // decode the token
        const decoded = jwtDecode(token);
        // get the current date
        let currentDate = new Date();
        // JWT exp is in seconds, the time from our current date will be milliseconds.
        if (decoded.exp * 1000 < currentDate.getTime()) {
        //token expiration has passed
        console.log("Token expired.");
        return false;
        } else {
        // token not expired
        console.log("Valid token");
        return true;
        }
   ;
    } else {
        console.log("No token provided.");
        return false};
}

// Function to check login status and redirect if not logged in
export function checkLogin() {
    // get the token from localStorage
    const token = getLocalStorage(tokenKey);
    // use the isTokenValid function to check the validity of our token
    const valid = isTokenValid(token);
    // if the token is NOT valid
    if (!valid) {
      //remove stored token
      localStorage.removeItem(tokenKey);
      // redirect to login while sending the current URL along as a parameter
      // grab the current location from the browser
      const location = window.location;
      // check out what location contains
      console.log(location);
      // redirect by updating window.location =
      window.location = `/login/index.html?redirect=${location.pathname}`;
    } else return token; //if they are logged in then just return the token.
  }

// Utility function to display alert messages
function alertMessage(message) {
  alert(message); 
}
