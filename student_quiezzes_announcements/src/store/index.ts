import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import quizzesReducer from './slices/quizzesSlice';
import announcementsReducer from './slices/announcementsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quizzes: quizzesReducer,
    announcements: announcementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
