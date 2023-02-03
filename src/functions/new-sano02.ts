import { stat } from "fs";
import { ConsoleMessage } from "puppeteer";

const puppeteer = require('puppeteer');

const WEATHER_URL =
  'https://www.jma.go.jp/bosai/amedas/#amdno=41361&area_type=offices&area_code=090000&format=table1h&elems=53400';

export const newSano02 = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("response", response => {
      const status = response.status();
      console.log(status);
    });
    await page.goto(WEATHER_URL, { waitUntil: 'networkidle2' });

    const sano = await page.evaluate(
      'document.querySelector("#amd-area-button > ul > li:nth-child(3)").innerText'
    );

    const date = await page.evaluate(
      'document.querySelector("#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td:nth-child(1)").innerText'
    );

    const time = await page.evaluate(
      'document.querySelector("#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td:nth-child(2)").innerText'
    );

    const temp = await page.evaluate(
      'document.querySelector("#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td.td-temp").innerText'
    );

    const precipitationAmount = await page.evaluate(
      'document.querySelector("#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td.td-precipitation1h").innerText'
    );

    const query =
      'document.querySelector("#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td.td-windDirection").innerText';

    // const shortQuery =
    //   '#amd-table > div > div:nth-child(2) > div > div.contents-wide-table-scroll > table > tr:nth-child(4) > td.td-windDirection';

    const wind = await page.evaluate(query);

    // const hoge = await page.evaluate(
    //   `document.querySelector("${shortQuery}").innerText`
    // );

    console.log('-----------');
    console.log(sano);
    console.log('日付:', date);
    console.log('時間:', time);
    console.log('気温:', temp);
    console.log('降水量:', precipitationAmount);
    console.log('風向:', wind);
    console.log('-----------');

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};
