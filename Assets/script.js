// array holding questions for quiz
var questionsArray = [
  {
    title: `What is JavaScript?`,
    options: [
      `Language that follows ECMAScript standerd.`,
      `Client-side scripting language.`,
      `Server-side scripting language.`,
      `All of the above.`,
    ],
    answer: `All of the above.`,
  },
  {
    title: `Inside what HTML tag you would put JavaScript code?`,
    options: [`<js>`, `<scripting>`, `<script>`, `<javascript>`],
    answer: `<script>`,
  },
  {
    title: `Where is the correct place to insert JavaScript on a web page?`,
    options: [
      `Inside <body>`,
      `Inside <head>`,
      `Inside <head> and <body>`,
      `None of these.`,
    ],
    answer: `Inside <head> and <body>`,
  },
  {
    title:
      "What is the correct syntax to use an external script called “new.js”?",
    options: [
      `<script src="new.js">`,
      `<script name="new.js">`,
      `<script href="new.js">`,
      `<script content="new.js">`,
    ],
    answer: `<script src="new.js">`,
  },
  {
    title: `How do you declare a JavaScript variable x?`,
    options: [`define x;`, `variable x;`, `var x;`, `def x;`],
    answer: "var x;",
  },
  {
    title: `When we don't assign a value to a variable it will be?`,
    options: [`null`, `undefined`, `""`, `NaN`],
    answer: `undefined`,
  },
  {
    title: `To add an element to the end of an array you use:`,
    options: [`pop()`, `add()`, `push()`, `addToEnd()`],
    answer: `push()`,
  },
  {
    title: `A string can be converted to an array using which method:`,
    options: [`split()`, `slice()`, `splice()`, `peice()`],
    answer: `split()`,
  },
  {
    title: `Which of the following properties return the URL of the current page.`,
    options: [
      `locaton.URL`,
      `URL.location`,
      `window.location.href`,
      `window.location.hostname`,
    ],
    answer: `window.locaion.href`,
  },
];

var questionsEl = document.getElementById(`question-screen`);
var optionsEl = document.getElementById(`options`);
var timerEl = document.getElementById(`time`);
var startBtn = document.getElementById(`start-button`);
var submitBtn = document.getElementById(`submit`);
var initialsEl = document.getElementById(`initials`);
var feedbackEl = document.getElementById(`feedback`);
var questionIndex = 0;
var time = questionsArray.length * 20;

// when start button is clicked run startQuiz function
startBtn.onclick = startQuiz;
// when submit button is clicked run submitScore function
submitBtn.onclick = submitScore;

// set the timerEl to display the time
function countDown() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    clearInterval(myTimer);
    endQuiz();
  }
}

// hides the start screen and shows the question screen
function startQuiz() {
  var startscreenEl = document.getElementById(`start-screen`);
  startscreenEl.setAttribute(`class`, `display`);
  questionsEl.removeAttribute(`class`);
  myTimer = setInterval(countDown, 1000);
  timerEl.textContent = time;
  pullQuestion();
}

// will loop through each question in the question array and display it on the page
function pullQuestion() {
  for (var i = 0; i < questionsArray.length; i++)
    var populateQuestion = questionsArray[questionIndex];
  var displayQuestion = document.getElementById(`current-question`);
  displayQuestion.textContent = populateQuestion.title;
  optionsEl.innerHTML = "";
  populateQuestion.options.forEach(function (options, i) {
    var optionsPull = document.createElement(`button`);
    optionsPull.setAttribute(`class`, `options`);
    optionsPull.setAttribute(`value`, options);
    optionsPull.textContent = i + 1 + `.` + options;
    optionsPull.onclick = choiceClick;
    optionsEl.appendChild(optionsPull);
  });
}

// when button for answers is clicked display if the answer was wrong or correct then load another question or kill screen if time runs out
function choiceClick() {
  if (this.value !== questionsArray[questionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = `Wrong!`;
    feedbackEl.style.fontSize = `100%`;
  } else {
    feedbackEl.textContent = `Correct!`;
    feedbackEl.style.fontSize = `100%`;
  }
  feedbackEl.setAttribute(`class`, `feedback`);
  setTimeout(function () {
    feedbackEl.setAttribute(`class`, `feedback display`);
  }, 2000);

  questionIndex++;

  if (questionIndex === questionsArray.length) {
    endQuiz();
  } else {
    pullQuestion();
  }
}

// when submit button is clicked save score and initials to local storage to be displayed on the scoreboard
function submitScore() {
  var initScore = initialsEl.value.trim();
  if (initScore !== "") {
    var scoreBoard =
      JSON.parse(window.localStorage.getItem(`scoreBoard`)) || [];
    var addScore = { score: time, initScore: initScore };
    scoreBoard.push(addScore);
    window.localStorage.setItem(`scoreBoard`, JSON.stringify(scoreBoard));
    location.href = `scoreboard.html`;
  }
}

// when time runs out or the quiz array is complete load the kill screen
function endQuiz() {
  var killScreen = document.getElementById(`kill-screen`);
  killScreen.removeAttribute(`class`);
  var quizScore = document.getElementById(`quiz-score`);
  quizScore.textContent = time;
  timerEl.setAttribute(`class`, `display`);
  questionsEl.setAttribute("class", "display");
}
