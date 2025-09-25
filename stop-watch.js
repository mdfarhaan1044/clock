const stopwatchTime = document.getElementById("stopwatchTime");
const startStop = document.getElementById("startStop");
const reset = document.getElementById("reset");
const doubleSpeed = document.getElementById("doubleSpeed");


let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;
let speed = 1

doubleSpeed.style.display = "none";

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
        doubleSpeed.style.display = "block";
    } else {
        clearInterval(timer);
        timer = null;
        startStop.textContent = "Start";
        startStop.classList.remove("stop");
        startStop.classList.add("start");
        doubleSpeed.style.display = "none";           
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
    doubleSpeed.style.display = "none";
});


doubleSpeed.addEventListener("click", () => {
    clearInterval(timer);

    if (speed === 1) {
        timer = setInterval(stopwatch, 500); // 500ms = 0.5s
        doubleSpeed.textContent = "x5";
        speed = 2;
    } else if (speed === 2) {
        timer = setInterval(stopwatch, 200); // 200ms = 0.2s
        doubleSpeed.textContent = "x10";
        speed = 5;
    } else if (speed === 5) {
        timer = setInterval(stopwatch, 100); // 100ms = 0.1s
        doubleSpeed.textContent = "x1";
        speed = 10;
    }
    else if (speed === 10) {
        timer = setInterval(stopwatch, 1000); // 1000ms = 1s
        doubleSpeed.textContent = "x2";
        speed = 1;
    }
}); 