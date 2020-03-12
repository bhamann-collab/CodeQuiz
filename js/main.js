import * as SelectQuestion from "./questions.js";
var question = SelectQuestion.myQuestions;


var startContent = document.querySelectorAll('.title-screen');
var questionContent = document.querySelectorAll('.question-screen');
var endContent = document.querySelectorAll('.end-screen')

var gameStart = document.querySelector('#start-btn');
var gameEnd = document.querySelector('#end-btn');

var questionStatement = document.querySelector('.question-screen').childNodes[3];
var answerStatements = document.querySelectorAll(".btn-answer.btn-own");
var answerButton = document.querySelectorAll(".btn-answer");
var counter = document.querySelector("#countdown-timer");
var highscoreList = document.querySelector("#highscore-list");

var questionNum;
var counterTimer;
var counterHighScore = 0;
var IntervalID;


gameStart.addEventListener('click', startGame);

answerStatements.forEach(i => {
    i.addEventListener('click',answerQuestion);
})

gameEnd.addEventListener('click', addHighscoreList);



function startGame() {
    counterTimer = 75;
    questionNum = 0;
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
    IntervalID = setInterval(function() {
        counterTimer--;
        counter.children[0].innerHTML = counterTimer;
        console.log(counterTimer)
    },1000)
}

function stopTimer() {
    clearInterval(IntervalID);
    //counterTimer = 75;
}

function nextQuestion() {
    //Testing purposes, delete line below later and uncomment the line below that one
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
    document.querySelector('#display-end-screen').innerHTML = counterTimer;
    stopTimer();
}

function addHighscoreList() {
    var playerName =  document.querySelector('#enter-name').value;
    var node = document.createElement("li");
    node.setAttribute('class', counterTimer)
    var textnode = document.createTextNode(`${playerName}: ${counterTimer}`);
    node.appendChild(textnode);
    for (var i = 0; i <= (highscoreList.childElementCount); i++) {
        //if there is nothing in the highscore list
        if(highscoreList.childElementCount === 0) {
            console.log("There are no element")
            highscoreList.appendChild(node)
            break;
        //if we got the worst score in the system
        } else if (i === highscoreList.childElementCount) {
            console.log("worst score")
            highscoreList.insertBefore(node, highscoreList[highscoreList.children.length - 1]);
            break;
        //if our score match with another score or is greater than a score going down the list, we place our score above theirs
        } else if (parseInt(node.className) >= parseInt(highscoreList.children[i].className)) {
            console.log(`Hello you absolute legends`)
            highscoreList.insertBefore(node, highscoreList.children[i]);
            break;
        } 
    } 
    endContent.forEach(x => x.style.display = "none");
    startContent.forEach(x => x.style.display = "inherit");
}

function gameOver() {

}

function sortList() {
    var list = document.querySelector("#highscore-list").children;
    var switching = true;
    var arr;

    while (switching) {
        switching = false;
        for (i = 0; i < (list.length - 1); i++) {
            shouldSwitch = false;
            arr = list[0].innerHTML;
        }
    }

}