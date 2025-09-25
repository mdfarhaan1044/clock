const alarmTime = document.getElementById("alarmTime");
const alarmMessage = document.getElementById("alarmMessage");
const setAlarm = document.getElementById("setAlarm");
const stopAlarm = document.getElementById("stopAlarm");
const img = document.getElementById("icon");
const audio = document.getElementById("music"); // file input

let alarmTimeValue = null;
let music = null;

export function alarm(now) {
    if (alarmTimeValue) {
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const formattedNow = `${hours}:${minutes}`;

        if (formattedNow === alarmTimeValue) {
            alarmMessage.innerHTML = "⏰ Alarm Ringing!";
            img.src = "alarm-clock.png";
            if (music) {
                music.play();
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
    }

    const file = audio.files[0]; // get uploaded file
    if (!file) {
        alarmMessage.innerHTML = "Please upload an alarm sound.";
        return;
    }

    alarmTimeValue = alarmTime.value;
    if (!alarmTimeValue) {
        alarmMessage.innerHTML = "Please enter a valid time.";
        return;
    }

    const objectUrl = URL.createObjectURL(file);
    music = new Audio(objectUrl);

    alarmMessage.innerHTML = `Alarm set for ${alarmTimeValue}`;
    img.src = "circular-alarm-clock-tool.png";
});

stopAlarm.addEventListener("click", () => {
    if (music) {
        music.pause();
        music.currentTime = 0;
        music = null;
        alarmTimeValue = null;

        alarmMessage.innerHTML = "Alarm Stopped";
        img.src = "circular-alarm-clock-tool.png";
    } else {
        alarmMessage.innerHTML = "No alarm to stop.";
    }
});
