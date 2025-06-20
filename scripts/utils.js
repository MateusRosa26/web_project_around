export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("mousedown", handleOverlayClose);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
  popup.removeEventListener("mousedown", handleOverlayClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlayClose(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
