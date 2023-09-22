const hour = document.querySelector('.h')
const min = document.querySelector('.m')
const sec = document.querySelector('.s')

const hoursNumber = document.querySelector('.hours')
const minutesNumber = document.querySelector('.minutes')


function clock() {

    let time = new Date()
    let second = time.getSeconds() * 6
    let minutes = time.getMinutes() * 6
    let hours = time.getHours() * 30

    hour.style = `transform: rotate(${hours + minutes / 12}deg)`
    min.style = `transform: rotate(${minutes}deg)`
    sec.style = `transform: rotate(${second}deg)`

    hoursNumber.textContent = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
    minutesNumber.textContent = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
    setTimeout(() => {
        clock()
    }, 1000)

}


clock()

const links = document.querySelectorAll(".tabsItem")

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {

        for (let x = 0; x < links.length; x++) {
            links[x].classList.remove("active")
        }
        links[i].classList.add('active')

        if (links[i].textContent === "Часы") {
            document.querySelector(".stopwatch").classList.remove("active")
            document.querySelector(".clock").classList.add("active")
        } else {
            document.querySelector(".stopwatch").classList.add("active")
            document.querySelector(".clock").classList.remove("active")
        }
    })

}


let startTime = 0;
let elapsedTime = 0;
let buttonState = "start";

function startStopwatch() {
  startTime = Date.now();
  updateStopwatch();
  buttonState = "stop";
}


function updateStopwatch() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();

  if (buttonState === "stop") {
    clearTimeout(updateStopwatch);
  } else {
    setTimeout(updateStopwatch, 1);
  }
}


function updateDisplay() {
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  document.querySelector('.stopwatch__hours').innerHTML = hours;
  document.querySelector('.stopwatch__minutes').innerHTML = minutes;
  document.querySelector('.stopwatch__seconds').innerHTML = seconds;
}

function stopStopwatch() {
  clearTimeout(updateStopwatch);
  buttonState = "clear";
}

function resetStopwatch() {
  updateDisplay();
  buttonState = "start";
}

document.querySelector('.stopwatch__btn').addEventListener('click', startStopwatch);
document.querySelector('.stopwatch__btn').addEventListener('click', stopStopwatch);

function changeButtonState() {
  const currentButtonState = document.querySelector('.stopwatch__btn').innerHTML;

  if (currentButtonState === "start") {
    document.querySelector('.stopwatch__btn').innerHTML = "stop";
  } else if (currentButtonState === "stop") {
    document.querySelector('.stopwatch__btn').innerHTML = "clear";
  } else {
    document.querySelector('.stopwatch__btn').innerHTML = "start";
  }
}

document.querySelector('.stopwatch__btn').addEventListener('click', changeButtonState);
