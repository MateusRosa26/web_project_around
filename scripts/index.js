// eslint-disable-next-line import/extensions
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

// -------------------- Configurações --------------------
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// -------------------- API --------------------
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "b12ffad4-c0cb-444d-9a43-c669f7945f58",
  },
});

// -------------------- Elementos da página --------------------
const addCardBtn = document.querySelector(".profile__add-btn");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const avatarEditBtn = document.querySelector(".profile__avatar-edit-btn");

// Forms
const addCardForm = document.querySelector(".form_type_add-card");
const titleInput = addCardForm.querySelector(".form__input_type_title");
const imageInput = addCardForm.querySelector(".form__input_type_image");

const profileEditForm = document.querySelector(".form_type_edit-profile");
const nameInput = profileEditForm.querySelector(".form__input_type_name");
const descriptionInput = profileEditForm.querySelector(
  ".form__input_type_description"
);

const avatarForm = document.querySelector(".form_type_avatar");
const avatarInput = avatarForm.querySelector(".form__input_type_avatar");

// -------------------- Variáveis globais --------------------
let currentUserId = null;

// -------------------- Instâncias de apoio --------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const deleteConfirmationPopup = new PopupWithConfirmation(
  ".popup_type_delete-card"
);
deleteConfirmationPopup.setEventListeners();

// -------------------- Funções auxiliares --------------------
function handleDeleteClick(cardId) {
  deleteConfirmationPopup.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        // Find and remove card from DOM
        const cardElement = document.querySelector(
          `[data-card-id="${cardId}"]`
        );
        if (cardElement) {
          cardElement.remove();
        }
        deleteConfirmationPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  deleteConfirmationPopup.open();
}

function handleLikeClick(cardId, isLiked) {
  api
    .changeLikeCardStatus(cardId, !isLiked)
    .then((updatedCard) => {
      // Find card instance and update like status
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      if (cardElement) {
        const likeButton = cardElement.querySelector(".elements__like-btn");
        if (updatedCard.isLiked) {
          likeButton.classList.add("elements__like-btn_active");
        } else {
          likeButton.classList.remove("elements__like-btn_active");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function createCard(item) {
  const card = new Card(
    item,
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    },
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  );
  const cardElement = card.generateCard();
  cardElement.setAttribute("data-card-id", item._id);
  return cardElement;
}

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".elements__grid-container"
);

// -------------------- Popups de formulário --------------------
const addCardPopup = new PopupWithForm(".popup_type_add-card", (formData) => {
  const cardData = {
    name: formData["card-title"] || formData.title,
    link: formData["card-image"] || formData.image,
  };

  addCardPopup.renderLoading(true);
  api
    .addCard(cardData)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});
addCardPopup.setEventListeners();

const profilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  (formData) => {
    const userData = {
      name: formData["profile-name"] || formData.name,
      about: formData["profile-description"] || formData.description,
    };

    profilePopup.renderLoading(true);
    api
      .updateUserInfo(userData)
      .then((updatedUser) => {
        userInfo.setUserInfo({
          name: updatedUser.name,
          job: updatedUser.about,
        });
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  }
);
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_type_avatar", (formData) => {
  const avatarData = {
    avatar: formData["avatar-url"] || formData.avatar,
  };

  avatarPopup.renderLoading(true);
  api
    .updateAvatar(avatarData)
    .then((updatedUser) => {
      userInfo.setUserInfo({ avatar: updatedUser.avatar });
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();

// -------------------- Validadores --------------------
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

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

avatarEditBtn.addEventListener("click", () => {
  avatarForm.reset();
  avatarFormValidator.resetValidation();
  avatarPopup.open();
  avatarInput.focus();
});

// -------------------- Inicialização --------------------
api
  .getAppData()
  .then(([userData, cards]) => {
    // Store current user ID
    currentUserId = userData._id;

    // Atualiza informações do usuário
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    // Renderiza cartões iniciais
    cardSection._items = cards;
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
