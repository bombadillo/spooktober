import GenreService from './services/genre-service';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';

function Genres(props) {
  const [availableGenres, setAvailableGenres] = useState([]);

  useEffect(() => {
    const getGenres = async function () {
      setAvailableGenres(await GenreService.get());
    };
    getGenres();
  }, []);

  if (!availableGenres.length) return null;

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Choose your genre
      </Typography>
      <Autocomplete
        multiple
        id="combo-box-demo"
        options={availableGenres}
        renderInput={params => <TextField {...params} label="Genre" />}
        getOptionLabel={option => option.name}
        onChange={props.onGenreSelectChanged}
      />
    </>
  );
}

export default Genres;
