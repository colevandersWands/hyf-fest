"use strict";

const express = require('express');

const app = express();
const port = 3000;

const {
  scrape
} = require('./scrape.js');

app.get('/', (req, res) => {
  res.send('Welcome to FEST 🎉');
});
app.get('/unit/:src', (req, res) => {
  console.log("get", req.params.src);
  scrape(req.params.src).then(result => {
    res.send(result);
  });
});
app.listen(port, () => {
  console.log("Example app listening at http://localhost:".concat(port));
});