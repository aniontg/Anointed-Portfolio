const joinForm = document.querySelector("#join-form");
const joinStatus = document.querySelector("#join-status");

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(joinForm).get("email").trim();
  const subject = encodeURIComponent("Pace Club concept — sample plan request");
  const body = encodeURIComponent(
    `Please send me information about the Pace Club website concept.\n\nMy email: ${email}`,
  );

  joinStatus.textContent = "Opening your email app with the request. Review and send it there.";
  window.location.href = `mailto:wiliakonect.store@gmail.com?subject=${subject}&body=${body}`;
});
