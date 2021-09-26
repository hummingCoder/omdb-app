import {SET_MOVIE_ITEM, SET_MOVIES} from "./constants";
import {Movie, MovieList} from './actions';

const initialState = {
    movie: {
        Title: "",
        Year: "",
        Rated: "",
        Released: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Writer: "",
        Actors: "",
        Plot: "",
        Language: "",
        Country: "",
        Awards: "",
        Poster: "",
        Ratings: [],
        Metascore: "",
        imdbRating: "",
        imdbVotes: "",
        imdbID: "",
        Type: "",
        DVD: "",
        BoxOffice: "",
        Production: "",
        Website: "",
        Response: "",
    },
    movies: {
        Search: [],
        totalResults: "",
        Response: ""
    }
};
export default (state = initialState, action: { type: string, movie: Movie, movies: MovieList }) => {
    switch (action.type) {
        case SET_MOVIE_ITEM:
            const {movie} = action;
            return {...state, movie};
        case SET_MOVIES:
            const {movies} = action;
            return {...state, movies};
        default:
            return state;
    }
};
