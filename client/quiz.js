const quiz = document.getElementById("quiz");
var questionsData;
var questions = [];
var questions2= [];
var choices= [];
var answer;
var question1;
var questionsFromDB= [];
var data;
var firstRun= true;





const lastQuestion = 2;
var runningQuestion = 0;
var count = 0;
const questionTime = 10; // 10s
var timer;
var score = 0;


//display a question
function displayQuestion(questions2){
    
    var choiceA = document.getElementById("A");
    var choiceB = document.getElementById("B");
    var choiceC = document.getElementById("C");
    var questionsToDisplay=questions2
    var question= document.getElementById("question");
    question.innerHTML = "<p>"+ questionsToDisplay[runningQuestion].question +"</p>";
    choiceA.innerHTML = questionsToDisplay[runningQuestion].choiceA;
    choiceB.innerHTML = questionsToDisplay[runningQuestion].choiceB;
    choiceC.innerHTML = questionsToDisplay[runningQuestion].choiceC;
}

function manipulateData(data){
  //get questions from data and put into array
  questions[0] = data.quiz.question1.question;
  questions[1] = data.quiz.question2.question;
  questions[2] = data.quiz.question3.question;
  //get choices from data and put into array    
  choices[0] = data.quiz.question1.ans1;
  choices[1] = data.quiz.question1.ans2;
  choices[2] = data.quiz.question1.ans3;
  choices[3] = data.quiz.question2.ans1;
  choices[4] = data.quiz.question2.ans2;
  choices[5] = data.quiz.question2.ans3;
  choices[6] = data.quiz.question3.ans1;
  choices[7] = data.quiz.question3.ans2;
  choices[8] = data.quiz.question3.ans3;

  questionsFromDB = [

      {
          question : questions[0],
         choiceA : choices[0],
         choiceB : choices[1],
         choiceC : choices[2],
         //correct : "A"
     },{
         question : questions[1],
         choiceA : choices[3],
         choiceB : choices[4],
         choiceC : choices[5],
         //correct : "B"
     },{
         question : questions[2],
         choiceA : choices[6],
         choiceB : choices[7],
         choiceC : choices[8],
         //correct : "C"
     } 
 ];
 return questionsFromDB;
}

//start quiz
function startQuiz(){    
    var data= localStorage.getItem("data");
    data= JSON.parse(data)
    
    questionsFromDB= manipulateData(data);

    if (firstRun==true){
    // create some variables
    timer = setInterval(renderCounter,1000); // 1000ms = 1s
    var quiz= document.getElementById("quiz");
    quiz.style.display = "block";
    firstRun=false;
    }
    displayQuestion(questionsFromDB);    
    renderCounter();
    
    
}


// counter render

function renderCounter(){
    if(count <= questionTime){
        var counter = document.getElementById("counter");
        counter.innerHTML = count;
        count++
    }else{
        count = 0;
        // change progress color to red
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            getAnswer("none");
        }else{
            // end the quiz and show the score
            clearInterval(timer);
            scoreRender();
        }
    }
}

// checkAnwer

function getAnswer(response){
        var data= localStorage.getItem("data");
        data= JSON.parse(data)
        correct= [
            data.quiz.question1.answer,
            data.quiz.question2.answer,
            data.quiz.question3.answer,
        ]
        questionsFromDB= manipulateData(data);
        displayQuestion(questionsFromDB);   
        checkAnswer(correct,response,data)

}

function checkAnswer(correct, response, data){
    questionsFromDB= manipulateData(data);
    
    if( response == correct[runningQuestion])
    { 
        // answer is correct
        score++;      
 
    }
    
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        displayQuestion(questionsFromDB);
    }else{
        // end the quiz and show the score
        clearInterval(timer);
        scoreRender();
    }
}


// score render
function scoreRender(){
    var modal = document.getElementById("modal")
       modal.style.display="block"
    
    var home= document.getElementById("homeBtn")
    var backButton= document.getElementById("back")
    var again=document.getElementById("again")
    var line1= document.getElementById("line1")
    var line2= document.getElementById("line2")
    var line3= document.getElementById("line3")
    
    console.log(score)
    
    var percent = Math.round(100 * score/3);
    
   if (score<3){
       console.log("score is 3")
       line1.innerHTML = percent+"%";
       line2.innerHTML = "You didn't pass this time";
       line3.innerHTML = "If you're stuck try viewing the lesson again";       
       
       again.style.display="block"
       backButton.style.display="block"
       home.style.display="none"

       

   }

}

function complete(){
    
   
}

function refresh(){
    location.reload();
   
}


