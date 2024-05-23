<script>
    import { getLocalStorage } from "./utils.mjs";
    let items = getLocalStorage("so-cart")

    function cartItemColor(item) {
        const colorName =
            item.Colors && item.Colors.length > 0
            ? item.Colors[0].ColorName
            : "No color";
        return colorName;
    }

    function cartItemPrice(item){
        const finalPrice = item.FinalPrice
            ? `$${item.FinalPrice.toFixed(2)}`
            : "Price not available";
        return finalPrice;
    }
  
</script>

<h2>Top Products</h2>

<ul class="product-list">
{#each items as item}
    <li class="cart-card divider">
        <span class="remove-cart-btn" data-id="${item.Id}">X</span>
        <a href="#" class="cart-card__image">
            <img src="${item.Image}" alt="${item.Name}" />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${cartItemColor(item)}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">${cartItemPrice(item)}</p>
    </li>
{/each}
</ul>





