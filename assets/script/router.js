import { showProductDetails } from "./product.js";

const routes = {
  "#home": "assets/pages/home.html",
  "#headphones": "assets/pages/headphones.html",
  "#speakers": "assets/pages/speakers.html",
  "#earphones": "assets/pages/earphones.html",
  "#checkout": "assets/pages/checkout.html",
};

async function router() {
  console.log("🔄 Router çalıştı. Mevcut hash:", window.location.hash);

  const pageContainer = document.getElementById("page");

  if (!pageContainer) {
    console.error("HATA: #page elementi bulunamadı!");
    return;
  }

  let hash = window.location.hash;
  
  // **Eğer hash boşsa veya bilinmeyen bir hash ise `#home` kullan**
  if (!hash || !routes[hash]) {
    if (hash !== "#home") {
      console.warn("⚠️ Geçersiz veya boş hash, #home'a yönlendiriliyor...");
      window.location.hash = "#home"; 
      return; // Sonsuz döngüyü önlemek için burada duruyoruz.
    }
  }

  console.log("🌍 Güncellenen hash:", hash);

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

document.querySelectorAll(".shop").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); 
    const targetHash = e.target.getAttribute("href");

    console.log(`🔗 Kategoriye tıklandı: ${targetHash}`);
    window.location.hash = targetHash; 
    router(); 
  });
});


// ✅ Sayfa başlığı değiştiğinde güncelle
window.addEventListener("hashchange", updatePageTitle);
window.addEventListener("load", updatePageTitle);
