// Aguardar o DOM carregar antes de buscar elementos
document.addEventListener("DOMContentLoaded", () => {
  const addCardBtn = document.querySelector(".profile__add-btn");
  const addCardPopup = document.querySelector(".popup_type_add-card");
  const addCardForm = addCardPopup.querySelector(".form_type_add-card");
  const titleInput = addCardForm.querySelector(".form__input_type_title");
  const imageInput = addCardForm.querySelector(".form__input_type_image");
  const closeAddPopupBtn = addCardPopup.querySelector(".popup__close-btn");
  const cardsContainer = document.querySelector(".elements__grid-container");

  console.log("Elementos encontrados:", {
    addCardBtn,
    addCardPopup,
    addCardForm,
  });

  // Funções openPopup e closePopup agora estão em utils.js - removidas para evitar conflito

  // Validação simples de URL de imagem
  function isValidImageUrl(url) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  }

  addCardBtn.addEventListener("click", () => {
    console.log("Botão de adicionar clicado!"); // Debug
    addCardForm.reset();

    // Resetar validação
    if (typeof resetValidation === "function") {
      const validationConfig = {
        formSelector: ".form",
        inputSelector: ".form__input",
        submitButtonSelector: ".form__submit-btn",
        inactiveButtonClass: "form__submit-btn_disabled",
        inputErrorClass: "form__input_type_error",
        errorClass: "form__error_visible",
      };
      resetValidation(addCardForm, validationConfig);
    }

    openPopup(addCardPopup);
    titleInput.focus();
  });

  closeAddPopupBtn.addEventListener("click", () => {
    closePopup(addCardPopup);
  });

  addCardPopup.addEventListener("click", (e) => {
    if (e.target === addCardPopup) {
      closePopup(addCardPopup); // Fecha ao clicar fora do conteúdo
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && addCardPopup.classList.contains("popup_opened")) {
      closePopup(addCardPopup); // Fecha com tecla Esc
    }
  });

  // Função createCard agora está em cards.js - removida daqui para evitar duplicação

  addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Só prosseguir se formulário válido
    if (!addCardForm.checkValidity()) {
      return;
    }

    const title = titleInput.value.trim();
    const imageUrl = imageInput.value.trim();

    const newCard = createCard({ name: title, link: imageUrl });
    cardsContainer.prepend(newCard);

    closePopup(addCardPopup);
  });
}); // Fechar o DOMContentLoaded
