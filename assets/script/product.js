import { fetchData } from "./fetchData.js";

export async function showProductDetails() {
  const productContainer = document.querySelector(".product-detail");

  if (!productContainer) {
    console.error("HATA: .product-detail elementi bulunamadı!");
    return;
  }

  const products = await fetchData();
  console.log("Gelen Ürünler:", products);


  const hash = window.location.hash;
  console.log("Mevcut Hash:", hash);
  if (!hash.startsWith("#product-")) {
    console.error("Geçersiz ürün URL'si:", hash);
    return;
  }

  const slug = hash.replace("#product-", "");
  console.log("Çıkarılan Slug:", slug);
  const product = products.find(p => p.slug === slug);

  productContainer.innerHTML = '';

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
          <div class="product-counter">
            <p class="minus-counter">-</p>
            <p class="count">1</p> 
            <p class="plus-counter">+</p>
          </div>
          <a class="add-to-cart" href="#">ADD TO CART</a>
        </div>
      </div>
    </div>

    <div class="product-features">
      <h2 class="features-header">Features</h2>
      <p class="features-text">${product.features}</p>
      <div class="in-the-box-content">
        <h2 class="in-the-box-header">IN THE BOX</h2>
        <div class="content-section">
          ${product.includes.map(item => `<p><span>${item.quantity}x</span> ${item.item}</p>`).join("")}
        </div>
      </div>
    </div>

    <div class="product-detail-images">
      <div class="left-product-detail-images">
        <img src="${product.gallery[0].desktop}" alt="1x">
        <img src="${product.gallery[1].desktop}" alt="2x">
      </div>
      <div class="right-product-detail-images">
        <img src="${product.gallery[2].desktop}" alt="3x">
      </div>
    </div>

    <div class="product-also-like">
      <h2 class = "also-like-header">YOU MAY ALSO LIKE</h2>
      <div class="product-also-like-items">
        ${product.others.map(other => `
          <div class="product-also-like-item">
            <img src="${other.image.desktop}" alt="${other.name}">
            <h3>${other.name}</h3>
            <a class="see-product-button" href="#product-${other.slug}">See Product</a>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  console.log("✅ Ürün detayları yüklendi:", product);
}
