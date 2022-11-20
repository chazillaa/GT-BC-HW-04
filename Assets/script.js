var questionsArray = [
    {
        title: "Which one is a looping structure in JavaScript?",
        options: ["All the below", "For", "While", "do-while loops"],
        answer: "All the below"
      },
      {
        title: "What are the two basic groups of data types in JavaScript?",
        options: ["Primitive and attribute", "Primitive and reference types", "Reference types and attribute", "None of the above"],
        answer: "Primitive and reference types"
      },
      {
        title: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
      },
      {
        title: "Boolean operators that can be used in JavaScript include:",
        options: ["'And' Operator &&","'Or' Operator ||","'Not' Operator !","All the above"],
        answer: "All the above"
      },
      {
        title:"Which one of these is not among the three different types of errors in JavaScript?",
        options: ["Animation time errors", "Load time errors", "Run time errors","Logical Errors"],
        answer: "Animation time errors"
      },
      {
        title: "What is the data type of variables in JavaScript?",
        options: ["Object data types","Function data type","None of the above","All of the above"],
        answer: "Object data types"
      },
      {
        title: "The condition in an if / else statement is enclosed within ____.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
      },
      {
        title: "Arrays in JavaScript can be used to store ____.",
        options: ["numbers and strings","other arrays","booleans","all of the above"],
        answer: "all of the above"
      },
      {
        title:"String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
      },
      {
        title:"A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
      },
      {
        title: "What is the type of Pop up boxes available in JavaScript?:",
        options: ["Alert", "Confirm", "Prompt", "All the above"],
        answer: "All the above"
      }
]

var questionsEl = document.getElementById(`question-screen`)
var optionsEl = document.getElementById(`options`)
var timerEl = document.getElementById(`time`)
var startBtn = document.getElementById(`start-button`)
var submitBtn = document.getElementById(`submit`)
var initialsEl = document.getElementById(`initials`)
var feedbackEl = document.getElementById(`feedback`)
var questionIndex = 0;
var time = questionsArray.length * 10;

startBtn.onclick = startQuiz
submitBtn.onclick = submitScore

function countDown() {
    time--
    timerEl.textContent = time
    if (time <= 0){
        clearInterval(myTimer)
        endQuiz()
}}

function startQuiz() {
    var startscreenEl = document.getElementById(`start-screen`)
    startscreenEl.setAttribute(`class`, `display`)

    questionsEl.removeAttribute(`class`)

    myTimer = setInterval(countDown, 1000);

    timerEl.textContent = time;

    pullQuestion()
}

function pullQuestion() {
    for(var i=0; i < questionsArray.length; i++)
    var populateQuestion = questionsArray[questionIndex]

    var displayQuestion = document.getElementById(`current-question`)

    displayQuestion.textContent = populateQuestion.title

    optionsEl.innerHTML = ""

    populateQuestion.options.forEach(function(options, i) {

        var optionsPull = document.createElement(`button`)

        optionsPull.setAttribute(`class`,`options`)

        optionsPull.setAttribute(`value`, options)

        optionsPull.textContent = i + 1 + `.` + options

        optionsPull.onclick = choiceClick

        optionsEl.appendChild(optionsPull)
    })
}

function choiceClick(){
    if (this.value !== questionsArray[questionIndex].answer) {
        time -= 10

        if (time < 0) {
            time = 0
        }
         timerEl.textContent = time;
         feedbackEl.textContent = "Wrong!";
         feedbackEl.style.fontSize = "100%";
        } else {
         feedbackEl.textContent = "Correct!";
         feedbackEl.style.fontSize = "100%";
        }
        feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback display");
        }, 1000);

    // } else {
    //     timerEl.textContent = time
    // }

    questionIndex++;

    if (questionIndex === questionsArray.length) {
        endQuiz();
      } else {
        pullQuestion();
      }
}

function submitScore() {
    var initScore = initialsEl.value.trim()
        if (initScore !== "") {
    var scoreBoard = JSON.parse(window.localStorage.getItem(`scoreBoard`)) || []

    var addScore = {score: time, initScore: initScore}

    scoreBoard.push(addScore)
    window.localStorage.setItem(`scoreBoard`, JSON.stringify(scoreBoard))

    location.href = "scoreboard.html"
}}

function endQuiz() {
    var killScreen = document.getElementById(`kill-screen`)
    killScreen.removeAttribute(`class`)
    var quizScore = document.getElementById(`quiz-score`)
    quizScore.textContent = time;
    questionsEl.setAttribute('class', 'display')
}


// function checkForSubmit(event) {
//     if (event.key === `submit`) {
//       submitScore();
//     }
//   }
  

// initialsEl.onkeyup = checkForSubmit
































