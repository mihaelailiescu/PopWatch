function loggedOrNot() {
    if (window.localStorage.getItem("accessToken")) {
        document.querySelector(".signIn").style.display = "none";
        document.querySelector(".signOut").style.display = "flex";
    } else {
        document.querySelector(".signIn").style.display = "flex";
        document.querySelector(".signOut").style.display = "none";
    }
}
loggedOrNot()

const signOutBtn = document.querySelector(".signOut");
signOutBtn.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    console.log("token removed");
    signOutBtn.style.display = "none";
})