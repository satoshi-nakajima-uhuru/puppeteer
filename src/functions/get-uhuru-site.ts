const puppeteer = require('puppeteer');

export const getUhuruSite = async () => {
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
