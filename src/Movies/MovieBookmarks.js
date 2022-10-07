import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Alert, AlertTitle, Grid } from '@mui/material';

function MovieBookmarks(props) {
  const [movieBookmarks, setMovieBookmarks] = useState([]);
  const [movieRefreshKey, setMovieRefreshKey] = useState(0);

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
    </div>
  );
}

export default MovieBookmarks;
