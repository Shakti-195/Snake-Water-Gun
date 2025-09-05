// static/js/script.js

// --- Element Selectors ---
const difficultyScreen = document.getElementById('difficulty-screen');
const gameScreen = document.getElementById('game-screen');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const choiceButtons = document.querySelectorAll('.choice-btn');
const resultText = document.getElementById('result-text');
const playerScoreSpan = document.getElementById('player-score');
const highScoreSpan = document.getElementById('high-score');
const resetButton = document.getElementById('reset-btn');
const playerChoiceDisplay = document.querySelector('#player-choice-display span');
const computerChoiceDisplay = document.querySelector('#computer-choice-display span');
const outcomeAnimationContainer = document.getElementById('outcome-animation-container');
const gameOverOverlay = document.getElementById('game-over-overlay');
const playAgainButton = document.getElementById('play-again-btn');
const promptText = document.getElementById('prompt-text');
const pauseButton = document.getElementById('pause-btn');
const pauseOverlay = document.getElementById('pause-overlay');
const resumeButton = document.getElementById('resume-btn');
const doublePointsCountSpan = document.getElementById('double-points-count');
const extraLifeCountSpan = document.getElementById('extra-life-count');
const timeLeftSpan = document.getElementById('time-left');
const finalScoreSpan = document.getElementById('final-score');
const roundCounter = document.getElementById('round-counter');
const powerUpButton = document.getElementById('powerup-btn'); // ADDED THIS MISSING LINE
const extraLifeButton = document.getElementById('extra-life-btn'); // ADDED THIS MISSING LINE

// --- Audio Selectors ---
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const drawSound = document.getElementById('draw-sound');
const backgroundMusic = document.getElementById('background-music');
const muteButton = document.getElementById('mute-btn');

// --- Game State Variables ---
let currentDifficulty = 'easy';
let playerHistory = [];
let playerScore = 0;
let roundNumber = 1;
let highScore = localStorage.getItem('swg_highScore') || 0;
let isPlaying = false, isMusicStarted = false, isPaused = false;
let isGameOver = true;
let powerUpsLeft = 1, isDoublePointsActive = false;
let extraLifeUses = 1, isExtraLifeActive = false;
const MATCH_TIME_LIMIT = 30;
let timeLeft = MATCH_TIME_LIMIT;
let matchTimerId = null;

// --- Initial Setup ---
updateScoreDisplay();
updatePowerUpDisplay();

// --- Event Listeners ---
difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentDifficulty = button.dataset.difficulty;
        difficultyScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        resetGame();
    });
});

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (isGameOver || isPlaying || isPaused) return;
        playSound(clickSound);
        const userChoice = button.dataset.choice;
        playGame(userChoice);
    });
});

playAgainButton.addEventListener('click', resetGame);

resetButton.addEventListener('click', () => {
    highScore = 0;
    localStorage.removeItem('swg_highScore');
    updateScoreDisplay();
    resultText.textContent = "High Score has been reset!";
});

muteButton.addEventListener('click', toggleMusic);
pauseButton.addEventListener('click', togglePause);
resumeButton.addEventListener('click', togglePause);

powerUpButton.addEventListener('click', () => {
    if (powerUpsLeft > 0 && !isPlaying && !isGameOver && !isPaused) {
        isDoublePointsActive = true;
        powerUpsLeft--;
        updatePowerUpDisplay();
        powerUpButton.classList.add('used');
        promptText.textContent = "⚡ Double Points Activated! ⚡";
        playSound(clickSound);
    }
});

extraLifeButton.addEventListener('click', () => {
    if (extraLifeUses > 0 && !isPlaying && !isGameOver && !isPaused) {
        isExtraLifeActive = true;
        extraLifeUses--;
        updatePowerUpDisplay();
        extraLifeButton.classList.add('used');
        promptText.textContent = "❤️ Extra Life Activated! ❤️";
        playSound(clickSound);
    }
});


// --- Main Game Logic ---
function startMatchTimer() {
    if (matchTimerId !== null) return;
    isGameOver = false;
    matchTimerId = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateScoreDisplay();
            if (timeLeft < 0) {
                gameOver();
            }
        }
    }, 1000);
}

function gameOver() {
    clearInterval(matchTimerId);
    isGameOver = true;
    finalScoreSpan.textContent = playerScore;
    gameOverOverlay.classList.remove('hidden');
    playSound(loseSound);
    showOutcomeAnimation('⏰');
}

function resetGame() {
    if (matchTimerId) clearInterval(matchTimerId);
    matchTimerId = null;
    isGameOver = false;
    isPlaying = false;
    isPaused = false;
    pauseOverlay.classList.add('hidden');
    pauseButton.textContent = '⏸️';

    playerScore = 0;
    roundNumber = 1;
    timeLeft = MATCH_TIME_LIMIT;
    playerHistory = [];

    powerUpsLeft = 1;
    isDoublePointsActive = false;
    powerUpButton.classList.remove('used');
    extraLifeUses = 1;
    isExtraLifeActive = false;
    extraLifeButton.classList.remove('used');

    updateScoreDisplay();
    updatePowerUpDisplay();
    gameOverOverlay.classList.add('hidden');
    resultText.textContent = '';
    promptText.textContent = "Make your first move to start the timer!";
    playerChoiceDisplay.textContent = '?';
    computerChoiceDisplay.textContent = '?';
}

async function playGame(userChoice) {
    if (isGameOver) return;
    if (matchTimerId === null) startMatchTimer();
    if (!isMusicStarted) startMusic();

    isPlaying = true;
    promptText.textContent = '...';
    playerHistory.push(parseInt(userChoice));

    const choiceMap = { '1': '🐍', '-1': '💧', '0': '🔫' };
    playerChoiceDisplay.textContent = choiceMap[userChoice];
    computerChoiceDisplay.textContent = '?';
    computerChoiceDisplay.parentElement.classList.add('shaking');

    setTimeout(async () => {
        const response = await fetch('/play', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_choice: userChoice,
                difficulty: currentDifficulty,
                history: playerHistory
            }),
        });
        const data = await response.json();

        computerChoiceDisplay.parentElement.classList.remove('shaking');
        computerChoiceDisplay.textContent = choiceMap[data.computer_choice];

        updateScores(data.result);
        displayResult(data.result);
        
        roundNumber++;
        updateScoreDisplay();

        if (!isGameOver) {
            isPlaying = false;
            setTimeout(() => {
                if (!isPlaying) {
                    playerChoiceDisplay.textContent = '?';
                    computerChoiceDisplay.textContent = '?';
                    promptText.textContent = 'Choose your move!';
                }
            }, 2000);
        }
    }, 1500);
}

// --- Helper Functions ---
function togglePause() {
    if (isGameOver) return;
    isPaused = !isPaused;
    if (isPaused) {
        pauseOverlay.classList.remove('hidden');
        pauseButton.textContent = '▶️';
    } else {
        pauseOverlay.classList.add('hidden');
        pauseButton.textContent = '⏸️';
    }
}

function updateScores(result) {
    if (result === 'Win') {
        playerScore += isDoublePointsActive ? 2 : 1;
        powerUpsLeft++;
        extraLifeUses++;
    }
    
    if (playerScore > highScore) {
        highScore = playerScore;
        localStorage.setItem('swg_highScore', highScore);
    }
    updateScoreDisplay();
    updatePowerUpDisplay();
}

function displayResult(result) {
    let resultMessage = '';
    let resultClass = '';
    if (result === 'Lose' && isExtraLifeActive) {
        resultMessage = "❤️ Extra Life Used! Loss forgiven. ❤️";
        resultClass = 'win';
        playSound(winSound);
    } else if (result === 'Win' && isDoublePointsActive) {
        resultMessage = "⚡ Double Points! You get 2 points! ⚡";
        resultClass = 'win';
        playSound(winSound);
    } else {
        if (result === 'Win') {
            resultMessage = 'You Won! 🎉';
            resultClass = 'win';
            playSound(winSound);
        } else if (result === 'Lose') {
            resultMessage = 'You Lost. 😕';
            resultClass = 'lose';
            playSound(loseSound);
        } else {
            resultMessage = "It's a Draw. 😐";
            resultClass = 'draw';
            playSound(drawSound);
        }
    }
    promptText.textContent = '';
    resultText.textContent = resultMessage;
    resultText.className = `fade-in ${resultClass}`;
    isDoublePointsActive = false;
    isExtraLifeActive = false;
    powerUpButton.classList.remove('used');
    extraLifeButton.classList.remove('used');
}

function updatePowerUpDisplay() {
    doublePointsCountSpan.textContent = powerUpsLeft;
    extraLifeCountSpan.textContent = extraLifeUses;
}

function updateScoreDisplay() {
    playerScoreSpan.textContent = playerScore;
    highScoreSpan.textContent = highScore;
    timeLeftSpan.textContent = timeLeft;
    roundCounter.textContent = `Round ${roundNumber}`;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(error => console.log("Audio play failed:", error));
}

async function startMusic() {
    try {
        await backgroundMusic.play();
        isMusicStarted = true;
    } catch (error) {
        console.log("Music autoplay failed:", error);
    }
}

function toggleMusic() {
    if (!isMusicStarted) startMusic();
    backgroundMusic.muted = !backgroundMusic.muted;
    muteButton.textContent = backgroundMusic.muted ? '🔇' : '🔊';
}

function showOutcomeAnimation(emoji) {
    outcomeAnimationContainer.textContent = emoji;
    outcomeAnimationContainer.className = 'outcome-animation';
    setTimeout(() => {
        outcomeAnimationContainer.className = '';
    }, 1000);
}