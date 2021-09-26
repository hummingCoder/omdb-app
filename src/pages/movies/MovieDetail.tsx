import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {movieSelector} from "../../redux/movies/selectors";
import {getMovieItemAction, Movie} from "../../redux/movies/actions";
import {Card, CardContent, CardMedia, Chip, Grid, Typography} from "@mui/material";

type Props = {
    location: any
};
export const MovieDetail = (props: Props) => {

    const dispatch = useDispatch();
    const movie: Movie = useSelector(movieSelector) || [];
    useEffect(() => {
        dispatch(getMovieItemAction(props.location.state.imdbID));
    }, []);
    return (
        <Grid container justifyContent="center"
              alignItems="center"
        > <Card sx={{display: 'flex'}}>

            <CardContent>
                <Typography color="primary" gutterBottom variant="h5" component="div">
                    {movie.Title}
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Typography ml={4} variant="overline"><b>Released Date :</b> {movie.Released}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {movie.Genre.split(',').map((genre, index) => (
                            <Chip key={index} label={genre} style={{margin: 5}}/>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" mt={4} ml={4} variant="subtitle2">Director</Typography>
                        <Typography ml={4} variant="overline">{movie.Director}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" ml={4} variant="subtitle2">Actors</Typography>
                        <Typography ml={4} variant="overline">{movie.Actors}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" ml={4} variant="subtitle2">IMDB</Typography>
                        <Typography ml={4} variant="overline"><b>Rating:</b> {movie.imdbRating}</Typography>
                        <br/>
                        <Typography ml={4} variant="overline"><b>Votes:</b> {movie.imdbVotes}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" ml={4} variant="subtitle2">Plot</Typography>
                        <Typography ml={4} variant="body2">{movie.Plot}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" ml={4} variant="subtitle2">Language</Typography>
                        <Typography ml={4} variant="overline">{movie.Language}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" ml={4} variant="subtitle2">Ratings</Typography>
                        {movie.Ratings.map(rating => {
                            return <Grid>
                                <Grid item xs={4}>
                                    <Typography ml={4} variant="overline"><b>{rating.Source}</b></Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography ml={4} variant="overline">{rating.Value}</Typography>
                                </Grid>

                            </Grid>
                        })}
                    </Grid>
                </Grid>
            </CardContent>
            <CardMedia
                component="img"
                height="100%"
                width="100%"
                image={movie.Poster}
                alt={movie.Title}
            />
        </Card>
        </Grid>

    );
};
