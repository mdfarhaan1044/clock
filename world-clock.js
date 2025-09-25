const timeZones = Intl.supportedValuesOf("timeZone");
const select = document.getElementById("timezone-select");

timeZones.forEach(tz => {
    const option = document.createElement("option");
    option.value = tz;
    option.textContent = tz;
    select.appendChild(option);
});
select.addEventListener('change', () => {
    setInterval(() => {
        const selectedTimezone = select.value;
        const date = new Date();
        const options = { timeZone: selectedTimezone, hour12: false };
        const day = date.toLocaleDateString("en-US", options);
        const time = date.toLocaleTimeString("en-US", options);
        document.getElementById("world-time").innerHTML = `Date: ${day} Time: ${time}`;
    }, 1000);
});