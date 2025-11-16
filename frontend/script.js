/* ESCAPE ROOM - JAVASCRIPT GAME LOGIC */


// Determine backend URL based on environment
const backendBaseURL = (window.location.hostname === '127.0.0.1' || window.location.hostname ===  "localhost")
    ? 'http://127.0.0.1:5000'
    : "";


// Function to fetch puzzles
async function fetchPuzzles(topic="general") {
    try {
      // Send request to backend to get puzzles
        const response = await fetch(`${backendBaseURL}/generate_puzzles?topic=${encodeURIComponent(topic)}`);
        const data = await response.json();

        // Replace mock puzzles with fetched puzzles and show first puzzle
        puzzles = data.puzzles;
        showPopup(0);

    } catch (error) {
        // Handle errors in fetching puzzles and alert user
        console.error("Error fetching puzzles:", error);
        alert("Failed to load puzzles. Please try again later.");
    }
}

// Game state - current challenge, time interval, and score
let currentPuzzle = 0;
let timeLeft = 300; // 5 minutes in seconds
let timeInterval = null;
let score = 0;


// DOM elements
const roomContainer = document.getElementById("mainGame");
const scoreEl = document.getElementById("score");
const hintEl = document.getElementById("hint");
const timerEl = document.getElementById("timer");

// Puzzle elements
const popup = document.getElementById("popup");
const popupQuestion = document.getElementById("popupQuestion");
const popupOptions = document.getElementById("popupOptions");
const popupInput = document.getElementById("popupUserInput");

// Final screen elements
const finalScreen = document.getElementById("final-screen");
const finalMessage = document.getElementById("final-message");

// Timer variables
function startTimer() {
  // Repeats this function every second to update the timer
  timeInterval = setInterval(() => {

    // Decrease time left by 1 second and update display
    timeLeft--;
    timerEl.textContent = `⏳ ${timeLeft}s`;

    // If time runs out, end the game
    if (timeLeft <= 0) endGame(false);
  }, 1000);
}

// Load puzzle function
function showPopup(index) {

  // If there are no more puzzles, end the game
  if (index >= puzzles.length) {
    endGame(true);
    return;
  }

  // Get current puzzle
  const puzzle = puzzles[index];
  currentPuzzle = index;

  // Clear previous popup content
  popupOptions.innerHTML = "";
  popupInput.value = "";
  hintEl.textContent = "";

  // Show question and make popup visible
  popupQuestion.textContent = puzzle.question;
  popup.classList.remove("hidden");

  // Show options based on puzzle type
  if (puzzle.type === "multiple_choice") {
      // Create buttons for each option
      puzzle.options.forEach(option => {
          const button = document.createElement("button");
          button.textContent = option;
          button.classList.add("option_button");

          // Add click event to check answer
          button.onclick = () => {
            checkAnswer(option);
          }

          // Append button to options container
          popupOptions.appendChild(button);
        });

        // Hide text input for multiple-choice
        popupInput.style.display = "none";

    } else if (puzzle.type === "text") {
      // Show text input for text-based puzzles
      popupInput.style.display = "block";

      // Hide options container
      popupOptions.style.display = "none";
    }
}

// Check answer function
function checkAnswer(userAnswer) {
  const puzzle = puzzles[currentPuzzle];

  // Use button answer OR typed answer (trim and lowercase for text)
  const answerToCheck = (userAnswer || popupInput.value.trim()).toLowerCase();

  // Compare answers (case-insensitive)
  if (answerToCheck === puzzle.answer.toLowerCase()) {

      // Increase score and update display
      score += 10;
      scoreEl.textContent = `⭐️ Score: ${score}`;

      // Close popup and proceed to next puzzle
      popup.classList.add("hidden");
      currentPuzzle++;

      // If last puzzle solved, end game
      if (currentPuzzle >= puzzles.length) endGame(true);
      else showPopup(currentPuzzle);

  } else {
      // Wrong answer > shake popup + time penalty
      wrongAnswer(popup);
  }

}

// Wrong answer function
function wrongAnswer(container) {

    // Take away 10 seconds from timer
    timeLeft -= 10;

    // Add shake animation class
    container.classList.add("shake");

    // Remove shake class after animation ends
    setTimeout(() => {
        container.classList.remove("shake");
    }, 600);

}

// Show hint function
function showHint() {
    const puzzle = puzzles[currentPuzzle];

    // Show hint in the hint element
    hintEl.textContent = `💡 ${puzzle.hint}`;

    // Deduct points for using hint (prevent negative score)
    score = Math.max(0, score - 5);
    scoreEl.textContent = `⭐️ Score: ${score}`;
}


// Final screen
function endGame(won) {
    // Stop the timer
    clearInterval(timeInterval);

    // Hide the main game and popup
    roomContainer.style.display = "none";
    popup.classList.add("hidden");

    // Show final screen
    finalScreen.style.display = "block";

    // Win or lose message
    if (won) {
        finalMessage.textContent = `🎉 Congratulations! You escaped! Your final score is ${score}.`;
    } else {
        finalMessage.textContent = `⏰ Time's up! You failed to escape. Your final score is ${score}.`;
    }
}

// Handle enter key for text input in puzzle popup
popupInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && popup.classList.contains('hidden') === false) {
        checkAnswer(); // Submit answer for text puzzles
    }
});

// Start game when page loads
window.onload = () => {
    startTimer();
    fetchPuzzles();
};
