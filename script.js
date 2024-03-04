const questions = [
  {
    question: "What does DOM stand for in the context of web development?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Direct Object Manipulation", correct: false },
      { text: "Desktop Oriented Mode", correct: false },
      { text: "Data Object Mapping", correct: false },
    ],
  },
  {
    question:
      "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question:
      "In HTML, which attribute is used to specify that an input field must be filled out?",
    answers: [
      { text: "placeholder", correct: false },
      { text: "validate", correct: false },
      { text: "required", correct: true },
      { text: "necessary", correct: false },
    ],
  },
  {
    question:
      "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      {
        text: " Cascading Style Sheets",
        correct: true,
      },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
