
  let startTime, updatedTime, difference, timerInterval;
  let running = false;
  let lapCounter = 1;

  const display = document.getElementById("display");
  const laps = document.getElementById("laps");

  function updateDisplay(time) {
    const ms = ("00" + (time % 1000)).slice(-3);
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    display.textContent =
      ("0" + hours).slice(-2) + ":" +
      ("0" + minutes).slice(-2) + ":" +
      ("0" + seconds).slice(-2) + "." + ms;
  }

  function startTimer() {
    if (running) return;
    running = true;
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 10);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = "00:00:00.000";
    laps.innerHTML = `<p class="fw-bold mb-2">Lap Times:</p>`;
    running = false;
    difference = 0;
    lapCounter = 1;
  }

  function recordLap() {
    if (!running) return;
    const lapTime = display.textContent;
    const p = document.createElement("p");
    p.className = "lap-item";
    p.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    laps.appendChild(p);
    laps.scrollTop = laps.scrollHeight;
  }