const express = require("express");
const { validator } = require('./validator.js');

const app = express();
const port = 3000

const normalizeUrl = require('normalize-url');


const regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/


app.get('/', (req, res) => {
  res.send('Welcome to FEST 🎉')
})

app.get('/run', async (req, res) => {

  let url = null;

  if(Object.keys(req.query).includes("url")){
    url = normalizeUrl(req.query.url)
  } else {
    res.status(400).send("Invalid query param key")
  }
  
  if(regexUrl.test(url)){
    const result = await validator(url);
    res.json(result);

  } else {
    res.status(400).send("Invalid query param value")
  }


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

