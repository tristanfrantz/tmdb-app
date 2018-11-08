const initialState = {
  watchlist: [],
  ratedMedia: [],
};

const getTitle = media => (media.title ? media.title : media.name);
const getType = media => (media.title ? 'movie' : 'tv');
const getDate = media => (media.title ? media.release_date : media.first_air_date);

const watchlist = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchlist: [
          ...state.watchlist,
          {
            details: {
              id: action.payload.media.id,
              title: getTitle(action.payload.media),
              date: getDate(action.payload.media),
              type: getType(action.payload.media),
              poster: action.payload.media.poster_path,
            },
            key: action.payload.media.id,
          },
        ],
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter(media => media.key !== action.payload.id),
      };
    case 'ADD_RATING':
      return {
        ...state,
        ratedMedia: [
          ...state.ratedMedia,
          {
            rating: action.payload.rating,
            key: action.payload.id,
          },
        ],
      };
    case 'UPDATE_RATING':
      return {
        ...state,
        ratedMedia: state.ratedMedia.map((rating) => {
          if (rating.key === action.payload.id) {
            return {
              rating: action.payload.rating,
              key: action.payload.id,
            };
          }
          return rating;
        }),
      };
    case 'REMOVE_RATING':
      return {
        ...state,
        ratedMedia: state.ratedMedia.filter(rating => rating.key !== action.payload.id),
      };
    default:
      return state;
  }
};

export default watchlist;
