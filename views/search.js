const movieSearch = window.location.search.substring(13, 100).trim();
const api = new FetchApi('https://movies-app-siit.herokuapp.com/');
const MOVIES_PER_SEARCH_PAGE = 3;
let currentPageMoviesListTitle = 0;
let currentPageMoviesListGenre = 0;
let currentPageMoviesListLanguage = 0;
let currentPageMoviesListYear = 0;
let currentPageMoviesListImdbRating = 0;

async function displayMovies(containerId, query, skip = 0) {

    const getMoviesResponse = await api.getMoviesListByQuery(query, skip, 10);
    let arrayOfMovies = getMoviesResponse.results;
    const container = document.getElementById(containerId);

    let foundMovies = arrayOfMovies.filter(movie => {
        return movie.Poster != undefined && movie.Title.includes(movieSearch);
    })

    renderMovies(foundMovies, MOVIES_PER_SEARCH_PAGE, container)
}

displayMovies("moviesSearchedByUser", "Title=" + movieSearch, 0);

document.getElementById("searchByGenre").addEventListener("click", (event) => {
    event.preventDefault();
    const inputGenre = document.getElementById("genreInput").value;
    document.querySelector(".btnGenreL").style.display = "flex";
    document.querySelector(".btnGenreR").style.display = "flex";
    currentPageMoviesListGenre = 0;
    displayMovies("moviesSearchedByGenre", "Genre=" + inputGenre, currentPageMoviesListGenre)
})

document.getElementById("searchByLanguage").addEventListener("click", (event) => {
    event.preventDefault();
    const inputLanguage = document.getElementById("languageInput").value;
    document.querySelector(".btnLanguageL").style.display = "flex";
    document.querySelector(".btnLanguageR").style.display = "flex";
    currentPageMoviesListLanguage = 0;
    displayMovies("moviesSearchedByLanguage", "Language=" + inputLanguage, currentPageMoviesListLanguage)
})

document.getElementById("searchByYear").addEventListener("click", (event) => {
    event.preventDefault();
    const inputYear = document.getElementById("yearInput").value;
    document.querySelector(".btnYearL").style.display = "flex";
    document.querySelector(".btnYearR").style.display = "flex";
    currentPageMoviesListYear = 0;
    displayMovies("moviesSearchedByYear", "Year=" + inputYear, currentPageMoviesListYear);
})

document.getElementById("searchByRaiting").addEventListener("click", (event) => {
    event.preventDefault();
    const inputRating = document.getElementById("ratingInput").value;
    document.querySelector(".btnRaitingL").style.display = "flex";
    document.querySelector(".btnRaitingR").style.display = "flex";
    currentPageMoviesListImdbRating = 0;
    displayMovies("moviesSearchedByRating", "imdbRating=" + inputRating, currentPageMoviesListImdbRating);
})

function displayPreviousMovies(type) {
    switch (type) {
        case 0:
            {
                if (currentPageMoviesListTitle != 0) {
                    currentPageMoviesListTitle -= MOVIES_PER_SEARCH_PAGE;
                    displayMovies("moviesSearchedByUser", "Title=" + movieSearch, currentPageMoviesListTitle);
                }
                break;
            }
        case 1:
            {
                if (currentPageMoviesListGenre != 0) {
                    currentPageMoviesListGenre -= MOVIES_PER_SEARCH_PAGE;
                    const inputGenre = document.getElementById("genreInput").value;
                    displayMovies("moviesSearchedByGenre", "Genre=" + inputGenre, currentPageMoviesListGenre);
                }

                break;
            }
        case 2:
            {
                if (currentPageMoviesListLanguage != 0) {
                    currentPageMoviesListLanguage -= MOVIES_PER_SEARCH_PAGE;
                    const inputLanguage = document.getElementById("languageInput").value;
                    displayMovies("moviesSearchedByLanguage", "Language=" + inputLanguage, currentPageMoviesListLanguage);
                }
                break;
            }
        case 3:
            {
                if (currentPageMoviesListYear != 0) {
                    currentPageMoviesListYear -= MOVIES_PER_SEARCH_PAGE;
                    const inputYear = document.getElementById("yearInput").value;
                    displayMovies("moviesSearchedByYear", "Year=" + inputYear, currentPageMoviesListYear);
                }
                break;
            }
        case 4:
            {
                if (currentPageMoviesListImdbRating != 0) {
                    currentPageMoviesListImdbRating -= MOVIES_PER_SEARCH_PAGE;
                    const inputRating = document.getElementById("ratingInput").value;
                    displayMovies("moviesSearchedByRating", "imdbRating=" + inputRating, currentPageMoviesListImdbRating);
                }
                break;
            }
        default:
            break;
    }
}

function displayNextMovies(type) {
    switch (type) {
        case 0:
            {
                console.log("next movies");
                currentPageMoviesListTitle += MOVIES_PER_SEARCH_PAGE;
                displayMovies("moviesSearchedByUser", "Title=" + movieSearch, currentPageMoviesListTitle);

                break;
            }
        case 1:
            {
                currentPageMoviesListGenre += MOVIES_PER_SEARCH_PAGE;
                const inputGenre = document.getElementById("genreInput").value;
                displayMovies("moviesSearchedByGenre", "Genre=" + inputGenre, currentPageMoviesListGenre);

                break;
            }
        case 2:
            {
                currentPageMoviesListLanguage += MOVIES_PER_SEARCH_PAGE;
                const inputLanguage = document.getElementById("languageInput").value;
                displayMovies("moviesSearchedByLanguage", "Language=" + inputLanguage, currentPageMoviesListLanguage);

                break;
            }
        case 3:
            {
                currentPageMoviesListYear += MOVIES_PER_SEARCH_PAGE;
                const inputYear = document.getElementById("yearInput").value;
                displayMovies("moviesSearchedByYear", "Year=" + inputYear, currentPageMoviesListYear);

                break;
            }
        case 4:
            {
                currentPageMoviesListImdbRating += MOVIES_PER_SEARCH_PAGE;
                const inputRating = document.getElementById("ratingInput").value;
                displayMovies("moviesSearchedByRating", "imdbRating=" + inputRating, currentPageMoviesListImdbRating);

                break;
            }
        default:
            break;
    }
}