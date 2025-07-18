export default class Card {
  constructor(
    { name, link, _id, isLiked, owner },
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._owner = owner;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__grid-item")
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    // Delete button - only show if user owns the card
    if (this._owner === this._currentUserId) {
      this._deleteButton.addEventListener("click", () =>
        this._handleDeleteClick(this._id)
      );
    } else {
      this._deleteButton.style.display = "none";
    }

    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this._id, this._isLiked)
    );
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

  // Public method to update like status
  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    if (isLiked) {
      this._likeButton.classList.add("elements__like-btn_active");
    } else {
      this._likeButton.classList.remove("elements__like-btn_active");
    }
  }

  // Public method to remove card from DOM
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

    // Set initial like status
    this.updateLikeStatus(this._isLiked);

    this._setEventListeners();

    return this._element;
  }
}
