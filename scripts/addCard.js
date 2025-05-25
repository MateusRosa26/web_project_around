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
    openPopup(addCardPopup);
    titleInput.focus(); // Foco no campo ao abrir o popup
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

    const title = titleInput.value.trim();
    const imageUrl = imageInput.value.trim();

    if (!title || !isValidImageUrl(imageUrl)) {
      alert("Preencha os campos corretamente com uma URL válida de imagem.");
      return;
    }

    const newCard = createCard({ name: title, link: imageUrl });
    cardsContainer.prepend(newCard);

    closePopup(addCardPopup);
  });
}); // Fechar o DOMContentLoaded
