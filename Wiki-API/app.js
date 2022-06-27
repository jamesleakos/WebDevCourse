// packages set up
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

// this is a body parser that allows us to read req.body if we have given the user a form
app.use(express.urlencoded({extended: true}));
// push the folder for css, etc.
app.use(express.static("public"));

// DB set up
// connect to our todolistDB (will create it if it doesn't exist)
// local
// mongoose.connect("mongodb://localhost:27017/todolistDB");
// cloud
mongoose.connect("mongodb://localhost:27017/wikiDB");

// set up the schema
const articlesSchema = new mongoose.Schema({
  title: String,
  content: String,
  titleKebab: String
});

// set up the model
var Article = mongoose.model('article', articlesSchema);

app.get("/", function(req, res) {
  res.send("Access articles at /articles");
})

////////////// Targeting all Articles //////////////////

app.route("/articles")

.get(function(req, res) {
  Article.find({}, function(err, foundArticles) {
    if (err) res.send(err);
    res.send(foundArticles);
  });
})

.post(function(req,res) {
  var newArticle = new Article ({
    title: req.body.title,
    content: req.body.content,
    titleKebab: _.kebabCase(req.body.title)
  });
  newArticle.save(function(err){
    if (err) res.send(err);
    else res.redirect("/articles");
  });
})

.delete(function(req, res) {
  Article.deleteMany({}, function(err) {
    if (err) res.send(err);
    else res.redirect("/articles");
  });
});

///////////////// Targeting One Articles /////////////////

app.route("/articles/:title")

.get(function(req, res) {
  var title = _.kebabCase(req.params.title);
  Article.findOne({titleKebab: title}, function(err, foundArticle) {
    if (err) res.send(err);
    else if (foundArticle) res.send(foundArticle);
    else (res.send("Article not found"));
  });
})

.put(function(req, res) {
  var titleKebab = _.kebabCase(req.params.title);
  var newTitle = req.body.title;
  if (newTitle) var newTitleKebab = _.kebabCase(req.body.title);
  var newContent = req.body.content

  // replaceOne is better for .put - because it will delete any fields that you don't supply
  Article.replaceOne(
    {titleKebab: titleKebab},
    {title: newTitle, content: newContent, titleKebab: newTitleKebab},
    function (err) {
      if (err) res.send(err);
      else res.redirect("/articles");
    }
  );
})
.patch(function(req, res) {
  var titleKebab = _.kebabCase(req.params.title);
  var newTitle = req.body.title;
  if (newTitle) var newTitleKebab = _.kebabCase(req.body.title);
  var newContent = req.body.content

  Article.updateOne(
    {titleKebab: titleKebab},
    {title: newTitle, content: newContent, titleKebab: newTitleKebab},
    function (err) {
      if (err) res.send(err);
      else res.redirect("/articles");
    }
  );
})
.delete(function(req, res) {
  var titleKebab = _.kebabCase(req.params.title);

  Article.deleteOne(
    {titleKebab: titleKebab},
    function (err) {
      if (err) res.send(err);
      else res.redirect("/articles");
    }
  );
});

// run the app

app.listen(3000, function() {
  console.log("Server started on port 3000");
})








//
