require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

// use EJS
app.set("view engine", "ejs");

// this is a body parser that allows us to read req.body if we have given the user a form
app.use(express.urlencoded({extended: true}));

// this sends everything in public to the client and allows signup.html to refer to it
app.use(express.static("public"));

// setting up sessions
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize()); // initialize the passport
app.use(passport.session()); // use passport to manage the sessions

// fold: mongoose set up
// connecting
mongoose.connect("mongodb://localhost:27017/userDB");

var userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose); // userSchema uses passportLocalMongoose as a plugin

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy()); // using passportLocalMongoose to create a LOCAL login strategy

passport.serializeUser(User.serializeUser()); // setup passport to serialize and deserialize the User
passport.deserializeUser(User.deserializeUser());

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

app.get("/secrets", function(req, res) {
  // The below line was added so we can't display the "/secrets" page
  // after we logged out using the "back" button of the browser, which
  // would normally display the browser cache and thus expose the
  // "/secrets" page we want to protect. Code taken from this post.
  res.set(
      'Cache-Control',
      'no-cache, private, no-store, must-revalidate, max-stal e=0, post-check=0, pre-check=0'
  );

  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function (req,res) {
  req.logout(function(err) {
    if (err) console.log(err);
    else res.redirect("/");
  });
})

app.post("/register", function(req, res) {
  // this is a passportLocalMongoose function
  User.register({username: req.body.username}, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    }
    else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login",
    passport.authenticate("local"), function(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/secrets");
        }
    });
});




app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
