const util = require('util');
const exec = util.promisify(require('child_process').exec);
const vnu = require ( 'vnu-jar' );

// `echo '${html}' | java -jar ${vnu} --format "json"  -`


async function testHtml(tmpDir) {
    let outputMessage;
    let errorMessage;

    try {
      const { stdout, stderr } = await exec(`java -jar ${vnu}  --format "json"  ${tmpDir}`);
    //   console.log('stdout:', stdout);
    //   console.log('stderr:', stderr);
     
    outputMessage = stdout || stderr;

    } catch (error) {
      //console.error ( `exec error: ${error}` );
    //   output = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
    //     console.log("!!!!!!!!!!", output)
    // }
    errorMessage = error.stderr
    }

    return JSON.parse(errorMessage).messages.map(cv => cv.message);
}

module.exports = {
    testHtml
  }