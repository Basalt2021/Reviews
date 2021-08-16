const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const {fetchReviews} = require('../database/index.js');

let app = express();

app.use(parser.json());
app.use(morgan('dev'));

app.get('/', function (req, res) {
  fetchReviews((obj) => {
      res.send(obj);
  });
})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});