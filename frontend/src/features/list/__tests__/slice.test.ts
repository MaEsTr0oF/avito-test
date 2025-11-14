import { describe, it, expect } from 'vitest';
import listReducer, {
  setSearch,
  setPriority,
  setSortOrder,
  resetFilters,
} from '../slice';

describe('listSlice', () => {
  describe('reducers', () => {
    it('should handle setSearch', () => {
      const initialState = listReducer(undefined, { type: 'unknown' });
      const state = listReducer(initialState, setSearch('test'));
      expect(state.filters.search).toBe('test');
      expect(state.filters.page).toBe(1);
    });

    it('should handle setPriority', () => {
      const initialState = listReducer(undefined, { type: 'unknown' });
      const state = listReducer(initialState, setPriority('urgent'));
      expect(state.filters.priority).toBe('urgent');
      expect(state.filters.page).toBe(1);
    });

    it('should handle setSortOrder', () => {
      const initialState = listReducer(undefined, { type: 'unknown' });
      const state = listReducer(initialState, setSortOrder('asc'));
      expect(state.filters.sortOrder).toBe('asc');
      expect(state.filters.page).toBe(1);
    });

    it('should handle resetFilters', () => {
      const initialState = listReducer(undefined, { type: 'unknown' });
      let state = listReducer(initialState, setSearch('test'));
      state = listReducer(state, setPriority('urgent'));
      
      state = listReducer(state, resetFilters());
      expect(state.filters.search).toBe('');
      expect(state.filters.priority).toBeUndefined();
      expect(state.filters.sortOrder).toBe('desc');
    });

    it('should reset page when filters change', () => {
      const initialState = listReducer(undefined, { type: 'unknown' });
      const modifiedState = {
        ...initialState,
        filters: { ...initialState.filters, page: 5 },
      };
      
      const state = listReducer(modifiedState, setSearch('test'));
      expect(state.filters.page).toBe(1);
    });
  });
});

