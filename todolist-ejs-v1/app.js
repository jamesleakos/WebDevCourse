const express = require("express");
const https = require("https");
const date = require(__dirname + "/date.js");

const app = express();

// use EJS
app.set("view engine", "ejs");

// this is a body parser that allows us to read req.body if we have given the user a form
app.use(express.urlencoded({extended: true}));

// this sends everything in public to the client and allows signup.html to refer to it
app.use(express.static("public"));

let items = [];
let workItems = [];

// get method for home route
app.get("/", function (req, res) {
  let day = date.getDay();
  res.render("list", {listTitle: day, newListItems: items});
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work", newListItems: workItems});
});

app.post("/work", function(req, res) {
  item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

// post method for home route
app.post("/newItem", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");

  } else {
    items.push(item);
    res.redirect("/");

  }
})

app.get("/about", function(req, res) {
  res.render("about");
});



// listen
app.listen(3000, function () {
  console.log("Listening on Port 3000");
});
