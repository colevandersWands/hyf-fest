const puppeteer = require('puppeteer');

const scrapeProject = async (projectUrl) => {

  let project;

      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(projectUrl);
        project = await page.evaluate(() => {
            // Set absolute path to link stylesheet
            let stylePath = document.head.querySelector("link").href;
            document.head.querySelector("link").href = stylePath;
            return document.documentElement.outerHTML;
        });
        await browser.close();

      } catch(e) {
          console.log(e);
      }

      return project

}

module.exports = {
  scrapeProject
}



