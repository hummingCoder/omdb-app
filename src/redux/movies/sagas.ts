import {call, put} from "redux-saga/effects";
import axios from "axios";
import {Movie, MovieList, setMovieItemAction, setMoviesAction} from "./actions";

const apiUrl = "https://omdbapi.com";
const apiKey = "&apikey=47636b1";

export function requestGetMovies(searchTerm: string, page: number, year?: string, itemType?: string) {
    let requestUrl: string = `${apiUrl}?s=${searchTerm}&page=${page}${apiKey}`;
    if (year) {
        requestUrl = requestUrl.concat(`&y=${year}`);
    }
    if (itemType) {
        requestUrl = requestUrl.concat(`&type=${itemType}`);
    }
    return axios.request({
        method: "get",
        url: requestUrl
    });
}

export function* handleGetMovies(action: { type: string, searchTerm: string, page: number, year?: string, itemType?: string }) {
    try {
        if (action.searchTerm?.length <= 3) {
            yield put(setMoviesAction({Search: [], totalResults: "0", Response: ""}));
            return;
        }
        const response: { data: MovieList } = yield call(requestGetMovies, action.searchTerm, action.page, action.year, action.itemType);
        const {data} = response;
        yield put(setMoviesAction(data));
    } catch (error) {
        console.error(error);
    }
}

export function requestGetMovie(imdbID: string) {
    console.log(imdbID);
    return axios.request({
        method: "get",
        url: `${apiUrl}?i=${imdbID}${apiKey}`
    });
}

export function* handleGetMovie(action: { type: string, imdbID: string }) {
    try {
        const response: { data: Movie } = yield call(requestGetMovie, action.imdbID);
        const {data} = response;
        yield put(setMovieItemAction(data));
    } catch (error) {
        console.error(error);
    }
}
