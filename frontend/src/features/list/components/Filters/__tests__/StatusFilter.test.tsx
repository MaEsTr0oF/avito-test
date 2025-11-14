import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/test-utils';
import StatusFilter from '../StatusFilter';

describe('StatusFilter', () => {
  it('отображает все статусы как чекбоксы', () => {
    renderWithProviders(<StatusFilter />);
    
    expect(screen.getByText('На модерации')).toBeInTheDocument();
    expect(screen.getByText('Одобрено')).toBeInTheDocument();
    expect(screen.getByText('Отклонено')).toBeInTheDocument();
    expect(screen.getByText('Черновик')).toBeInTheDocument();
  });

  it('позволяет выбрать несколько статусов', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<StatusFilter />);
    
    const pendingCheckbox = screen.getByLabelText(/на модерации/i);
    const approvedCheckbox = screen.getByLabelText(/одобрено/i);
    
    await user.click(pendingCheckbox);
    await user.click(approvedCheckbox);
    
    const statuses = store.getState().list.filters.statuses;
    expect(statuses).toContain('pending');
    expect(statuses).toContain('approved');
    expect(statuses).toHaveLength(2);
  });

  it('снимает выбор при повторном клике', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<StatusFilter />);
    
    const checkbox = screen.getByLabelText(/на модерации/i);
    
    await user.click(checkbox);
    expect(store.getState().list.filters.statuses).toContain('pending');
    
    await user.click(checkbox);
    expect(store.getState().list.filters.statuses).not.toContain('pending');
  });
});

