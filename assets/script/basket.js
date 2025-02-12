import { fetchData } from "./fetchData.js";

// const orders = []; // Kullanıcının sepete eklediği ürünleri tutar

// async function handleAddBasket() {
//   const products = await fetchData();
//   console.log("Ürünler yüklendi:", products);

//   // Ürünleri yükledikten sonra butonları içeren elementi dinle
//   document.body.addEventListener("click", function (e) {
//     if (e.target.classList.contains("add-to-cart")) {
//       handleAddButtons(e);
//     }
//   });
// }

// function handleAddButtons(e) {
//   e.preventDefault();

//   const productName = e.target.dataset.isim;
//   console.log("Seçilen ürün ismi:", productName);

//   let selectedProduct = orders.find(order => order.name === productName);

//   if (selectedProduct) {
//     selectedProduct.quantity++;
//   } else {
//     orders.push({
//       name: productName,
//       quantity: 1,
//     });
//   }

//   console.log("Güncellenmiş Sepet:", orders);
//   renderOrders();
// }

// // Sepeti Güncelleyen Fonksiyon
// function renderOrders() {
//   const cartContainer = document.querySelector('.cart-container');

//   if (!cartContainer) {
//     console.error("HATA: .cart-container bulunamadı!");
//     return;
//   }

//   if (orders.length === 0) {
//     cartContainer.innerHTML = `
//       <h2>CART (0)</h2>
//       <hr />
//       <p>Your Cart is empty.</p>
//       <p>Continue shopping on the audiophile website <a href="#">homepage</a>.</p>
//       <h3>Total $0</h3>
//       <button class="checkout-btn">CHECKOUT</button>
//     `;
//     return;
//   }
// }

// // Sayfa yüklendiğinde butonlara event listener ekle
// document.addEventListener("DOMContentLoaded", handleAddBasket);
