const initialState = {
  watchlist: [],
  ratedMovies: [],
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
            key: action.payload.movie.id,
          },
        ],
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.key !== action.payload.id),
      };
    case 'ADD_RATING':
      return {
        ...state,
        ratedMovies: [
          ...state.ratedMovies,
          {
            rating: action.payload.Rating,
            key: action.payload.id,
          },
        ],
      };
    case 'UPDATE_RATING':
      return {
        ...state,
        ratedMovies: state.ratedMovies.map((rating) => {
          if (rating.key === action.payload.id) {
            return {
              rating: action.payload.Rating,
              key: action.payload.id,
            };
          }
          return rating;
        }),
      };
    case 'REMOVE_RATING':
      return {
        ...state,
        ratedMovies: state.ratedMovies.filter(rating => rating.key !== action.payload.id),
      };
    default:
      return state;
  }
};

export default watchlist;
