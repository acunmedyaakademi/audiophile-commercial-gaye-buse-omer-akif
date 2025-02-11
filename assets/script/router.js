import { showProductDetails } from "./product.js";

const routes = {
  "#home": "assets/pages/home.html",
  "#headphones": "assets/pages/headphones.html",
  "#speakers": "assets/pages/speakers.html",
  "#earphones": "assets/pages/earphones.html",
  "#checkout": "assets/pages/checkout.html",
};

async function router() {
  const pageContainer = document.getElementById("page");

  if (!pageContainer) {
    console.error("HATA: #page elementi bulunamadı!");
    return;
  }

  const hash = window.location.hash || "#home";

  if (hash.startsWith("#product-")) {
    fetch("assets/pages/product-detail.html")
      .then(response => {
        if (!response.ok) throw new Error("Sayfa yüklenemedi: " + response.status);
        return response.text();
      })
      .then(html => {
        pageContainer.innerHTML = html;
      })
      .then(() => {
        showProductDetails(); 
        updatePageTitle(); 
      })
      .catch(err => console.error(err.message));
    return;
  }

  const page = routes[hash] || "assets/pages/404.html";

  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error("Sayfa yüklenemedi: " + response.status);
      return response.text();
    })
    .then(html => {
      pageContainer.innerHTML = html;
    })
    .then(() => {
      updatePageTitle(); 
    })
    .catch(err => console.error(err.message));
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);


function updatePageTitle() {
  const pageTitle = document.querySelector(".page-title");

  if (!pageTitle) return;

  const hash = window.location.hash.replace("#", ""); 

  if (hash.startsWith("product-")) {
    pageTitle.style.display = "none"; 
  } else if (hash && hash !== "home") {
    const formattedTitle = hash.toUpperCase();
    pageTitle.innerHTML = `<h1>${formattedTitle}</h1>`; 
    pageTitle.style.display = "block"; 
  } else {
    pageTitle.style.display = "none";
  }
}

window.addEventListener("hashchange", updatePageTitle);
window.addEventListener("load", updatePageTitle);
