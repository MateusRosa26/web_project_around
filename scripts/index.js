// eslint-disable-next-line import/extensions
import Card from "./Card.js";
// eslint-disable-next-line import/extensions
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

// -------------------- Configs --------------------
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// -------------------- Initial Cards --------------------
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// -------------------- Element References --------------------
// Cards / Gallery
const cardsContainer = document.querySelector(".elements__grid-container");
// Popups
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImg = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close-btn");

const addCardPopup = document.querySelector(".popup_type_add-card");
const addCardCloseBtn = addCardPopup.querySelector(".popup__close-btn");

const profileEditPopup = document.querySelector(".popup_type_edit-profile");
const profileEditCloseBtn = profileEditPopup.querySelector(".popup__close-btn");

// Forms & inputs
const addCardForm = addCardPopup.querySelector(".form_type_add-card");
const titleInput = addCardForm.querySelector(".form__input_type_title");
const imageInput = addCardForm.querySelector(".form__input_type_image");
const addCardBtn = document.querySelector(".profile__add-btn");

const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditForm = profileEditPopup.querySelector(
  ".form_type_edit-profile"
);
const nameInput = profileEditForm.querySelector(".form__input_type_name");
const descriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// -------------------- Helper Functions --------------------
function handleCardClick(name, link) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(imagePopup);
}

function createCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.generateCard();
}

function renderCard(cardData) {
  cardsContainer.prepend(createCardElement(cardData));
}

function populateProfileForm() {
  nameInput.value = profileName.firstChild.textContent.trim();
  descriptionInput.value = profileDescription.textContent;
}

// -------------------- Form Validators --------------------
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileFormValidator.enableValidation();

// -------------------- Event Listeners --------------------
// Initial cards
initialCards.forEach((cardData) => {
  cardsContainer.append(createCardElement(cardData));
});

// Add card flow
addCardBtn.addEventListener("click", () => {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  openPopup(addCardPopup);
  titleInput.focus();
});

addCardCloseBtn.addEventListener("click", () => closePopup(addCardPopup));

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard({ name: titleInput.value, link: imageInput.value });
  closePopup(addCardPopup);
});

// Image popup close
imagePopupCloseBtn.addEventListener("click", () => closePopup(imagePopup));

// Profile edit flow
profileEditBtn.addEventListener("click", () => {
  populateProfileForm();
  profileFormValidator.resetValidation();
  openPopup(profileEditPopup);
});

profileEditCloseBtn.addEventListener("click", () =>
  closePopup(profileEditPopup)
);

profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.firstChild.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditPopup);
});
