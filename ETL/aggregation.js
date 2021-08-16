const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ProductReviews',
{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true});
const Schema = mongoose.Schema

console.log('hello')
var reviews = mongoose.model("reviews", new Schema({}), "Reviews");

var pipeline = [
  { $addFields: { photos: []}},
  {
    "$lookup": {
        "from": "Photos",
        "localField": "id",
        "foreignField": "review_id",
        "as": "photos"
    }
  },
  { $sort : { id : 1} },
  { $limit: 5 }
]

reviews.aggregate(pipeline, function (err, result) {
  if (err) {
      console.log(err);
      return;
  }
  console.log(result[4].photos);
});