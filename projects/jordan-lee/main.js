const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();
  const subject = encodeURIComponent("Jordan Lee portfolio concept inquiry");
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nProject:\n${message}`,
  );

  contactStatus.textContent = "Opening your email app with the message. Review and send it there.";
  window.location.href = `mailto:wiliakonect.store@gmail.com?subject=${subject}&body=${body}`;
});
