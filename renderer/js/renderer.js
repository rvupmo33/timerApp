const startBtn = document.getElementById("btn");
const selectionScreen = document.getElementById("selection-screen");
const startScreen = document.getElementById("start-screen");
const timerScreen = document.getElementById("timer-screen");
const countdownElement = document.getElementById("countdown");

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  selectionScreen.classList.remove("hidden");
});

countdownElement.textContent = "0:00";

document.querySelectorAll(".time-option").forEach((button) => {
  button.addEventListener("click", (e) => {
    const timeInSeconds = parseInt(e.target.getAttribute("data-time"), 10);
    selectionScreen.classList.add("hidden");
    timerScreen.classList.remove("hidden");
    startTimer(timeInSeconds);
  });
});

function startTimer(seconds) {
  let timeLeft = seconds;
  countdownElement.textContent = formatTime(timeLeft);

  const timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      countdownElement.textContent = "Time's up!";
      return;
    }

    countdownElement.textContent = formatTime(timeLeft);
  }, 1000);

  document.getElementById("reset-btn").addEventListener("click", () => {
    clearInterval(timerInterval);
    location.reload();
  });
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
