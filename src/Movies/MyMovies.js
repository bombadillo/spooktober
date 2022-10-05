import { Button, Card, CardActions, CardContent, Grid, Link, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import {Link as RouterLink} from 'react-router-dom';

import MovieCard from './MovieCard';

function MyMovies(props) {
  const [movieList, setMovieList] = useState([]);
  const [daysInMonth, setDaysInMonth] = useState([]);
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
    overflow: 'scroll'
  };

  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1, 15);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  function getMovieByDate(date) {
    return movieList?.find(
      x => x.watchDate === date.toISOString().split('T')[0]
    );
  }

  function onMovieDeleted(movie) {
    const currentMovieList =
      JSON.parse(localStorage.getItem('movie-list')) ?? [];

    const updatedMovieList = currentMovieList.filter(x => x.id !== movie.id);

    localStorage.setItem('movie-list', JSON.stringify(updatedMovieList));

    setMovieRefreshKey(movieRefreshKey + 1)
  }

  useEffect(() => {
    if (props.open) {
      const movieListInStorage = JSON.parse(localStorage.getItem('movie-list'));
      setMovieList(movieListInStorage);
    }
  }, [props.open, movieRefreshKey]);

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(9, 2022));
  }, []);


  return (
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
        >
          My movies
        </Typography>

        {daysInMonth && (
          <ul>
            {daysInMonth.map((day, index) => (
              <Grid
                container
                key={index}
                sx={{ pb: 1 }}
                justifyContent="center"
              >
                <Grid item xs={12} lg={8}>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {day.toISOString().split('T')[0]}
                  </Typography>
                  {getMovieByDate(day) ? (
                    <MovieCard movie={getMovieByDate(day)} deletMovieTrigger={onMovieDeleted} />
                  ) : (
                    <Card>
                      
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          No movie selected for this date
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ pb: 4 }}>
                        <Button variant="contained" onClick={() => props.toggleOpen(false)}>Find a movie</Button>                 
                      </CardActions>
                    </Card>
                  )}
                </Grid>
              </Grid>
            ))}
          </ul>
        )}
      </Box>
    </Modal>
  );
}

export default MyMovies;
