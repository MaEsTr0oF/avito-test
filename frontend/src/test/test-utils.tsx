import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import listReducer from '@features/list/slice';
import itemReducer from '@features/item/slice';
import statsReducer from '@features/stats/slice';
import { announcementsApi } from '@features/list/services';
import { itemApi } from '@features/item/services';
import { statsApi } from '@features/stats/services';

export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      list: listReducer,
      item: itemReducer,
      stats: statsReducer,
      [announcementsApi.reducerPath]: announcementsApi.reducer,
      [itemApi.reducerPath]: itemApi.reducer,
      [statsApi.reducerPath]: statsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        announcementsApi.middleware,
        itemApi.middleware,
        statsApi.middleware
      ),
    preloadedState,
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Record<string, unknown>;
  store?: ReturnType<typeof createTestStore>;
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={children} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { screen, waitFor, fireEvent, render as renderBasic } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

