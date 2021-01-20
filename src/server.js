const express = require("express");
const { scrapeProject } = require('./scraper.js');
const { testHtml } = require('./tester.js');

const app = express();
const port = 3000
const regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/


app.get('/', (req, res) => {
  res.send('Welcome to FEST 🎉')
})

app.get('/run', async (req, res) => {

  let projectUrl = null;

  if(Object.keys(req.query).includes("projectUrl")){
    projectUrl = req.query.projectUrl
  } else {
    res.status(400).send("Invalid query param key")
  }
  
  if(regexUrl.test(projectUrl)){
    const project = await scrapeProject(projectUrl);
    const result = await testHtml(project);
    //res.setHeader("Content-Type", "text/plain");
    //res.writeHead(200);
    //res.end(testResult);
    res.json(result);

  } else {
    res.status(400).send("Invalid query param value")
  }


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

