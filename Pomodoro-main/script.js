let intervalId;

function startTimer(type) {
  let timeInput = document.getElementById(type + "-time");
  
  // Checks if the element exists before attempting to access it
  if (!timeInput) {
    console.error(`Element with ID '${type}-time' not found.`);
    return;
  }

  let time = timeInput.value;
  let timeArray = time.split(":");
  let minutes = parseInt(timeArray[0]);
  let seconds = parseInt(timeArray[1]);
  let totalSeconds = minutes * 60 + seconds;

  let currentTimer = document.getElementById("current-timer-display");


  currentTimer.style.display = "inline-block";

  if (intervalId) {
    clearInterval(intervalId);
  }

  
  // Remove current timer if it's a different type
  if (!currentTimer.textContent.startsWith(type)) {
    currentTimer.textContent = "";
  }

  document.getElementById(type + "-start").style.display = "none";
  document.getElementById(type + "-stop").style.display = "inline-block";
  timeInput.setAttribute("readonly", true);

  intervalId = setInterval(function () {
    totalSeconds--;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    if (totalSeconds <= 0) {
      clearInterval(intervalId);
      document.getElementById(type + "-start").style.display = "inline-block";
      document.getElementById(type + "-stop").style.display = "none";
      timeInput.removeAttribute("readonly");
      minutes = 0;
      seconds = 0;
    }

    timeInput.value = `${formatTimeValue(minutes)}:${formatTimeValue(seconds)}`;

    // Update current timer
    currentTimer.textContent = `${type} - ${formatTimeValue(minutes)}:${formatTimeValue(seconds)}`;
  }, 1000);
}


function stopTimer(type) {
  clearInterval(intervalId);
  document.getElementById(type + "-start").style.display = "inline-block";
  document.getElementById(type + "-stop").style.display = "none";
  document.getElementById(type + "-time").removeAttribute("readonly");

  // Remove current timer if it's the same type
  if (document.getElementById("timer current-timer").textContent.startsWith(type)) {
    document.getElementById("timer current-timer").textContent = "";
  }
}

function formatTime(input) {
  let value = input.value;
  value = value.replace(/[^0-9]/g, ""); // Removes characters other than numbers
  let minutes = parseInt(value.slice(0, -2)); // Takes the first two characters as minutes
  let seconds = parseInt(value.slice(-2)); // Takes the last two characters as seconds

  // Check for invalid values
  if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0) {
    minutes = 0;
    seconds = 0;
  }

  // Convert minutes and seconds to total seconds
  let totalSeconds = minutes * 60 + seconds;

  // Update input value with formatted time
  input.value = `${formatTimeValue(minutes)}:${formatTimeValue(seconds)}`;

  // Update current timer if it's the same type
  if (document.getElementById("timer current-timer").textContent.startsWith(input.id.split("-")[0])) {
    document.getElementById("timer current-timer").textContent = `${input.id.split("-")[0]} - ${formatTimeValue(minutes)}:${formatTimeValue(seconds)}`;
  }
}

function formatTimeValue(value) {
  return value.toString().length === 1 ? `0${value}` : value;
}