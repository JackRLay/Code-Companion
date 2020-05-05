//get page elements for later



var correct1;
var correct2;
var correct3;

async function getBlanksName() {                    
    await $(function() {
        $.get("http://localhost:9000/activity/"+localStorage.getItem("id")+"Activity");
    });
}


function getBlanks(){  

        getLevel()
         getBlanksName();
        
                       
        $.get("http://localhost:9000/getData",{},function(res){
        let data=res; 
        
        getData(data);
})
}

function getData(data){
    code =data.code
    correct1 = data.correct1;
    correct2 = data.correct2;
    correct3 = data.correct3;
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