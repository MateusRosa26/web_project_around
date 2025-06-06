function initProfileEdit() {
  const profileEditButton = document.querySelector(".profile__edit-btn");
  const profileEditPopup = document.querySelector(".popup_type_edit-profile");
  const profileEditForm = document.querySelector(".form_type_edit-profile");
  const profileEditCloseButton =
    profileEditPopup.querySelector(".popup__close-btn");
  const nameInput = profileEditForm.querySelector(".form__input_type_name");
  const descriptionInput = profileEditForm.querySelector(
    ".form__input_type_description"
  );
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  function openProfileEditPopup() {
    const nameText = profileName.firstChild.textContent.trim();
    nameInput.value = nameText;
    descriptionInput.value = profileDescription.textContent;

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
      resetValidation(profileEditForm, validationConfig);
    }

    openPopup(profileEditPopup);
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    // Só prosseguir se formulário válido
    if (!profileEditForm.checkValidity()) {
      return;
    }

    updateProfileInfo(nameInput.value, descriptionInput.value);
    closePopup(profileEditPopup);
  }

  function updateProfileInfo(name, description) {
    const nameText = document.createTextNode(name);
    profileName.replaceChild(nameText, profileName.firstChild);
    profileDescription.textContent = description;
    highlightUpdatedFields();
  }

  function highlightUpdatedFields() {
    profileName.classList.add("profile__field-updated");
    profileDescription.classList.add("profile__field-updated");

    setTimeout(() => {
      profileName.classList.remove("profile__field-updated");
      profileDescription.classList.remove("profile__field-updated");
    }, 1500);
  }

  profileEditButton.addEventListener("click", openProfileEditPopup);
  profileEditCloseButton.addEventListener("click", () =>
    closePopup(profileEditPopup)
  );
  profileEditForm.addEventListener("submit", handleProfileFormSubmit);
}
