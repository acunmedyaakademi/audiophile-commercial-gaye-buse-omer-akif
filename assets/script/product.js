import { fetchData } from "./fetchData.js";

let orders = [];
let productQuantity = 1; 

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

  if (!product) {
    console.error("⚠️ Ürün bulunamadı!");
    productContainer.innerHTML = `<p class="error-message">Ürün bulunamadı.</p>`;
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
      </div>
    </div>
  `;
}

function increaseDetailQuantity() {
  productQuantity++;
  document.querySelector(".count").innerText = productQuantity;
}

function decreaseDetailQuantity() {
  if (productQuantity > 1) {
    productQuantity--;
    document.querySelector(".count").innerText = productQuantity;
  }
}

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

  productQuantity = 1;
  document.querySelector(".count").innerText = productQuantity;
}

function renderOrders() {
  const cartContainer = document.querySelector(".cart-container");

  if (!cartContainer) {
    console.error("HATA: `.cart-container` elementi bulunamadı!");
    return;
  }

  console.log("Sepetteki ürün sayısı:", orders.length);

  if (orders.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty">
        <h2>CART (<span id="cart-count">0</span>)</h2>
        <p>Your Cart is empty.</p>
        <p>Continue shopping on the <a href="#">homepage</a>.</p>
        <h3>Total: $ 0</h3>
      </div>
    `;
    return;
  }

  cartContainer.innerHTML = `
    <div class="dialog-header">
      <h2>CART (<span id="cart-count">${orders.length}</span>)</h2>
      <a href="#" class="remove-all">Remove all</a>
    </div>

    <ul class="cart-items">
      ${orders
        .map(
          (x) => `
        <li class="order-item">
          <div class="order-product-info">
            <img class="order-product-img" src="assets/cart/image-${x.slug}.jpg" alt="${x.name}">
            <div class="order-texts">
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
    <div class="cart-total">
      <h3>TOTAL: <span>$ ${orders.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span></h3>
    </div>
    <a href="#checkout" class="checkout-btn">CHECKOUT</a>
  `;

  document.querySelectorAll(".order-minus-counter").forEach((btn) => {
    btn.addEventListener("click", removeFromCart);
  });

  document.querySelectorAll(".order-plus-counter").forEach((btn) => {
    btn.addEventListener("click", increaseQuantity);
  });
}



function increaseQuantity(e) {
  const productName = e.target.closest(".orderLi").querySelector(".orderTexts h6").textContent;
  let product = orders.find((x) => x.name === productName);

  if (product) {
    product.quantity++;
    renderOrders();
  }
}

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

document.addEventListener("DOMContentLoaded", () => {
  showProductDetails();
  renderOrders();
});
