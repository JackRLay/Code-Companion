function checkAnswers(){
    //get answers
    var ans1= document.getElementById("ans1").value;
    var ans2= document.getElementById("ans2").value;
    var ans3= document.getElementById("ans3").value;


    var score=0;

    //check first answer
    if (ans1=="float"){
        score++;
        document.getElementById("ans1").style.borderColor= "green";
    }
    else{
        document.getElementById("ans1").style.borderColor= "red";
    }
    //check second answer
    if (ans2=="print"){
        score++;
        document.getElementById("ans2").style.borderColor= "green";
    }
    else{
        document.getElementById("ans2").style.borderColor= "red";
    }
    //check third answer
    if (ans3=="format"){
        score++;
        document.getElementById("ans3").style.borderColor= "green";
    }
    else{
        document.getElementById("ans3").style.borderColor= "red";
    }

    //check and output score
    // Get the modal
    var modal = document.getElementById("modal");

    // Get the button that opens the modal
    var btn = document.getElementById("btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }

    }
}