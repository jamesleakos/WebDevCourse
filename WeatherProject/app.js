const express = require('express');
const https = require("https");
const app = express();

app.use(express.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

  const query = req.body.cityName;
  const appid = "ff33a803435965b0d3a423fd63436322";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + appid;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      // console.log(data); // this is the hexidecimal code that is returned
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const d = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<h3>It is " + d + "</h3>");
      res.write("<img src='" + imageURL + "' alt='weather-icon'>");

      res.send();
    })
  });

});

app.listen(3000, function () {
 console.log("Server is running on port 3000");
});
