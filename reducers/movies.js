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
            details: action.payload.details,
            key: action.payload.imbdId,
          },
        ],
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.key !== action.payload.imdbId),
      };
    default:
      return state;
  }
};

export default watchlist;
