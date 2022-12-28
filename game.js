var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var gamePattern = [];

var userClickedPattern = [];

var started = "false";

//Game started or not

$(document).keydown(function () {
  if (started === "false")
  {
    nextSequence();
    started="true";
  }
});

//Event listener of button click

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");                                   //variable to store user chosen colour
  userClickedPattern.push(userChosenColour);                                   //stores user clicked pattern

  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer((userClickedPattern.length-1));
});

//
function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);                              //random number generator [0,4)

  var randomChosenColour = buttonColours[randomNumber];                          //random colour chosen based on random number generated
  gamePattern.push(randomChosenColour);                                          //stores game pattern

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);              //shows random chosen colour

  playSound(randomChosenColour);                                                 //plays sound of random chosen colour

  level++;                                                                       //increase the level

  $("#level-title").text("Level " + level);                                      //shows the current level
}

//play sound

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//show the clicked button

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");                                       //change button styles of clicked buttons

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");                                  //restore button styles
  }, 100);
}

//checks if sequence is right or wrong

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {               //checks with each clicks

    if ((currentLevel+1) === level) {                                                 //checks if we got all correct

      setTimeout(function () {
        nextSequence();                                                               //allot next colour in game pattern
      }, 1000);
    }
  }
  else{

    playSound("wrong");                                                               //play sound of wrong if it is wrong

    $("body").addClass("game-over");                                                  //change body styles when it is wrong for set time

    setTimeout(function(){
      $("body").removeClass("game-over");                                             //restore body styles
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");                    //change heading when it is wrong

    startOver();
  }
}

//Reset the values to starting point

function startOver(){
  level=0;
  gamePattern=[];
  started="false";
}

