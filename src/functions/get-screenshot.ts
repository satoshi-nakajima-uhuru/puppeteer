const puppeteer = require('puppeteer');

// スナップショット
export const getScreenshot = async () => {
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
