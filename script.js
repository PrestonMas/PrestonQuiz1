// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const questionLength = document.getElementById("question-length");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "What is Preston's middle name?",
    answers: [
      { text: "Bernice", correct: false },
      { text: "Christopher", correct: true },
      { text: "Paul", correct: false },
      { text: "Pmoney", correct: false },
    ],
  },
  {
    question: "What is Preston's favorite all-time video game?",
    answers: [
      { text: "Minecraft", correct: true },
      { text: "Valorant", correct: false },
      { text: "Rocket League", correct: false },
      { text: "Fortnite", correct: false },
    ],
  },
  {
    question: "What is Preston's major?",
    answers: [
      { text: "Mechanical Engineering", correct: false },
      { text: "Nursing", correct: false },
      { text: "Business", correct: false },
      { text: "Computer Science", correct: true },
    ],
  },
  {
    question: "How many sisters does Preston have?",
    answers: [
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
    ],
  },
  {
    question: "What is Preston's favorite color?",
    answers: [
      { text: "Orange", correct: false },
      { text: "Red", correct: false },
      { text: "Blue", correct: false },
      { text: "Green", correct: true },
    ],
  },
  {
    question: "Where did Preston go to highschool?",
    answers: [
      { text: "MTHS", correct: true },
      { text: "SBHS", correct: false },
      { text: "WWPS", correct: false },
      { text: "EBHS", correct: false },
    ],
  },
  {
    question: "What is Preston's ethnicity?",
    answers: [
      { text: "Vietnamese", correct: false },
      { text: "Chinese", correct: false },
      { text: "Thai", correct: false },
      { text: "Filipino", correct: true },
    ],
  },
  {
    question: "What is Preston's favorite sport?",
    answers: [
      { text: "Tennis", correct: false },
      { text: "Volleyball", correct: false },
      { text: "Basketball", correct: true },
      { text: "Soccer", correct: false },
    ],
  },
  {
    question: "Which of the following is a name of his hometown friends?",
    answers: [
      { text: "Shawn", correct: false },
      { text: "Aryan", correct: false },
      { text: "Brian", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "What is Preston's peak rank in Valorant?",
    answers: [
      { text: "Diamond 3", correct: false },
      { text: "Immortal 2", correct: true },
      { text: "Immortal 1", correct: false },
      { text: "Ascendant 3", correct: false },
    ],
  },
];

// QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

questionLength.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-button");

        // what is a dataset? - store custom data
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if(answersDisabled){
        return;
    }

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    },1000);
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100;

    switch (true){
        case percentage == 100:
            resultMessage.textContent = "Perfect! You know Preston very well!";
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x: 0.95, y: 0.9 },
            });
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x: 0.05, y: 0.9 },
            });
            break;
        case percentage >= 80:
            resultMessage.textContent = "Nice! You know a bit about Preston.";
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x: 0.95, y: 0.9 },
            });
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { x: 0.05, y: 0.9 },
            });
            break;
        case percentage >= 60:
            resultMessage.textContent = "Good try! You have a lot to learn about Preston.";
            break;
        case percentage >= 40:
            resultMessage.textContent = "Oof. Ask Preston anything for help!";
            break;
        default:
            resultMessage.textContent = "You're either a stranger or a bad friend to Preston.";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}
