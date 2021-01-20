const fs = require("fs").promises;
const os = require("os");
const path = require("path");

const withTempDir = async (fn) => {
    const dir = await fs.mkdtemp(await fs.realpath(os.tmpdir()) + path.sep);
      try {
          return await fn(dir);
      } finally {
          fs.rmdir(dir, {recursive: true});
      }
};

const { scrapeProject } = require('./scraper.js');
const { testHtml } = require('./tester.js');


const validator = async(projectUrl) => {
    
    return await withTempDir(async (tmpDir) => {
        // we want to write html file into temp dir 
        const project = await scrapeProject(projectUrl);

        // const { html, css } = await scrapeProject(projectUrl);

        await fs.writeFile(`${tmpDir}/index.html`, project, function (err) {
            if (err) return console.log(err);
            console.log('fs.writeFile', err);
          });

        // we want to pass temp dir as param

        return await testHtml(tmpDir);
    })
}

module.exports = {
    validator
  }
  