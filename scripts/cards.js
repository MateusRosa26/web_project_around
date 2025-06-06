// Array com os cards iniciais
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

// Elementos do DOM
const cardsContainer = document.querySelector(".elements__grid-container");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImg = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close-btn");

// Função para criar um card usando template seguro
function createCard(cardData) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.cloneNode(true);

  // Configurar elementos de forma segura sem innerHTML
  const cardImage = cardElement.querySelector(".elements__photo");
  const cardTitle = cardElement.querySelector(".elements__photo-name");
  const deleteBtn = cardElement.querySelector(".elements__delete-btn");
  const likeBtn = cardElement.querySelector(".elements__like-btn");

  // Definir atributos de forma segura
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Event listeners
  // Deletar card
  deleteBtn.addEventListener("click", (e) => {
    e.target.closest(".elements__grid-item").remove();
  });

  // Curtir card
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("elements__like-btn_active");
  });

  // Abrir popup de imagem
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}

// Função para abrir popup de imagem
function openImagePopup(imageSrc, imageAlt) {
  imagePopupImg.src = imageSrc;
  imagePopupImg.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;
  openPopup(imagePopup);
}

// Função para renderizar cards iniciais
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardsContainer.appendChild(cardElement);
  });
}

// Event listener para fechar popup de imagem
imagePopupCloseBtn.addEventListener("click", () => {
  closePopup(imagePopup);
});

// Inicializar cards quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", renderInitialCards);
