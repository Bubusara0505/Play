const game = document.getElementById('game');
    const message = document.getElementById('message');
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const timerEl = document.getElementById('timer');
    const highscoreList = document.getElementById('highscores');

    let score = 0;
    let level = 1;
    let timeLeft = 30;
    let timer;

    function updateLeaderboard() {
      const scores = JSON.parse(localStorage.getItem('shadeScores') || '[]');
      scores.sort((a, b) => b - a);
      highscoreList.innerHTML = scores.slice(0, 5).map(s => `<li>${s}</li>`).join('');
    }

    function saveScore(newScore) {
      const scores = JSON.parse(localStorage.getItem('shadeScores') || '[]');
      scores.push(newScore);
      localStorage.setItem('shadeScores', JSON.stringify(scores));
      updateLeaderboard();
    }

    function randomColorValue() {
      return Math.floor(Math.random() * 200 + 30);
    }

    function generateLevel() {
      game.innerHTML = "";
      const baseR = randomColorValue();
      const baseG = randomColorValue();
      const baseB = randomColorValue();

      // Чем выше уровень, тем меньше разница в цвете (min 3)
      const diff = Math.max(20 - level * 2, 3);

      const correctIndex = Math.floor(Math.random() * 4);

      for (let i = 0; i < 4; i++) {
        const card = document.createElement('div');
        card.classList.add('card');

        if (i === correctIndex) {
          card.style.backgroundColor = `rgb(${baseR + diff}, ${baseG + diff}, ${baseB + diff})`;
          card.dataset.correct = "true";
        } else {
          card.style.backgroundColor = `rgb(${baseR}, ${baseG}, ${baseB})`;
        }

        card.addEventListener('click', () => {
          if (card.dataset.correct) {
            score++;
            level++;
            scoreEl.textContent = score;
            levelEl.textContent = level;
            generateLevel();
          } else {
            endGame();
          }
        });

        game.appendChild(card);
      }
    }

    function startTimer() {
      timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    }

    function endGame() {
      clearInterval(timer);
      message.textContent = `Игра окончена! Твои очки: ${score}`;
      saveScore(score);
      game.innerHTML = "";
    }

    function startGame() {
      score = 0;
      level = 1;
      timeLeft = 30;
      scoreEl.textContent = score;
      levelEl.textContent = level;
      timerEl.textContent = timeLeft;
      message.textContent = "Выбери другой оттенок";
      updateLeaderboard();
      generateLevel();
      startTimer();
    }

    // Запускаем игру
    startGame();