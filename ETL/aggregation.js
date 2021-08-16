var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/", function (err, db) {
     if(err) throw err;

     var dbo = db.db("ProductReviews");

     var finalProductPipe = [
       { $group: { _id: '$product_id' }},
       { $sort: { _id: 1} },
       {
          $lookup : {
          "from": "newProduct",
          "localField": "_id",
          "foreignField": "product_id",
          "as": "characteristics"
          }
       },
       {
        $lookup : {
          "from": "ReviewsWithPhotos",
          "localField": "_id",
          "foreignField": "product_id",
          "as": "results"
          }
       },
       { $project: { 'characteristics.product_id': 0, 'results.product_id': 0, 'results.photos.review_id': 0} },
       { $out: 'finalProducts' }
     ]

     var charPipe = [
       { $project: { characteristic_id : 1, value : 1 }},
       { $group: { _id : "$characteristic_id", value : { $avg: '$value'} }},
       { $sort : { _id : 1} },
       { $out: 'newCharReviews' }
     ]

     var productPipe = [
      {
        $lookup : {
          "from": "newCharReviews",
          "localField": "id",
          "foreignField": "_id",
          "as": "info"
      }
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$info", 0 ] }, "$$ROOT" ] } }
      },
      { $project: { info: 0} },
      { $out: "newProduct" }
    ]
     //Write databse Insert/Update/Query code here..
     var pipeline = [
      { $addFields : { photos: [] } },
      {
        $lookup : {
            "from": "Photos",
            "localField": "id",
            "foreignField": "review_id",
            "as": "photos"
        }
      },
      { $sort : { id : 1} },
      { $out: 'ReviewsWithPhotos'}
    ];

    dbo.collection("ReviewsWithPhotos").drop();
    dbo.collection("ReviewChar").aggregate(charPipe).toArray();
    dbo.collection("Reviews").aggregate(pipeline).toArray();
    dbo.collection("Characteristics").aggregate(productPipe).toArray();
    dbo.collection("Characteristics").aggregate(finalProductPipe).toArray();
});