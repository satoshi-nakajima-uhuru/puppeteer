const puppeteer = require('puppeteer');

export const sano = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      'https://www.dif.pref.tochigi.lg.jp/main.asp?screen=river&list=1&min_interval=10'
    );

    const huga = await page.evaluate(
      'document.querySelector("body > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(4) > font").innerText'
    );

    console.log(huga);
    await browser.close();
  } catch (e) {
    console.log(e);
  }
};
