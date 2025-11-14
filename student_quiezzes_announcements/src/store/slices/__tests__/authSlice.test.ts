import { describe, it, expect, beforeEach } from 'vitest';
import authReducer, { login, logout } from '../authSlice';

describe('authSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle initial state', () => {
    const state = authReducer(undefined, { type: 'unknown' });
    expect(state.isAuthenticated).toBe(false);
  });

  it('should handle login', () => {
    const state = authReducer({ isAuthenticated: false }, login());
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle logout', () => {
    const state = authReducer({ isAuthenticated: true }, logout());
    expect(state.isAuthenticated).toBe(false);
  });
});
