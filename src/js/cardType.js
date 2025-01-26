import { isValidLuhn } from "./cardValidator";

export function getCardType(cardNumber) {
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
    Mir: /^220[0-4]/,
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber)) {
      // console.log("определен тип карты:", type);
      return type;
    }
  }
  // return null;
}
