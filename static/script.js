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
  fetch("/get_quiz_sets")
    .then((response) => response.json())
    .then((quizSets) => {
      const quizQuestion = quizSets[currentQuestionIndex];
      console.log("Correc Answer:", quizQuestion.answer);
      const questionElement = document.getElementById("question");
      const optionsElement = document.getElementById("options");

      questionElement.textContent = quizQuestion.question;
      optionsElement.innerHTML = "";

      for (let i = 0; i < quizQuestion.options.length; i++) {
        const optionButton = document.createElement("button");
        optionButton.textContent = quizQuestion.options[i];
        optionButton.onclick = () =>
          checkAnswer(optionButton, quizQuestion.answer);
        optionsElement.appendChild(optionButton);
      }
    })
    .catch((error) => console.error("Error fetching quiz sets:", error));
}

function checkAnswer(selectedOption, correctAnswer) {
  const selectedText = selectedOption.textContent;
  const correctText = correctAnswer[0]; // Extract the first element from the array

  if (selectedText === correctText) {
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

  if (currentQuestionIndex < 74) {
    loadQuestion();
  } else {
    endGame();
  }
}

function goToMainScreen() {
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("title-screen").style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function endGame() {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  document.getElementById(
    "final-score"
  ).textContent = `Your Final Score: ${score}`;
}
