import { get } from "svelte/store";
import { getParam } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
  }
}

export async function checkout(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${baseURL}checkout`, options)
  return await convertToJson(res)
}

export async function getProductsByCategory(category) {
  category = category || getParam("category");
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function getProductsBySearch(search) {
  const res = await fetch(baseURL + `product/${search}`)
  const data = await convertToJson(res)
  return [data.Result]
}

export async function findProductById(id, category) {
  const products = await getProductsByCategory(category);
  return products.find((item) => item.Id === id);
}


export async function loginRequest(creds) {
  const response = await fetch('http://server-nodejs.cit.byui.edu:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  });

  if (!response.ok) {
    throw new Error('Login request failed');
  }

  const data = await response.json();
  console.log(data.accessToken);
  localStorage.setItem('so_token', data.accessToken);
  return `Bearer ${data.accessToken}`;
}


export async function getOrders() {
  const token = localStorage.getItem('so_token');
  const response = await fetch(baseURL + 'orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  const data = await response.json();
  console.log(data.Result);
  return data.Result;
}