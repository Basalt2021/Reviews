const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ProductReviews',
{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true});
const Schema = mongoose.Schema

const fetchReviews = (callback) => {
  var reviews = mongoose.model("reviews", new Schema({}), "Reviews");
  reviews.find({})
  .then((doc) => {
    callback(doc);
  })
}

module.exports.fetchReviews = fetchReviews;





// var photosSchema = Schema({
//   id: {
//     type: Number,
//     unique: true
//   },
//   review_id: Number,
//   url: String
// });

// var reviewsSchema = Schema({
//   _id: {
//     type: Number,
//     unique: true
//   },
//   product_id: Number,
//   rating: Number,
//   date: Number,
//   summary: String,
//   body: String,
//   recommend: Boolean,
//   reported: Boolean,
//   reviewer_name: String,
//   reviewer_email: String,
//   response: String,
//   helpfulness: Number
//   photos: [{{type: Schema.Types.ObjectId, ref: 'Photos'}}]
// });

// var characteristicsSchema = Schema({
//   id: {
//     type: Number,
//     unique: true
//   },
//   product_id: Number,
//   name: String,
//   value: Number
// });

// var productReviewsSchema = Schema({
//   product_id: {
//     type: Number,
//     unique: true
//   }
//   reviews: [reviewsSchema],
//   characteristics: [characteristicsSchema]
// });

// const Photos = mongoose.model('Photos', photosSchema);
// const Reviews = mongoose.model('Reviews', reviewsSchema);
// const Characteristics = mongoose.model('Characteristics', characteristicsSchema);
// const ProductReviews = mongoose.model('ProductReviews', productReviewsSchema);


