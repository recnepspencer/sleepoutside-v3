<script>
    export let pro = {}
</script>

<section>
    <a href="{`product_pages/index.html?product=${pro.Id}`}">
        <img
            src={pro.Image}
            alt={pro.NameWithoutBrand}
        />
        <h3 class="card__brand">{pro.Brand.Name}</h3>
        <h2 class="card__name">{pro.NameWithoutBrand}</h2>
        <p class="product-card__price">${pro.ListPrice}</p>
    </a>
</section>