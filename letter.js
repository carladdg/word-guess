function Letter(letter) {
    this.letter = letter;
    this.guessedCorrectly = false;
}

Letter.prototype.displayLetter = function() {
    if (this.guessedCorrectly) {
        return this.letter + " ";
    }

    return "_ ";
}

Letter.prototype.checkGuess = function(guess) {
    if (guess === this.letter) {
        this.guessedCorrectly = true;
    }
}

module.exports = Letter;