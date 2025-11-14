import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HomePage } from '../HomePage';
import authReducer from '../../store/slices/authSlice';
import '../../i18n';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

describe('HomePage', () => {
  it('renders welcome message', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByText(/welcome to student dashboard/i)).toBeInTheDocument();
  });

  it('shows login button when not authenticated', () => {
    const store = createTestStore({ auth: { isAuthenticated: false } });
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const loginButton = screen.getByRole('button');
    expect(loginButton).toHaveTextContent(/login/i);
  });
});
