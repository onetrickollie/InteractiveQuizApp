const questionsData = [
  {
    question: "How many times did lebron lose in the NBA finals",
    options: ["3","4","5","6","7"],
    answer: "6",
  },
  {
    question: "What happened on June 5th, 2008 ",
    options: [
      "Paul Pierce faked an injury because he pooped himself",
      "Lebron shot a freethrow with his eyes closed and missed",
      "Thansis Triple-Double",
      "D-Rose d rose",
      "Larry bird's retirement",
    ],
    answer: "Paul Pierce faked an injury because he pooped himself",
  },
  {
    question: "What team drafted Kobe Bryant",
    options: ["Lakers","Celtics","Hornets","Thunder","Warriors"],
    answer: "Hornets",
  },
  {

    question: "What is Charles Barkley's least favorite city",
    options: ["Dallas","San Antonio","Houston","Miami"],
    answer: "San Antonio",
  },
  {
    question: "How many points did Lebron think Kobe was going to drop",
    options: ["50","60","70","80"],
    answer: "70",
  },
  {
    question: "Who has the most rings in the following selections",
    options: ["Tracy McGrady","Charles Barkley","Jeremy Lin","Vince Carter","Chris Paul"],
    answer: "Jeremy Lin",
  },
  {
    question: "Which one of these players was drafted before Kobe Bryant in the 1996 NBA draft",
    options: ["Steve Nash","Jeremain O'neal","Derek Fisher","Kerry Kittles","Dick Barret"],
    answer: "Kerry Kittles",
  },
  {
    question: "How many fingers does Gereald Green have",
    options: [
      "10",
      "11",
      "9",
      "8",
    ],
    answer: "9",
  },
  {
    question: "Which NBA final did JR Smith drink too much Henny before playing",
    options: [
      "2015",
      "2016",
      "2017",
      "2018",
      "2014",
    ],
    answer: "2018",
  },
  {
    question: "Charles Barkley rubs what on his bellybutton to moisturize his lips",
    options: [
      "Baby Oil",
      "Olive Oil",
      "Vaseline",
      "WD-40",
      "A drop of tequilla",
    ],
    answer: "Vaseline",
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
    <div id="timer" class="mb-3">
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
  <button class='playAgain btn btn-warning mt-4'>Play Again</button>`;

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


// Rest of your existing code
