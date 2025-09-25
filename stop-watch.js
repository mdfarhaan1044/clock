const stopwatchTime = document.getElementById("stopwatchTime");
const startStop = document.getElementById("startStop");
const reset = document.getElementById("reset");


let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;

function updateDisplay() {
    let h = String(hours).padStart(2, "0");
    let m = String(minutes).padStart(2, "0");
    let s = String(seconds).padStart(2, "0");
    stopwatchTime.textContent = `${h}:${m}:${s}`;
}

updateDisplay();

function stopwatch() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    updateDisplay();
}

startStop.addEventListener("click", () => {
    if (timer === null) {
        timer = setInterval(stopwatch, 1000);
        startStop.textContent = "Stop";
        startStop.classList.remove("start");
        startStop.classList.add("stop");
    } else {
        clearInterval(timer);
        timer = null;
        startStop.textContent = "Start";
        startStop.classList.remove("stop");
        startStop.classList.add("start");
    }
});

reset.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    [hours, minutes, seconds] = [0, 0, 0];
    updateDisplay();
    startStop.textContent = "Start";
    startStop.classList.remove("stop");
    startStop.classList.add("start");
});