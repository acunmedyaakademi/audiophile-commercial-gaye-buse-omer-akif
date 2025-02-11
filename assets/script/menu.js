document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-menu");
  const navbar = document.querySelector(".menuCategoriesMobil");
  const overlay = document.querySelector(".overlay");
  const menuLinks = document.querySelectorAll(".menuCategoriesMobil a");

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("show");
    overlay.classList.toggle("show");
  });

});

// Menü içindeki herhangi bir linke tıklanınca menüyü kapatıp overlay gizledim
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");
    overlay.classList.remove("show");
  });
});

// Overlay'e tıklayınca menüyü kapatıp overlay gizledim
overlay.addEventListener("click", () => {
  navbar.classList.remove("show");
  overlay.classList.remove("show");
});