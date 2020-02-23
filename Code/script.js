function togglePasswordVisibility(){
	var password = document.getElementById("password");
	if (password.type ==="text"){
		password.type ="password";
	} else {
		password.type="text";
	}
}

function validate(input) {
    if (input.value.length ==0) {
        input.style.borderColor = "#ff0000";
      
    } else if (input.type == "email") {
      
        if (input.value.indexOf("@") !=-1 && input.value.indexOf(".") !=-1) {
          input.style.borderColor = "#7cfc00";
        } else {
  
          input.style.borderColor = "#ff0000";
        }
      
    } else {
        input.style.borderColor = "#7cfc00";
    }
}