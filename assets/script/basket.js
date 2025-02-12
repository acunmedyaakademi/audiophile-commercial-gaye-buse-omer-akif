import { fetchData } from "./fetchData.js";

const orders = []; // kullanıcının sepete eklediği ürünleri tutar

async function handleAddBasket() {

  const products = await fetchData();

  const addBtns = document.querySelectorAll('.add-to-cart');

  for (const btn of addBtns) {
    btn.addEventListener('click', handleAddButtons);
  }

  function handleAddButtons(e) {
    e.preventDefault();

    const productName = e.target.dataset.isim;
    console.log('Seçilen ürün ismi: ' + productName)

    let selectedProduct = orders.find(order => order.name === productName);
    console.log('Seçilen ürün: ' + selectedProduct)

    if (selectedProduct) {
      selectedProduct.quantity++;
    } else {
      orders.push({
        name: productName,
        quantity: 1,
      });
    }
  }
  renderOrders();
}

let totalQuantity = 0; // toplam ürün miktarı
let totalPrice = 0; // toplam fiyat

function renderOrders() {
  orderList.innerHTML = ''; // siparişleri listelemek için içeriği sıfırlanıyor
  totalQuantity = 0;
  totalPrice = 0;
  productCounter.innerText = ''; // toplam tatlı miktarının gösterildiği alan
  totalOrderPrice.innerText = ''; // toplam fiyatın gösterildiği alan

  for (const order of orders) {
    totalQuantity += Number(order.quantity);
    const dessert = desserts.find(d => d.name === order.name);
    const onlyPrice = Number(dessert.price.slice(1)); // var olan dolar işareti için => slice
    const totalPerPrice = Number((onlyPrice * order.quantity.toFixed(2)));
    totalPrice += totalPerPrice;

    orderList.innerHTML += `
      <li class="order-cart">
        <div class="order-info">
          <h4>${order.name}</h4>
          <div class="sub-info">
            <span class="quantity-span">${order.quantity}x</span>
            <div class="price">
              <span class="orjPrice">@${dessert.price}</span>
              <span class="lastPrice">$${totalPerPrice}</span>
            </div>
          </div>
        </div>
        <div class="deleteBtn" data-name="${order.name}">
          <img src="assets/img/remove-button.svg" alt="Remove Button Icon">
        </div>
      </li>
    `;
  }
  productCounter.innerText = totalQuantity;
  totalOrderPrice.innerText = `$${totalPrice}`;

  const deleteBtns = document.querySelectorAll('.deleteBtn');
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', deleteProducts);
  }
  if (productCounter.innerText == 0) { // eğer toplam tatlı miktarı 0 ise
    fullOrderCart.classList.remove('d-block'); // dolu sepeti gizle
    emptyOrderCart.classList.remove('d-none');
    emptyOrderCart.classList.add('d-block'); // boş sepeti göster
  } else {
    fullOrderCart.classList.add('d-block'); // dolu sepeti göster
    emptyOrderCart.classList.remove('d-block');
    emptyOrderCart.classList.add('d-none'); // boş sepeti gizle
  }
}

window.addEventListener("load", handleAddBasket);