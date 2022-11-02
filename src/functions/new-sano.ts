const puppeteer = require('puppeteer');

const WEATHER_URL =
  'https://www.jma.go.jp/bosai/amedas/#amdno=41361&area_type=offices&area_code=090000&format=table1h&elems=53400';

export const newSano = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(WEATHER_URL);

    // await sleep(5000);

    // await page.goto(WEATHER_URL, { waitUntil: 'networkidle2' });

    await page.goto(
      'https://www.jma.go.jp/bosai/forecast/#area_type=class20s&area_code=0120200',
      { waitUntil: 'networkidle2' }
    );

    // const huga = await page.evaluate(
    //   'document.querySelector("#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td.td-temp")'
    // );

    const head = await page.evaluate(() => {
      return document.getElementsByTagName('head');
    });

    console.log(head);

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};

const sleep = (ms: number) => {
  new Promise((resolve) => setTimeout(resolve, ms));
};
