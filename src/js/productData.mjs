function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category) {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => {
      // Assuming the array is stored under a key 'Result'
      return data.Result || []; // This line ensures you always return an array, even if Result is not found.
    });
}

export async function findProductById(id, category) {
  const products = await getData(category);
  return products.find((item) => item.Id === id);
}
