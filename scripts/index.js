document.addEventListener("DOMContentLoaded", () => {
  initProfileEdit();

  const addButton = document.querySelector(".prifle__add-btn");
  if (addButton) {
    addButton.classList.remove("prifle__add-btn");
    addButton.classList.add("profile__add-btn");
  }

  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `.profile__field-updated {
        animation: highlight-pulse 1.5s ease-in-out;
      }`,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `@keyframes highlight-pulse {
        0% { text-shadow: 0 0 0 rgba(255, 255, 255, 0); }
        30% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.8); }
        100% { text-shadow: 0 0 0 rgba(255, 255, 255, 0); }
      }`,
    styleSheet.cssRules.length
  );
});
