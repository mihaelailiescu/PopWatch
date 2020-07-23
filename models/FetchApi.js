class FetchApi {
    constructor(apiURL) {
        this.apiURL = apiURL;
    }

    getMoviesList(skip = 0, take = 10) {
        return fetch(`${this.apiURL}` + "movies?skip=" + skip + "&take=" + take, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response => {
                let resp = response.json();
                return resp;
            })
            .catch(error => {
                console.log(error);
            })
    }

    getMoviesListByQuery(query, skip = 0, take = 10) {
        return fetch(`${this.apiURL}` + "movies?skip=" + skip + "&take=" + take + "&" + query, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response => {
                let resp = response.json();
                return resp;
            })
            .catch(error => {
                console.log(error);
            })
    }

    async getTotalMovies() {
        let i = 0;
        let arrayOfMovies = [];
        let arrayOfTotalMovies = [];
        let movies;
        do {
            arrayOfMovies = await this.getMoviesList(i);
            movies = arrayOfMovies.results;
            arrayOfTotalMovies = arrayOfTotalMovies.concat(movies);
            i += 10;
        } while (movies.length === 10);
        return arrayOfTotalMovies;
    }

    getSingleMovie(movieId) {
        return fetch(`${this.apiURL}` + "movies/" + movieId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(response => {
                let resp = response.json();
                return resp;
            })
            .catch(error => {
                console.log(error);
            })
    }
    editMovie(movieId, updatedMovieObj, token) {

        return fetch(`${this.apiURL}` + "movies/" + movieId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            body: JSON.stringify(updatedMovieObj)
        }).then(resopnse => {
            let result = resopnse.json();
            console.log(result);
            return result;
        }).catch(error => {
            console.log(error);
        })
    }

    deleteMovie(movieId, token) {
        console.log('fetchDelete')
        return fetch(`${this.apiURL}` + "movies/" + movieId, {
            method: "DELETE",
            headers: {
                "x-auth-token": token
            }
        }).then(response => {
            return response;
        }).catch(error => {
            console.log(error);
        })
    }

    signIn(inputUsername, inputPassword) {
        const auth = {
            "username": inputUsername,
            "password": inputPassword
        }

        return fetch(`${this.apiURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(auth)
        }).then((response) => {
            return response.json();

        }).catch(error => {
            console.log(error);
        })
    }

    register(inputUsername2, inputPassword2) {
        const urlencoded = new URLSearchParams();
        urlencoded.append("username", inputUsername2);
        urlencoded.append("password", inputPassword2);

        return fetch(`${this.apiURL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlencoded
        }).then((response) => {
            console.log("response: ", response);
            return response.json();
        })
    }

    createMovieRequest(movieObject, token) {
        return fetch(`${this.apiURL}` + "movies", {
                method: "POST",
                headers: {
                    "X-Auth-Token": token,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: movieObject
            })
            .then(response => response.json());
    }

}