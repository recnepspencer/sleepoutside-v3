let productsData;
let currentPage = 1;
let totalPages;

async function fetchProductsData(dataSource) {
    const response = await fetch(dataSource);
    productsData = await response.json();
    totalPages = Math.ceil(productsData.Count / productsData.PerPage);
    renderProducts(currentPage);
    setupPaginationControls();
}

function renderProducts(page) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    const startIndex = (page - 1) * 24;  // Assuming ITEMS_PaER_PAGE is always 24
    const endIndex = startIndex + 24;
    const itemsToDisplay = productsData.Result.slice(startIndex, endIndex);

    const params = new URLSearchParams(window.location.search);
    const currentCategory = params.get('category') || 'sleeping-bags'; // Default to 'sleeping-bags' if no parameter is provided

    itemsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" class="product-image"/>
            <h2>${product.NameWithoutBrand}</h2>
            <p>Price: $${product.FinalPrice}</p>
        `;
        productElement.addEventListener('click', () => {
            window.location.href = `product-detail.html?id=${product.Id}&category=${currentCategory}`;
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
    nextButton.disabled = currentPage === totalPages;
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
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || 'sleeping-bags'; // Default to 'sleeping-bags' if no parameter is provided

    let dataSource;
    switch (category) {
        case 'tents':
            dataSource = '../json/tents.json';
            break;
        case 'backpacks':
            dataSource = '../json/backpacks.json';
            break;
        default:
            dataSource = '../json/sleeping-bags.json';
            break;
    }

    fetchProductsData(dataSource);
});
