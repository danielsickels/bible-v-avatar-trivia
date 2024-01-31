// script.js

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  loadQuestion();
}

function showHighScore() {
  // Implement high score logic if needed
}

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const quizQuestion = generate_quiz(); // Call your Python function here via API or other means

  questionElement.textContent = quizQuestion[0];
  optionsElement.innerHTML = "";

  for (let i = 1; i < quizQuestion.length; i++) {
    const optionButton = document.createElement("button");
    optionButton.textContent = quizQuestion[i];
    optionButton.onclick = () => checkAnswer(optionButton);
    optionsElement.appendChild(optionButton);
  }
}

function checkAnswer(selectedOption) {
  if (selectedOption.textContent === quizQuestion[0]) {
    selectedOption.classList.add("correct");
    score += 10;
  } else {
    selectedOption.classList.add("incorrect");
  }

  document.getElementById("score").textContent = `Score: ${score}`;
  disableOptions();
}

function disableOptions() {
  const optionButtons = document.querySelectorAll("#options button");
  optionButtons.forEach((button) => (button.disabled = true));
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < 80) {
    // Adjust the total number of questions
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  document.getElementById(
    "final-score"
  ).textContent = `Your Final Score: ${score}`;
}
