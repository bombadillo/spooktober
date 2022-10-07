import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { orange } from '@mui/material/colors';

import { Link, Outlet } from 'react-router-dom';
import { Button } from '@mui/material';
import { useState } from 'react';
import MyMovies from '../Movies/MyMovies';
import MovieBookmarks from '../Movies/MovieBookmarks';

export default function Root() {
  const [movieListOpen, setMovieListOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  const toggleShowMovieList = show => {
    setMovieListOpen(show);
  };

  const toggleShowBookmarks = show => {
    setBookmarksOpen(show);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  color="text.secondary"
                >
                  <Link
                    to={`/`}
                    style={{ textDecoration: 'none', color: orange[900] }}
                  >
                    Spooktober 🎃
                  </Link>
                </Typography>
                <Button
                  color="secondary"
                  onClick={() => toggleShowMovieList(true)}
                >
                  My list
                </Button>
                <Button
                  color="secondary"
                  onClick={() => toggleShowBookmarks(true)}
                >
                  Bookmarks
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ pt: 10 }}>
        <Outlet />
      </Box>

      <MyMovies open={movieListOpen} toggleOpen={toggleShowMovieList} />
      <MovieBookmarks open={bookmarksOpen} toggleOpen={toggleShowBookmarks} />
    </>
  );
}
