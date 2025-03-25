"use strict";

// INSTRUCTIONS
/**
 * PIG GAME RULES:
 *
 * -
 */

var scores, roundScore, activePlayer, diceDOM, gamePlaying;

init();

// BUTTON NEW GAME
document.querySelector(`.btn--new`).addEventListener(`click`, init);

// BUTTON ROLL DICE
document.querySelector(`.btn--roll`).addEventListener(`click`, function () {
  if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display result
    var diceDOM = document.querySelector(`.dice`);
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    // 3. Update ROUND SCORE only if the rolled dice value is NOT `1`
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// BUTTON HOLD
document.querySelector(".btn--hold").addEventListener("click", function () {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;
    // update the UI
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if player won the game
    if (scores[activePlayer] >= 20) {
      // refactor
      document.getElementById(`name--${activePlayer}`).textContent = "WINNER!";
      document.querySelector(`.dice`).style.display = "none";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }
});

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  diceDOM = document.querySelector(`.dice`);

  diceDOM.style.display = "none";

  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.getElementById(`name--0`).textContent = "Player 1";
  document.getElementById(`name--1`).textContent = "Player 2";
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.remove("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");

  document.querySelector(`.player--0`).classList.add("player--active");
}

// NEXT PLAYER
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  document.querySelector(`.player--0`).classList.toggle("player--active");
  document.querySelector(`.player--1`).classList.toggle("player--active");

  diceDOM.style.display = "none";
}
