class Movie {
    constructor(_id, Title, Poster, Year, imdbRating, Genre, Runtime, Language, Plot, Actors) {
        this._id = _id;
        this.Title = Title;
        this.Poster = Poster;
        this.Year = Year;
        this.imdbRating = imdbRating;
        this.Genre = Genre;
        this.Runtime = Runtime;
        this.Language = Language;
        this.Plot = Plot;
        this.Actors = Actors;
    }

    showMovies() {
        let movieElement = document.createElement("div");
        movieElement.setAttribute("id", this._id);
        movieElement.setAttribute("class", "latestMovieElement");
        movieElement.innerHTML = `
        <a href="/pages/details.html?id=${this._id}"><img src='${this.Poster}' /></a>
        `;
        return movieElement;
    }

    showSingleMovie() {
        let movieElement = document.createElement("div");
        movieElement.setAttribute("id", this._id);
        movieElement.setAttribute("class", "movieDetails");
        movieElement.innerHTML = `
        <img class ="posterSrc"src=${this.Poster} />
        <div class="movieFields">
        <p">Title:</p>
        <p class="title">${this.Title}</p><br>
        <p>Genre:</p>
        <p class="genre">${this.Genre}</p><br>
        <p>Year:</p>
        <p class="year">${this.Year}</p><br>
        <p>Runtime:</p>
        <p class="runtime">${this.Runtime}</p><br>
        <p>Ratting:</p>
        <p class="rating">${this.imdbRating}</p><br>
        <p>Language:</p>
        <p class="language">${this.Language}</p><br>
        <p>Plot:</p>
        <p class="plot">${this.Plot}</p><br>
        <p>Actors:</p>
        <p class="actors">${this.Actors}</p><br>
        <button class = "editButton">EDIT</button>
        <button class = "deleteButton">DELETE</button>
        </div>
        `;
        return movieElement;
    }
}