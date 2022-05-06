const toggleMin = document.querySelector(".toggle-min");
const toggleMax = document.querySelector(".toggle-max");
const bar = document.querySelector(".bar");
const scale = document.querySelector(".scale");
const priceFrom = document.querySelector("#price-from");
const priceTo = document.querySelector("#price-to");
const filterRange = document.querySelector(".filter-range");
const BUTTON_RADIUS = 8;
const RANGE_WIDTH = 200;
const PRICE_MAX = 5000;
const ERR_MESSAGE = 'Wrong range'

toggleMin.addEventListener("mousedown", (evt) => {
  evt.preventDefault();
  const shiftX = evt.clientX;
  const startMin = toggleMin.offsetLeft;
  const positionMax = toggleMax.offsetLeft - BUTTON_RADIUS * 2;

  filterRange.addEventListener("mousemove", onMouseMoveHandler);
  document.addEventListener("mouseup", omMouseUpHandler);

  function onMouseMoveHandler(evt) {
    let newPosition = startMin + (evt.clientX - shiftX);
    if (newPosition < 0 || newPosition > positionMax) {
      return;
    }
    toggleMin.style.left = newPosition + "px";
    bar.style.left = newPosition + "px";
    priceFrom.value = PRICE_MAX/RANGE_WIDTH*newPosition;
  }

  function omMouseUpHandler() {
    filterRange.removeEventListener("mousemove", onMouseMoveHandler);
  }
});



toggleMax.addEventListener("mousedown", (evt) => {
  evt.preventDefault();
  const shiftX = evt.clientX;
  const startMax = toggleMax.offsetLeft;
  const positionMin = toggleMin.offsetLeft + BUTTON_RADIUS * 2;

  filterRange.addEventListener("mousemove", onMouseMoveHandler);
  document.addEventListener("mouseup", omMouseUpHandler);

  function onMouseMoveHandler(evt) {
    let newPosition = startMax + (evt.clientX - shiftX);
    if (newPosition > RANGE_WIDTH - BUTTON_RADIUS * 2 || newPosition < positionMin) {
      return;
    }
    toggleMax.style.left = newPosition + "px";
    bar.style.right = RANGE_WIDTH - newPosition - BUTTON_RADIUS * 2 + "px";
    priceTo.value = PRICE_MAX/RANGE_WIDTH*(newPosition + BUTTON_RADIUS * 2);
  }

  function omMouseUpHandler() {
    filterRange.removeEventListener("mousemove", onMouseMoveHandler);
  }
});


priceTo.addEventListener('change', (evt)=>{
  evt.preventDefault();
  const value = evt.target.value;
  let newPosition = value/PRICE_MAX*100;
  const positionMin = toggleMin.offsetLeft + BUTTON_RADIUS * 2;
  if (newPosition>100) {
    newPosition = 100;
  }
  let newLeft = (RANGE_WIDTH*newPosition)/100 - BUTTON_RADIUS * 2;
  if (newLeft<positionMin) {
    newLeft=positionMin;
  }

  if ((priceFrom.value )&(priceFrom.value>value)) {
    priceTo.setCustomValidity(ERR_MESSAGE);
  } else {
    priceTo.setCustomValidity("");
  }

  toggleMax.style.left = newLeft + "px";
  bar.style.right = (100 - newPosition) + "%";
})


priceFrom.addEventListener('change', (evt)=>{
  evt.preventDefault();
  const value = evt.target.value;
  let newPosition = value/PRICE_MAX*100;
  const positionMax = toggleMax.offsetLeft - BUTTON_RADIUS * 2;
  if (newPosition<0) {
    newPosition = 0;
  }
  let newLeft = (RANGE_WIDTH*newPosition)/100;
  if (newLeft>positionMax) {
    newLeft=positionMax;
  }

  if ((priceTo.value )&(priceTo.value < value)) {
    priceFrom.setCustomValidity(ERR_MESSAGE);
  } else {
    priceFrom.setCustomValidity("");
  }

  toggleMin.style.left = newLeft + "px";
  bar.style.left = newPosition + "%";
})
