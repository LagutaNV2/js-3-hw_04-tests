/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/cardValidator.js

function isValidLuhn(cardNumber) {
  //  Проверка пустых строк или недопустимых символов
  if (!cardNumber || !/^\d+$/.test(cardNumber)) {
    return false;
  }

  // Проверка длины номера карты
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    return false;
  }
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}
;// ./src/js/cardType.js

function getCardType(cardNumber) {
  if (!isValidLuhn(cardNumber)) {
    return null; // Номер некорректен
  }
  const patterns = {
    Visa: /^4/,
    MasterCard: /^5[1-5]/,
    AmericanExpress: /^3[47]/,
    Discover: /^6(?:011|5)/,
    JCB: /^(?:2131|1800|35)/,
    DinersClub: /^3(?:0[0-5]|[68])/,
    Mir: /^220[0-4]/
  };
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber)) {
      // console.log("определен тип карты:", type);
      return type;
    }
  }
  // return null;
}
;// ./src/js/domWidget.js


class CardWidget {
  constructor(parentEl) {
    if (typeof parentEl === "string") {
      parentEl = document.querySelector(parentEl);
    }
    this._parentEl = parentEl;
    this.cardType = null; // Запоминаем тип выбранной карты
    this.onSubmit = this.onSubmit.bind(this);
    this.onCardSelect = this.onCardSelect.bind(this);
  }
  static get markup() {
    return `
      <h1>Check your credit card number</h1>
      <ul class="card-icons">
        <li class="card-icon visa" data-type="Visa"></li>
        <li class="card-icon mastercard" data-type="MasterCard"></li>
        <li class="card-icon american-express" data-type="AmericanExpress"></li>
        <li class="card-icon discover" data-type="Discover"></li>
        <li class="card-icon jcb" data-type="JCB"></li>
        <li class="card-icon diners-club" data-type="DinersClub"></li>
        <li class="card-icon mir" data-type="Mir"></li>
      </ul>
      <div class="input-row">
        <input type="text" id="card-number" placeholder="Enter card number">
        <button id="validate-btn">Click to Validate</button>
      </div>
      <div class="validation-message"></div>
    `;
  }
  bindToDOM() {
    this._parentEl.innerHTML = CardWidget.markup;
    const icons = this._parentEl.querySelectorAll(".card-icon");
    icons.forEach(icon => icon.addEventListener("click", this.onCardSelect));
    this._parentEl.querySelector("#validate-btn").addEventListener("click", this.onSubmit);
  }
  onCardSelect(event) {
    const selectedCard = event.currentTarget;
    this.cardType = selectedCard.dataset.type; // Запоминаем тип карты
    const icons = this._parentEl.querySelectorAll(".card-icon");
    icons.forEach(icon => icon.classList.remove("active"));
    selectedCard.classList.add("active");

    // Сбрасываем сообщение о предыдущей проверке
    this.clearValidationMessage();
  }
  onSubmit() {
    // Сбрасываем сообщение перед новой проверкой
    this.clearValidationMessage();
    const cardNumber = this._parentEl.querySelector("#card-number").value.trim();
    const isValid = isValidLuhn(cardNumber); // Проверяем номер карты по алгоритму Луна

    // Проверяем, был ли выбран тип карты
    if (!this.cardType) {
      showValidationResult(false, "Please select a payment system");
      return;
    }

    // Если номер карты некорректен по Луну
    if (!isValid) {
      showValidationResult(false, "Card is invalid");
      return;
    }

    // Проверяем, совпадает ли номер карты с выбранным типом
    const detectedType = getCardType(cardNumber);
    if (detectedType !== this.cardType) {
      showValidationResult(false, "Card does not match the selected payment system");
      return;
    }

    // Если карта валидна и соответствует типу
    showValidationResult(true, "Card is valid");
    console.log(`Card type: ${detectedType}, Card number: ${cardNumber}`);
  }
  clearValidationMessage() {
    const messageEl = this._parentEl.querySelector(".validation-message");
    messageEl.textContent = "";
    messageEl.classList.remove("valid", "invalid");
  }
}
function showValidationResult(isValid, message) {
  const messageEl = document.querySelector(".validation-message");
  if (isValid) {
    messageEl.textContent = message || "Card is valid";
    messageEl.classList.add("valid");
    messageEl.classList.remove("invalid");
  } else {
    messageEl.textContent = message || "Card is invalid";
    messageEl.classList.add("invalid");
    messageEl.classList.remove("valid");
  }
}
;// ./src/js/app.js
// TODO: write code here

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const form = new CardWidget(container);
  form.bindToDOM();
});
;// ./src/index.js



// TODO: write your code in app.js
/******/ })()
;