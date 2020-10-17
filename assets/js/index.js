const scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;

const currentPlayey1Score = document.getElementById('current-0');
const currentPlayey2Score = document.getElementById('current-1');
const globalPlayey1Score = document.getElementById('score-0');
const globalPlayey2Score = document.getElementById('score-1');
const activePlayer1Content = document.querySelector('.player-0-panel');
const activePlayer2Content = document.querySelector('.player-1-panel');
const rulesText = document.querySelector('.rules');
const rollDiceButton = document.querySelector('.btn-roll');
const holdButton = document.querySelector('.btn-hold');
const newGameBtn = document.querySelector('.btn-new');

const diceImage = document.querySelector('img.dice');

diceImage.style.display = 'none';

function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

rollDiceButton.addEventListener('click', () => {
  const currentScore = document.getElementById(`current-${activePlayer}`);
  let dice = randomInteger(1, 6);

  diceImage.style.display = 'block';
  diceImage.src = `/assets/img/dice-${dice}.png`;

  if (dice === 1) {
    currentScore.textContent = -1;
    togglePlayer();
  }

  roundScore = +currentScore.textContent + dice;
  currentScore.textContent = roundScore;
});

holdButton.addEventListener('click', () => {
  const playerName = document.getElementById(`name-${activePlayer}`);
  const playerPanel = document.querySelector(`.player-${activePlayer}-panel`);

  scores[activePlayer] += roundScore;
  roundScore = 0;

  globalPlayey1Score.textContent = scores[0];
  globalPlayey2Score.textContent = scores[1];

  currentPlayey1Score.textContent = 0;
  currentPlayey2Score.textContent = 0;
  diceImage.style.display = 'none';

  if (scores[activePlayer] >= 100) {
    playerName.textContent = 'WINNER!';
    playerPanel.classList.add('winner');
    playerPanel.classList.remove('active');
  } else {
    togglePlayer();
  }
});

function togglePlayer() {
  activePlayer1Content.classList.toggle('active');
  activePlayer2Content.classList.toggle('active');
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}

newGameBtn.addEventListener('click', () => {
  const playerName = (document.getElementById(`name-${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`);
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  activePlayer2Content.classList.remove('active');
  activePlayer1Content.classList.remove('winner');
  activePlayer2Content.classList.remove('winner');
  activePlayer1Content.classList.add('active');
  diceImage.style.display = 'none';
  currentPlayey1Score.textContent = 0;
  currentPlayey2Score.textContent = 0;
  globalPlayey1Score.textContent = 0;
  globalPlayey2Score.textContent = 0;
});

const rulesBtn = document.querySelector('.btn-rules').addEventListener('click', () => {
  rulesText.classList.toggle('hide');
});
