
const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));

// Home Page
// what happens when someone makes a get request to the homepage
app.get("/", function(req, res) {
  // need to add the full path because at some point it will be hosted elsewhere
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);

  let result = num1 + num2;

  res.send("The result of the calculation is " + result);

})

// BMI Page
app.get("/bmiCalculator", function(req, res) {
  // need to add the full path because at some point it will be hosted elsewhere
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.get("/dog", function(req, res) {
  // need to add the full path because at some point it will be hosted elsewhere
  res.send("hi");
});

app.post("/bmiCalculator", function (req, res) {

  let height = parseFloat(req.body.height);
  let weight = parseFloat(req.body.weight);

  let result = weight / (height * height) * 703;

  res.send("Your BMI is " + result);

})

// listen on this port
app.listen(3000, function() {
  console.log("server started on port 3000");
});
