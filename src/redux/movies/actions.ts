import {GET_MOVIE_ITEM, GET_MOVIES, GET_MOVIES_IMMEDIATE, SET_MOVIE_ITEM, SET_MOVIES,} from "./constants";

export interface Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieList {
    Search?: MovieListItem[];
    totalResults: string;
    Response: string;
}

export interface MovieListItem {
    Title?: string;
    Year: string;
    imdbID: string;
    Type?: string;
    Poster: string;
}

export const getMoviesAction = (searchTerm: string, page: number, year?: string, itemType?: string) => {
    return {
        type: GET_MOVIES,
        searchTerm,
        page,
        year,
        itemType
    }
};
export const getMoviesImmediateAction = (searchTerm: string, page: number, year?: string, itemType?: string) => {
    return {
        type: GET_MOVIES_IMMEDIATE,
        searchTerm,
        page,
        year,
        itemType
    }
};
export const setMoviesAction = (movies: MovieList) => ({
    type: SET_MOVIES,
    movies
});
export const getMovieItemAction = (imdbID: string) => ({
    type: GET_MOVIE_ITEM,
    imdbID
});
export const setMovieItemAction = (movie: Movie) => ({
    type: SET_MOVIE_ITEM,
    movie
});
