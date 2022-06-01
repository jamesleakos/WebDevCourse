const express = require("express");
const https = require("https");

const app = express();

// this is a body parser that allows us to read req.body if we have given the user a form
app.use(express.urlencoded({extended: true}));

// this sends everything in public to the client and allows signup.html to refer to it
app.use(express.static("public"));

// get method for home route
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Listening on Port 3000");
});
