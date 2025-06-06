// Validação simples e funcional
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);

    // Desabilitar botão inicialmente
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        validateInput(input, form, config);
        toggleButtonState(form, config);
      });
    });
  });
}

function validateInput(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    // Mostrar erro
    input.classList.add(config.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(config.errorClass);
    }
  } else {
    // Esconder erro
    input.classList.remove(config.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
    }
  }
}

function toggleButtonState(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);
  let isFormValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  }
}

function resetValidation(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
    }
  });

  submitButton.disabled = true;
  submitButton.classList.add(config.inactiveButtonClass);
}
