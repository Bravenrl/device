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
    this.sliderControls[this.prevElement].classList.remove(
      "slider-control--active"
    );
    this.sliderControls[this.currentElement].classList.add(
      "slider-control--active"
    );
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
