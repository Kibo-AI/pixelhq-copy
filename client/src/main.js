import { startGame } from './game/Game.js';

const loginEl = document.getElementById('login');
const gameContainer = document.getElementById('game-container');
const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim().toLowerCase();
  const skin = parseInt(document.getElementById('skin').value, 10);

  if (!username || isNaN(skin)) {
    alert('Please enter a username and select a skin.');
    return;
  }

  loginEl.style.display = 'none';
  gameContainer.style.display = 'block';

  startGame(username, skin, gameContainer);
});
