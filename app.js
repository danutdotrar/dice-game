// On roll dice, switch the dices to be random
// Select the dices

// Select the elements
const dice1Elem = document.querySelector('#dice1');
const dice2Elem = document.querySelector('#dice2');
const score0Elem = document.querySelector('#score--0');
const score1Elem = document.querySelector('#score--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnHow = document.querySelector('.btn--how');

const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

const player0Elem = document.querySelector('.player--0');
const player1Elem = document.querySelector('.player--1');

const modal = document.querySelector('.modal');
const overlay= document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');


// Set the current score to 0
let currentScore = 0;

// Set the initial score to 0
score0Elem.textContent = 0;
score1Elem.textContent = 0;

// Created a variable that holds the state of the game
// This is a 'state variable' which tells us the condition of the game
// if playing is true, then the buttons work and the functions are executed
let playing = true;

// Start with 0 points for both sides (the big scores above current scores)
// Score of player 1 will be scores[0]; player 2 will have scores[1]
let scores = [0, 0];

// TotalScore
let totalScore = 0;

// Set the active player to 0 (player 1)
let activePlayer = 0;

// Hide the dices
dice1Elem.classList.add('hidden');
dice2Elem.classList.add('hidden');

// Random dice function
function random() {
    if (playing) {
        // Generate random dice roll
        const dice1 = Math.trunc(Math.random() * 6 + 1);
        const dice2 = Math.trunc(Math.random() * 6 + 1);

        // Display the dice
        dice1Elem.classList.remove('hidden');
        dice2Elem.classList.remove('hidden');

        // Build the dice name dinamically
        dice1Elem.src = `dice-${dice1}.png`;
        dice2Elem.src = `dice-${dice2}.png`;

        // If dice1 or dice2 !== 1, play game
        if (dice1 !== 1 && dice2 !== 1) {
            let sumDice = dice1 + dice2

            // Add dice to current score
            currentScore += sumDice;

            // Select the element dinamically based on active player
            // Build the ID name dinamically
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            switchPlayer();
        }
    }
};

function switchPlayer() {
    // Reset the score to 0
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // Switch the player
    // If the active player is 0 then active player will be 1, else player will be 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    // Toggle the classes
    // If its active, remove it; and if its not active, add it
    player0Elem.classList.toggle('player--active');
    player1Elem.classList.toggle('player--active');
};

function resetGame() {
    currentScore = 0;
    scores = [0, 0];

    // Remove winner class
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    // Set & make player1 active 
    activePlayer = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    // Reset current scores
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    // Reset global scores
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    //
    playing = true;
    dice1Elem.classList.add('hidden');
    dice2Elem.classList.add('hidden');
}

function holdScore() {
    // If playing is true, the function executes
    if (playing) {
        // Add total score to current score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 100
        if (scores[activePlayer] >= 25) {
            playing = false;

            // Finish game
            // Add player winner class
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            // Remove player active class
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        } else {
            switchPlayer();
        }
    }
}

function openModal() {
    console.log(`Button clicked: ${this.textContent}`);
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

// Close the modal
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// Close the modal at ESC press
function closeModalEsc(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
    }
};


document.addEventListener('keydown', closeModalEsc);

overlay.addEventListener('click', closeModal); 

btnClose.addEventListener('click', closeModal);

btnHow.addEventListener('click', openModal);

btnNew.addEventListener('click', resetGame);

btnRoll.addEventListener('click', random);

// On press, hold current score and switch player
btnHold.addEventListener('click', holdScore);
