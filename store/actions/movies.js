const apiKey = '14cfd31';

export const removeFromWatchlist = _id => ({
  type: 'REMOVE_FROM_WATCHLIST',
  payload: { id: _id },
});

export const addToWatchlist = _movie => ({
  type: 'ADD_TO_WATCHLIST',
  payload: { movie: _movie },
});

export const addRating = (_Rating, _id) => ({
  type: 'ADD_RATING',
  payload: { Rating: _Rating, id: _id },
});

export const updateRating = (_Rating, _id) => ({
  type: 'UPDATE_RATING',
  payload: { Rating: _Rating, id: _id },
});

export const removeRating = _id => ({
  type: 'REMOVE_RATING',
  payload: { id: _id },
});
