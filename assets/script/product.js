import { fetchData } from "./fetchData.js";

async function showProductDetails() {
  const productContainer = document.querySelector(".product-detail");

  if (!productContainer) {
    console.error("HATA: .product-detail elementi bulunamadı!");
    return;
  }

  const products = await fetchData();
  
  const hash = window.location.hash;
  if (!hash.startsWith("#product-")) {
    console.error("Geçersiz ürün URL'si:", hash);
    return;
  }

  const slug = hash.replace("#product-", ""); 
  const product = products.find(p => p.slug === slug);

  if (!product) {
    productContainer.innerHTML = "<h2>Ürün bulunamadı!</h2>";
    return;
  }

 
  productContainer.innerHTML = `
    <a class="go-back-link" href="#">Go Back</a>
    <div class="product-detail-item">
      <img class="product-img" src="${product.image.desktop}" alt="${product.name}">
      <div class="product-detail-text">
        <h4>${product.isNew ? "NEW PRODUCT" : ""}</h4>
        <h3 class="product-detail-name">${product.name}</h3>
        <p class="product-detail-info">${product.description}</p>
        <h3 class="product-detail-price">$ ${product.price}</h3>
        <div class="product-count-area">
          <p>- 1 +</p>
          <a class="add-to-cart" href="#">Add to cart</a>
        </div>
      </div>
    </div>
    <div class="product-features">
      <h2>Features</h2>
      <p>${product.features}</p>
      <h2>In the box</h2>
      <ul>
        ${product.includes.map(item => `<p>${item.quantity}x ${item.item}</p>`).join("")}
      </ul>
    </div>
    <div class="product-detail-images">
      <img src="${product.gallery[0].desktop}" alt="1x">
      <img src="${product.gallery[1].desktop}" alt="2x">
      <img src="${product.gallery[2].desktop}" alt="3x">
    </div>
    <div class="product-also-like">
      ${product.others.map(other => `
        <div class="product-also-like-item">
          <img src="${other.image.desktop}" alt="${other.name}">
          <h3>${other.name}</h3>
          <a href="#product-${other.slug}">See Product</a>
        </div>
      `).join("")}
    </div>
  `;

  console.log("✅ Ürün detayları yüklendi:", product);
}

window.addEventListener("hashchange", showProductDetails);
window.addEventListener("load", showProductDetails);
