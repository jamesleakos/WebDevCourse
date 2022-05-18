
const express = require("express");
const app = express();

// what happens when someone makes a get request to the homepage
app.get("/", function(req, res) {
  res.send("<h1>jump</h1>");
});

// this is a route
app.get("/contact", function(req, res) {
  res.send("Contact me at: jamesleakos@gmail.com");
});

// this is a route
app.get("/about", function(req, res) {
  res.send("I am a software engineer in Flagstaff, AZ");
});

app.get("/nodemon-test", function(req, res) {
  res.send("Does this refresh??");
});

// listen on this port
app.listen(3000, function() {
  console.log("server started on port 3000");
});
