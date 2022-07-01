require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
// const encrypt = require("mongoose-encryption"); // switched to hashing - using md5 now
const _ = require("lodash");
const md5 = require("md5");

const app = express();

// use EJS
app.set("view engine", "ejs");

// this is a body parser that allows us to read req.body if we have given the user a form
app.use(express.urlencoded({extended: true}));

// this sends everything in public to the client and allows signup.html to refer to it
app.use(express.static("public"));

// fold: mongoose set up
// connecting
mongoose.connect("mongodb://localhost:27017/userDB");

var userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// fold: old encrypting code, not using this anymore
// we are adding a plugin to our schema to encrypt it
// plugins can be added to any schema - you can even write custom ones
// see mongoose plugins for an explaination

// encrypt: the package from above
// secret: our encryption phrase
// fields: the fields we want to encrypt
// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });
// mongoose will automatically decrypt on Find
// end fold

const User = new mongoose.model("User", userSchema);

// end fold

// routes
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password) // turning this into an irreversible hash
  });
  newUser.save(function(err) {
    if (err) console.log(err);
    else res.render("secrets");
  });
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser) {
    if (err) res.send(err);
    if (foundUser) {
      if (foundUser.password === md5(password)) res.render("secrets");
      else res.send("Wrong Password");
    }
    else { res.send("User not found"); }
  });
});












app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
