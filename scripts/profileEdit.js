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
  const submitButton = profileEditForm.querySelector(".form__submit-btn");

  function openProfileEditPopup() {
    const nameText = profileName.firstChild.textContent.trim();
    nameInput.value = nameText;
    descriptionInput.value = profileDescription.textContent;
    toggleSubmitButtonState();
    openPopup(profileEditPopup);
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValid = checkInputValidity(nameInput);
    const descriptionValid = checkInputValidity(descriptionInput);

    if (nameValid && descriptionValid) {
      updateProfileInfo(nameInput.value, descriptionInput.value);
      closePopup(profileEditPopup);
    }
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

  function validateForm() {
    const nameValid = checkInputValidity(nameInput);
    const descriptionValid = checkInputValidity(descriptionInput);
    toggleSubmitButtonState(nameValid && descriptionValid);
  }

  function toggleSubmitButtonState(isValid = true) {
    if (isValid) {
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.setAttribute("disabled", true);
    }
  }

  profileEditButton.addEventListener("click", openProfileEditPopup);
  profileEditCloseButton.addEventListener("click", () =>
    closePopup(profileEditPopup)
  );
  profileEditForm.addEventListener("submit", handleProfileFormSubmit);
  nameInput.addEventListener("input", () => checkInputValidity(nameInput));
  descriptionInput.addEventListener("input", () =>
    checkInputValidity(descriptionInput)
  );
  profileEditForm.addEventListener("input", validateForm);
}
