import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

function MovieCard(props) {

console.log(props.showMovieDescription)
  const [showMovieDescription, setShowMovieDescription] = useState();

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
      props.viewMovieDescriptionTrigger(movie)
    else
      setShowMovieDescription(!showMovieDescription);
  }

  useEffect(() => {
    setShowMovieDescription(props.showMovieDescription)
  }, [props.showMovieDescription])


  if (!props.movie)
    return null;

console.log(showMovieDescription)

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
          <Button size="small" variant="contained" onClick={() => props.movieSelected(props.movie)}>
            Add to list
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => viewMovieDescription(props.movie)}
          >
            View description
          </Button>
        </CardActions>
      </Card>
  );
}

export default MovieCard;