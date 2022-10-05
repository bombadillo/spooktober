async function get() {
  console.log('retrieving genres')
  const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d8139585473f518d109a6ab8208f741d&language=en-US';
  const httpResponse = await fetch(url);


  const httpResponsePayload = await httpResponse.json();

  return httpResponsePayload.genres;
}

const GenreService = {
  get
}

export default GenreService;