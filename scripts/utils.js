function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("mousedown", handleOverlayClose);
}

function closePopup(popup) {
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

function showInputError(input, errorMessage) {
  const errorElement = input.parentElement.querySelector(
    `.form__error_type_${input.classList[1].split("_").pop()}`
  );
  input.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__error_visible");
}

function hideInputError(input) {
  const errorElement = input.parentElement.querySelector(
    `.form__error_type_${input.classList[1].split("_").pop()}`
  );
  input.classList.remove("form__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__error_visible");
}

function checkInputValidity(input) {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage);
    return false;
  } else {
    hideInputError(input);
    return true;
  }
}
