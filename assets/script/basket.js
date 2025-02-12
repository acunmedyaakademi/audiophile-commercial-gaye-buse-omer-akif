import { fetchData } from "./fetchData.js";

async function handleAddBasket() {
  const products = await fetchData();

  const addBtns = document.querySelectorAll('.add-to-cart');

  for (const btn of addBtns) {
    btn.addEventListener('click', handleAddButtons);
  }

  const orders = [];

  function handleAddButtons(e) {

  }
}

window.addEventListener("load", handleAddBasket);