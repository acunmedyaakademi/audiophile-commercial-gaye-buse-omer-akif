const routes = {
  "": "assets/pages/home.html",
  "#home": "index.html",
  "#headphones": "assets/pages/headphones.html",
  "#speakers": "assets/pages/speakers.html",
  "#earphones": "assets/pages/earphones.html",
  "#checkout": "assets/pages/checkout.html"
};

function router() {
  const app = document.getElementById("page");

  if (!app) {
    console.error("HATA: #app öğesi bulunamadı!");
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
      app.innerHTML = html;
    })
    .catch(err => console.error(err.message));
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
