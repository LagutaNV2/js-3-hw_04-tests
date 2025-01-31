import puppeteer from "puppeteer";

const childProcess = require("child_process");

jest.setTimeout(30000); // default puppeteer timeout

describe("test cards numbers", () => {
  let browser = null;
  let page = null;
  let server = null;

  const baseUrl = "http://localhost:9030";

  // beforeEach(async () => {
  //   browser = await puppeteer.launch({
  //     headless: false,
  //     slowMo: 100,
  //     devtools: true,
  //   });
  //   page = await browser.newPage();
  // });

  beforeAll(async () => {
    jest.setTimeout(60000); // Увеличиваем таймаут до 60 секунд
    server = await childProcess.fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (msg) => {
        if (msg === "ready") resolve();
      });
    });

    browser = await puppeteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    //if (browser) {
    await browser.close();
    //}
    //if (server) {
    server.kill();
    //}
  });

  test("should validate a valid card number", async () => {
    await page.goto(baseUrl, { waitUntil: "networkidle2" }); // гарантирует, что страница полностью загрузится

    // Выбираем платежную систему Visa
    const visaIcon = await page.$(".card-icon.visa");
    await visaIcon.click();

    // Вводим валидный номер карты номера Visa
    await page.type("#card-number", "4111111111111111");
    await page.click("#validate-btn");

    // Ожидание появления сообщения о валидности
    await page.waitForSelector(".validation-message.valid", {
      visible: true,
    });
    const message = await page.$eval(
      ".validation-message",
      (el) => el.textContent,
    );
    expect(message).toBe("Card is valid");
  });

  test("should show error for invalid card number", async () => {
    await page.goto(baseUrl, { waitUntil: "networkidle2" });

    // Выбираем платежную систему MasterCard
    const mastercardIcon = await page.$(".card-icon.mastercard");
    await mastercardIcon.click();

    // Вводим невалидный номер карты
    await page.type("#card-number", "1234567890123456");
    await page.click("#validate-btn");

    // Ожидание появления сообщения о некорректности
    await page.waitForSelector(".validation-message.invalid", {
      visible: true,
    });
    const message = await page.$eval(
      ".validation-message",
      (el) => el.textContent,
    );
    expect(message).toBe("Card is invalid");
  });
});
