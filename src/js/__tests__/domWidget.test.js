/**
 * @jest-environment jsdom
 */

import CardWidget from "../domWidget";

// import { isValidLuhn } from "../cardValidator";
// import { getCardType } from "../cardType";

// jest.mock("../cardValidator");
// jest.mock("../cardType");
// jest.mock("../domWidget", () => {
//   const originalModule = jest.requireActual("../domWidget");
//   return {
//     ...originalModule,
//     showValidationResult: jest.fn(),
//   };
// });

describe("CardWidget tests with jest.each", () => {
  let container;
  let widget;

  // beforeEach(() => {
  document.body.innerHTML = '<div class="container"></div>';
  container = document.querySelector(".container");
  widget = new CardWidget(container);
  widget.bindToDOM();
  // });

  test("widget should render correctly", () => {
    expect(container.innerHTML).toEqual(CardWidget.markup);
  });

  // describe("Validation logic tests", () => {
  //   jest.each([
  //     [
  //       "No card type selected",
  //       "",
  //       "",
  //       false,
  //       "Please select a payment system",
  //     ],
  //     [
  //       "Valid card number and type",
  //       "Visa",
  //       "4111111111111111",
  //       true,
  //       "Card is valid",
  //     ],
  //     [
  //       "Invalid card number",
  //       "Visa",
  //       "1234567890123456",
  //       false,
  //       "Card is invalid",
  //     ],
  //     [
  //       "Mismatched card type",
  //       "MasterCard",
  //       "4111111111111111",
  //       false,
  //       "Card does not match the selected payment system",
  //     ],
  //   ])(
  //     "should handle validation correctly: %s",
  //     (_, cardType, cardNumber, luhnValid, expectedMessage) => {
  //       test("should handle validation correctly", () => {
  //         // Мокаем функции
  //         getCardType.mockReturnValue(cardType);
  //         isValidLuhn.mockReturnValue(luhnValid);

  //         // Устанавливаем тип карты, если указан
  //         if (cardType) {
  //           const cardIcon = container.querySelector(
  //             `.card-icon.${cardType.toLowerCase()}`,
  //           );
  //           cardIcon.click();
  //         }

  //         // Устанавливаем значение номера карты
  //         const input = container.querySelector("#card-number");
  //         input.value = cardNumber;

  //         // Вызываем onSubmit для проверки
  //         widget.onSubmit();

  //         // Проверяем, что showValidationResult вызван с корректными параметрами
  //         expect(showValidationResult).toHaveBeenCalledWith(
  //           luhnValid && cardType === getCardType(cardNumber),
  //           expectedMessage,
  //         );
  //       });
  //     },
  //   );
  // });
});

// ----- версия 2 -----
// describe("CardWidget tests with jest.each", () => {
//   let container;
//   let widget;

//   beforeEach(() => {
//     document.body.innerHTML = '<div class="container"></div>';
//     container = document.querySelector(".container");
//     widget = new CardWidget(container);
//     widget.bindToDOM();
//   });

//   test("widget should render correctly", () => {
//     expect(container.innerHTML).toEqual(CardWidget.markup);
//   });

//   describe("Validation logic tests", () => {
//     const testCases = [
//       [
//         "No card type selected",
//         "",
//         "",
//         false,
//         "Please select a payment system",
//       ],
//       [
//         "Valid card number and type",
//         "Visa",
//         "4111111111111111",
//         true,
//         "Card is valid",
//       ],
//       [
//         "Invalid card number",
//         "Visa",
//         "1234567890123456",
//         false,
//         "Card is invalid",
//       ],
//       [
//         "Mismatched card type",
//         "MasterCard",
//         "4111111111111111",
//         false,
//         "Card does not match the selected payment system",
//       ],
//     ];

//     test.each(testCases)(
//       "should handle validation correctly: %s",
//       (_, cardType, cardNumber, luhnValid, expectedMessage) => {
//         // Мокаем функции
//         getCardType.mockReturnValue(cardType);
//         isValidLuhn.mockReturnValue(luhnValid);

//         // Устанавливаем тип карты, если указан
//         if (cardType) {
//           const cardIcon = container.querySelector(
//             `.card-icon.${cardType.toLowerCase()}`,
//           );
//           cardIcon?.click();
//         }

//         // Устанавливаем значение номера карты
//         const input = container.querySelector("#card-number");
//         input.value = cardNumber;

//         // Вызываем onSubmit для проверки
//         widget.onSubmit();

//         // Проверяем, что showValidationResult вызван с корректными параметрами
//         expect(showValidationResult).toHaveBeenCalledWith(
//           luhnValid && cardType === getCardType(cardNumber),
//           expectedMessage,
//         );
//       },
//     );

//   });
// });
