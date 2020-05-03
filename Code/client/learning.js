var text;
var code;


async function getName() {                    
    await $(function() {
        var item = localStorage.getItem("id");
        
console.log(item)
        $.get("http://localhost:9000/learn/"+item);
    });
}

function loadInformation(){  
     getName();    
                   
    $.get("http://localhost:9000/getData",{},function(res){
    let data=res; 
    getData(data);
})
}

function getData(data){
    text = data.text;
    code = data.code;
    console.log(text)
    console.log(code)
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