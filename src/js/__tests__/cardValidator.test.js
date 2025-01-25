import { isValidLuhn } from "../cardValidator";
import { getCardType } from "../cardType";

const validCards = [
  { number: "4111111111111111", type: "Visa" },
  { number: "5555555555554444", type: "MasterCard" },
  { number: "378282246310005", type: "AmericanExpress" },
  { number: "6011111111111117", type: "Discover" },
  { number: "3530111333300000", type: "JCB" },
  { number: "2201382000000013", type: "Mir" },
];

const invalidCards = [
  { number: "1234567890123456", type: null }, // Неверный номер
  { number: "4111111111111110", type: null }, // Логически неверный номер
];

describe("Luhn Algorithm Validation", () => {
  test.each(validCards)(
    "should validate card number %s as valid",
    ({ number }) => {
      expect(isValidLuhn(number)).toBe(true);
    },
  );

  test.each(invalidCards)(
    "should validate card number %s as invalid",
    ({ number }) => {
      expect(isValidLuhn(number)).toBe(false);
    },
  );
});

describe("Card Type Detection", () => {
  test.each(validCards)(
    "should detect card type correctly for %s",
    ({ number, type }) => {
      expect(getCardType(number)).toBe(type);
    },
  );

  test.each(validCards)(
    "should fail validation if card type does not match the number",
    ({ number, type }) => {
      const incorrectType = validCards.find((card) => card.type !== type)?.type;
      expect(incorrectType).not.toBeUndefined(); // Утверждение, что есть другой тип карты
      expect(getCardType(number)).not.toBe(incorrectType); // Утверждение на несовпадение
    },
  );

  test.each(validCards)(
    "should fail validation if card type is not provided",
    ({ number }) => {
      expect(getCardType(number)).not.toBeNull();
    },
  );
});

describe("Invalid Card Type Detection", () => {
  test.each(invalidCards)(
    "should detect type regardless of validity for %s",
    ({ number }) => {
      // Тип карты может быть определён, даже если номер некорректен
      const type = getCardType(number);
      expect(type).toBeNull(); // Ожидаем null, только если карта не соответствует типу
    },
  );
});

test("should return null for unknown card type", () => {
  const cardNumber = "9999999999999999"; // Неизвестный номер карты
  const type = getCardType(cardNumber);
  expect(type).toBeNull();
});

describe("isValidLuhn edge cases", () => {
  test("should return false for empty string", () => {
    expect(isValidLuhn("")).toBe(false);
  });

  test("should return false for card number with invalid characters", () => {
    expect(isValidLuhn("4111a11111111111")).toBe(false);
  });

  test("should return false for card number shorter than the minimum length", () => {
    expect(isValidLuhn("12345")).toBe(false);
  });

  test("should return false for null input", () => {
    expect(isValidLuhn(null)).toBe(false);
  });

  test("should return false for undefined input", () => {
    expect(isValidLuhn(undefined)).toBe(false);
  });

  test("should return null for unknown card type", () => {
    const cardNumber = "1234567890123456"; // Номер, не соответствующий ни одной системе
    expect(getCardType(cardNumber)).toBeNull();
  });

  test("should return false for card number shorter than required length", () => {
    expect(isValidLuhn("123")).toBe(false);
  });

  test("should return false for card number longer than typical maximum length", () => {
    const longCardNumber = "4".repeat(20); // Длиннее 19 символов (максимальная длина карты)
    expect(isValidLuhn(longCardNumber)).toBe(false);
  });
});
