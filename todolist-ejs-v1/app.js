const express = require("express");
const https = require("https");

const app = express();

// use EJS
app.set("view engine", "ejs");

// this is a body parser that allows us to read req.body if we have given the user a form
app.use(express.urlencoded({extended: true}));

// this sends everything in public to the client and allows signup.html to refer to it
app.use(express.static("public"));

// get method for home route
app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("Error: current day is equal to " + currentDay);
      break;
  }

  res.render("list", {kindOfDay: day});
});

// listen
app.listen(3000, function () {
  console.log("Listening on Port 3000");
});
