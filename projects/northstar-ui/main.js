const buttonStatus = document.querySelector("#button-status");
const demoForm = document.querySelector("#demo-form");
const formStatus = document.querySelector("#form-status");

document.querySelectorAll("[data-preview]").forEach((button) => {
  button.addEventListener("click", () => {
    buttonStatus.textContent = `${button.dataset.preview} selected.`;
  });
});

demoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Success state previewed. This concept form did not send or save your email.";
  demoForm.reset();
});
