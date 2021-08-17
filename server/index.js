const express = require('express');
const morgan = require('morgan');
const parser = require('body-parser');
const {fetchReviews} = require('../database/index.js');

let app = express();

app.use(parser.json());
app.use(morgan('dev'));

app.get('/reviews/', function (req, res) {
  fetchReviews(req.query, (response) => {
    res.send(response);
  })
})

app.get('/reviews/meta', function (req, res) {
  fetchReviews((obj) => {
      res.json(obj);
  });
})

app.patch('/reviews/:review_id/helpful', (req, res) => {

})

app.patch('/reviews/:review_id/report', (req, res) => {

})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});