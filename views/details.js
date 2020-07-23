const apiURLSingleMovie = new FetchApi('https://movies-app-siit.herokuapp.com/');

const movieId = window.location.search.substring(4, 100).trim();
console.log(movieId);

const displaySingleMovie = async () => {
    const getMoviesResponse = await apiURLSingleMovie.getSingleMovie(movieId);
    const singleMovieContainer = document.getElementById("singleMovieDetails")

    const singleMovie = new Movie(getMoviesResponse._id,
        getMoviesResponse.Title,
        getMoviesResponse.Poster,
        getMoviesResponse.Year,
        getMoviesResponse.imdbRating,
        getMoviesResponse.Genre,
        getMoviesResponse.Runtime,
        getMoviesResponse.Language,
        getMoviesResponse.Plot,
        getMoviesResponse.Actors)
    const movieDiv = singleMovie.showSingleMovie();
    singleMovieContainer.appendChild(movieDiv)

    document.getElementById(`${getMoviesResponse._id}`).addEventListener("click", async function () {
        if (event.target.classList.contains('editButton')) {
            document.querySelector(".movieDetails").style.webkitFilter = "blur(4px)";
            editSingleMovie((event.target.parentElement))
        }
        if (event.target.classList.contains('deleteButton')) {
            const token = window.localStorage.getItem("accessToken");
            await apiURLSingleMovie.deleteMovie(movieId, token);
            removeDeletedElementFromDOM(singleMovieContainer);
            window.location.replace("home.html")
        }
    })
    hideEditButton();
}

displaySingleMovie();

async function editSingleMovie() {
    const singleMovieContainer = document.getElementById("singleMovieDetails");
    const oldTitle = singleMovieContainer.querySelector(".title");
    const oldPoster = singleMovieContainer.querySelector(".posterSrc")
    const oldYear = singleMovieContainer.querySelector(".year");
    const oldRating = singleMovieContainer.querySelector(".rating");
    const oldGenre = singleMovieContainer.querySelector(".genre");
    const oldRuntime = singleMovieContainer.querySelector(".runtime");
    const oldLanguage = singleMovieContainer.querySelector(".language");
    const oldPlot = singleMovieContainer.querySelector(".plot");
    const oldActors = singleMovieContainer.querySelector(".actors");
    const updatedMovieObj = document.createElement("form");
    updatedMovieObj.classList.add("editForm");
    updatedMovieObj.innerHTML = `<label for="newMovieTitle">Title</label>
                                <input type="text" value="${oldTitle.textContent}" name="newMovieTitle" id="newMovieTitle"/>
                                <label for="newMoviePoster">Poster</label>
                                <input type="text" value="${oldPoster.src}" name="newMoviePoster" id="newMoviePoster"/>
                                <label for="newMovieYear">Year</label>
                                <input type="text" value="${oldYear.textContent}" name="newMovieYear" id="newMovieYear"/>
                                <label for="newMovieImdbRating">Imdb Rating</label>
                                <input type="text" value="${oldRating.textContent}" name="newMovieImdbRating" id="newMovieImdbRating"/>
                                <label for="newMovieGenre">Genre</label>
                                <input type"text" value="${oldGenre.textContent}" name="newMovieGenre" id="newMovieGenre"/>
                                <label for="newMovieRuntime">Run Time</label>
                                <input type"text" value="${oldRuntime.textContent}" name="newMovieRuntime" id="newMovieRuntime"/>
                                <label for="newMovieLanguage">Language</label>
                                <input type"text" value="${oldLanguage.textContent}" name="newMovieLanguage" id="newMovieLanguage"/>
                                <label for="newMoviePlot">Plot</label>
                                <input type"text" value="${oldPlot.textContent}" name="newMoviePlot" id="newMoviePlot"/>
                                <label for="newMovieActors">Actors</label>
                                <input type"text" value="${oldActors.textContent}" name="newMovieActors" id="newMovieActors"/>
                                <button class="updateButton">Save Changes</button>
                                <button class="cancelButton">Cancel</button>`;
    singleMovieContainer.appendChild(updatedMovieObj);
    singleMovieContainer.querySelector(".cancelButton").addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector(".movieDetails").style.webkitFilter = "blur()";
        removeDeletedElementFromDOM(updatedMovieObj);
    });
    singleMovieContainer.querySelector(".updateButton").addEventListener("click", async function (event) {
        event.preventDefault();
        const updatedMovieTitle = document.querySelector("#newMovieTitle");
        const updatedMoviePoster = document.querySelector("#newMoviePoster");
        const updatedMovieYear = document.querySelector("#newMovieYear");
        const updatedMovieImdbRating = document.querySelector("#newMovieImdbRating");
        const updatedMovieGenre = document.querySelector("#newMovieGenre");
        const updatedMovieRuntime = document.querySelector("#newMovieRuntime");
        const updatedMovieLanguage = document.querySelector("#newMovieLanguage");
        const updatedMoviePlot = document.querySelector("#newMoviePlot");
        const updatedMovieActors = document.querySelector("#newMovieActors");

        const updatedMovie = {
            Title: updatedMovieTitle.value,
            Poster: updatedMoviePoster.value,
            Year: updatedMovieYear.value,
            imdbRating: updatedMovieImdbRating.value,
            Genre: updatedMovieGenre.value,
            Runtime: updatedMovieRuntime.value,
            Language: updatedMovieLanguage.value,
            Plot: updatedMoviePlot.value,
            Actors: updatedMovieActors.value
        }

        removeDeletedElementFromDOM(updatedMovieObj);

        const token = window.localStorage.getItem("accessToken");
        console.log(token)
        const movieEditor = await apiURLSingleMovie.editMovie(movieId, updatedMovie, token);
        oldTitle.innerText = updatedMovieTitle.value;
        oldPoster.innerText = updatedMoviePoster.value;
        oldYear.innerText = updatedMovieYear.value;
        oldRating.innerText = updatedMovieImdbRating.value;
        oldGenre.innerText = updatedMovieGenre.value;
        oldRuntime.innerText = updatedMovieRuntime.value;
        oldLanguage.innerText = updatedMovieLanguage.value;
        oldPlot.innerText = updatedMoviePlot.value;
        oldActors.innerText = updatedMovieActors.value;
        document.querySelector(".movieDetails").style.webkitFilter = "blur()";
    })
}
removeDeletedElementFromDOM = (domElement) => {
    domElement.remove();
};

function hideEditButton() {
    const edit_button = document.querySelector(".editButton");
    const delete_button = document.querySelector(".deleteButton");
    if (window.localStorage.getItem("accessToken")) {
        edit_button.style.display = "inline";
        delete_button.style.display = "inline";
    } else {
        edit_button.style.display = "none";
        delete_button.style.display = "none";
    }
}