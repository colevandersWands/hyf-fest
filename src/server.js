const express = require('express')
const app = express()
const port = 3000

const { scrape } = require('./scrape.js');

app.get('/', (req, res) => {
  res.send('Welcome to FEST 🎉')
})

app.get('/unit/:src', (req, res) => {
  console.log("get", req.params.src)
  scrape(req.params.src).then((result) => {
    // check if unit html and css files exist
    // if they exist then pass them as args into jest
    res.send(result)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})