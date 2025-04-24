const game = document.getElementById('game');
const message = document.getElementById('message');

function randomColorValue() {
  return Math.floor(Math.random() * 200 + 30); // не слишком бледно
}

function generateLevel() {
  game.innerHTML = "";
  const baseR = randomColorValue();
  const baseG = randomColorValue();
  const baseB = randomColorValue();
  const diff = 15;

  const correctIndex = Math.floor(Math.random() * 4);

  for (let i = 0; i < 4; i++) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (i === correctIndex) {
      // Отличающийся цвет
      card.style.backgroundColor = `rgb(${baseR + diff}, ${baseG + diff}, ${baseB + diff})`;
      card.dataset.correct = "true";
    } else {
      card.style.backgroundColor = `rgb(${baseR}, ${baseG}, ${baseB})`;
    }

    card.addEventListener('click', () => {
      if (card.dataset.correct) {
        message.textContent = "Угадал! Следующий раунд...";
        generateLevel();
      } else {
        message.textContent = "Game Over 😢";
        game.innerHTML = "";
      }
    });

    game.appendChild(card);
  }
}

generateLevel();