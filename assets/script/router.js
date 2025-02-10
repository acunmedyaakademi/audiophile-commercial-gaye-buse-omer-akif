const routes = {
  "#home": "<h2>Hoş Geldiniz! Ana sayfadasınız.</h2>",
  "#headphones": "<h2>headpones</h2>",
  "#speakers": "<h2>speakers</h2>",
  "#earphones": "<h2>#earphones</h2>"
};

function router() {
  const hash = window.location.hash;
  document.getElementById("page").innerHTML = routes[hash] || "<h2>404 - Sayfa Bulunamadı!</h2>";
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
