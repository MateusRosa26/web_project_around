export default class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__grid-item")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked);
    });

    if (this._owner === this._currentUserId) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    } else {
      this._deleteButton.style.display = "none";
    }

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    if (isLiked) {
      this._likeButton.classList.add("elements__like-btn_active");
    } else {
      this._likeButton.classList.remove("elements__like-btn_active");
    }
  }

  removeCard() {
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

    this.updateLikeStatus(this._isLiked);
    this._setEventListeners();

    return this._element;
  }
}
