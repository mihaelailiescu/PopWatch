
const registerBtn = document.getElementById("registerButton");
const inputUsername2 = document.getElementById("username2");
const inputPassword2 = document.getElementById("password2");


registerBtn.addEventListener("click",  async (event) =>{
    event.preventDefault();
    const registerFail = document.getElementById("register_fail");
    const registerSuccess = document.querySelector(".err_reg");
    const signUpDiv = document.querySelector(".signUp");

    if(registerFormValidation() !== false){
    const registerResponse = await fetchAPI.register(inputUsername2.value, inputPassword2.value);
    if(registerResponse.message){
        registerFail.style.display = "flex"
        registerSuccess.style.display = "none"
    } else {
        signUpDiv.style.display = "none"
        registerSuccess.style.display = "flex"
        registerFail.style.display = "none"
        signUpDiv.style.display = "none"
    }
    }

    console.log(inputUsername2.value)
    console.log(inputPassword2.value)
})


function registerFormValidation(){

    const userError2 = document.getElementById("user_error2");
    const passError2 = document.getElementById("password_error2");

    if(inputUsername2.value.length < 4 || inputUsername2.value === ""){
        inputUsername2.classList.add("input-fail");
        userError2.style.display = "flex";
        inputUsername2.focus();
        return false;
    } else {
        inputUsername2.classList.remove("input-fail");
        userError2.style.display = "none";
    }
    
    if(inputPassword2.value.length < 4 || inputPassword2.value === "") {
        inputPassword2.classList.add("input-fail");
        passError2.style.display = "flex";
        inputPassword2.focus();
        return false;
    }
    else {
        inputPassword2.classList.remove("input-fail");
        passError2.style.display = "none";
    }
}

