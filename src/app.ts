const puppeteer = require('puppeteer');

const WEATHER_URL =
  'https://www.jma.go.jp/bosai/amedas/#amdno=41361&area_type=offices&area_code=090000&format=table1h&elems=53400';

const getSiteSnapchat = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 1600,
    },
  });
  const page = await browser.newPage();
  await page.goto('https://news.yahoo.co.jp/');
  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
};

// getSiteSnapchat();

const hoge = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://uhuru.co.jp/service/');

    const data = await page.$eval('.un_serviceIndexTop_title', (item) => {
      return item.textContent.trim();
    });

    console.log(data);
    await browser.close();
  } catch (e) {
    console.log(e);
  }
};

hoge();
