import productsData from '../json/sleeping-bags.json';

const ITEMS_PER_PAGE = 24;
let currentPage = 1;
const totalPages = Math.ceil(productsData.Count / productsData.PerPage);

function renderProducts(page) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToDisplay = productsData.Result.slice(startIndex, endIndex);

    itemsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" class="product-image"/>
            <h2>${product.NameWithoutBrand}</h2>
            <p>Price: $${product.FinalPrice}</p>
        `;
        productElement.addEventListener('click', () => {
            window.location.href = `product-detail.html?id=${product.Id}`;
        });
        grid.appendChild(productElement);
    });
    updatePagination();
}


function updatePagination() {
    const pageInfo = document.getElementById('page-info');
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || currentPage === productsData.Page; // Disable if on the last known page
}

function setupPaginationControls() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts(currentPage);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(currentPage);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(currentPage);
    setupPaginationControls();
});