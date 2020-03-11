import * as SelectQuestion from "./questions.js";
var question = SelectQuestion.myQuestions;


var startContent = document.querySelectorAll('.title-screen');
var questionContent = document.querySelectorAll('.question-screen');
var endContent = document.querySelectorAll('.end-screen')

var gameStart = document.querySelector('#start-btn');
var questionStatement = document.querySelector('.question-screen').childNodes[3];
var answerStatements = document.querySelectorAll(".btn-answer.btn-own");
var answerButton = document.querySelectorAll(".btn-answer");

var questionNum = 0;



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
}

function answerQuestion(event) {
    if (event.target.getAttribute("id") === question[questionNum].correctAnswer){
        if (questionNum === 9) {
            endGame();
            return;
        }
        nextQuestion()
    }
}

function startTimer() {}

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
    endContent.forEach(x => x.style.display = "inherit");
}



