async function getByGenre(genres, page) {
  console.log('retrieving movies by genres');

  const initalGenreValue = '';
  let genreIds = genres.reduce(
    (previousValue, currentValue) => (previousValue += currentValue.id + ','),
    initalGenreValue
  );

  genreIds = genreIds.slice(0, -1)
  
  const url =
    `https://api.themoviedb.org/3/discover/movie?api_key=d8139585473f518d109a6ab8208f741d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreIds}`;
  const httpResponse = await fetch(url);

  const httpResponsePayload = await httpResponse.json();

  return httpResponsePayload.results;
}

async function getByKeywords(keywords, page) {
  console.log('retrieving movies by keyword');

  const url =
    `https://api.themoviedb.org/3/search/movie?api_key=d8139585473f518d109a6ab8208f741d&language=en-US&page=${page}&include_adult=true&query=${keywords}`;
  const httpResponse = await fetch(url);

  const httpResponsePayload = await httpResponse.json();

  return httpResponsePayload.results;
}

async function getMovieDetails(movie) {
  console.log('retrieving movie details for movie', movie);

  const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=d8139585473f518d109a6ab8208f741d`;

  const httpResponse = await fetch(url);

  const httpResponsePayload = await httpResponse.json();

  return httpResponsePayload;
}

const MovieService = {
  getByGenre,
  getByKeywords,
  getMovieDetails
};

export default MovieService;
