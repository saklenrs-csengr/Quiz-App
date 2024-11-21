const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Tool Multi Language", correct: false },
      { text: "Hyperlinks and Text Mark Language", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color in CSS?",
    answers: [
      { text: "color", correct: false },
      { text: "background-color", correct: true },
      { text: "bgcolor", correct: false },
      { text: "background", correct: false },
    ],
  },
  {
    question: "Which of the following is correct about JavaScript?",
    answers: [
      { text: "It is a server-side scripting language", correct: false },
      { text: "It is a compiled language", correct: false },
      { text: "It is a client-side scripting language", correct: true },
      { text: "It is a database query language", correct: false },
    ],
  },
  {
    question: "What is the command to create a React app?",
    answers: [
      { text: "npm install react-app", correct: false },
      { text: "npx create-react-app myApp", correct: true },
      { text: "react-create-app myApp", correct: false },
      { text: "npm start react", correct: false },
    ],
  },
  {
    question: "What is the primary key in MySQL?",
    answers: [
      { text: "A unique identifier for a table row", correct: true },
      { text: "A column that allows duplicate values", correct: false },
      { text: "A foreign key", correct: false },
      { text: "A column to store text data", correct: false },
    ],
  },
  {
    question: "What is Spring Boot used for?",
    answers: [
      { text: "To design front-end components", correct: false },
      { text: "To develop RESTful APIs and microservices", correct: true },
      { text: "To manage CSS styles", correct: false },
      { text: "To create a database schema", correct: false },
    ],
  },
  {
    question:
      "Which pseudo-class is used to style an element when hovered over?",
    answers: [
      { text: ":hover", correct: true },
      { text: ":active", correct: false },
      { text: ":visited", correct: false },
      { text: ":link", correct: false },
    ],
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Float", correct: true },
      { text: "Object", correct: false },
    ],
  },
  {
    question: "Which SQL command is used to retrieve data from a table?",
    answers: [
      { text: "INSERT", correct: false },
      { text: "SELECT", correct: true },
      { text: "DELETE", correct: false },
      { text: "UPDATE", correct: false },
    ],
  },
  {
    question: "Which annotation is used to define a Spring Boot application?",
    answers: [
      { text: "@RestController", correct: false },
      { text: "@SpringBootApplication", correct: true },
      { text: "@Entity", correct: false },
      { text: "@Component", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
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
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
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
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
}

function handleNextButton() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
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