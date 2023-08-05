const timerDisplay = document.getElementById('timer');
const startingTimeInput = document.getElementById('startingTime');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const smallBlindInput = document.getElementById('smallBlind');
const bigBlindDisplay = document.getElementById('bigBlindDisplay');
const alarmSound = document.getElementById('alarmSound');

let timer;
let seconds = 0;
let isRunning = false;
let smallBlind = parseInt(smallBlindInput.value);

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    if (seconds > 0) {
        seconds--;
        timerDisplay.textContent = formatTime(seconds);
    } else {
        clearInterval(timer);
        isRunning = false;
        timerDisplay.textContent = "00:00";
        playAlarm();
    }
}

function playAlarm() {
    alarmSound.play();
}

function updateBigBlindDisplay() {
    const smallBlindValue = parseInt(smallBlindInput.value);
    const bigBlindValue = smallBlindValue * 2;
    bigBlindDisplay.textContent = `${bigBlindValue}`;
}

startButton.addEventListener('click', () => {
    if (!isRunning) {
        seconds = parseInt(startingTimeInput.value) * 60;
        timerDisplay.textContent = formatTime(seconds);
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
    }
});

pauseButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    seconds = 0;
    isRunning = false;
    timerDisplay.textContent = formatTime(seconds);
});

smallBlindInput.addEventListener('change', () => {
    smallBlind = parseInt(smallBlindInput.value);
    updateBigBlindDisplay();
});

updateBigBlindDisplay();
