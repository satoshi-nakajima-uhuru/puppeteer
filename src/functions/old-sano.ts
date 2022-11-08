const puppeteer = require('puppeteer');

const WEATHER_URL =
  'https://www.dif.pref.tochigi.lg.jp/main.asp?screen=river&list=1&min_interval=10';

export const oldSano = async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disabled-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(WEATHER_URL, { waitUntil: 'networkidle2' });

    const place = await page.evaluate(
      'document.querySelector("body > table > tbody > tr:nth-child(2) > td > form > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(4) > font").innerText'
    );

    console.log('-----------');
    console.log(place);
    console.log('-----------');

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};
