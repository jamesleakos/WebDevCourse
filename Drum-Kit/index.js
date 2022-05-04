

var buttons = document.querySelectorAll(".drum");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click",function () {
    this.style.color = "white";
  });
}


// var drumSound = new Audio("sounds/tom-1.mp3");
// drumSound.play();
