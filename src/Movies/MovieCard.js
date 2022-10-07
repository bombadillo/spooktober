import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

function MovieCard(props) {
  const [showMovieDescription, setShowMovieDescription] = useState();
  const [promptConfirmDelete, setPromptConfirmDelete] = useState();

  const styles = {
    media: {},
    card: {
      position: 'relative'
    },
    overlay: {
      position: 'absolute',
      bottom: '0px',
      left: '0px',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: '20px'
    }
  };

  function viewMovieDescription(movie) {
    if (props.viewMovieDescriptionTrigger)
      props.viewMovieDescriptionTrigger(movie);
    else setShowMovieDescription(!showMovieDescription);
  }

  function handleDeleteClick() {
    setPromptConfirmDelete(true);
  }

  useEffect(() => {
    setShowMovieDescription(props.showMovieDescription);
  }, [props.showMovieDescription]);

  if (!props.movie) return null;

  return (
    <Card style={styles.card}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ objectFit: 'contain' }}
          image={`https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`}
          alt="doot"
          style={styles.media}
        />
        {showMovieDescription && (
          <Typography
            style={styles.overlay}
            variant="body2"
            color="text.secondary"
          >
            {props.movie.overview}
          </Typography>
        )}
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.movie.title}
        </Typography>
      </CardContent>
      <CardActions sx={{ pb: 4 }}>
        {props.movieSelected && (
          <Button
            size="small"
            variant="contained"
            onClick={() => props.movieSelected(props.movie)}
          >
            Add to list
          </Button>
        )}
        <Button
          size="small"
          variant="outlined"
          onClick={() => viewMovieDescription(props.movie)}
        >
          View description
        </Button>
        {props.deletMovieTrigger && !promptConfirmDelete && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={handleDeleteClick}
          >
            Remove from list
          </Button>
        )}

        {promptConfirmDelete && (
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => props.deletMovieTrigger(props.movie)}
          >
            Confirm delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default MovieCard;
