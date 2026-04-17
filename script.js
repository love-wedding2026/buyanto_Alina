// Блок 3 — таймер

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const targetDate = new Date("2026-06-20T00:00:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateTimer();
setInterval(updateTimer, 1000);



// БЛОК 7 — открыть/закрыть форму

const openForm7 = document.getElementById("openForm7");
const form7Wrap = document.getElementById("form7Wrap");
const form7 = document.getElementById("form7");

let isSending7 = false;

/* открыть/закрыть */
if (openForm7 && form7Wrap) {
  openForm7.addEventListener("click", () => {
    form7Wrap.classList.toggle("show");
  });
}

/* отправка */
if (form7) {
  form7.addEventListener("submit", function(e){
    e.preventDefault();

    if (isSending7) return;
    isSending7 = true;

    const btn = form7.querySelector("button");
    btn.style.opacity = "0.5";
    btn.style.pointerEvents = "none";

    const data = new FormData();

    const name = form7.querySelector('[name="name"]').value;
    const phone = form7.querySelector('[name="phone"]').value;
    const attendance = form7.querySelector('[name="attendance"]:checked')?.value;

    data.append("Имя", name);
    data.append("Телефон", phone);
    data.append("Присутствие", attendance || "");
    data.append("_captcha", "false");

    fetch("https://formsubmit.co/ajax/alinanimaeva77@icloud.com", {
      method: "POST",
      body: data
    })
    .then(res => res.json())
    .then(() => {
      form7.reset();
      form7Wrap.classList.remove("show");
    })
    .catch(err => console.log(err))
    .finally(() => {
      isSending7 = false;
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
    });
  });
}
