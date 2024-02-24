// script.js

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  document.getElementById("title-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  loadQuestion();
}

function showHighScore() {
  fetch("/get_high_scores")
    .then((response) => response.json())
    .then((highScores) => {
      const highScoreElement = document.getElementById("high-scores");
      highScoreElement.innerHTML = ""; // Clear previous content

      if (highScores.length > 0) {
        const ol = document.createElement("ol");

        highScores.forEach((score, index) => {
          const li = document.createElement("li");
          li.textContent = `#${index + 1}: ${score}`;
          ol.appendChild(li);
        });

        highScoreElement.appendChild(ol);
      } else {
        highScoreElement.innerHTML += "<p>No high scores yet.</p>";
      }

      // Show the high score screen
      document.getElementById("title-screen").style.display = "none";
      document.getElementById("game-screen").style.display = "none";
      document.getElementById("end-screen").style.display = "none";
      document.getElementById("high-score-screen").style.display = "block";
    })
    .catch((error) => console.error("Error fetching high scores:", error));
}

function goToMainScreen() {
  // Show the main screen
  document.getElementById("title-screen").style.display = "block";
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("high-score-screen").style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  fetch("/get_quiz_sets")
    .then((response) => response.json())
    .then((quizSets) => {
      const quizQuestion = quizSets[currentQuestionIndex];
      console.log("Correct Answer:", quizQuestion.answer);
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

  if (currentQuestionIndex < 20) {
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

  fetch("/update_high_scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ player_score: score }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("High score updated successfully!");
      } else {
        console.error("Failed to update high score.");
      }
    })
    .catch((error) => console.error("Error updating high score:", error));
}
