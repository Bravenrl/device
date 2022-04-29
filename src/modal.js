class Modal {
  constructor() {
    this._closeBtnHandler  = this._closeBtnHandler.bind(this);
    this._openBtnHandler  = this._openBtnHandler.bind(this);
    this._escKeydownHendler = this._escKeydownHendler.bind(this);
    this._focusHandler = this._focusHandler.bind(this);
  };

  init () {
    this.openBtn.addEventListener('click', this._openBtnHandler);
  }

  _show () {
    this.prevElement = document.activeElement;
    this.modal.classList.add("modal--active");
    this.modal.focus();
    document.addEventListener('keydown', this._focusHandler);
    this.closeBtn.addEventListener('click', this._closeBtnHandler)
    document.addEventListener('keydown', this._escKeydownHendler);
  }

  _close () {
    this.modal.classList.remove("modal--active");
    this.prevElement.focus();
    this.closeBtn.removeEventListener('click', this._closeBtnHandler)
    document.removeEventListener('keydown', this._escKeydownHendler);
    document.removeEventListener('keydown', this._focusHandler);
  }

  _closeBtnHandler () {
    this._close();
  }

  _openBtnHandler () {
    this._show();
  }

  _escKeydownHendler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._close();
    }
  }

  _focusHandler (evt) {
    if ((evt.key === 'Tab')&(!this.modal.contains(evt.target))) {
      evt.stopPropagation();
      this.modal.focus();
    }
  }
}

class FeedbackModal extends Modal {
  constructor () {
    super();
    this.modal = document.querySelector(".feedback-modal");
    this.openBtn = document.querySelector(".feedback-button");
    this.closeBtn = document.querySelector(".feedback-close-btn");
  }
}

class MapModal extends Modal {
  constructor () {
    super();
    this.modal = document.querySelector(".map-modal");
    this.openBtn = document.querySelector(".info-map-button");
    this.closeBtn = document.querySelector(".map-close-btn");
  }
}

new FeedbackModal().init();

new MapModal().init();
