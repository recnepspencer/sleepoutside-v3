<script>
  import { getParam } from "../utils.mjs";

  export let pro = {};
  export let category = getParam("category");
  function getImageUrl(product) {
    return product.Images.PrimaryLarge;
  }

  function applyDiscount(product) {
    if (product.IsClearance) {
      const discountedPrice = product.FinalPrice * 0.8;
      return `<span class="strikethrough">${product.ListPrice}</span> $${discountedPrice.toFixed(2)}`;
    }
    return `$${product.FinalPrice}`;
  }
</script>

<section>
  <a href={`/product_pages/index.html?category=${category}&product=${pro.Id}`}>
    <img src={getImageUrl(pro)} alt={pro.NameWithoutBrand} />
    <h3 class="card__brand">{pro.Brand.Name}</h3>
    <h2 class="card__name">{pro.NameWithoutBrand}</h2>
    <p class="product-card__price">{@html applyDiscount(pro)}</p>
  </a>
</section>
