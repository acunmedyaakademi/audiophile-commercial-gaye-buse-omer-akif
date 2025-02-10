const routes = {
  "#home": `
    <div class="hero">
      <div class="hero-text">
      </div>
      <img class="hero-img" src="assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg" alt="Hero Img">
    </div>
    <div class="categories">
      <div class="category-item">
        <img src="assets/images/headphones.jpg" alt="Headphones Img">
        <h3>Headphones</h3>
        <a href="#headphones">Shop</a>
      </div>
      <div class="category-item">
        <img src="assets/images/speakers.jpg" alt="Speakers Img">
        <h3>Speakers</h3>
        <a href="#speakers">Shop</a>
      </div>
      <div class="category-item">
        <img src="assets/images/earphones.jpg" alt="Earphones Img">
        <h3>Earphones</h3>
        <a href="#earphones">Shop</a>
      </div>
    </div>
    <div class="products">
      <div class="product-zx9">
        <img src="assets/images/zx9-speaker.jpg" alt="ZX9 Speaker">
        <div class="product-zx9-text">
          <h2>ZX9 Speaker</h2>
          <p>Yüksek kaliteli ses, kusursuz deneyim.</p>
          <a href="#">See Product</a>
        </div>
      </div>
      <div class="product-zx7">
        <img src="assets/images/zx7-speaker.jpg" alt="ZX7 Speaker">
        <div class="product-zx7-text">
          <h3>ZX7 Speaker</h3>
          <a href="#">See Product</a>
        </div>
      </div>
      <div class="product-yx1">
        <img src="assets/images/yx1-earphones.jpg" alt="YX1 Earphones">
        <div class="product-yx1-text">
          <h3>YX1 Earphones</h3>
          <a href="#">See Product</a>
        </div>
      </div>
    </div>
  `,
  "#headphones": "<h2>lasdkaslşdk</h2>",
  "#speakers": "<h2>lasdkaslşdk</h2>",
  "#earphones": "<h2>lasdkaslşdk</h2>",
  "#checkout": "<h2>lasdkaslşdk</h2>"
};


function router() {
  const hash = window.location.hash
  document.getElementById("page").innerHTML = routes[hash]
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);