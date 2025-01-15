const player = document.getElementById('player');
const tagger = document.getElementById('tagger');
const obstacles = document.querySelectorAll('.obstacle');
let playerX = 0;
let playerY = 0;
let taggerX = 100;
let taggerY = 100;

// Move player with arrow keys
document.addEventListener('keydown', (e) => {
  const step = 10;
  switch (e.key) {
    case 'ArrowUp':
      playerY -= step;
      break;
    case 'ArrowDown':
      playerY += step;
      break;
    case 'ArrowLeft':
      playerX -= step;
      break;
    case 'ArrowRight':
      playerX += step;
      break;
  }
  moveCharacter(player, playerX, playerY);
});

// Move tagger towards player
setInterval(() => {
  if (playerX > taggerX) taggerX += 5;
  if (playerX < taggerX) taggerX -= 5;
  if (playerY > taggerY) taggerY += 5;
  if (playerY < taggerY) taggerY -= 5;
  moveCharacter(tagger, taggerX, taggerY);
  checkCollision();
}, 100);

function moveCharacter(character, x, y) {
  character.style.transform = `translate(${x}px, ${y}px)`;
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const taggerRect = tagger.getBoundingClientRect();
  if (isColliding(playerRect, taggerRect)) {
    alert('Tag! You\'ve been caught!');
    resetGame();
  }
}

function isColliding(rect1, rect2) {
  return !(rect1.right < rect2.left ||
           rect1.left > rect2.right ||
           rect1.bottom < rect2.top ||
           rect1.top > rect2.bottom);
}

function resetGame() {
  playerX = 0;
  playerY = 0;
  taggerX = 100;
  taggerY = 100;
  moveCharacter(player, playerX, playerY);
  moveCharacter(tagger, taggerX, taggerY);
}
