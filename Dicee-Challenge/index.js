
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var diceSelect1 = "images/dice" + randomNumber1.toString() + ".png";
document.querySelector(".img1").setAttribute("src",diceSelect1);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var diceSelect2 = "images/dice" + randomNumber2.toString() + ".png";
document.querySelector(".img2").setAttribute("src",diceSelect2);

var title = document.querySelector("h1");
if (randomNumber1 > randomNumber2) {
  title.textContent = "Player 1 Wins!";
} else if (randomNumber2 > randomNumber1) {
  title.textContent = "Player 2 Wins!";
} else {
  title.textContent = "Draw!";
}
