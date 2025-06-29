// eslint-disable-next-line import/extensions
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// -------------------- Configurações --------------------
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// -------------------- Cards iniciais --------------------
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

// -------------------- Elementos da página --------------------
const addCardBtn = document.querySelector(".profile__add-btn");
const profileEditBtn = document.querySelector(".profile__edit-btn");

// Forms
const addCardForm = document.querySelector(".form_type_add-card");
const titleInput = addCardForm.querySelector(".form__input_type_title");
const imageInput = addCardForm.querySelector(".form__input_type_image");

const profileEditForm = document.querySelector(".form_type_edit-profile");
const nameInput = profileEditForm.querySelector(".form__input_type_name");
const descriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);

// -------------------- Instâncias de apoio --------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

// Função auxiliar de criação de cartão
function createCard(item) {
  const card = new Card(item, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".elements__grid-container"
);

cardSection.renderItems();

// -------------------- Popups de formulário --------------------
const addCardPopup = new PopupWithForm(".popup_type_add-card", (formData) => {
  const cardData = {
    name: formData["card-title"] || formData.title,
    link: formData["card-image"] || formData.image,
  };
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const profilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  (formData) => {
    const newName = formData["profile-name"] || formData.name;
    const newJob = formData["profile-description"] || formData.description;
    userInfo.setUserInfo({ name: newName, job: newJob });
    profilePopup.close();
  }
);
profilePopup.setEventListeners();

// -------------------- Validadores --------------------
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileFormValidator.enableValidation();

// -------------------- Listeners de abertura --------------------
addCardBtn.addEventListener("click", () => {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  addCardPopup.open();
  titleInput.focus();
});

profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = job;
  profileFormValidator.resetValidation();
  profilePopup.open();
});
