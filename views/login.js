const apiUrl = "https://movies-app-siit.herokuapp.com";
const fetchAPI = new FetchApi(apiUrl);

const loginButton = document.getElementById("sign-in");
const signUpButton = document.querySelector("#signUpBtn");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");

loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (loginFormValidation() !== false) {

        const loginResponse = await fetchAPI.signIn(inputUsername.value, inputPassword.value);
        window.localStorage.setItem("accessToken", `${loginResponse.accessToken}`);

        const accessToken = loginResponse.accessToken;
        console.log(inputUsername.value)
        console.log(accessToken)

        if (accessToken !== undefined) {
            window.location.href = "home.html";
        } else {
            const loginFailMsg = document.getElementById("login-fail");
            loginFailMsg.style.display = "flex";
        }
    }
});

function loginFormValidation() {
    const userError = document.getElementById("user_error");
    const passError = document.getElementById("password_error");

    if (inputUsername.value.length < 4 || inputUsername.value === "") {
        inputUsername.classList.add("input-fail");
        userError.style.display = "flex";
        inputUsername.focus();
        return false;
    } else {
        inputUsername.classList.remove("input-fail");
        userError.style.display = "none";
    };

    if (inputPassword.value.length < 4 || inputPassword.value === "") {
        inputPassword.classList.add("input-fail")
        passError.style.display = "flex";
        inputPassword.focus();
        return false;
    } else {
        inputPassword.classList.remove("input-fail")
        passError.style.display = "none";
    }
}

