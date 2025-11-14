import { describe, it, expect } from 'vitest';
import statsReducer, { setPeriod } from '../slice';
import type { Period } from '../type';

describe('statsSlice', () => {
  describe('reducers', () => {
    it('should handle setPeriod with today', () => {
      const initialState = statsReducer(undefined, { type: 'unknown' });
      const state = statsReducer(initialState, setPeriod('today' as Period));
      expect(state.period).toBe('today');
    });

    it('should handle setPeriod with 7days', () => {
      const initialState = statsReducer(undefined, { type: 'unknown' });
      const state = statsReducer(initialState, setPeriod('7days' as Period));
      expect(state.period).toBe('7days');
    });

    it('should handle setPeriod with 30days', () => {
      const initialState = statsReducer(undefined, { type: 'unknown' });
      const state = statsReducer(initialState, setPeriod('30days' as Period));
      expect(state.period).toBe('30days');
    });

    it('should have correct initial period', () => {
      const state = statsReducer(undefined, { type: 'unknown' });
      expect(state.period).toBe('7days');
    });
  });
});

