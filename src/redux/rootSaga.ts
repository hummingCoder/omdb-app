import {debounce, takeLeading} from "redux-saga/effects";
import {GET_MOVIE_ITEM, GET_MOVIES, GET_MOVIES_IMMEDIATE} from "./movies/constants";
import {handleGetMovie, handleGetMovies} from "./movies/sagas";

export function* watcherSaga() {
    yield takeLeading(GET_MOVIE_ITEM, handleGetMovie);
    yield debounce(1500, GET_MOVIES, handleGetMovies);
    yield takeLeading(GET_MOVIES_IMMEDIATE, handleGetMovies);

}
