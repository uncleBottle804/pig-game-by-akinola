"use strict";

var instructions, scores, roundScore, activePlayer, dieDOM, gamePlaying;

instructions = `
PIG GAME RULES:
====================
1. The game has 2(two) players, playing in rounds

2. In each turn, a player rolls the "DIE" as many times as he/she wishes to generate random score points. 

3. Each result of each roll gets added to the current player's "ROUND SCORE"

4. But if any player rolls a "1", the player losses all his current "ROUND SCORE" points which will not be added to his/her "GLOBAL SCORE". After that happens, it's the next player's turn

5. The players can choose to "HOLD CURRENT VALUE", which means that his/her current "ROUND SCORE" points gets added to his "GLOBAL SCORE". After that happens, it's the next player's turn

6. The first player to reach 50 points on "GLOBAL SCORE" wins the game

TEST YOUR LUCK AGAINST EACH OTHER!!👌👍
`;

init();
alert(instructions);

// BUTTON NEW GAME
document.querySelector(`.btn--new`).addEventListener(`click`, init);

// BUTTON ROLL die
document.querySelector(`.btn--roll`).addEventListener(`click`, function () {
  if (gamePlaying) {
    // 1. Random number
    var die = Math.floor(Math.random() * 6) + 1;
    // 2. Display result
    var dieDOM = document.querySelector(`.die`);
    dieDOM.style.display = "block";
    dieDOM.src = `images/die-${die}.png`;

    // 3. Update ROUND SCORE only if the rolled die value is NOT `1`
    if (die !== 1) {
      // Add score
      roundScore += die;
      document.getElementById(`current--${activePlayer}`).textContent =
        roundScore;
    } else {
      alert(`You rolled a "1", it is the next palyer's turn`);
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
    if (scores[activePlayer] >= 50) {
      // refactor
      alert(`Congrats, Player ${activePlayer + 1} won the game`);
      document.getElementById(`name--${activePlayer}`).textContent = "WINNER!!";
      document.querySelector(`.die`).style.display = "none";
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

  dieDOM = document.querySelector(`.die`);

  dieDOM.style.display = "none";

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
  // alert(`You started a new game`);
}

// NEXT PLAYER
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  document.querySelector(`.player--0`).classList.toggle("player--active");
  document.querySelector(`.player--1`).classList.toggle("player--active");

  dieDOM.style.display = "none";
}
