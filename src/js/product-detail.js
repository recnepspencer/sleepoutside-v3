document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
        fetchProductData(productId);
    }
});

function fetchProductData(productId) {
    // Adjust the path to where your JSON file is stored relative to the HTML file
    fetch('../json/sleeping-bags.json')
        .then(response => response.json())
        .then(data => {
            const product = data.Result.find(product => product.Id === productId);
            if (product) {
                displayProduct(product);
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error loading product data:', error));
}

function displayProduct(product) {
    const container = document.getElementById('product-container');
    container.innerHTML = `
        <h1>${product.Name}</h1>
        <img src="${product.Images.PrimaryLarge}" alt="${product.Name}"/>
        <p>${product.DescriptionHtmlSimple}</p>
        <p>Price: $${product.FinalPrice}</p>
        <!-- Add more product details as needed -->
    `;
}
