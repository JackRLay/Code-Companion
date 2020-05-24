//get page elements for later



var correct1;
var correct2;
var correct3;
var data


function getBlanks(){  
        getLevel()
        getData();

}

function getData(data){
    var data= localStorage.getItem("data");
    data= JSON.parse(data)

    code =data.activity.code
    correct1=data.activity.correct1
    correct2=data.activity.correct2
    correct3=data.activity.correct3

    

    
    document.getElementById("editor").value = code;

    var editor= CodeMirror.fromTextArea(document.getElementById('editor'),
        {
            //code editor layout
            mode:"python",
            theme:"darcula",
            lineNumbers:"true",
            
        });
        //code editor settings
        editor.setSize("1000","450");
        editor.setOption("readOnly",true);
}


function checkAnswers(){
    //get answers
    var data2= localStorage.getItem("data2");

    var ans1= document.getElementById("ans1").value;
    var ans2= document.getElementById("ans2").value;
    var ans3= document.getElementById("ans3").value;

    var modal = document.getElementById("myModal");

    var score=0;

    //check first answer
    if (ans1==correct1){
        score++;
        document.getElementById("ans1").style.borderColor= "green";
    }
    else{
        document.getElementById("ans1").style.borderColor= "red";
    }
    //check second answer
    if (ans2==correct2){
        score++;
        document.getElementById("ans2").style.borderColor= "green";
    }
    else{
        document.getElementById("ans2").style.borderColor= "red";
    }
    //check third answer
    if (ans3==correct3){
        score++;
        document.getElementById("ans3").style.borderColor= "green";
    }
    else{
        document.getElementById("ans3").style.borderColor= "red";
    }

    //check score and if score is 100% open modal to progress
    if (score==3){
        modal.style.display = "block";
    }

}

function takeQuiz(){
    window.location.href = "/quiz"
}