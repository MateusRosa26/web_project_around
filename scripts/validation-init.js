// Habilitando a validação chamando enableValidation()
// Configurações de validação usando metodologia BEM

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// Inicializar quando DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  enableValidation(validationConfig);
});
