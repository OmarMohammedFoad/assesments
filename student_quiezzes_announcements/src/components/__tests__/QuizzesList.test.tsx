import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QuizzesList } from '../QuizzesList';
import quizzesReducer from '../../store/slices/quizzesSlice';
import '../../i18n';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      quizzes: quizzesReducer,
    },
    preloadedState: initialState,
  });
};

describe('QuizzesList', () => {
  it('renders no quizzes message when empty', () => {
    const store = createTestStore({
      quizzes: { items: [], loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <QuizzesList />
      </Provider>
    );

    expect(screen.getByText(/no quizzes available/i)).toBeInTheDocument();
  });

  it('displays quizzes when available', () => {
    const mockQuiz = {
      id: '1',
      title: 'Test Quiz',
      description: 'Test Description',
      due_date: new Date().toISOString(),
      total_points: 100,
      duration_minutes: 60,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published: true,
    };

    const store = createTestStore({
      quizzes: { items: [mockQuiz], loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <QuizzesList />
      </Provider>
    );

    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    const store = createTestStore({
      quizzes: { items: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <QuizzesList />
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
