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
            key: action.payload.movie.imdbID,
          },
        ],
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.key !== action.payload.imdbID),
      };
    case 'ADD_RATING':
      return {
        ...state,
        ratedMovies: [
          ...state.ratedMovies,
          {
            rating: action.payload.Rating,
            key: action.payload.imdbID,
          },
        ],
      };
    case 'UPDATE_RATING':
      return {
        ...state,
        ratedMovies: state.ratedMovies.map((rating) => {
          console.log(rating.key);
          console.log(action.payload.imdbID);
          if (rating.key === action.payload.imdbID) {
            console.log('FOUND MATCH');
            return {
              rating: action.payload.Rating,
              key: action.payload.imdbID,
            };
          }
          return rating;
        }),
      };
    case 'REMOVE_RATING':
      return {
        ...state,
        ratedMovies: state.ratedMovies.filter(rating => rating.key !== action.payload.imdbID),
      };
    default:
      return state;
  }
};

export default watchlist;
