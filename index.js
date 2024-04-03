let randomNumber = parseInt(Math.random() * 100 + 1)
// console.log(randomNumber)

const userInput = document.querySelector('#guessField')
const submit = document.querySelector('#subt')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const LessORMore = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let numGuesses = 1
let playGame = true

console.log(remaining.innerHTML)

if(playGame){
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(typeof userInput.value, userInput.value) // Since the input is in String type
        const guess = parseInt(userInput.value)
        validateGuess(guess)
    })
}

function validateGuess(guess) {
    // To check if the user has entered a valied number or not
    if(isNaN(guess)){
        alert("Please enter a valid number!!")
    } else if (guess < 1){
        alert("Please enter a number greater than 1!!")
    } else if (guess > 100){
        alert("Please enter a number lesser than 100!!")
    } else {
        prevGuess.push(guess)
        // console.log(prevGuess)
        if(numGuesses === 10){
            displayGuess(guess)
            displayMessage(`Game Over, Random number was ${randomNumber}`)
            endGame()
        } else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    // To check if the input matches the guess or not
    if(guess === randomNumber){
        displayMessage(`You guessed it right!`)
        endGame()
    } else if (guess < randomNumber){
        displayMessage(`Number is too Low`)
    } else if (guess > randomNumber){
        displayMessage(`Number is too High`)
    }
}

function displayGuess(guess){
    //Clears the input box, so that the user can enter the new values
    userInput.value = ""
    guessSlot.innerHTML += `${guess} `
    numGuesses++;
    remaining.innerHTML = `${11 - numGuesses}`
}

function displayMessage(message){
    //Interacts with DOM
    LessORMore.innerHTML = `<h2>${message}</h2>`
}

function endGame(){
    userInput.value = ""
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`
    p.style.cursor = "pointer"
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', () => {
        randomNumber = parseInt(Math.random() * 100 + 1)
        prevGuess = []
        numGuesses = 1;
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11 - numGuesses}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
    })
}