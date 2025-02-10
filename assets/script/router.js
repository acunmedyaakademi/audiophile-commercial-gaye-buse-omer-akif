const routes = {
  "#home": "assets/pages/home.html",
  "#headphones": "assets/pages/headphones.html",
  "#speakers": "assets/pages/speakers.html",
  "#earphones": "assets/pages/earphones.html",
  "#checkout": "assets/pages/checkout.html"
};

function router() {
  const pageContainer = document.getElementById("page");

  if (!pageContainer) {
    console.error("HATA: #page elementi bulunamadı!");
    return;
  }

  const hash = window.location.hash || "#home"; 
  const page = routes[hash] || "assets/pages/404.html"; 

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

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
