let timerInterval;
let seconds = 0;

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
        startButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    timerElement.textContent = formatTime(seconds);
    startButton.disabled = false;
}

function updateTimer() {
    seconds++;
    timerElement.textContent = formatTime(seconds);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number < 10 ? `0${number}` : number;
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
