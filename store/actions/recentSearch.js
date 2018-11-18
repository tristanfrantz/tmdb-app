export const addRecentSearch = _searchString => ({
  type: 'ADD_RECENT_SEARCH',
  payload: { searchString: _searchString.toLowerCase() },
});

export const clearRecentSearch = () => ({
  type: 'CLEAR_RECENT_SEARCH',
});
