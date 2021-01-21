const fs = require("fs").promises;
const os = require("os");
const path = require("path");

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const vnu = require ( 'vnu-jar' );
const jsonFix = require('json-fixer')

const withTempFile = (fn) => withTempDir((dir) => fn(path.join(dir, "file")));

const withTempDir = async (fn) => {
	const dir = await fs.mkdtemp(await fs.realpath(os.tmpdir()) + path.sep);
	try {
		return await fn(dir);
	}finally {
		fs.rmdir(dir, {recursive: true});
	}
};

async function vnuLinter(tmpDir) {
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


const lint = async (tmpDir) => {
	return await withTempFile(async (file) => {
    
    const lintOutput =  await vnuLinter(tmpDir);
    await fs.writeFile(file, lintOutput);
    const jsonContent = await fs.readFile(file, 'utf-8')
    const {data, changed} = jsonFix(jsonContent);
    
    if(changed) {
      console.log("jsonFix changed:", changed)
    }
  
    return data;
	});
};


module.exports = {
    lint
  }