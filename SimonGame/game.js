
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];

$(".btn").on("click",function () {
  animateButton($(this));
  userPattern.push($(this).attr("id"));
  if (userPattern.length === gamePattern.length) {
    console.log("userPattern: " + userPattern + "; gamePattern: " + gamePattern);
    if (arrayCheck(userPattern, gamePattern)) {
      userPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 500);
    }
    else {
      setTimeout(function() {
        $("#level-title").text("You lose - press key for new game");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        gamePattern = [];
        userPattern = [];
      }, 200);
    }
  }
});

$(document).on("keypress",function() {
  if (gamePattern.length !== 0) return;
  $("#level-title").text("Good luck");
  setTimeout(function() {
    nextSequence();
  }, 500);
});

function nextSequence() {
  var randomInt = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomInt];
  gamePattern.push(randomChosenColor);
  var selectedButton = $("#" + randomChosenColor);
  animateButton(selectedButton);
}

function animateButton(button) {
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);
  var audio = new Audio("sounds/" + button.attr("id") + ".mp3");
  audio.play();
}

function arrayCheck (array1, array2) {
  if (array1.length !== array2.length) return false;
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}
