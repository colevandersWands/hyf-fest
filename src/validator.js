const fs = require("fs").promises;
const os = require("os");
const path = require("path");
const scrape = require('website-scraper');
const SaveToExistingDirectoryPlugin = require('website-scraper-existing-directory');

const { lint } = require('./linter.js');

const withTempDir = async (fn) => {
    const dir = await fs.mkdtemp(await fs.realpath(os.tmpdir()) + path.sep);
      try {
          return await fn(dir);
      } finally {
          fs.rmdir(dir, {recursive: true});
      }
};

const validator = async(url) => {
    return await withTempDir(async (tmpDir) => {
        try {
            await scrape({
                urls: [url],
                directory: `${tmpDir}`,
                plugins: [ new SaveToExistingDirectoryPlugin() ]
            });
            return await lint(tmpDir);
        } catch(error) {
            console.log(error)
        }
    })
}

module.exports = {
    validator
  }
  