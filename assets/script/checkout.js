cartIcon.addEventListener("click", () => {
  cartDialog.showModal();
});

cartDialog.addEventListener("click", (e) => {
  if (e.target === cartDialog) {
    cartDialog.close();
  }
});