const displayTime = document.getElementById("currentTime");

import { alarm } from "./alarm.js";


setInterval(() => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    displayTime.innerHTML = currentTime;
    alarm(now)
}, 1000);


