export const removeFromWatchlist = _id => ({
  type: 'REMOVE_FROM_WATCHLIST',
  payload: { id: _id },
});

export const addToWatchlist = _media => ({
  type: 'ADD_TO_WATCHLIST',
  payload: { media: _media },
});
