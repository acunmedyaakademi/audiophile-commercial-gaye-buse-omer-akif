import { fetchData } from "./fetchData.js";

let orders = []; // Sepet
let productQuantity = 1; // Detay sayfasındaki başlangıç miktarı

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
  const product = products.find((p) => p.slug === slug);

  productContainer.innerHTML = `
    <a class="go-back-link" href="#">Go Back</a>
    <div class="product-detail-item">
      <img class="product-img" src="${product.image.desktop}" alt="${product.name}">
      <div class="product-detail-text">
        <h4>${product.isNew ? "NEW PRODUCT" : ""}</h4>
        <h3 class="product-detail-name" data-id="${product.id}">${product.name}</h3>
        <p class="product-detail-info">${product.description}</p>
        <h3 class="product-detail-price">$ ${product.price}</h3>
        <div class="product-count-area">
          <div class="product-counter">
            <button class="minus-counter">-</button>
            <p class="count">${productQuantity}</p>
            <button class="plus-counter">+</button>
          </div>
          <button class="add-to-cart" data-isim="${product.name}" data-price="${product.price}" data-slug="${product.slug}">ADD TO CART</button>
        </div>
      </div>
    </div>
  `;

  // Artı ve Eksi butonları bağlanıyor
  document.querySelector(".plus-counter").addEventListener("click", increaseDetailQuantity);
  document.querySelector(".minus-counter").addEventListener("click", decreaseDetailQuantity);

  // Sepete ekleme butonu
  document.querySelector(".add-to-cart").addEventListener("click", addToCart);
}

// 🔼 **Artı butonu: Yalnızca miktarı artırır**
function increaseDetailQuantity() {
  productQuantity++;
  document.querySelector(".count").innerText = productQuantity;
}

// 🔽 **Eksi butonu: Yalnızca miktarı azaltır (1'den küçük olamaz)**
function decreaseDetailQuantity() {
  if (productQuantity > 1) {
    productQuantity--;
    document.querySelector(".count").innerText = productQuantity;
  }
}

// 🛒 **Add to Cart: Seçilen miktarda ürünü sepete ekler**
function addToCart(e) {
  const productName = e.target.dataset.isim;
  const productPrice = parseFloat(e.target.dataset.price);
  const productSlug = e.target.dataset.slug;

  let existingProduct = orders.find((item) => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += productQuantity;
  } else {
    orders.push({
      name: productName,
      price: productPrice,
      slug: productSlug,
      quantity: productQuantity,
    });
  }

  console.log("Güncellenmiş Sepet:", orders);
  renderOrders();
}

// 🛒 **Sepeti Günceller**
function renderOrders() {
  const cartContainer = document.querySelector(".cart-container");

  cartContainer.innerHTML = `
    <h2>CART (<span id="cart-count">${orders.length}</span>)</h2>
    <a href="#">Remove all</a>
    <hr />
    <ul>
      ${orders
        .map(
          (x) => `
        <li class="orderLi">
          <div class="orderProductInfo">
            <img class="orderProductImg" src='assets/cart/image-${x.slug}.jpg' alt="">
            <div class="orderTexts">
              <h6>${x.name}</h6>
              <span class="orderPrice">$${x.price}</span>     
            </div>
          </div>
          <div class="order-product-counter">
            <button class="order-minus-counter">-</button>
            <p class="order-count">${x.quantity}</p> 
            <button class="order-plus-counter">+</button>
          </div>
        </li>
      `
        )
        .join("")}
    </ul>
    <h3>Total $ ${orders.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h3>
    <button class="checkout-btn">CHECKOUT</button>
  `;

  // Sepetteki butonları bağla
  document.querySelectorAll(".order-minus-counter").forEach((btn) => {
    btn.addEventListener("click", removeFromCart);
  });

  document.querySelectorAll(".order-plus-counter").forEach((btn) => {
    btn.addEventListener("click", increaseQuantity);
  });

  updateProductDetails();
}

// 🔼 **Sepetteki miktarı artırır**
function increaseQuantity(e) {
  const productName = e.target.closest(".orderLi").querySelector(".orderTexts h6").textContent;
  let product = orders.find((x) => x.name === productName);

  if (product) {
    product.quantity++;
    renderOrders();
  }
}

// 🔽 **Sepetteki miktarı azaltır, sıfıra inerse ürünü çıkarır**
function removeFromCart(e) {
  const productName = e.target.closest(".orderLi").querySelector(".orderTexts h6").textContent;
  let product = orders.find((x) => x.name === productName);

  if (product) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      orders = orders.filter((x) => x.name !== productName);
    }
    renderOrders();
  }
}

// ✅ **Detay Sayfasındaki Miktarı Günceller**
function updateProductDetails() {
  const productName = document.querySelector(".product-detail-name").textContent;
  const countElement = document.querySelector(".count");

  let product = orders.find((x) => x.name === productName);

  if (product) {
    countElement.innerText = product.quantity;
  } else {
    countElement.innerText = 1;
  }
}

// **Sayfa yüklenince fonksiyonları başlat**
document.addEventListener("DOMContentLoaded", () => {
  showProductDetails();
});
