import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import OpenIcon from '@mui/icons-material/OpenInNew';

import notFound from './not-found.png'

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
    },
    rating: {
      position: 'absolute',
      top: '0px',
      right: '0px',
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
          image={props.movie.backdrop_path ? `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}` : notFound}
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
        {props.movie.vote_average > 0 && (
          <Typography
            style={styles.rating}
            variant="body2"
            color="text.secondary"
          >
            {props.movie.vote_average}
          </Typography>
        )}
      </Box>
      <CardContent>
        <Grid container>
          <Grid item xs={9}>
            <Typography gutterBottom variant="h5" component="div">
              {props.movie.title}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              size="small"
              component={Link}
              variant="contained"
              endIcon={<OpenIcon />}
              href={`https://www.imdb.com/title/${props.movieDetail?.imdb_id}`}
              target="_blank"
              rel="noreferrer"
            >
              IMDB
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ pb: 4 }}>
        {props.movieSelected && (
          <Button
            size="small"
            variant="contained"
            onClick={() => props.movieSelected(props.movie)}
          >
            Add
          </Button>
        )}
        {props.movieBookmarked && (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => props.movieBookmarked(props.movie)}
          >
            Bookmark
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

        {props.removeBookmark && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => props.removeBookmark(props.movie)}
          >
            Remove bookmark
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default MovieCard;
