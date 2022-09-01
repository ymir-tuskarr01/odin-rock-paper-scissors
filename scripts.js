let winCount = 0;
const choice = ["rock", "paper", "scissors"];

function getPlayerChoice() {
    let playerChoice = prompt("Enter rock, paper or scissors", "Rock");

    return playerChoice;
}

function getComputerChoice() {
    // randomly return rock, paper, scissors
    let computerChoice = choice.map((x) => x);

    for (let i = computerChoice.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [computerChoice[i], computerChoice[j]] = [computerChoice[j], computerChoice[i]];
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
        roundResult = "Dumpstered! " + computerSelection + " beat " + playerSelection;
    } else if ( result == 1 ) {
        roundResult = "Yeay! " + playerSelection + " beat " + computerSelection;
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

function startGame(){
    // change playerSelection and computerSelection to lowercase
    let playerSelection = getPlayerChoice().toLowerCase();
    let computerSelection = getComputerChoice().toLowerCase();

    if ( !choice.includes(playerSelection)) {
        console.log("Please enter either rock, paper of scissors");
        game(1);
        return;
    }

    let playRoundResult = playRound(playerSelection, computerSelection);
    
    console.log(playRoundResult);

    let resultLowerCase = playRoundResult.toLowerCase();

    if ( resultLowerCase != "same" ) {
        if ( resultLowerCase.split("!")[0] == "yeay") {
            winCount++;
        }
    } else {
        game(1);
    }
}

game(5);