import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import movies from './reducers/movies';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, movies);

export const store = createStore(persistedReducer, applyMiddleware(logger, thunk));
export const persistor = persistStore(store);
// to clean the store
// export const persistor = persistStore(store).purge();
