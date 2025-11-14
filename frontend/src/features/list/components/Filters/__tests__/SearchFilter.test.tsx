import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/test-utils';
import SearchFilter from '../SearchFilter';

describe('SearchFilter', () => {
  it('отображает поле поиска с placeholder', () => {
    renderWithProviders(<SearchFilter />);
    
    const input = screen.getByPlaceholderText(/введите название/i);
    expect(input).toBeInTheDocument();
  });

  it('обновляет значение при вводе текста', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SearchFilter />);
    
    const input = screen.getByPlaceholderText(/введите название/i);
    await user.type(input, 'iPhone');
    
    expect(input).toHaveValue('iPhone');
  });

  it('диспатчит setSearch action при вводе', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<SearchFilter />);
    
    const input = screen.getByPlaceholderText(/введите название/i);
    await user.type(input, 'MacBook');
    
    expect(store.getState().list.filters.search).toBe('MacBook');
  });
});

