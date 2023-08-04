let timerInterval;
let seconds = 0;
let initialTime = 0;
let isFlashing = false;

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const inputTime = document.getElementById('inputTime');
const alarmAudio = document.getElementById('alarmAudio');
const playAlarmButton = document.getElementById('playAlarm');

function startTimer() {
    if (!timerInterval) {
        initialTime = parseInt(inputTime.value) * 60;
        seconds = initialTime;
        timerInterval = setInterval(updateTimer, 1000);
        startButton.disabled = true;
        inputTime.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    timerElement.textContent = formatTime(seconds);
    startButton.disabled = false;
    inputTime.disabled = false;
    isFlashing = false;
    document.body.style.backgroundColor = '#f0f0f0';
    alarmAudio.pause(); // Pause the audio on reset
    alarmAudio.currentTime = 0; // Reset the audio to the beginning
}

function updateTimer() {
    if (seconds > 0) {
        seconds--;
        timerElement.textContent = formatTime(seconds);
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        timerElement.textContent = 'Time\'s Up!';
        flashBackground();
        playAlarm();
        startButton.disabled = false;
        isFlashing = true;
    }
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number < 10 ? `0${number}` : number;
}

function flashBackground() {
    if (isFlashing) {
        document.body.style.backgroundColor = document.body.style.backgroundColor === '#f0f0f0' ? 'red' : '#f0f0f0';
        setTimeout(flashBackground, 500);
    }
}

playAlarmButton.addEventListener('click', playAlarm);

function playAlarm() {
    alarmAudio.play();
}

function playAlarm() {
    const audio = new Audio('alarm.mp3');
    audio.play();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

