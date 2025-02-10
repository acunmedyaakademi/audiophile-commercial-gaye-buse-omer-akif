const routes = {
  "#home": "assets/pages/home.html",
  "#headphones": "assets/pages/headphones.html",
  "#speakers": "assets/pages/speakers.html",
  "#earphones": "assets/pages/earphones.html",
  "#checkout": "assets/pages/checkout.html"
};

// JSON dosyasından tüm ürünleri çek
async function fetchProducts() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("JSON verisi alınamadı!");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch hatası:", error);
    return [];
  }
}

// Sayfa değişimlerini yöneten router fonksiyonu
async function router() {
  const pageContainer = document.getElementById("page");

  if (!pageContainer) {
    console.error("HATA: #page elementi bulunamadı!");
    return;
  }

  const hash = window.location.hash || "#home"; 
  const page = routes[hash] || "assets/pages/404.html"; 

  // Eğer ürün kategorisi sayfasındaysak, JSON'dan veri çek ve render et
  if (hash === "#headphones" || hash === "#speakers" || hash === "#earphones") {
    const category = hash.replace("#", "");
    const allProducts = await fetchProducts();
    const filteredProducts = allProducts.filter(product => product.category === category);
    renderProducts(filteredProducts);
    return;
  }

  // Standart HTML sayfasını yükle
  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error("Sayfa yüklenemedi: " + response.status);
      return response.text();
    })
    .then(html => {
      pageContainer.innerHTML = html;
    })
    .catch(err => console.error(err.message));
}

// Sayfa içine JSON'dan gelen ürünleri dinamik olarak ekler
function renderProducts(products) {
  const pageContainer = document.getElementById("page");
  pageContainer.innerHTML = ""; // Sayfa içeriğini temizle

  if (products.length === 0) {
    pageContainer.innerHTML = "<h2>Ürün bulunamadı</h2>";
    return;
  }

  const productList = document.createElement("div");
  productList.classList.add("product-list");

  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
      <picture>
        <source srcset="${product.image.desktop}" media="(min-width: 1024px)">
        <source srcset="${product.image.tablet}" media="(min-width: 768px)">
        <img src="${product.image.mobile}" alt="${product.name}">
      </picture>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price}₺</p>
      <a href="#product-${product.slug}" class="details-btn">Ürünü İncele</a>
    `;

    productList.appendChild(productElement);
  });

  pageContainer.appendChild(productList);
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
