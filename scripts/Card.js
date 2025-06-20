export default class Card {
  constructor({ name, link }, templateSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__grid-item")
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._imageElement.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  _handleLike() {
    this._likeButton.classList.toggle("elements__like-btn_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".elements__photo");
    this._titleElement = this._element.querySelector(".elements__photo-name");
    this._deleteButton = this._element.querySelector(".elements__delete-btn");
    this._likeButton = this._element.querySelector(".elements__like-btn");

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
