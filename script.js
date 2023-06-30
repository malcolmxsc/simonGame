 /*----- constants -----*/
 // delay for next pattern
 const pauseTime = 1000;
 //initial wait time for first pattern
 const playWaitTime = 1000;



  /*----- state variables -----*/
  fails = 0;
  var score = 0;
  var pattern = [1,2,3];
  var colorCount = 0;
  var gameStart = false;
  var colorTime = 1000;
  


  /*----- cached elements  -----*/


  /*----- event listeners -----*/


  /*----- functions -----*/


  function stopGame() {
    gameStart = false;
    document.getElementById("start-btn").classList.remove("hidden");
    document.getElementById("stop-btn").classList.add("hidden");
    document.getElementById("score").innerHTML = "Score:" + score; 
  }
  
  
  function startGame() {
    console.log(pattern)
      gameStart = true;
      score = 0;
      // reset displayed score
      document.getElementById("score").innerHTML = "Score:" + score;
      document.getElementById("start-btn").classList.add("hidden");
      document.getElementById("stop-btn").classList.remove("hidden");
      document.getElementById("message").classList.add("hidden");
      colorTime = 1000;
      randomPattern();
      startPattern();
     
    }

function guessColor(color) {
    if (!gameStart) {
      return;
    }
    if (color === pattern[colorCount]) {
      if (colorCount === score) {
        // if our score reaches the same value as array size, we win, no more colors to check
        if (score === pattern.length - 1) {

          winGame();
        } else {
          //update score
          score++;
          startPattern();

        }
      } else {
        colorCount++;
      }

    } else {
      fails++;
      if (fails === 1){
        loseGame();
        
      }
    }

  }

function randomPattern() {
    for (i = 0; i < pattern.length; i++) {
      // insert a random value between 0-3 in pattern array
      pattern[i] = Math.floor(Math.random() * 4);
    }
  }


  

function lightColor(color) {
  document.getElementById("color" + color).classList.add('light');
  

}

function fadeColor(color) {
  document.getElementById("color"+color).classList.remove('light');

}




function loseGame() {
  //display lose message
  document.getElementById("message").innerHTML = "sorry you lost please try again.";
  document.getElementById("message").classList.remove("hidden");
    stopGame();
  }

function winGame() {
  // display win message
  score += 1
  document.getElementById("message").innerHTML = "Congratulations you win!";
  document.getElementById("message").classList.remove("hidden");
    stopGame();
  }

function lightSingleColor(color) {
  if (gameStart) {
    lightColor(color);
    // time till color fades back to normal
    setTimeout(fadeColor,colorTime,color);
  }

}

function startPattern() {
  let timer = playWaitTime;
  colorCount = 0;
  fails = 0;
  for (let i = 0; i <= score; i++) {
    setTimeout(lightSingleColor,timer,pattern[i]);
    // time inbetween colors lit up.
    timer += colorTime
    timer += pauseTime
  }
  // reduce wait time for next color
  colorTime -= 100;
  
  
}



  

  
