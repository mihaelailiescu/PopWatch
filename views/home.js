const apiURL = new FetchApi('https://movies-app-siit.herokuapp.com/');

const MOVIES_PER_PAGE = 4;
let currentPageAllMovies = 0;

function renderMovies(arrayOfMovies, nr, container) {

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < Math.min(arrayOfMovies.length, nr); i++) {
        const movie = new Movie(
            arrayOfMovies[i]._id,
            arrayOfMovies[i].Title,
            arrayOfMovies[i].Poster,
            arrayOfMovies[i].Year,
            arrayOfMovies[i].imdbRating,
            arrayOfMovies[i].Genre,
            arrayOfMovies[i].Runtime,
            arrayOfMovies[i].Language,
            arrayOfMovies[i].Plot,
            arrayOfMovies[i].Actors);
        const movieDiv = movie.showMovies();
        container.appendChild(movieDiv);
    }
}

displayLatestMovies = async() => {
    const getMoviesResponse = await apiURL.getMoviesList();
    let arrayOfMovies = getMoviesResponse.results;
    const latestMoviesContainer = document.getElementById("latestMovies");

    arrayOfMovies.sort((movie1, movie2) => {
        return movie1.Year < movie2.Year ? 1 : movie1.Year == movie2.Year ? 0 : -1;
    })

    arrayOfMovies = arrayOfMovies.filter(movie => {
        return movie.Poster != undefined ? 1 : 0;
    })

    renderMovies(arrayOfMovies, MOVIES_PER_PAGE, latestMoviesContainer);
}

displayLatestMovies();

async function displayMoviesPage(page) {
    const getMoviesResponse = await apiURL.getMoviesList(page, MOVIES_PER_PAGE);
    let arrayOfMovies = getMoviesResponse.results;
    console.log(arrayOfMovies);
    const allMoviesContainer = document.getElementById("allMovies");

    renderMovies(arrayOfMovies, MOVIES_PER_PAGE, allMoviesContainer)
}

displayMoviesPage(currentPageAllMovies);

function displayPreviousMovies() {

    if (currentPageAllMovies === 0) { return false }
    currentPageAllMovies -= MOVIES_PER_PAGE;
    displayMoviesPage(currentPageAllMovies);
}

function displayNextMovies() {
    currentPageAllMovies += MOVIES_PER_PAGE;
    displayMoviesPage(currentPageAllMovies);
}

displayTopRatedMovies = async() => {
    const getMoviesResponse = await apiURL.getMoviesList();
    let arrayOfMovies = getMoviesResponse.results;
    const topRatedMoviesContainer = document.getElementById("topRatedMovies");

    arrayOfMovies.sort((movie1, movie2) => {
        return movie1.imdbRating < movie2.imdbRating ? 1 : movie1.imdbRating == movie2.imdbRating ? 0 : -1;
    })

    arrayOfMovies = arrayOfMovies.filter(movie => {
        return movie.Poster != undefined ? 1 : 0;
    })

    renderMovies(arrayOfMovies, MOVIES_PER_PAGE, topRatedMoviesContainer);
}

displayTopRatedMovies();

document.getElementById("searchButton").addEventListener('click', () => {
    const userInput = document.getElementById("searchTerm").value;
    window.location.replace("search.html?movieSearch=" + userInput)
});

function changeButtons() {
    const signUpDiv = document.querySelector(".text-not-log");
    const addMovieDiv = document.querySelector(".text-log");

    if (window.localStorage.getItem("accessToken")) {
        addMovieDiv.style.display = "flex"
        signUpDiv.style.display = "none"
    } else {
        addMovieDiv.style.display = "none"
        signUpDiv.style.display = "flex"
    }
}
changeButtons();