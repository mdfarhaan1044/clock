const alarmTime = document.getElementById("alarmTime");
const alarmMessage = document.getElementById("alarmMessage");
const setAlarm = document.getElementById("setAlarm");
const stopAlarm = document.getElementById("stopAlarm");
const img = document.getElementById("icon");
const audio = document.getElementById("music");


let alarmTimeValue = null;
let music = null; 

export function alarm(now) {
    alarmTimeValue = localStorage.getItem("alarmTime");
    if (alarmTimeValue) {
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const formattedNow = `${hours}:${minutes}`;

        if (formattedNow === alarmTimeValue) {
            alarmMessage.innerHTML = "⏰ Alarm Ringing!";
            img.src = "alarm-clock.png";
            if (music) {
                music.play();
                music.loop = true;
            } else {
                music = new Audio("tuesday.mp3");
                music.play();
                music.loop = true;
            }
        }
    }
}

setAlarm.addEventListener("click", () => {
    // reset old alarm if already set
    if (music) {
        music.pause();
        music.currentTime = 0;
        music = null;
        alarmTimeValue = null;
        localStorage.removeItem("alarmTime");
    }

    const file = audio.files[0]; // get uploaded file
    if (!file) {
        alarmMessage.innerHTML = "Default alarm sound will be used.";
        music = new Audio("tuesday.mp3");
    } else {
        const objectUrl = URL.createObjectURL(file);
        music = new Audio(objectUrl);
    }

    alarmTimeValue = alarmTime.value;
    localStorage.setItem("alarmTime", alarmTimeValue);
    if (!alarmTimeValue) {
        alarmMessage.innerHTML = "Please enter a valid time.";
        return;
    }
    alarmMessage.innerHTML = `Alarm set for ${alarmTimeValue}`;
    img.src = "circular-alarm-clock-tool.png";
});

stopAlarm.addEventListener("click", () => {
    if (music) {
        music.pause();
        music.currentTime = 0;
        music = null;
        alarmTimeValue = null;
        localStorage.removeItem("alarmTime");
        alarmMessage.innerHTML = "Alarm Stopped";
        img.src = "circular-alarm-clock-tool.png";
    } else {
        alarmMessage.innerHTML = "No alarm to stop.";
    }
});
