import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../store/gameSlice';
import { useDispatch } from 'react-redux';
import { listenerMiddleware } from './middleware/listener.middleware';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
