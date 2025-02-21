import { showProductDetails } from "./product.js";

const routes = {
  "#home": "assets/pages/home.html",
  "#headphones": "assets/pages/headphones.html",
  "#speakers": "assets/pages/speakers.html",
  "#earphones": "assets/pages/earphones.html",
  "#checkout": "assets/pages/checkout.html",
};

export default async function router() {
  console.log("🔄 Router çalıştı. Mevcut hash:", window.location.hash);

  const pageContainer = document.getElementById("page");

  if (!pageContainer) {
    console.error("HATA: #page elementi bulunamadı!");
    return;
  }

  let hash = window.location.hash;

  if (!hash || (!routes[hash] && !hash.startsWith("#product-"))) {
    if (hash !== "#home") {
      console.warn("⚠️ Geçersiz veya boş hash, #home'a yönlendiriliyor...");
      window.location.hash = "#home";
      return;
    }
  }


  window.scrollTo(0, 0);

  if (hash.startsWith("#product-")) {
    console.log("🛍 Ürün detay sayfası açılıyor...");

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
  console.log("📄 Yüklenecek sayfa:", page);

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

// ✅ Sayfa yüklendiğinde ve hash değiştiğinde router'ı çağır
window.addEventListener("hashchange", () => {
  console.log("🔄 Hash değişti, router tekrar çalışıyor:", window.location.hash);
  router();
});

window.addEventListener("load", () => {
  if (!window.location.hash) {
    console.log("🛠 İlk açılışta `#home` yükleniyor...");
    window.location.hash = "#home"; // İlk yüklenmede hash yoksa #home'a yönlendir
  } else {
    router();
  }
});

function updatePageTitle() {
  const pageTitle = document.querySelector(".page-title");

  if (!pageTitle) return;

  let hash = window.location.hash.replace("#", ""); // "#" işaretini kaldır

  if (hash.startsWith("product-")) {  // Doğru kontrol
    pageTitle.style.display = "none"; // Ürün detay sayfasında başlık gizlensin
  } else if (hash && hash !== "home") {
    const formattedTitle = hash.toUpperCase();
    pageTitle.innerHTML = `<h1>${formattedTitle}</h1>`;
    pageTitle.style.display = "block";
  } else {
    pageTitle.style.display = "none";
  }
}


// ✅ Sayfa başlığı değiştiğinde güncelle
window.addEventListener("hashchange", updatePageTitle);
window.addEventListener("load", updatePageTitle);
