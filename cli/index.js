'use strict';

const fs = require('fs');
const path = require('path');

const normalizeUrl = require('normalize-url');

const { validator } = require('../src/validator.js');

const students = require('./students.json');

// will default to evaluating their home page
//  try acme-web-design, this was an assigned project repo
const repoName = process.argv[2] || '';
console.log('evaluating: ', repoName);

const resultsPath = path.join(__dirname, 'results');
if (!fs.existsSync(resultsPath)) {
  fs.mkdirSync(resultsPath);
}
for (const student of students) {
  const origin = `https://${student.userName}.github.io/`;
  const url = normalizeUrl(origin + repoName);
  const className = student.className;

  console.log('... validatoring ', student.name, ', ', url);

  validator(url).then(result => {
    const classDir = path.join(resultsPath, className);
    if (!fs.existsSync(classDir)) {
      fs.mkdirSync(classDir);
    }

    const studentDir = path.join(classDir, student.userName);
    if (!fs.existsSync(studentDir)) {
      fs.mkdirSync(studentDir);
    }

    console.log('... writing ', student.name);
    if (result) {
      const outputPath = path.join(
        studentDir,
        // the JSON is not valid. huh
        `${repoName || student.userName + '.github.io'}.json`
      );
      fs.writeFile(outputPath, result, err => (err ? console.log(err) : null));
    } else {
      const outputPath = path.join(
        studentDir,
        `${repoName || student.userName + '.github.io'}.NO_RESULT.json`
      );
      fs.writeFile(outputPath, 'null', err => (err ? console.log(err) : null));
    }
  });
}
