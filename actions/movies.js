const apiKey = '14cfd31';

export const removeFromWatchlist = _imdbId => ({
  type: 'REMOVE_FROM_WATCHLIST',
  payload: { imdbId: _imdbId },
});

export const addToWatchlist = _imdbId => async (dispatch) => {
  const response = await fetch(`http://omdbapi.com/?apikey=${apiKey}&i=${_imdbId}`).catch(err => console.log(err));
  const json = await response.json();
  dispatch({ type: 'ADD_TO_WATCHLIST', payload: { imbdId: _imdbId, details: json } });
};
