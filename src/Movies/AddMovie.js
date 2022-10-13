import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import Genres from '../Genres/Genres';
import DisplayMovies from './DisplayMovies';
import MovieService from './services/movie-service';

function AddMovie() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesSupplementaryDetail, setMoviesSupplementaryDetail] = useState();
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [keywords, setKeywords] = useState();
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const [showSnackbar, setShowSnackbar] = useState();
  const [updateMovieDetailsKey, setUpdateDetailsMovieKey] = useState(1);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    p: 4
  };

  const onGenreSelectChanged = (event, changedValue) => {
    setMovies([]);
    setSelectedGenres(changedValue);
  };

  const findMovies = async page => {
    let existingMovies = [...movies];

    if (!page) {
      existingMovies = [];
      page = 1;
    }

    if (keywords)
      setMovies([
        ...existingMovies,
        ...(await MovieService.getByKeywords(keywords, page, sortBy))
      ]);
    else
      setMovies([
        ...existingMovies,
        ...(await MovieService.getByGenre(selectedGenres, page, sortBy))
      ]);

    setUpdateDetailsMovieKey(updateMovieDetailsKey + 1);
  };

  const loadMore = async () => {
    setCurrentMoviePage(currentMoviePage + 1);
    await findMovies(currentMoviePage + 1);
  };

  const handleMovieSelected = movie => {
    setSelectedMovie(movie);
    toggleShowAddMovieModal(true);
  };

  const addMovieToList = () => {
    const currentMovieList =
      JSON.parse(localStorage.getItem('movie-list')) ?? [];

    currentMovieList.push(selectedMovie);
    localStorage.setItem('movie-list', JSON.stringify(currentMovieList));

    toggleShowAddMovieModal(false);
  };

  function onMovieBookmarked(movie) {
    const currentMovieBookmarks =
      JSON.parse(localStorage.getItem('movie-bookmarks')) ?? [];

    currentMovieBookmarks.push(movie);
    localStorage.setItem(
      'movie-bookmarks',
      JSON.stringify(currentMovieBookmarks)
    );

    setShowSnackbar(true);
  }

  const toggleShowAddMovieModal = show => {
    setShowAddMovieModal(show);
  };

  const cancelMovieSelection = () => {
    setSelectedMovie(null);
    toggleShowAddMovieModal(false);
  };

  const movieDateSelected = date => {
    setSelectedMovie({ ...selectedMovie, watchDate: date });
  };

  const getMovieDetails = useCallback(async moviesToUpdate => {
    console.log('updating movie details');

    const moviesDetail = {};

    for (var movie of moviesToUpdate) {
      const movieDetails = await MovieService.getMovieDetails(movie);
      moviesDetail[movie.id] = movieDetails;

      console.log('updated details');
    }

    setMoviesSupplementaryDetail(moviesDetail);
  }, []);

  useEffect(() => {
    const moviesToUpdate = [...movies];

    getMovieDetails(moviesToUpdate);
  }, [updateMovieDetailsKey, getMovieDetails, movies]);

  return (
    <>
      <Grid container spacing={2} justifyContent="center" sx={{ pt: 4 }}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Genres onGenreSelectChanged={onGenreSelectChanged} />
              <TextField
                sx={{ py: 1, boxShadow: 24 }}
                label="Keywords"
                variant="outlined"
                onChange={e => setKeywords(e.target.value)}
              />

              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Sort by"
                onChange={e => setSortBy(e.target.value)}
              >
                <MenuItem value="popularity.desc">Popularity</MenuItem>
                <MenuItem value="vote_average.desc">Rating</MenuItem>
                <MenuItem value="release_date.desc">Release</MenuItem>
              </Select>
              <CardActions sx={{ pt: 4 }}>
                <Button variant="contained" onClick={() => findMovies()}>
                  Find movies 🍿
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ pt: 4 }}>
        <DisplayMovies
          movies={movies}
          moviesSupplementaryDetail={moviesSupplementaryDetail}
          movieSelected={handleMovieSelected}
          movieBookmarked={onMovieBookmarked}
        />
      </Grid>

      {movies.length > 0 && (
        <Grid container spacing={2} justifyContent="center" sx={{ py: 4 }}>
          <Button variant="contained" color="secondary" onClick={loadMore}>
            Load more 🍿
          </Button>
        </Grid>
      )}

      <Modal
        open={showAddMovieModal}
        onClose={() => toggleShowAddMovieModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ maxWidth: 345 }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                sx={{ objectFit: 'contain' }}
                image={`https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}`}
                alt="doot"
              />
            </Box>
            <CardContent>
              <Typography gutterBottom component="div" sx={{ pb: 2 }}>
                When do you plan to watch {selectedMovie?.title}?
              </Typography>
              <TextField
                id="date"
                label="Date to watch"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => movieDateSelected(e.target.value)}
              />
            </CardContent>
            <CardActions sx={{ pb: 4 }}>
              <Button
                size="small"
                variant="contained"
                onClick={addMovieToList}
                disabled={!selectedMovie?.watchDate}
              >
                Confirm
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={cancelMovieSelection}
              >
                Cancel
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        severity="success"
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Movie bookmarked 🎫
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddMovie;
