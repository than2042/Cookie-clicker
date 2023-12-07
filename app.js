let counterDisplay = document.querySelector("#counter");
let startCounter = document.querySelector("#start");
let stopCounter = document.querySelector("#stop");
let resetCounter = document.querySelector("#reset");

let count = 0;
let interval;

const start = () => {
  count++;
  interval = setInterval(() => {
    count++;
    updateCounter();
  }, 100);
};

const stop = () => {
  clearInterval(interval);
  localStorage.setItem("count", JSON.stringify(count));
};

startCounter.addEventListener("click", () => {
  start();
});

stopCounter.addEventListener("click", () => {
  stop();
});

resetCounter.addEventListener("click", () => {
  count = 0;
  updateCounter();
});

const updateCounter = () => {
  counterDisplay.innerHTML = count;
};
