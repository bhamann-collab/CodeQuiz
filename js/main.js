import * as SelectQuestion from "./questions.js";
var question = SelectQuestion.myQuestions;


var startContent = document.querySelectorAll('.title-screen');
var questionContent = document.querySelectorAll('.question-screen');
var endContent = document.querySelectorAll('.end-screen')

var gameStart = document.querySelector('#start-btn');
var questionStatement = document.querySelector('.question-screen').childNodes[3];
var answerStatements = document.querySelectorAll(".btn-answer.btn-own");
var answerButton = document.querySelectorAll(".btn-answer");
var counter = document.querySelector("#countdown-timer");

var questionNum = 0;
var counterTimer = 75;


gameStart.addEventListener('click', startGame);
answerStatements.forEach(i => {
    i.addEventListener('click',answerQuestion)
})



function startGame() {
    startContent.forEach(x => x.style.display = "none");
    questionContent.forEach(x => x.style.display = "inherit");
    questionStatement.innerHTML = question[0].question;
    answerStatements[0].innerHTML = question[0].answers.a
    answerStatements[1].innerHTML = question[0].answers.b
    answerStatements[2].innerHTML = question[0].answers.c
    answerStatements[3].innerHTML = question[0].answers.d
    counter.children[0].innerHTML = counterTimer;
    startTimer();
}

function answerQuestion(event) {
    if (event.target.getAttribute("id") != question[questionNum].correctAnswer){
        counterTimer = counterTimer - 10;
    }
    if (questionNum === 9) {
        endGame();
        return;
    }
    nextQuestion();
}

function startTimer() {
    setInterval(function() {
        counterTimer--;
        counter.children[0].innerHTML = counterTimer;
    },1000)
}

function nextQuestion() {
    //Testing purposes, delete line below later
    questionNum = 9;
    //questionNum++;
    questionStatement.innerHTML = question[questionNum].question;
    answerStatements[0].innerHTML = question[questionNum].answers.a
    answerStatements[1].innerHTML = question[questionNum].answers.b
    answerStatements[2].innerHTML = question[questionNum].answers.c
    answerStatements[3].innerHTML = question[questionNum].answers.d
    console.log(questionNum)
    console.log(question[questionNum].answers.a)
}

function endGame() {
    questionContent.forEach(x => x.style.display = "none");
    endContent.forEach(x => x.style.display = "inherit");
}

function gameOver() {

}
