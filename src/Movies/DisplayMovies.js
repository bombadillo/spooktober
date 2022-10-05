import { Grid } from '@mui/material';
import { useState } from 'react';
import MovieCard from './MovieCard';

function DisplayMovies(props) {
  const [currentMovieToShowDescription, setCurrentMovieToShowDescription] =
    useState();

  const viewMovieDescription = selectedMovie => {
    if (selectedMovie.id === currentMovieToShowDescription?.id)
      selectedMovie = null;

    setCurrentMovieToShowDescription(selectedMovie);
  };

  return props.movies.map(movie => (
    <Grid item xs={3} key={movie.id} sx={{ pb: 4 }}>
      <MovieCard
        viewMovieDescriptionTrigger={viewMovieDescription}
        showMovieDescription={currentMovieToShowDescription?.id === movie.id}
        movie={movie}
        movieSelected={props.movieSelected}
      />
    </Grid>
  ));
}

export default DisplayMovies;
