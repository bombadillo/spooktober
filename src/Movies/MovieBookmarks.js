import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Alert, AlertTitle, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField } from '@mui/material';

function MovieBookmarks(props) {
  const [movieBookmarks, setMovieBookmarks] = useState([]);
  const [movieRefreshKey, setMovieRefreshKey] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState();
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll'
  };

  // TODO: this is duped from AddMovie.js
  const handleMovieSelected = movie => {
    setSelectedMovie(movie);
    toggleShowAddMovieModal(true);
  };

  // TODO: this is duped from AddMovie.js
  const cancelMovieSelection = () => {
    setSelectedMovie(null);
    toggleShowAddMovieModal(false);
  };

  // TODO: this is duped from AddMovie.js
  const addMovieToList = () => {
    const currentMovieList =
      JSON.parse(localStorage.getItem('movie-list')) ?? [];

    currentMovieList.push(selectedMovie);
    localStorage.setItem('movie-list', JSON.stringify(currentMovieList));

    toggleShowAddMovieModal(false);
  };

  const toggleShowAddMovieModal = show => {
    setShowAddMovieModal(show);
  };

  // TODO: this is duped from AddMovie.js
  const movieDateSelected = date => {
    setSelectedMovie({ ...selectedMovie, watchDate: date });
  };

  function onRemoveBookmark(movie) {
    const currentMovieBookmarks =
      JSON.parse(localStorage.getItem('movie-bookmarks')) ?? [];

    const updatedMovieList = currentMovieBookmarks.filter(
      x => x.id !== movie.id
    );

    localStorage.setItem('movie-bookmarks', JSON.stringify(updatedMovieList));

    setMovieRefreshKey(movieRefreshKey + 1);
  }

  useEffect(() => {
    if (props.open) {
      const movieListInStorage = JSON.parse(
        localStorage.getItem('movie-bookmarks')
      );
      setMovieBookmarks(movieListInStorage);
    }
  }, [props.open, movieRefreshKey]);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => props.toggleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            marginBottom={2}
          >
            🎫 Bookmarked movies
          </Typography>

          <Grid
            container
            sx={{ position: 'relative', mb: 4 }}
            justifyContent="center"
          >
            {movieBookmarks.length > 0 ? (
              <>
                {movieBookmarks?.map(movie => {
                  return (
                    <Grid
                      item
                      xs={12}
                      lg={8}
                      textAlign="center"
                      position="relative"
                      marginBottom={4}
                    >
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        removeBookmark={onRemoveBookmark}
                        movieSelected={handleMovieSelected}
                      />
                    </Grid>
                  );
                })}
              </>
            ) : (
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                You have not movies bookmarked.
              </Alert>
            )}
          </Grid>
        </Box>
      </Modal>

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
    </div>
  );
}

export default MovieBookmarks;
