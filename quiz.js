const quizData = [
  { question: "When did the Nakba happen?", options: ["1967", "1948", "2000", "1917"], answer: "1948" },
  { question: "What does BDS stand for?", options: ["Boycott, Divestment, Sanctions", "Border Defense Strategy", "Build, Develop, Support", "Back Democracy Safely"], answer: "Boycott, Divestment, Sanctions" },
  { question: "Which city is considered the capital of Palestine?", options: ["Ramallah", "Jericho", "Jerusalem", "Gaza"], answer: "Jerusalem" },
  { question: "Which religion considers Al-Aqsa Mosque a holy site?", options: ["Islam", "Christianity", "Judaism", "All of the above"], answer: "Islam" },
  { question: "What year was Gaza placed under blockade?", options: ["2000", "2005", "2007", "2014"], answer: "2007" },
  { question: "What is the population of Gaza (approx)?", options: ["500,000", "1 million", "2.3 million", "5 million"], answer: "2.3 million" },
  { question: "What event led to the displacement of 750,000 Palestinians?", options: ["First Intifada", "Nakba", "Yom Kippur War", "Six-Day War"], answer: "Nakba" },
  { question: "What is the purpose of the BDS movement?", options: ["Promote tourism", "Support Israeli economy", "End Israeli apartheid", "Fund Palestine's army"], answer: "End Israeli apartheid" },
  { question: "Which international law is violated by the occupation?", options: ["Law of Neutrality", "UN Charter", "Geneva Conventions", "Law of Occupation"], answer: "Geneva Conventions" },
  { question: "What is the term for Palestinian uprising?", options: ["Intifada", "Hijra", "Nakba", "Jihad"], answer: "Intifada" }
];

// Shuffle questions
let shuffledData = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestion = 0;
let score = 0;

// Sound effects
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

// Show question
function showQuestion() {
  const q = shuffledData[currentQuestion];
  document.getElementById("question").textContent = `Q${currentQuestion + 1}: ${q.question}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.onclick = () => handleAnswer(option, q.answer, btn);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("progress").value = currentQuestion + 1;
}

// Handle answer with feedback
function handleAnswer(selected, correct, button) {
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.style.backgroundColor = "green";
    else if (btn.textContent === selected) btn.style.backgroundColor = "red";
  });

  if (selected === correct) {
    score++;
    correctSound.play();
  } else {
    wrongSound.play();
  }

  setTimeout(() => {
    nextQuestion();
  }, 1000);
}

// Next question or result
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < shuffledData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Show final score and restart
function showResult() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <h3>You scored ${score}/${shuffledData.length}!</h3>
    <button id="restartBtn">🔁 Try Again</button>
  `;
  document.getElementById("restartBtn").addEventListener("click", restartQuiz);
}

// Restart quiz
function restartQuiz() {
  shuffledData = [...quizData].sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  score = 0;

  const container = document.getElementById("quiz-container");
  container.innerHTML = `
    <p id="question"></p>
    <div id="options"></div>
    <p id="score"></p>
    <progress id="progress" value="0" max="${quizData.length}"></progress>
  `;
  showQuestion();
}

// Random fact generator
function generateFact() {
  const facts = [
    "Over 750,000 Palestinians were displaced during the 1948 Nakba.",
    "Gaza has been under a blockade since 2007.",
    "More than 2 million people live in Gaza — one of the most densely populated areas in the world.",
    "There are over 5.9 million registered Palestinian refugees worldwide.",
    "Al-Aqsa Mosque is the third holiest site in Islam, located in occupied East Jerusalem."
  ];
  const randomIndex = Math.floor(Math.random() * facts.length);
  document.getElementById("fact").textContent = facts[randomIndex];
}

window.onload = showQuestion;

