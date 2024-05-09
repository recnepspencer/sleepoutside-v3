function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = 'tents') {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => {
      return data.Result || []; 
    });
    

}

export async function findProductById(id, category) {
  const products = await getData(category);
  return products.find((item) => item.Id === id);
}

