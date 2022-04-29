const menuButton = document.querySelector(".header-catalog");
const menu = document.querySelector(".catalog-list");

menuButton.childNodes.forEach((child) => {
  child.addEventListener("click", () => {
    menu.classList.toggle("catalog-list--active");
    menuButton.classList.toggle("header-catalog--active");
  });
});


