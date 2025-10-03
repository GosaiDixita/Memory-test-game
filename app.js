//ICONS
const emojis = [
    " <i class='bxr  bx-cat'  ></i>",
    " <i class='bxr  bx-cat'  ></i>",

    "<i class='bxr  bx-bitcoin'  ></i> ",
    "<i class='bxr  bx-bitcoin'  ></i> ",

    "<i class='bxr  bx-basketball'  ></i> ",
    "<i class='bxr  bx-basketball'  ></i> ",

    "<i class='bxr  bx-alarm'  ></i> ",
    "<i class='bxr  bx-alarm'  ></i> ",

    "<i class='bxr  bx-beanie'  ></i> ",
    "<i class='bxr  bx-beanie'  ></i> ",

    "<i class='bxr  bx-tired'  ></i> ",
    "<i class='bxr  bx-tired'  ></i> ",

    "<i class='bxr  bx-headphone-alt-2'  ></i> ",
    "<i class='bxr  bx-headphone-alt-2'  ></i> ",

    "<i class='bxr  bx-earbuds'  ></i> ",
    "<i class='bxr  bx-earbuds'  ></i> ",
];


const shuffled = emojis.sort(() => Math.random() - 0.5);

// Timer variables
let startTime;
let timerInterval;
let bestTime = localStorage.getItem("bestTime"); // must match key exactly
let firstClick = false;

// Show best time on load
if (bestTime) {
  document.getElementById("best-time").innerText = `🏆 Best Time: ${bestTime}s`;
}

// Start timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").innerText = `⏱ Time: ${elapsed}s`;
  }, 1000);
}

// Stop timer
function stopTimer() {
  clearInterval(timerInterval);
  const elapsed = Math.floor((Date.now() - startTime) / 1000);

  // Save best time if it's faster
  if (!bestTime || elapsed < bestTime) {
    bestTime = elapsed;
    localStorage.setItem("bestTime", bestTime);
    document.getElementById("best-time").innerText = `🏆 Best Time: ${bestTime}s`;
  }
  return elapsed;
}

// Create game board
shuffled.forEach((emoji) => {
  let box = document.createElement("div");
  box.classList = "item";
  box.innerHTML = emoji;

  box.onclick = function () {
    if (!firstClick) {
      startTimer();
      firstClick = true;
    }

    if (!this.classList.contains("box-open") && !this.classList.contains("box-match")) {
      this.classList.add("box-open");
    }

    let allOpen = document.querySelectorAll(".box-open");

    if (allOpen.length === 2) {
      setTimeout(() => {
        if (allOpen[0].innerHTML === allOpen[1].innerHTML) {
          allOpen[0].classList.add("box-match");
          allOpen[1].classList.add("box-match");
        }
        allOpen[0].classList.remove("box-open");
        allOpen[1].classList.remove("box-open");

        // ✅ Check for win after every match
        if (document.querySelectorAll(".box-match").length === shuffled.length) {
          const finalTime = stopTimer();
          document.querySelector(".app").innerHTML = `
            <h2 class="winner-text animate">🎉 Congratulations! You Win the Game 🥇</h2>
            <p>Your Time: ${finalTime}s</p>
            <p>🏆 Best Time: ${bestTime || "--"}s</p>
            <button class="reset" onclick="window.location.reload()">Play Again</button>
          `;
        }
      }, 600);
    }
  };

  document.querySelector(".border").appendChild(box);
});