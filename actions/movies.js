const apiKey = '14cfd31';

export const removeFromWatchlist = _imdbID => ({
  type: 'REMOVE_FROM_WATCHLIST',
  payload: { imdbID: _imdbID },
});

export const addToWatchlist = _movie => async (dispatch) => {
  let theMovie = _movie;
  if (Object.keys(_movie).length < 10) {
    const response = await fetch(`http://omdbapi.com/?apikey=${apiKey}&i=${_movie.imdbID}`).catch(
      err => console.log(err),
    );
    theMovie = await response.json();
  }
  dispatch({ type: 'ADD_TO_WATCHLIST', payload: { movie: theMovie } });
};
