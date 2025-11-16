import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Announcement, ListState } from "./type";

const initialState: ListState = {
  items: [],
  loading: false,
  error: null,
  selectedIds: [],
  filters: {
    search: '',
    statuses: [],
    categoryId: undefined,
    priority: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  },
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Announcement[]>) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.filters.page = 1;
    },
    setStatuses: (state, action: PayloadAction<Array<'pending' | 'approved' | 'rejected' | 'draft'>>) => {
      state.filters.statuses = action.payload;
      state.filters.page = 1;
    },
    setCategoryId: (state, action: PayloadAction<number | undefined>) => {
      state.filters.categoryId = action.payload;
      state.filters.page = 1;
    },
    setPriority: (state, action: PayloadAction<'normal' | 'urgent' | undefined>) => {
      state.filters.priority = action.payload;
      state.filters.page = 1;
    },
    setMinPrice: (state, action: PayloadAction<number | undefined>) => {
      state.filters.minPrice = action.payload;
      state.filters.page = 1;
    },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => {
      state.filters.maxPrice = action.payload;
      state.filters.page = 1;
    },
    setSortBy: (state, action: PayloadAction<'createdAt' | 'price' | 'priority'>) => {
      state.filters.sortBy = action.payload;
      state.filters.page = 1;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filters.sortOrder = action.payload;
      state.filters.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        statuses: [],
        categoryId: undefined,
        priority: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        page: 1,
        limit: 10,
      };
    },
    toggleSelectAnnouncement: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);
      if (index === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },
    selectAllAnnouncements: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
  },
  selectors: {
    selectFilters: (state) => state.filters,
    selectSearch: (state) => state.filters.search,
    selectStatuses: (state) => state.filters.statuses,
    selectCategoryId: (state) => state.filters.categoryId,
    selectPriority: (state) => state.filters.priority,
    selectMinPrice: (state) => state.filters.minPrice,
    selectMaxPrice: (state) => state.filters.maxPrice,
    selectSortBy: (state) => state.filters.sortBy,
    selectSortOrder: (state) => state.filters.sortOrder,
    selectPage: (state) => state.filters.page,
    selectLimit: (state) => state.filters.limit,
    selectSelectedIds: (state) => state.selectedIds,
    selectAnnouncements: (state) => state.items,
  },
});

export const {
  setList,
  setLoading,
  setError,
  setSearch,
  setStatuses,
  setCategoryId,
  setPriority,
  setMinPrice,
  setMaxPrice,
  setSortBy,
  setSortOrder,
  setPage,
  resetFilters,
  toggleSelectAnnouncement,
  selectAllAnnouncements,
  clearSelection,
} = listSlice.actions;

export const {
  selectFilters,
  selectSearch,
  selectStatuses,
  selectCategoryId,
  selectPriority,
  selectMinPrice,
  selectMaxPrice,
  selectSortBy,
  selectSortOrder,
  selectPage,
  selectLimit,
  selectSelectedIds,
  selectAnnouncements,
} = listSlice.selectors;

export default listSlice.reducer;