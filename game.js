// ====================== FIREBASE INTEGRATION ======================
// Firebase functions are imported from firebase-leaderboard.js when needed

// ====================== DOM ELEMENTS ======================
const hangmanStage = document.getElementById("hangmanStage");
const wordDisplay = document.getElementById("wordDisplay");
const alphabetDiv = document.getElementById("alphabet");
const overlay = document.getElementById("gameOverlay");
const overlayMessage = document.getElementById("overlayMessage");
const restartBtn = document.getElementById("restartBtn");
const turnsLeftImg = document.getElementById("turnsLeft");
const leaderboardList = document.getElementById("leaderboardList");
const hintText = document.getElementById("hintText");

const hoverSound = document.getElementById("hoverSound");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

// ====================== GAME VARIABLES ======================
let selectedWord = "";
let selectedHint = "";
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

// ====================== GET QUERY PARAMS ======================
const params = new URLSearchParams(window.location.search);
const grade = params.get("grade") || "1";
const subject = params.get("subject") || "english";

// ====================== SAMPLE WORDS WITH HINTS ======================
const wordsDB = {
  "english": [
    { word: "MONDAY", hint: "A day of the week" },
    { word: "HANGMAN", hint: "The game you are playing" },
    { word: "PUZZLE", hint: "Something you solve" },
    { word: "CODE", hint: "Used to write programs" }
  ],
  "science": [
    { word: "ATOM", hint: "Smallest unit of matter" },
    { word: "WATER", hint: "H2O substance" },
    { word: "EARTH", hint: "Our planet" }
  ],
  "social": [
    { word: "INDIA", hint: "Country in South Asia" },
    { word: "RIVER", hint: "Flows through land" }
  ],
  "computer": [
    { word: "HTML", hint: "Web markup language" },
    { word: "JAVASCRIPT", hint: "Programming language for web" }
  ],
  "gk": [
    { word: "JULY", hint: "Month of the year" },
    { word: "SUNDAY", hint: "Weekend day" }
  ]
};

// ====================== UTILITY FUNCTIONS ======================

// Play hover sound
alphabetDiv.addEventListener("mouseover", e => {
  if(e.target.tagName === "IMG" && !e.target.classList.contains("disabled")){
    hoverSound.currentTime = 0;
    hoverSound.play();
  }
});

// Initialize game
function initGame() {
  const pool = wordsDB[subject] || wordsDB["english"];
  const choice = pool[Math.floor(Math.random() * pool.length)];
  selectedWord = choice.word.toUpperCase();
  selectedHint = choice.hint;
  guessedLetters = [];
  mistakes = 0;
  hangmanStage.src = `assets/stage01.png`;
  overlay.style.display = "none";
  updateTurnsLeft();
  displayHint();
  displayWord();
  createAlphabet();
  loadLeaderboard();
}

// Display word with platforms
function displayWord() {
  wordDisplay.innerHTML = "";
  for (let letter of selectedWord) {
    const slot = document.createElement("div");
    slot.className = "word-slot";

    const platformImg = document.createElement("img");
    platformImg.src = "assets/platform_blank.png";
    platformImg.alt = "_";
    platformImg.className = "platform";
    slot.appendChild(platformImg);

    if (guessedLetters.includes(letter)) {
      const letterImg = document.createElement("img");
      letterImg.src = `assets/platform_letter_${letter}.jpg`;
      letterImg.alt = letter;
      letterImg.className = "letter";
      slot.appendChild(letterImg);
    }
    wordDisplay.appendChild(slot);
  }
}

// Create alphabet buttons
function createAlphabet() {
  alphabetDiv.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const img = document.createElement("img");
    img.src = `assets/letters/${letter}.jpg`;
    img.alt = letter;
    img.addEventListener("click", () => handleGuess(letter, img));
    alphabetDiv.appendChild(img);
  }
}

// Display hint
function displayHint() {
  hintText.textContent = selectedHint;
}

// Update turns left
function updateTurnsLeft() {
  const remaining = Math.max(maxMistakes - mistakes, 0);
  turnsLeftImg.src = `assets/turns_${remaining}.png`;
}

// Handle guess
function handleGuess(letter, img) {
  if (guessedLetters.includes(letter) || img.classList.contains("disabled")) return;
  guessedLetters.push(letter);
  img.classList.add("disabled");

  clickSound.currentTime = 0;
  clickSound.play();

  if (selectedWord.includes(letter)) {
    displayWord();
    checkWin();
  } else {
    mistakes++;
    hangmanStage.src = `assets/stage0${mistakes+1}.png`;
    updateTurnsLeft();
    if (mistakes >= maxMistakes) showOverlay(false);
  }
}

// Check win
function checkWin() {
  const wordGuessed = selectedWord.split("").every(l => guessedLetters.includes(l));
  if (wordGuessed) showOverlay(true);
}

// Show overlay and leaderboard update
function showOverlay(win) {
  overlay.style.display = "flex";
  overlayMessage.textContent = win ? "You Won! 🎉" : `You Lost 😢\nWord: ${selectedWord}`;
  if (win) winSound.play(); else loseSound.play();

  if (win) {
    // Ask for player name
    const playerName = prompt("Enter your name for leaderboard:", "Player") || "Player";
    addScore(playerName, maxMistakes - mistakes);
  }
}

// ====================== LEADERBOARD FUNCTIONS ======================
// Leaderboard functions are now handled in game.html with proper module imports

// Restart game
restartBtn.addEventListener("click", initGame);

// Start game
initGame();
