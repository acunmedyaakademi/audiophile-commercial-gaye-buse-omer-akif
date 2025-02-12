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
  const product = products.find((p) => p.slug === slug);

  productContainer.innerHTML = "";

  productContainer.innerHTML = `
    <a class="go-back-link" href="#">Go Back</a>
    <div class="product-detail-item">
      <img class="product-img" src="${product.image.desktop}" alt="${product.name
    }">
      <div class="product-detail-text">
        <h4>${product.isNew ? "NEW PRODUCT" : ""}</h4>
        <h3 class="product-detail-name" data-id= ${product.id}>${product.name}</h3>
        <p class="product-detail-info">${product.description}</p>
        <h3 class="product-detail-price">$ ${product.price}"</h3>
        <div class="product-count-area">
          <div class="product-counter">
            <p class="minus-counter">-</p>
            <p class="count">1</p> 
            <p class="plus-counter">+</p>
          </div>
          <button class="add-to-cart" data-isim= "${product.name
    }" data-price= ${product.price} data-slug= ${product.slug
    } >ADD TO CART</button>
        </div>
      </div>
    </div>

    <div class="product-features">
      <div class = "product-features-content">
        <h2 class="features-header">Features</h2>
        <p class="features-text">${product.features}</p>
      </div>
      <div class="in-the-box-content">
        <h2 class="in-the-box-header">IN THE BOX</h2>
        <div class="content-section">
          ${product.includes
      .map((item) => `<p><span>${item.quantity}x</span> ${item.item}</p>`)
      .join("")}
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
        ${product.others
      .map(
        (other) => `
          <div class="product-also-like-item">
            <img src="${other.image.desktop}" alt="${other.name}">
            <h3>${other.name}</h3>
            <a class="see-product-button" href="#product-${other.slug}">See Product</a>
          </div>
        `
      )
      .join("")}
      </div>
    </div>
  `;

  console.log("✅ Ürün detayları yüklendi:", product);
}

const orders = []; // Kullanıcının sepete eklediği ürünleri tutar

async function handleAddBasket() {
  const products = await fetchData();
  console.log("Ürünler yüklendi:", products);

  // Ürünleri yükledikten sonra butonları içeren elementi dinle
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
      handleAddButtons(e);
    }
  });
}

function handleAddButtons(e) {
  e.preventDefault();

  const productName = e.target.dataset.isim;
  const productPrice = e.target.dataset.price;
  const productSlug = e.target.dataset.slug;
  const productId = e.target.dataset.id;

  console.log("Seçilen ürün ismi:", productName);

  let selectedProduct = orders.find((order) => order.name === productName);

  if (selectedProduct) {
    selectedProduct.quantity++;
  } else {
    orders.push({
      id: productId,
      name: productName,
      price: productPrice,
      slug: productSlug,
      quantity: 1,
    });
  }



  console.log("Güncellenmiş Sepet:", orders);
  renderOrders();
}

// Sepeti Güncelleyen Fonksiyon
function renderOrders() {
  const cartContainer = document.querySelector(".cart-container");

  cartContainer.innerHTML = `
    <h2>CART (<span id="cart-count">${orders.length}</span>)</h2>
    <a href="#">Remove all</a>
    <hr />
    <ul>
      ${orders.map(x => `
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
      `).join("")}
    </ul>
    <h3>Total $ ${orders.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</h3>
    <a  href="#checkout" class="checkout-btn">CHECKOUT</a>
  `;

  document.querySelectorAll(".order-minus-counter").forEach(btn => {
    btn.addEventListener("click", removeFromCard);
  });


  document.querySelectorAll(".order-plus-counter").forEach(btn => {
    btn.addEventListener("click", increaseQuantity);
  });
}


function removeFromCard(e) {
  const productId = e.target.closest(".orderLi").querySelector(".orderTexts h6").textContent;

  let product = orders.find(x => x.name === productId);

  if (product) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      const index = orders.indexOf(product);
      if (index > -1) {
        orders.splice(index, 1);
      }
    }
    renderOrders();
  }
}

function increaseQuantity(e) {
  const productId = e.target.closest(".orderLi").querySelector(".orderTexts h6").textContent;

  let product = orders.find(x => x.name === productId);

  if (product) {
    product.quantity++;
    renderOrders();
  }
}


document.addEventListener("DOMContentLoaded", handleAddBasket);
