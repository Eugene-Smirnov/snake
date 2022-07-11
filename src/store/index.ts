import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import gameReducer from '../store/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: [thunk],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
