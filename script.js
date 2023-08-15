const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let timerInterval;
let remainingTime = 0;

function startTimer(duration) {
    let startTime = Date.now();
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        remainingTime = Math.max(duration - Math.floor(elapsedTime / 1000), 0);

        updateTimerDisplay();

        if (remainingTime === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    secondsDisplay.textContent = seconds.toString().padStart(2, "0");
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    remainingTime = 0;
    updateTimerDisplay();
}

startButton.addEventListener("click", () => {
    const timeInput = document.getElementById("time");
    const selectedTime = parseInt(timeInput.value, 10);
    if (!isNaN(selectedTime) && selectedTime > 0) {
        startTimer(selectedTime * 60); // Convert minutes to seconds
    } else {
        alert("Please enter a valid time.");
    }
});

stopButton.addEventListener("click", stopTimer);

resetButton.addEventListener("click", resetTimer);
