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

// Função para criar um card
function createCard(cardData) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("elements__grid-item");

  cardElement.innerHTML = `
    <button class="elements__delete-btn" type="button" aria-label="Excluir card">
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.45787 18.1422C2.51882 18.8126 3.06735 19.3002 3.73778 19.3002H14.2615C14.9319 19.3002 15.4804 18.7923 15.5414 18.1422L16.7197 5.79004H1.27954L2.45787 18.1422Z" fill="white"/>
        <path d="M16.7201 1.93002H11.5801V1.27991C11.5801 0.568849 11.0113 0 10.3002 0H7.72009C7.00903 0 6.44018 0.568849 6.44018 1.27991V1.93002H1.27991C0.568849 1.93002 0 2.49887 0 3.20993C0 3.92099 0.568849 4.48984 1.27991 4.48984H16.7201C17.4312 4.48984 18 3.92099 18 3.20993C18 2.49887 17.4312 1.93002 16.7201 1.93002Z" fill="white"/>
      </svg>
    </button>
    <img class="elements__photo" src="${cardData.link}" alt="${cardData.name}" />
    <div class="elements__info">
      <h2 class="elements__photo-name">${cardData.name}</h2>
      <button class="elements__like-btn" type="button" aria-label="Curtir">
        <svg class="elements__like-icon" width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.2991 9.78586C22.567 7.54338 22.567 3.90213 20.2991 1.68186C18.0311 -0.560619 14.3486 -0.560619 12.0806 1.68186L10.9804 2.792L9.88007 1.70406C7.61215 -0.560619 3.92957 -0.560619 1.6841 1.68186C0.583822 2.76979 0 4.21297 0 5.74496C0 7.27695 0.606277 8.72013 1.6841 9.80806L10.9804 19L20.2991 9.78586ZM1.4371 5.74496C1.4371 4.59042 1.8862 3.52469 2.71702 2.72539C3.5703 1.88168 4.67058 1.45983 5.77086 1.45983C6.87114 1.45983 7.97142 1.88168 8.8247 2.72539L10.9804 4.83465L13.136 2.70318C14.8201 1.03798 17.582 1.03798 19.2437 2.70318C20.0521 3.50248 20.5236 4.56821 20.5236 5.72276C20.5236 6.8773 20.0745 7.94303 19.2437 8.74233L10.9804 16.9351L2.71702 8.76453C1.90865 7.94303 1.4371 6.8773 1.4371 5.74496Z" stroke="#000" stroke-width="1" fill="none"/>
        </svg>
        <img class="elements__like-icon-active" src="./images/union.jpg" alt="liked button" />
      </button>
    </div>
  `;

  // Event listeners
  const deleteBtn = cardElement.querySelector(".elements__delete-btn");
  const likeBtn = cardElement.querySelector(".elements__like-btn");
  const cardImage = cardElement.querySelector(".elements__photo");

  // Deletar card
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
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
