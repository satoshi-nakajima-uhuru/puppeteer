const puppeteer = require('puppeteer');

const WEATHER_URL =
  'https://www.jma.go.jp/bosai/amedas/#amdno=41361&area_type=offices&area_code=090000&format=table1h&elems=53400';

export const newSano = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(WEATHER_URL, { waitUntil: 'networkidle2' });

    const date = await page.evaluate(() => {
      return document.querySelector(
        '#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td:nth-child(1)'
      ).innerHTML;
    });

    const time = await page.evaluate(() => {
      return document.querySelector(
        '#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td:nth-child(2)'
      ).innerHTML;
    });

    const temp = await page.evaluate(() => {
      return document.querySelector(
        '#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td.td-temp'
      ).innerHTML;
    });

    const rain = await page.evaluate(() => {
      return document.querySelector(
        '#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td.td-precipitation1h'
      ).innerHTML;
    });

    console.log('------------');
    console.log('日付:', date);
    console.log('時間:', time);
    console.log('気温:', temp);
    console.log('降水量:', rain);
    console.log('------------');

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};
