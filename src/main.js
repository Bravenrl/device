const menuButton = document.querySelector(".header-catalog");
const menu = document.querySelector(".catalog-list");
const serviceButtonWrappers = document.querySelectorAll('.service-button-wrapper');
const serviceButtons = document.querySelectorAll('.service-button');
const serviceItems = document.querySelectorAll('.service-item');


serviceButtons.forEach((button, index) => {
  button.addEventListener('click', ()=>{
    if (button.classList.contains('service-button--active')) {
      return;
    }

    serviceButtonWrappers.forEach((item, wrapindex) => {
      if (index === wrapindex) {
        return;
      }
      item.classList.remove('service-button--active');
    })

    serviceButtons.forEach((item, btnindex) => {
      if (index === btnindex) {
        return;
      }
      item.classList.remove('service-button--active');
    })

    serviceItems.forEach((item, itemindex) => {
      if (index === itemindex) {
        return;
      }
      item.classList.remove('service-item--active');
    })

    button.classList.add('service-button--active');
    serviceButtonWrappers[index].classList.add('service-button--active');
    serviceItems[index].classList.add('service-item--active')
  })
})

menuButton.childNodes.forEach((child) => {
  child.addEventListener("click", () => {
    menu.classList.toggle("catalog-list--active");
    menuButton.classList.toggle("header-catalog--active");
  });
});

class Slider {
  constructor() {
    this.sliderElements = document.querySelectorAll(".main-slider-item");
    this.sliderControls = document.querySelectorAll(".slider-control");
    this.sliderWrapper = document.querySelector(".main-slider-wrapper");
    this.elementsCount = this.sliderElements.length;
    this.currentElement = 0;
    this.prevElement = this.elementsCount - 1;
    this.slideInterval = 3000;
    this._setHandlers();
  }

  inint() {
    if (!this.timeoutID) {
      this.timeoutID = setInterval(() => {
        this._setAutoChange();
      }, this.slideInterval);
    }
  }

  _setAutoChange() {
    this.currentElement++;
    if (this.currentElement > this.elementsCount - 1) {
      this.currentElement = 0;
      this.prevElement = this.elementsCount - 1;
    }
    if (this.currentElement) {
      this.prevElement = this.currentElement - 1;
    }
    this._changeSlide();
  }

  _changeControl() {
    this.sliderControls[this.prevElement].classList.remove("slider-control--active");
    this.sliderControls[this.currentElement].classList.add("slider-control--active");
  }

  _changeSlide() {
    this.sliderElements[this.prevElement].style.opacity = "0";
    this.sliderElements[this.currentElement].style.opacity = "1";
    this._changeControl();
  }

  _setChangeOnClick(index) {
    if (index === this.currentElement) {
      return;
    }
    this.prevElement = this.currentElement;
    this.currentElement = index;
    this._changeSlide();
  }

  _pauseAutoChange() {
    if (this.timeoutID) {
      clearInterval(this.timeoutID);
      this.timeoutID = null;
    }
  }

  _setHandlers() {
    this.sliderWrapper.addEventListener("mouseleave", () => {
      this.inint();
    });
    this.sliderWrapper.addEventListener("mouseenter", () => {
      this._pauseAutoChange();
    });
    this.sliderControls.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        this._setChangeOnClick(index);
      });
    });
  }
}

const slider = new Slider();

slider.inint();
