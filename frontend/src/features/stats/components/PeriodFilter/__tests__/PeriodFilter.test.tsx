import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test/test-utils';
import PeriodFilter from '../PeriodFilter';

describe('PeriodFilter', () => {
  it('should render period filter with label', () => {
    renderWithProviders(<PeriodFilter />);
    expect(screen.getByLabelText(/Период:/i)).toBeDefined();
  });

  it('should render all period options', () => {
    renderWithProviders(<PeriodFilter />);
    const select = screen.getByLabelText(/Период:/i) as HTMLSelectElement;
    
    const options = Array.from(select.options).map(opt => opt.textContent);
    expect(options).toContain('Сегодня');
    expect(options).toContain('Последние 7 дней');
    expect(options).toContain('Последние 30 дней');
  });

  it('should have default value of "7days"', () => {
    renderWithProviders(<PeriodFilter />);
    const select = screen.getByLabelText(/Период:/i) as HTMLSelectElement;
    expect(select.value).toBe('7days');
  });

  it('should dispatch action on change', () => {
    renderWithProviders(<PeriodFilter />);
    const select = screen.getByLabelText(/Период:/i) as HTMLSelectElement;
    
    fireEvent.change(select, { target: { value: 'today' } });
    expect(select.value).toBe('today');
  });
});

