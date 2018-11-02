const initialState = {
  watchlist: [],
};

const watchlist = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchlist: [
          ...state.watchlist,
          {
            details: action.payload.movie,
            key: action.payload.movie.imdbID,
          },
        ],
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.key !== action.payload.imdbID),
      };
    default:
      return state;
  }
};

export default watchlist;
