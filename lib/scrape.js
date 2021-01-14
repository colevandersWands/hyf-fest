"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

const puppeteer = require('puppeteer');

const fetchCss = require("fetch-css");

const getContent = async function getContent(arg) {
  let result = {};
  let styleSheet;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(arg);
    result.html = await page.evaluate(() => {
      styleSheet = document.head.querySelector("link[rel='stylesheet']").href;
      return document.documentElement.outerHTML;
    });
    const [{
      css
    }] = await fetchCss([{
      url: "https://bruteforcebilly.github.io/hyf-fest/style.css"
    }]);
    result.css = css; //result = await page.content()

    await browser.close();
  } catch (error) {
    result = error;
    console.warn("We have an error here: ".concat(error));
  }

  return result;
};

const scrape = arg => {
  return new Promise(resolve => {
    getContent(arg).then(result => {
      console.log("result", result);
      resolve(result);
    }).catch(e => {
      console.error(e);
    });
  });
};

module.exports = {
  scrape: scrape
};