var Letter = require("./letter");

function Word(word) {
    this.word = word;
    this.letters = [];
}

Word.prototype.extractLetters = function() {
    var splitWord = this.word.split("");
    for (var i = 0; i < splitWord.length; i++) {
        var newLetter = new Letter(splitWord[i]);
        this.letters.push(newLetter);
    }
}

Word.prototype.displayWord = function() {
    var displayedWord = "";
    for (var i = 0; i < this.letters.length; i++) {
        displayedWord += this.letters[i].displayLetter();
    }
    console.log("\nYour Word: " + displayedWord);
}

Word.prototype.checkGuess = function(guess) {
    var oldNumberGuessed = this.numberGuessed();

    for (var i = 0; i < this.letters.length; i++) {
        this.letters[i].checkGuess(guess);
    }
    this.displayWord();

    var newNumberGuessed = this.numberGuessed();

    if (newNumberGuessed === oldNumberGuessed) {
        return false;
    }

    return true;
}

Word.prototype.numberGuessed = function() {
    var lettersGuessed = 0;
    
    for (var i = 0; i < this.letters.length; i++) {
        if (this.letters[i].guessedCorrectly) {
            lettersGuessed++;
        }
    }

    return lettersGuessed;
}

Word.prototype.guessedCorrectly = function() {
    for (var i = 0; i < this.letters.length; i++) {
        if (!this.letters[i].guessedCorrectly) {
            return false;
        }
    }

    return true;
}

module.exports = Word;