const productCards = [...document.querySelectorAll(".product-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const bagCount = document.querySelector("#bag-count");
const bagStatus = document.querySelector("#bag-status");
const bagButton = document.querySelector("#bag-button");
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");
const clearCartButton = document.querySelector("#clear-cart");
const cartMessage = document.querySelector("#cart-message");
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterStatus = document.querySelector("#newsletter-status");
const cart = new Map();
const products = new Map(
  [...document.querySelectorAll("[data-add]")].map((button) => [
    button.dataset.add,
    Number(button.dataset.price),
  ]),
);

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

function renderCart() {
  cartItems.replaceChildren();
  let itemCount = 0;
  let total = 0;

  cart.forEach((quantity, name) => {
    const price = products.get(name);
    itemCount += quantity;
    total += quantity * price;

    const row = document.createElement("div");
    row.className = "cart-line";

    const details = document.createElement("div");
    const productName = document.createElement("strong");
    productName.textContent = name;
    const unitPrice = document.createElement("span");
    unitPrice.textContent = `${formatCurrency(price)} each`;
    details.append(productName, unitPrice);

    const controls = document.createElement("div");
    controls.className = "cart-line-controls";
    const decrease = document.createElement("button");
    decrease.type = "button";
    decrease.dataset.cartAction = "decrease";
    decrease.dataset.product = name;
    decrease.setAttribute("aria-label", `Remove one ${name}`);
    decrease.textContent = "−";
    const quantityLabel = document.createElement("span");
    quantityLabel.textContent = String(quantity);
    const increase = document.createElement("button");
    increase.type = "button";
    increase.dataset.cartAction = "increase";
    increase.dataset.product = name;
    increase.setAttribute("aria-label", `Add one ${name}`);
    increase.textContent = "+";
    controls.append(decrease, quantityLabel, increase);

    const lineTotal = document.createElement("strong");
    lineTotal.textContent = formatCurrency(price * quantity);
    row.append(details, controls, lineTotal);
    cartItems.append(row);
  });

  bagCount.textContent = String(itemCount);
  cartTotal.textContent = formatCurrency(total);
  cartEmpty.hidden = cart.size > 0;
  checkoutButton.disabled = cart.size === 0;
  clearCartButton.disabled = cart.size === 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    productCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.add;
    cart.set(name, (cart.get(name) || 0) + 1);
    const itemCount = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
    bagStatus.textContent = `${name} added. ${itemCount} ${itemCount === 1 ? "item" : "items"} in your sample bag.`;
    cartMessage.textContent = "";
    renderCart();
  });
});

bagButton.addEventListener("click", () => {
  bagButton.setAttribute("aria-expanded", "true");
  cartDialog.showModal();
});

cartDialog.addEventListener("close", () => {
  bagButton.setAttribute("aria-expanded", "false");
});

cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) {
    cartDialog.close();
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-cart-action]");
  if (!button) {
    return;
  }

  const name = button.dataset.product;
  const quantity = cart.get(name);
  if (button.dataset.cartAction === "increase") {
    cart.set(name, quantity + 1);
  } else if (quantity <= 1) {
    cart.delete(name);
  } else {
    cart.set(name, quantity - 1);
  }

  cartMessage.textContent = "";
  bagStatus.textContent = cart.size
    ? "Your sample bag has been updated."
    : "Your sample bag is empty.";
  renderCart();
});

clearCartButton.addEventListener("click", () => {
  cart.clear();
  cartMessage.textContent = "Your sample bag has been emptied.";
  bagStatus.textContent = "Your sample bag is empty.";
  renderCart();
});

checkoutButton.addEventListener("click", () => {
  const itemCount = [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
  cartMessage.textContent = `Demo only: ${itemCount} ${itemCount === 1 ? "item" : "items"} totaling ${cartTotal.textContent}. No order was placed and no payment was taken.`;
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(newsletterForm).get("email").trim();
  const subject = encodeURIComponent("Form & Goods concept — product updates");
  const body = encodeURIComponent(
    `I would like to ask about updates for the Form & Goods concept.\n\nMy email: ${email}`,
  );

  newsletterStatus.textContent = "Opening your email app with the request. Review and send it there.";
  window.location.href = `mailto:wiliakonect.store@gmail.com?subject=${subject}&body=${body}`;
});

renderCart();
