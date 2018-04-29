var inquirer = require("inquirer");
var randomWords = require("random-words");
var Word = require("./word");

var guessesRemaining;
var activeWord;

function initializeGame() {
    guessesRemaining = 10;
    activeWord = new Word(randomWords())
    activeWord.extractLetters();

    console.log("\nWelcome to Command-Line Hangman!");
    activeWord.displayWord();
    console.log("You have " + guessesRemaining + " lives remaining.\n");
    playRound();
}

function playRound() {
    inquirer.prompt([
        {
            name: "guess",
            type: "input",
            message: "Guess a letter! (Or type 'quit' to exit.)",
            validate: function(input) {
                if (input.length !== 1 && input.toLowerCase() !== "quit") {
                    return "Please try again.";
                }

                return true;
            }
        }
    ]).then(function(response) {
        var guess = response.guess.toLowerCase();

        if (guess === "quit") {
            return;
        } else {
            if (activeWord.checkGuess(guess)) {
                console.log("Right! You still have " + guessesRemaining + " lives remaining.\n");
            } else {
                guessesRemaining--;

                if (guessesRemaining === 0) {
                    console.log("Wrong! You now have " + guessesRemaining + " lives remaining.\n");
                    console.log("Sorry, you lost. The word was " + activeWord.word + ".");
                    return initializeGame();
                } else {
                    console.log("Wrong! You now have " + guessesRemaining + " lives remaining.\n");
                }
            }
        
            if (activeWord.guessedCorrectly()) {
                console.log("You got it!");
                initializeGame();
            } else {
                playRound();
            }
        }
    })
}

initializeGame();