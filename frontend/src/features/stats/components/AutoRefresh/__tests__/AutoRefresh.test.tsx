import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderBasic as render } from '@/test/test-utils';
import AutoRefresh from '../AutoRefresh';

describe('AutoRefresh', () => {
  it('should render refresh button', () => {
    const onRefresh = vi.fn();
    render(<AutoRefresh onRefresh={onRefresh} />);
    
    expect(screen.getByText(/Обновить/i)).toBeDefined();
  });

  it('should call onRefresh when button clicked', () => {
    const onRefresh = vi.fn();
    render(<AutoRefresh onRefresh={onRefresh} />);
    
    const button = screen.getByRole('button', { name: /Обновить сейчас/i });
    fireEvent.click(button);
    
    expect(onRefresh).toHaveBeenCalledOnce();
  });

  it('should render timer', () => {
    const onRefresh = vi.fn();
    render(<AutoRefresh onRefresh={onRefresh} />);
    
    expect(screen.getByText(/Обновление через:/i)).toBeDefined();
  });

  it('should render toggle button', () => {
    const onRefresh = vi.fn();
    render(<AutoRefresh onRefresh={onRefresh} />);
    
    const toggleButton = screen.getByRole('button', { name: /Отключить автообновление/i });
    expect(toggleButton).toBeDefined();
  });

  it('should toggle auto-refresh on/off', () => {
    const onRefresh = vi.fn();
    render(<AutoRefresh onRefresh={onRefresh} />);
    
    const toggleButton = screen.getByRole('button', { name: /Отключить автообновление/i });
    fireEvent.click(toggleButton);
    
    expect(screen.getByText(/Автообновление выключено/i)).toBeDefined();
  });
});

