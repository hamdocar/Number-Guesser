// game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
   
// UI elements
const game = document.querySelector("#game"),
        minNum = document.querySelector(".min-num"),
        maxNum = document.querySelector(".max-num"),
        guessBtn = document.querySelector("#guess-btn");
        guessInput = document.querySelector("#guess-input"),
        message = document.querySelector(".message");


// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
if(e.target.className === "play-again") {
    window.location.reload();
}
});

//listen for guess
guessBtn.addEventListener("click", function(){
let guess = parseInt(guessInput.value);

//Validate
if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, "red");

}
// if won
if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, you win !`);
} else {
    // wrong number
    guessesLeft -= 1;
    if(guessesLeft === 0){
        //Game over - lost
        gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)
    } else {
        // game continues - answer wrong
        // change border collor
        guessInput.style.borderColor = "red";

        //clear input
        guessInput.value = "";
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }

}

});


function gameOver(won, msg){
    let color;
    won === true ? color = "green" : color = "red";   
   
   // disable input
   guessInput.disabled = true;
   //change border color
   guessInput.style.borderColor = color;

   message.style.color = color;
   // Set message that you won
   setMessage(msg);

   // Play again?
   guessBtn.value = "Play again?";
   guessBtn.className += "play-again";
   }

   //Get winning number
   function getRandomNum(min, max){
    return Math.floor(Math.random()*(max)+min);
    
   }


function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

