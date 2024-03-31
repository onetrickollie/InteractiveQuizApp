const questionsData = [
  {
    question: "Which NBA player did not make an apperance in the movie 'Uncle Drew'?",
    options: ["Dikembe Mutombo", "Aaron Gordon", "Carmelo Anthony", "Nate Robinson"],
    answer: "Carmelo Anthony",
  },
  {
    question: "Which NBA player did not attend UCLA",
    options: ["Kevon Looney", "Zach LaVine", "Brandon Ingram", "Jrue Holiday"],
    answer: "Brandon Ingram",
  },
  {
    question: "What is the name of Chris Paul's alter ego in State Farm commercials?",
    options: ["Cliff Paul", "Carl Paul", "Chuck Paul", "Chris Paul Jr."],
    answer: "Cliff Paul",
  },
  {
    question: "What is the name of Kobe Bryant's short film that won an Academy Award in 2018?",
    options: ["Dear Basketball", "The Black Mamba", "Kobe: The Legend Continues", "Mamba Mentality"],
    answer: "Dear Basketball",
  },
  {
    question: "Which NBA player holds the record for most triple-doubles in a season?",
    options: ["Nikola Jokić", "James Harden", "Russel Westbrook", "Magic Johnson"],
    answer: "Russel Westbrook",
  },
  {
    question: "Which NBA player owns a Krispy Kreme doughnut franchise?",
    options: ["Michael Jordan", "Stephen Curry", "Magic Johnson", "Shaq"],
    answer: "Shaq",
  },
  {
    question: "Which NBA player appeared in a cameo role in the movie 'Trainwreck'?",
    options: ["Kevin Love", "Stephen Curry", "Kevin Durant", "LeBron James"],
    answer: "LeBron James",
  },
  {
    question: "Who is not a brother of Giannis Antetokounmpo'?",
    options: ["Pascal Antetokounmpo", "Francis Antetokounmpo", "Kostas Antetokounmpo", "Alex Antetokounmpo"],
    answer: "Pascal Antetokounmpo",
  },
  {
    question: "Which NBA player famously scored 81 points in a single game?",
    options: ["Kobe Bryant", "LeBron James", "Kevin Durant", "Stephen Curry"],
    answer: "Kobe Bryant",
  },
  {
    question: "How many NBA championships has Magic Johnson won as a player?",
    options: ["4", "5", "6", "7"],
    answer: "5",
  },
];

let welcMessage = document.getElementById("welcomeMessage");
const colorSelection = [0, 1, 2, 3, 4, 5, 6, 7, 8, "A", "B", "C", "D", "E", "F"];

const randomTextColor = () => {
  let hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode += colorSelection[Math.floor(Math.random() * colorSelection.length)];
  }
  return hexCode;
};

setInterval(() => {
  welcMessage.style.color = randomTextColor();
}, 500);

let welcomePage = document.getElementById("welcomePage");
let quizPage = document.getElementById("quizPage");
let resultPage = document.getElementById("resultPage");
let loginPage = document.getElementById("loginPage");

let answers = [];
let current = 0;
let isAnswered = false;
let timer;


function login() {
  let usernameInput = document.getElementById("username");
  let username = usernameInput.value.trim();

  if (username !== "") {
    loginPage.style.display = "none";
    quizPage.style.display = "block";
    startQuiz(username);
  } else {
    alert("Please enter your name.");
  }
}

function startQuiz() {
  let nameInput = document.getElementById("name");
  let name = nameInput.value;
  if (name !== "") {
    welcomePage.style.display = "none";
    quizPage.style.display = "block";
    getQuestions();
    startTimer();
  }
}

function getQuestions() {
  let question = questionsData[current];
  quizPage.innerHTML = `
    <div id="timer" class="mb-2">
      <i class="fas fa-stopwatch"></i> ${formatTime(90)}
    </div>
    <h3 style='margin-bottom:2rem'>${question.question}</h3>
    <p>Question ${current + 1} of ${questionsData.length}</p>
  `;
  for (let i = 0; i < question.options.length; i++) {
    quizPage.innerHTML += `
      <button class='btn w-75 btn-lg' onclick="takeAnswer(this, '${
        question.options[i]
      }')" ${isAnswered ? "disabled" : ""}>
        ${question.options[i]}
      </button>
      <br><br>
    `;
  }
}

function takeAnswer(option, answer) {
  if (isAnswered) return;
  isAnswered = true;
  clearInterval(timer);

  let correctAnswer = questionsData[current].answer;
  if (option && answer === correctAnswer) {
    option.innerHTML += ` <i class="fas fa-check-circle"></i>`;
    option.classList.add("correctAnswer");
    quizPage.innerHTML += `<p class="answerMessage correctAnswer"><i class="fas fa-check-circle"></i> Correct Answer! Well Done!</p>`;
    answers[current] = answer;
  } else {
    answers[current] = "";
    quizPage.innerHTML += `<p class="answerMessage wrongAnswer"><i class="fas fa-times-circle"></i> Incorrect Answer! The correct answer was ${correctAnswer}.</p>`;
  }

  setTimeout(() => {
    current++;
    if (current < questionsData.length) {
      isAnswered = false;
      getQuestions();
      startTimer();
    } else {
      getResult();
    }
  }, 2000);
}

function getResult() {
  let correctAnswers = 0;
  for (let i = 0; i < questionsData.length; i++) {
    if (answers[i] === questionsData[i].answer) {
      correctAnswers++;
    }
  }

  let nameInput = document.querySelector("#name");
  let name = nameInput.value;

  let resultMessage = `Congratulations ${name}! <br/>You answered
  <span class='correctAnswer'>${correctAnswers}</span> out of
  ${questionsData.length} questions correctly.<br/> 
  <button class='playAgain btn btn-primary mt-4'>Play the quiz again</button>`;

  quizPage.style.display = "none";
  resultPage.style.display = "block";
  resultPage.innerHTML = "<h2 class='resultMessage'>" + resultMessage + "</h2>";

  let playAgain = document.querySelector(".playAgain");
  playAgain.addEventListener("click", () => {
    current = 0;
    answers = [];
    isAnswered = false;
    startQuiz();
    resultPage.style.display = "none";
  });
}

function startTimer() {
  let timerElement = document.getElementById("timer");
  timerElement.innerHTML = `<i class="fas fa-stopwatch"></i> ${formatTime(200)}`;

  let timeRemaining = 200;
  timer = setInterval(() => {
    timeRemaining--;
    timerElement.innerHTML = `<i class="fas fa-stopwatch"></i> ${formatTime(
      timeRemaining
    )}`;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      takeAnswer(null, null);
    }
  }, 1000);
}

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
