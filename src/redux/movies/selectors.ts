import {createSelector} from "reselect";

export const moviesSelector = createSelector(
    (state: any) => state.movieReducer.movies,
    (movies) => {
        return movies
    }
);
export const movieSelector = createSelector(
    (state: any) => state.movieReducer.movie,
    (movie) => {
        return movie
    }
);
