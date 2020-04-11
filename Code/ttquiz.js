//var module = require("./module");  

//getting all elements for later
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

var questionsData;
var questions = [];
var questions2= [];
var choices= [];
var answer;
var question1;
var questionsFromDB= [];
var data;


var socket= io();

async function getQuizName() {                    
    await $(function() {
        $.get("http://localhost:9000/ttquiz/ModulusTT");
    });
}

function generate(data){
  
   console.log("thisisdbbb"+ questionsFromDB[0].question)
   return questionsFromDB;

}

function getQuiz(){  
         getQuizName();
                       
        $.get("http://localhost:9000/",{},function(res){
        let data=res; 
        startQuiz(data);
        //generate(data);
})
}


const lastQuestion = 2;
var runningQuestion = 0;
var count = 0;
const questionTime = 15; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;


// render a question
function renderQuestion(questions2){
    var questionsToDisplay=questions2
    var q = questionsToDisplay[runningQuestion];
    
    question.innerHTML = "<p>"+ questionsToDisplay[runningQuestion].question +"</p>";
    choiceA.innerHTML = questionsToDisplay[runningQuestion].choiceA;
    choiceB.innerHTML = questionsToDisplay[runningQuestion].choiceB;
    choiceC.innerHTML = questionsToDisplay[runningQuestion].choiceC;
}

start.addEventListener("click",getQuiz());

//start quiz
function startQuiz(data){    
    

    //getQuiz();
    console.log("data: "+data);

  //get questions from data and put into array
  questions[0] = data.question1.question;
  console.log("1 "+questions[0])
  questions[1] = data.question2.question;
  console.log("2 "+questions[1])
  questions[2] = data.question3.question;
  question1=questions[0]
  //get choices from data and put into array    
  choices[0] = data.question1.ans1;
  choices[1] = data.question1.ans2;
  choices[2] = data.question1.ans3;
  choices[3] = data.question2.ans1;
  choices[4] = data.question2.ans2;
  choices[5] = data.question2.ans3;
  choices[6] = data.question3.ans1;
  choices[7] = data.question3.ans2;
  choices[8] = data.question3.ans3;

  questionsFromDB = [

      {
          question : questions[0],
        // imgSrc : "img/html.png",
         choiceA : choices[0],
         choiceB : choices[1],
         choiceC : choices[2],
         //correct : "A"
     },{
         question : questions[1],
        // imgSrc : "img/css.png",
         choiceA : "Divides two numbers and returns the result",
         choiceB : "Returns the remainder of two numbers when divided",
         choiceC : "Returns the result and remainder of a division",
         //correct : "B"
     },{
         question : "this one is just text",
         //imgSrc : "img/js.png",
         choiceA : "5",
         choiceB : "4",
         choiceC : "2",
         //correct : "C"
     } 
 ];


    // create some variables
    
    start.style.display = "none";
    renderQuestion(questionsFromDB);
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions2[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions2.length);
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}


   // module.exports.getTTQuiz = getTTQuiz; */ */