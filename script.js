const switchBtn = document.getElementById("billingSwitch");
const labels = document.querySelectorAll(".billing .label");
const prices = document.querySelectorAll(".price-box .num");
const cards = document.querySelectorAll(".card");

let yearly = false;

// Monthly / Yearly toggle & price flip
switchBtn.addEventListener("click", () => {
  yearly = !yearly;
  switchBtn.classList.toggle("yearly", yearly);
  switchBtn.setAttribute("aria-pressed", yearly);

  labels.forEach((lbl) => {
    const isTarget =
      (yearly && lbl.dataset.plan === "yearly") ||
      (!yearly && lbl.dataset.plan === "monthly");
    lbl.classList.toggle("active", isTarget);
  });

  prices.forEach((num) => {
    num.classList.add("flip");
    setTimeout(() => {
      num.textContent = yearly ? num.dataset.yearly : num.dataset.monthly;
      num.classList.remove("flip");
    }, 180);
  });
});

// Subtle 3D tilt on each glass card
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});