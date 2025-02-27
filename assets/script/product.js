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

  productContainer.innerHTML = `
    <a class="go-back-link" href="#">Go Back</a>
    <div class="product-detail-item">
      <img class="product-img-mobile" src="${product.image.mobile}"  alt="${product.name}">   
      <img class="product-img-tablet" src="${product.image.tablet}" alt="${product.name}">
      <img class="product-img-desktop"  src="${product.image.desktop}"  alt="${product.name}">
      
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

    <div class="product-features">
      <div class = "features-in-the-box-group">
        <div class="features-area">
          <h2 class="features-header">Features</h2>
          <p class="features-text">${product.features}</p>
        </div>

          <div class="in-the-box-content">
          <h2 class="in-the-box-header">IN THE BOX</h2>
          <div class="content-section">
            <ul>
              ${product.includes.map(include => `
                <li class = "in-the-box-item"><span class = "in-the-box-item-quantity">${include.quantity ? include.quantity + 'x ' : ''}</span> 
                <span class="in-the-box-item-text">${include.item}</span> </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>

          <div class="gallery-items">
            ${product.gallery.map((image, index) => `
            <div class="gallery-item item-${index + 1}">
              <img src="${image.mobile}" alt="Image ${index + 1}">
            </div>
        `).join('')}
          </div>


      
      </div>
      <div class="also-like-section-items">
        <h2 class = "also-like-header">YOU MAY ALSO LIKE</h2>
          
        <div class = "also-like-items-container">
        ${product.others.map((other, index) => `
          <div class="also-like-item">
            <img class= "mobile-only" src="${other.image.mobile}" alt="Image ${index + 1}">
            <img class= "tablet-only" src="${other.image.tablet}" alt="Image ${index + 1}">
            <img class= "desktop-only" src="${other.image.desktop}" alt="Image ${index + 1}">
            <h3 class = "also-like-item-name">${other.name}</h3>
            <a href ="#product-${other.slug}" class = "see-product-button" >See Product</a>
          </div>
        `).join('')}
        </div>
      </div>

  

  `;

  document.querySelector(".plus-counter").addEventListener("click", increaseDetailQuantity);
  document.querySelector(".minus-counter").addEventListener("click", decreaseDetailQuantity);
  document.querySelector(".add-to-cart").addEventListener("click", addToCart);
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
      <button id="remove-all">Remove all</button>
    </div>
    <ul class="cart-items">
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
    <div class="cart-total">
        <h3>TOTAL <span>$ ${orders.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span></h3>
    </div>
   <a href="#checkout"><button class="checkout-btn">CHECKOUT</button></a>
  `;

  document.getElementById("remove-all").addEventListener("click", () => {
    orders = [];
    renderOrders();

  });

  document.querySelectorAll(".order-minus-counter").forEach((btn) => {
    btn.addEventListener("click", removeFromCart);
  });

  document.querySelectorAll(".order-plus-counter").forEach((btn) => {
    btn.addEventListener("click", increaseQuantity);
  });

  updateProductDetails();
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

document.addEventListener("DOMContentLoaded", () => {
  showProductDetails();
});
