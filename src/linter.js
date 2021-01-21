const util = require('util');
const exec = util.promisify(require('child_process').exec);
const vnu = require ( 'vnu-jar' );


async function lint(tmpDir) {
    let outputMessage;
    let errorMessage;

    try {
      const { stdout } = await exec(`java -jar ${vnu} --format "json" ${tmpDir}`);
        outputMessage = stdout;
    } catch (error) {
      errorMessage = error.stderr;
    }

    return outputMessage || errorMessage;
}

module.exports = {
    lint
  }