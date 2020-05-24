var text;
var code;



function loadInformation(){  
         
    getLevel()
    getData();
    
}




function getData(){
    var data= localStorage.getItem("data");
    data= JSON.parse(data)
    text = data.learningInfo.text;
    code = data.learningInfo.code;
    document.getElementById("text").innerHTML = text;
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