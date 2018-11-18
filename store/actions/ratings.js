export const addRating = (_rating, _id) => ({
  type: 'ADD_RATING',
  payload: { rating: _rating, id: _id },
});

export const updateRating = (_rating, _id) => ({
  type: 'UPDATE_RATING',
  payload: { rating: _rating, id: _id },
});

export const removeRating = _id => ({
  type: 'REMOVE_RATING',
  payload: { id: _id },
});
