const express = require("express");
const https = require("https");

const app = express();

var items = [];

// use EJS
app.set("view engine", "ejs");

// this is a body parser that allows us to read req.body if we have given the user a form
app.use(express.urlencoded({extended: true}));

// this sends everything in public to the client and allows signup.html to refer to it
app.use(express.static("public"));

// get method for home route
app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: day, newListItems: items});
});

// post method for home route
app.post("/newItem", function(req, res) {
  item = req.body.newItem;
  items.push(item);
  res.redirect("/");
})

// listen
app.listen(3000, function () {
  console.log("Listening on Port 3000");
});
