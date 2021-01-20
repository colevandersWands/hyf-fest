const fs = require("fs").promises;
const os = require("os");
const path = require("path");
const puppeteer = require('puppeteer');

const withTempDir = async (fn) => {
  const dir = await fs.mkdtemp(await fs.realpath(os.tmpdir()) + path.sep);
	try {
		return await fn(dir);
	} finally {
		fs.rmdir(dir, {recursive: true});
	}
};

const scrapeProject = async (projectUrl) => {

  return await withTempDir(async (tmpDir) => {

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


  }) 

}

module.exports = {
  scrapeProject
}



