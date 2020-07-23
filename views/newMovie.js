const apiUrl = new FetchApi('https://movies-app-siit.herokuapp.com/');

// Form validation

function validateFormElement(inputElement, errorMessage) {
    if (inputElement.value === "") {
        if (!document.querySelector('[rel="' + inputElement.id + '"]')) {
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if (document.querySelector('[rel="' + inputElement.id + '"]')) {
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.style.border = "1px solid #ccc";
            inputElement.classList.remove("inputError");
        }
    }
}


function buildErrorMessage(inputEl, errorMsg) {
    inputEl.classList.add("inputError");
    inputEl.style.border = "1px solid #FAC70C";

    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errorMsg;
    inputEl.after(errorMsgElement);
}

document.querySelector("#saveBtn").addEventListener('click', function (event) {
    event.preventDefault();

  

    const movieTitle = document.getElementById("movieTitle");
    const moviePoster = document.getElementById("moviePoster");
    const movieYear = document.getElementById("movieYear");
    const movieRating = document.getElementById("movieRating");
    const movieID = document.getElementById("movieID");
    const movieType = document.getElementById("movieType");
    const movieGenre = document.getElementById("moviegenre");
    const moviePlot = document.getElementById("moviePlot");

  

    validateFormElement(movieTitle, "Please enter title!");
    validateFormElement(moviePoster, "Please add a poster!");
    validateFormElement(movieYear, "Please add the year!");
    validateFormElement(movieID, "Please add the ID!");
    validateFormElement(movieType, "Please add the type!");
    validateFormElement(movieRating, "Please add the rating!");
    validateFormElement(movieGenre, "Please add the genre!");
    validateFormElement(moviePlot, "Please add a plot!");


    //create new movie 
    if (movieTitle.value !== "" && moviePoster.value !== "" && movieYear.value !== "" && movieID.value !== "" && movieType.value !== "" && movieRating.value !== ""
        && movieGenre.value !== "" && moviePlot.value !== "") {

        var urlencoded = new URLSearchParams();
        urlencoded.append("Title", movieTitle.value);
        urlencoded.append("Poster", moviePoster.value);
        urlencoded.append("Year", movieYear.value);
        urlencoded.append("imdbID", movieID.value);
        urlencoded.append("Type", movieType.value);
        urlencoded.append("imdbRating", movieRating.value);
        urlencoded.append("Genre", movieGenre.value);
        urlencoded.append("Plot", moviePlot.value);

        async function createMovie() {
            const token = window.localStorage.getItem("accessToken");
            console.log(token)
            const response = await apiUrl.createMovieRequest(urlencoded, token);
            console.log(response);
        }
        createMovie().then(() => {
            document.getElementById("alert").style.visibility = "visible";
        });
    }
});




document.querySelector('#cancelBtn').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "home.html";
});

document.querySelector('.closebtn').addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "home.html";
});