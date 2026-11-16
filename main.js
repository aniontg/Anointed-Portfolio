const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation menu" : "Close navigation menu",
  );
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const supportsTilt = window.matchMedia(
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
).matches;

if (supportsTilt) {
  document
    .querySelectorAll(".hero-img-container, .service-card, .project-card")
    .forEach((surface) => {
      surface.addEventListener("pointermove", (event) => {
        const bounds = surface.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        const intensity = surface.classList.contains("hero-img-container") ? 4 : 3;

        surface.style.setProperty("--pointer-x", `${x * 100}%`);
        surface.style.setProperty("--pointer-y", `${y * 100}%`);
        surface.style.setProperty("--rotate-x", `${(0.5 - y) * intensity}deg`);
        surface.style.setProperty("--rotate-y", `${(x - 0.5) * intensity}deg`);
      });

      surface.addEventListener("pointerleave", () => {
        surface.style.removeProperty("--pointer-x");
        surface.style.removeProperty("--pointer-y");
        surface.style.removeProperty("--rotate-x");
        surface.style.removeProperty("--rotate-y");
      });
    });
}

const contactMessage = document.querySelector("#contact-message");

document.querySelectorAll(".service-link[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    contactMessage.value = `Hi, I’m interested in ${link.dataset.service}.`;
  });
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();
  const whatsappMessage = [
    `Hello, I'm ${name}.`,
    `My email address is ${email}.`,
    "",
    message,
  ].join("\n");

  window.location.href = `https://wa.me/2349114638331?text=${encodeURIComponent(whatsappMessage)}`;
});
