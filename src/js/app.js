// TODO: write code here
import CardWidget from "./domWidget";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const form = new CardWidget(container);
  form.bindToDOM();
});
