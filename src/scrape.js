const puppeteer = require('puppeteer');
const fetchCss = require("fetch-css");
const fs = require('fs');

const getContent = async function(arg) {
let result = {};
let styleSheetUrl;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(arg);

    result.html = await page.evaluate(() => {
        return document.documentElement.outerHTML
    });

    fs.writeFileSync('./unit.html', result.html);

    styleSheetUrl = await page.evaluate(() => {
        return document.head.querySelector("link[rel='stylesheet']").href
    });

    const [{css}] = await fetchCss([{url: styleSheetUrl }]);

    result.css = css;

    fs.writeFileSync('./style.css', result.css);

    // url should not be hardcoded
    //https://bruteforcebilly.github.io/hyf-fest/style.css
    // const [{css}] = await fetchCss([{url: "https://bruteforcebilly.github.io/hyf-fest/style.css" }]);

    // result.css = css;

    // name of file should not be hardocde, but set from let var --> document.head.querySelector


    //result = await page.content()
    await browser.close();
  } catch(error) {
    result = error;
    console.warn(`We have an error here: ${error}`)
  }
  return result
};

const scrape = (arg) => {
    return new Promise((resolve) => {
        getContent(arg).then((result) => {
            console.log("result", result)
            resolve(result)
    }).catch(e => {
        console.error(e)
    });
})
}

module.exports = {
    scrape: scrape
}