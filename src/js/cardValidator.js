import { getCardType } from "./cardType";

export function isValidLuhn(cardNumber) {
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
