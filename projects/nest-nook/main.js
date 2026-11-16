const inquiryForm = document.querySelector("#inquiry-form");
const formStatus = document.querySelector("#form-status");

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(inquiryForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const room = formData.get("room").trim();
  const subject = encodeURIComponent("Nest & Nook concept website inquiry");
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nRoom or project:\n${room}`,
  );

  formStatus.textContent = "Opening your email app with the inquiry. Review and send it there.";
  window.location.href = `mailto:wiliakonect.store@gmail.com?subject=${subject}&body=${body}`;
});
