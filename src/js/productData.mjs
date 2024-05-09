function convertToJson(res) {
  if (res.ok) {
      return res.json();
  } else {
      throw new Error("Bad Response");
  }
}
<<<<<<< HEAD
  
export function getData(category = "tents") {
return fetch(`../json/${category}.json`)
  .then(convertToJson)
  .then((data) => data);
}

export async function findProductById(id) {
const products = await getData();
return products.find((item) => item.Id === id);
}
=======

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

>>>>>>> revert-branch
