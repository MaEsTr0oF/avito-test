import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderBasic as render } from '@/test/test-utils';
import MetricCards from '../MetricCards';

const mockMetrics = {
  totalChecked: 150,
  approvedPercent: 65,
  rejectedPercent: 25,
  avgTimeMinutes: 7,
};

describe('MetricCards', () => {
  it('should render all metric cards', () => {
    render(<MetricCards metrics={mockMetrics} />);
    
    expect(screen.getByText(/Всего проверено/i)).toBeDefined();
    expect(screen.getByText(/Одобрено/i)).toBeDefined();
    expect(screen.getByText(/Отклонено/i)).toBeDefined();
    expect(screen.getByText(/Среднее время/i)).toBeDefined();
  });

  it('should display correct values', () => {
    render(<MetricCards metrics={mockMetrics} />);
    
    expect(screen.getByText('150')).toBeDefined();
    expect(screen.getByText('65%')).toBeDefined();
    expect(screen.getByText('25%')).toBeDefined();
    expect(screen.getByText('7')).toBeDefined();
  });

  it('should render icons', () => {
    render(<MetricCards metrics={mockMetrics} />);
    
    expect(screen.getByText('📊')).toBeDefined();
    expect(screen.getByText('✅')).toBeDefined();
    expect(screen.getByText('❌')).toBeDefined();
    expect(screen.getByText('⏱️')).toBeDefined();
  });
});

