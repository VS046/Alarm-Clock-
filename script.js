
const timeText = document.querySelector("h1");
const selects = document.querySelectorAll("select");
const button = document.querySelector("button");


let alarm = "";
let alarmOn = false;
const sound = new Audio("./files/ringtone.mp3");


for (let h = 1; h <= 12; h++) {
  let hour = h < 10 ? "0" + h : h;
  selects[0].innerHTML += `<option value="${hour}">${hour}</option>`;
}


for (let m = 0; m < 60; m++) {
  let min = m < 10 ? "0" + m : m;
  selects[1].innerHTML += `<option value="${min}">${min}</option>`;
}

selects[2].innerHTML += `<option value="AM">AM</option>`;
selects[2].innerHTML += `<option value="PM">PM</option>`;


setInterval(() => {
  let now = new Date();

  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    ampm = "PM";
    if (h > 12) h -= 12;
  }
  if (h === 0) h = 12;

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeText.innerText = `${h}:${m}:${s} ${ampm}`;


  if (alarm === `${h}:${m} ${ampm}`) {
    sound.play();
    sound.loop = true;
  }
}, 1000);


button.addEventListener("click", () => {
  if (alarmOn) {
    alarm = "";
    alarmOn = false;
    sound.pause();
    button.innerText = "Set Alarm";
    return;
  }

  let selectedTime = `${selects[0].value}:${selects[1].value} ${selects[2].value}`;

  if (selectedTime.includes("select")) {
    alert("Please select time properly");
    return;
  }

  alarm = selectedTime;
  alarmOn = true;
  button.innerText = "Clear Alarm";
});
