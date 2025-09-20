function onArrowClicked(btnNumber) {
    const arrowsStatus = document.querySelector("i.arrow-" + btnNumber).style.transform;
    if (arrowsStatus == "rotate(0deg)") {
        document.querySelector("i.arrow-" + btnNumber).style.transform = "rotate(90deg)";
        document.querySelector(".details-text-" + btnNumber).style.display = "block";
    }
    else {
        document.querySelector("i.arrow-" + btnNumber).style.transform = "rotate(0deg)"
        document.querySelector(".details-text-" + btnNumber).style.display = "none";
    }
}

let generatedNumber = 0;

function startTheGameBtn() {
    let gameStatus = Array.from(document.querySelector('.start-game-btn .btn').innerHTML);
    if (gameStatus[0] == 'S') {
        generatedNumber = Math.floor(Math.random() * 101);
        document.querySelector('.start-game-btn .btn').innerHTML = "End The Game";
        document.querySelector(".interaction-section").style.display = "block";
        window.scrollTo(0, 200);
    }
    else {
        document.querySelector('.start-game-btn .btn').innerHTML = "Start The Game";
        document.querySelector(".interaction-section").style.display = "none";
        document.querySelector('.score-display').style.display = "none";
        document.body.style.opacity = "1";
        location.reload();
    }
    gameStatus = '';
}

var userTries = 0;

function onEnterButtonPressed() {
    playGame();
    userTries++;
    document.querySelector('#tries-display').innerHTML = "Tries Taken : " + userTries;
}



function playGame() {
    // console.log(number);
    const userGuess = document.querySelector('#user-input-numbers').value;
    document.querySelector('.input-numbers input').value = "";
    const enginePrompt = document.querySelector('#engine-display-prompts');
    if (userGuess > generatedNumber) { enginePrompt.innerHTML = "You Have Entered Greater Value " }
    else if (userGuess < generatedNumber) { enginePrompt.innerHTML = "You Have Entered Smaller Value" }
    else if (userGuess == generatedNumber) {
        enginePrompt.innerHTML = "You Guess is Correct! 🎉"
        displayScore();
    }
}

function displayScore() {
    let scores = document.querySelector('.score-display');
    scores.style.display = "block";
    scores.innerHTML = "Your Scores : " + (100 - userTries);
}