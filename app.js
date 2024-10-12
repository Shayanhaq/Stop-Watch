const stopwatch = document.getElementById('stopwatch');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

let intervalId;
let startTime;
let elapsedTime = 0;

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours;

    // Get milliseconds (remainder) for display
    const ms = Math.floor((milliseconds % 1000) / 10);  // Only show 2 digits for milliseconds (hundredths)

    // Format the time to be 2 digits (e.g., 01:02:03.45)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!intervalId) {
        startTime = new Date().getTime() - elapsedTime; // Resume from where it stopped
        intervalId = setInterval(() => {
            const now = new Date().getTime();
            elapsedTime = now - startTime;
            stopwatch.textContent = formatTime(elapsedTime);
        }, 10); // Update every 10 milliseconds
    }
}

function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    stopwatch.textContent = '00:00:00.00';
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
