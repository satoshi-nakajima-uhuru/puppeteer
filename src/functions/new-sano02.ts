const puppeteer = require('puppeteer');

const WEATHER_URL =
  'https://www.jma.go.jp/bosai/amedas/#amdno=41361&area_type=offices&area_code=090000&format=table1h&elems=53400';

export const newSano02 = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(WEATHER_URL, { waitUntil: 'networkidle2' });

    const date02 = await page.evaluate(
      'document.querySelector("#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td:nth-child(1)").innerText'
    );
    const sano = await page.evaluate(
      'document.querySelector("#amd-controller > table > tr.contents-title > th > div > div.amd-content-amdname").innerText'
    );
    const hoge = await page.evaluate(
      'document.querySelector("#amd-area-button > ul > li:nth-child(3)").innerText'
    );

    console.log('-----------');
    console.log(sano);
    console.log(hoge);
    console.log('日付:', date02);
    console.log('-----------');

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};
