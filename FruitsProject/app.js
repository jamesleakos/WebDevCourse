
// this file uses the Mongoose, and is meant to illustrate how much simpler it is
// than the native MongoDB driver

const mongoose = require('mongoose');

// this replaces all of the connection code from the previous file
// this will connect to a db or create one if it does not exist (fruitsDB)
// this opens the database
mongoose.connect('mongodb://localhost:27017/fruitsDB');

// now we load in some data
// first we have to create a new schema
// every new fruit document will have this structure
const fruitSchema = new mongoose.Schema ({
  // now we scaffold out how we want new data to be structured
  // name: string, // this also works
  name: {
    type: String,
    // required: true // this works as well
    required: [true, "Please check your data entry, no name specified"]
  },
  rating: { // can just put number, or we can use these braces to add validation
    type: Number,
    min: 0,
    max: 10
  },
  review: String
});

// after this, we use this schema to vrate a mongoose model
// this I think corresponds somehow to a collection
// this code will create a collection that pluralizes the first argument - so Fruits
const Fruit = mongoose.model('Fruit', fruitSchema);

// fold: creating one new fruit and saving it

const fruit = new Fruit ({
  // name: "Apple",
  rating: 9,
  review: "Pretty solid fruit"
});
// insert this
// fruit.save();

//end fold

// fold: creating a new schema and adding some data
const personSchema = new mongoose.Schema ({
  // now we scaffold out how we want new data to be structured
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});
// after this, we use this schema to vrate a mongoose model
// this I think corresponds somehow to a collection
// this code will create a collection that pluralizes the first argument - so Fruits
const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "great fruit"
});

pineapple.save();

// const person = new Person ({
//   name: "John",
//   age: 34
// });

const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple // this document will have the same ID as the one in our fruits collection now
})

insert this
person.save();

// end fold

// fold: creating some fruits and inserting them

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 8,
//   review: "a good fruit"
// })
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 8,
//   review: "consistant fruit"
// })
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 5,
//   review: "Sometimes great, often not"
// })

// bulk insert all of these
// Fruit.insertMany([kiwi,orange,banana], function(err) {
//   if (err) {console.log(err);}
//   else {console.log("Successfully saved teh fruits");}
// })
// end fold


Fruit.find(function (err, fruits) {
  if (err) console.log(err);
  else {
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    })
  }
  // close the database - prevents us from having to disconnect in the terminal with ctrl-c
  mongoose.connection.close();
});

// fold: Updating and Deleting
// updating a record
// first param is a filter
Person.updateOne({name: "John"}, {favouriteFruit: pineapple}, function (err) {
  if (err) console.log(err);
  else console.log("Succesfully updated");
})

// deletiong a record
// first param is a filter
// Fruit.deleteOne({name: "Kiwi"}, function (err) {
//   if (err) console.log(err);
//   else console.log("Succesfully deleted");
// });

// deleting many
// Person.deleteMany({name: "John"}, function (err) {
//   if (err) console.log(err);
//   else console.log("Succesfully deleted");
// });

// end fold




















//
