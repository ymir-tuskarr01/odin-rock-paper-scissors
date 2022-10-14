"use strict"
// let winCount = 0;
let playerScore = 0;
let computerScore = 0;
const choice = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll("#divButton button");
const playerScorePlaceHolder = document.querySelector("#divScore .player");
const computerScorePlaceHolder = document.querySelector("#divScore .computer");
const roundResultPlaceHolder = document.querySelector("#divResult .round");
const gameResultPlaceHolder = document.querySelector("#divResult .game");
const buttonReset = document.getElementById("divButtonReset");

// 2022/10/14: added for ui style
for (let button in Array.from(buttons)) {
    if (typeof button !== "function") {
        buttons[button].addEventListener("click", startGame);
    }
}

// 2022/10/14: function parameter added (event)
// 2022/10/14: change playerChoice from prompt to select from button
function getPlayerChoice(event) {
    // let playerChoice = prompt("Enter rock, paper or scissors", "Rock");
    let playerChoice = event.target.getAttribute("data-name");

    if ( playerChoice == null ) {
        return "";
    }

    return playerChoice;
}

function getComputerChoice() {
    // randomly return rock, paper, scissors
    let computerChoice = choice.map((x) => x);

    for (let i = computerChoice.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [computerChoice[i], computerChoice[j]] = 
        [computerChoice[j], computerChoice[i]];
    }

    return computerChoice[0];
}

function playRound(playerSelection, computerSelection) {
    let result = 0;
    let roundResult;

    // compare playerSelection and computerSelection
    // if same, repeat
    // general rule: rock > scissors; scissors > paper; paper > rock
    if ( !playerSelection == !computerSelection ) {
        if ( playerSelection == "rock" ) {
            if ( computerSelection == "paper" ) {
                result = -1;
            } else if ( computerSelection == "scissors" ) {
                result = 1;
            }
        } else if ( playerSelection == "paper" ) {
            if ( computerSelection == "rock" ) {
                result = 1;
            } else if ( computerSelection == "scissors" ) {
                result = -1;
            }
        } else if ( playerSelection == "scissors" ) {
            if ( computerSelection == "rock" ) {
                result = -1;
            } else if ( computerSelection == "paper" ) {
                result = 1;
            }
        }
    }

    // return string that declare winner: win (Yeay! {our choice} beat {computer choice}), lose (Dumpstered! {computer choice} beat {our choice})
    if ( result == 0 ) {
        roundResult = "Same";
    } else if ( result == -1 ) {
        roundResult = 
            "Dumpstered! " + computerSelection + " beat " + playerSelection;
    } else if ( result == 1 ) {
        roundResult = 
            "Yeay! " + playerSelection + " beat " + computerSelection;
    }

    return roundResult;
}

function game(n) {
    if ( n == 1 ) {
        // simplest case: startGame to play a round
        startGame();
    } else {
        // call playRound() 5 times
        for ( let i = n; i > 0; i--) {
            // simplest case: startGame to play a round
            startGame(); 
        }

        // record every round and at the end, winner or loser will be determined and reported.
        if ( winCount > 2 ) {
            console.log("You won!");
        } else {
            console.log("You lost!");
        }
    }
}

// 2022/10/14: function parameter added (event)
function startGame(event) {
    // change playerSelection and computerSelection to lowercase
    let playerSelection = getPlayerChoice(event).toLowerCase();
    let computerSelection = getComputerChoice().toLowerCase();

    // not needed with ui style
    // if ( !choice.includes(playerSelection)) {
    //     console.log("Please enter either rock, paper of scissors");
    //     // game(1);
    //     return;
    // }

    let playRoundResult = playRound(playerSelection, computerSelection);
    
    // console.log(playRoundResult);
    roundResultPlaceHolder.textContent = playRoundResult;

    let resultLowerCase = playRoundResult.toLowerCase();

    // this logic is not good, better use false/true and counter to keep track
    if ( resultLowerCase != "same" ) {
        if ( resultLowerCase.split("!")[0] == "yeay") {
            // winCount++;
            playerScore++;
        } else {
            computerScore++;
        }
    }
    
    playerScorePlaceHolder.textContent = playerScore;
    computerScorePlaceHolder.textContent = computerScore;
    //not needed with ui style
    // else {
    //     // game(1);
    // }
    if (playerScore > 4 || computerScore > 4) {
        endGame();
    }
}

function endGame() {
    for (let button in Array.from(buttons)) {
        if (typeof button !== "function") {
            buttons[button].removeEventListener("click", startGame);
        }
    }

    buttonReset.style.display = "block";
    buttonReset.addEventListener("click", resetGame);

    if (playerScore > 4) gameResultPlaceHolder.textContent = "You won";
    if (computerScore > 4) gameResultPlaceHolder.textContent = "You lose";

    return;
}

function resetGame(event) {
    event.target.parentNode.style.display = "none";
    event.target.removeEventListener("click", resetGame);

    playerScore = 0;
    computerScore = 0;

    playerScorePlaceHolder.textContent = "";
    computerScorePlaceHolder.textContent = "";
    roundResultPlaceHolder.textContent = "";
    gameResultPlaceHolder.textContent = "";

    for (let button in Array.from(buttons)) {
        if (typeof button !== "function") {
            buttons[button].addEventListener("click", startGame);
        }
    }
}
// game(5);