//Decided to put all the question content in a different folder for separation of concerns
import * as SelectQuestion from "./questions.js";
var question = SelectQuestion.myQuestions;

//Variables to switch content
var startContent = document.querySelectorAll('.title-screen');
var questionContent = document.querySelectorAll('.question-screen');
var endContent = document.querySelectorAll('.end-screen')
var gameOverContent = document.querySelectorAll('.gameover-screen')


//Variables that are associated with a button
var gameStart = document.querySelector('#start-btn');
var gameEnd = document.querySelector('#end-btn');
var gameoverButton = document.querySelector("#gameover-btn");
var answerStatements = document.querySelectorAll(".btn-answer.btn-own");


//Other DOM manipulation variables
var questionStatement = document.querySelector('#question-placeholder');
var counter = document.querySelector("#countdown-timer");
var highscoreList = document.querySelector("#highscore-list");


//Global Variables that functions will use
var questionNum;
var counterTimer;
var IntervalID;



//Resets some components when the page is loaded
window.onload =  function(){
    if(localStorage.getItem("highscores") != null){
        highscoreList.outerHTML = localStorage.getItem("highscores")
    }
    window.scroll(0, 0);
}


//Transition from GameOver to start
gameoverButton.addEventListener('click', transitionToStart)

//Transition from the start screen to actually playing the game
gameStart.addEventListener('click', startGame);


//Transition from one question to another
answerStatements.forEach(i => {
    i.addEventListener('click',answerQuestion);
})

//Transition from the Enter your name screen to the start menu
gameEnd.addEventListener('click', addHighscoreList);



function startGame() {
    document.querySelector(".correct-incorrect").children[0].classList = ".correct-incorrect"
    counterTimer = 80;
    questionNum = 0;
    startContent.forEach(x => x.style.display = "none");
    questionContent.forEach(x => x.style.display = "inherit");
    questionStatement.childNodes[1].innerHTML = question[0].question;
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
        flashIncorrect();
    } else {
        flashCorrect();

    }
    if (questionNum === 9) {
        endGame();
        return;
    }
    nextQuestion();
}

//Timer starts when the game starts
function startTimer() {
    IntervalID = setInterval(function() {
        counterTimer--;
        counter.children[0].innerHTML = counterTimer;
        if (counterTimer <= 0){
            gameOver();
            stopTimer();
            return;
        }
    },1000)
}

//Timer stops when the game stops
function stopTimer() {
    clearInterval(IntervalID);
}


function nextQuestion() {
    questionNum++;
    questionStatement.childNodes[1].innerHTML = question[questionNum].question;
    answerStatements[0].innerHTML = question[questionNum].answers.a;
    answerStatements[1].innerHTML = question[questionNum].answers.b;
    answerStatements[2].innerHTML = question[questionNum].answers.c;
    answerStatements[3].innerHTML = question[questionNum].answers.d;
}

function endGame() {
    questionContent.forEach(x => x.style.display = "none");
    endContent.forEach(x => x.style.display = "inherit");
    document.querySelector('#display-end-screen').innerHTML = counterTimer;
    stopTimer();
}

function addHighscoreList() {
    highscoreList = document.querySelector("#highscore-list");
    var playerName =  document.querySelector('#enter-name').value;
    var node = document.createElement("li");
    node.setAttribute('class', counterTimer);
    var textnode = document.createTextNode(`${playerName}: ${counterTimer}`);
    node.appendChild(textnode);
    for (var i = 0; i <= (highscoreList.childElementCount); i++) {
        //if there is nothing in the highscore list
        if(highscoreList.childElementCount === 0) {
            highscoreList.appendChild(node);
            break;
        //if we got the worst score in the system
        } else if (i === highscoreList.childElementCount) {
            highscoreList.insertBefore(node, highscoreList[highscoreList.children.length - 1]);
            break;
        //if our score match with another score or is greater than a score going down the list, we place our score above theirs
        } else if (parseInt(node.className) >= parseInt(highscoreList.children[i].className)) {
            highscoreList.insertBefore(node, highscoreList.children[i]);
            break;
        } 
    } 
    endContent.forEach(x => x.style.display = "none");
    startContent.forEach(x => x.style.display = "inherit");
    localStorage.setItem("highscores", highscoreList.outerHTML);
}

function gameOver() {
    questionContent.forEach(x => x.style.display = "none");
    gameOverContent.forEach(x => x.style.display = "inherit");
}

function transitionToStart() {
    endContent.forEach(x => x.style.display = "none");
    gameOverContent.forEach(x => x.style.display = "none");
    startContent.forEach(x => x.style.display = "inherit");
}

function flashCorrect() {
    document.querySelector(".correct-incorrect").children[0].classList = ".correct-incorrect reveal-green"
    document.querySelector(".correct-incorrect").children[0].innerHTML = "Correct!"
}

function flashIncorrect() {
    document.querySelector(".correct-incorrect").children[0].classList = ".correct-incorrect reveal-red"
    document.querySelector(".correct-incorrect").children[0].innerHTML = "Incorrect -10 points"
}