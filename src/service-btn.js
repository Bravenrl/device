const serviceButtonWrappers = document.querySelectorAll(
  ".service-button-wrapper"
);
const serviceButtons = document.querySelectorAll(".service-button");
const serviceItems = document.querySelectorAll(".service-item");

serviceButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("service-button--active")) {
      return;
    }

    serviceButtonWrappers.forEach((item, wrapindex) => {
      if (index === wrapindex) {
        return;
      }
      item.classList.remove("service-button--active");
    });

    serviceButtons.forEach((item, btnindex) => {
      if (index === btnindex) {
        return;
      }
      item.classList.remove("service-button--active");
    });

    serviceItems.forEach((item, itemindex) => {
      if (index === itemindex) {
        return;
      }
      item.classList.remove("service-item--active");
    });

    button.classList.add("service-button--active");
    serviceButtonWrappers[index].classList.add("service-button--active");
    serviceItems[index].classList.add("service-item--active");
  });
});
