
// this file uses the native MongoDB driver, and is meant to illustrate how complicated that is
// it will be much easier to simply use Mongoose, which we are learning about next

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/// connection code ///
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruits';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

// call insert and only then close the connection
  // insertDocuments(db, function() {
  //   client.close();
  // });

  findDocuments(db, function() {
      client.close();
    });
});
/// end connection code ///

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great Fruit"
    },
    {
      name: "Orange",
      score: 9,
      review: "Great Citrus"
    },
    {
      name: "Banana",
      score: 6,
      review: "Fine Fruit"
    }
  ], function(err, result) {
    assert.equal(err, null);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
