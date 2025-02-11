import { fetchData } from "./fetchData.js"; 



async function listCategories() {
  const products = await fetchData(); 
  const categories = [...new Set(products.map(product => product.category))]; 

  const categoryLists = document.querySelectorAll(".categories");

  if (!categoryLists.length) {
    console.log(".categories elementi bulunamadı, işlem yapılmadı!");
    return;
  }

  
  categoryLists.forEach(categoryList => {
    
    categoryList.innerHTML = `<p class="loading-text">Yükleniyor...</p>`;

    setTimeout(() => { 
      categoryList.innerHTML = ""; 
      categories.forEach(category => {
        const categoryProduct = products.find(product => product.category === category);

        if (!categoryProduct) {
          return;
        }

        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

        categoryList.innerHTML += 
          `<div class="category-item">
            <img src="./assets/shared/mobile/image-category-thumbnail-${category}-menu.png" alt="${categoryName} Img">
            <h3>${categoryName}</h3>
            <a href="#">Shop</a>
          </div>`;
      });

      console.log("✅ Kategoriler başarıyla eklendi.");
    }, 1000); 
  });
}

window.addEventListener("load", listCategories);
window.addEventListener("hashchange", listCategories);
