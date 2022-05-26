// We can post this anywhere

const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({extended: true}));
// this sends everything in public to the client and allows signup.html to refer to it
app.use(express.static("public"));

// up to here

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log(req.body.firstName + " " + req.body.lastName + " is signing up with email: " + req.body.email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/c05ad5e170";

  const options = {
    method: "POST",
    auth: "James Leakos:5254ee752dcd06995a503bf55b135894-us12",
  }

  const request = https.request(url, options, function (response) {
    response.on("data", function(data) {
      console.log(response.statusCode);

      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");
      }
    })
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/success", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on Port 3000");
});


// API Key
// 5254ee752dcd06995a503bf55b135894-us12

// list Id
// c05ad5e170
