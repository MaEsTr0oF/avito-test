import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '@/test/test-utils';
import StatsPage from '../StatsPage';

vi.mock('../components/Charts/Charts', () => ({
  default: () => <div data-testid="mocked-charts">Mocked Charts</div>,
}));

const mockAnnouncementsData = [
  {
    id: 1,
    title: 'Test 1',
    price: 1000,
    category: 'Электроника',
    status: 'approved',
    priority: 'normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Test 2',
    price: 2000,
    category: 'Недвижимость',
    status: 'rejected',
    priority: 'urgent',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Test 3',
    price: 3000,
    category: 'Транспорт',
    status: 'draft',
    priority: 'normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const server = setupServer(
  http.get('http://localhost:3001/api/v1/ads', () => {
    return HttpResponse.json({ ads: mockAnnouncementsData });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('StatsPage', () => {
  it('should render loading state initially', () => {
    renderWithProviders(<StatsPage />);
    expect(screen.getByText(/Загрузка статистики/i)).toBeDefined();
  });

  it('should render stats page title after loading', async () => {
    renderWithProviders(<StatsPage />);
    await waitFor(() => {
      expect(screen.getByText(/📊 Статистика модератора/i)).toBeDefined();
    });
  });

  it('should render metric cards after loading', async () => {
    renderWithProviders(<StatsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Всего проверено/i)).toBeDefined();
    });
    expect(screen.getByText(/Одобрено/i)).toBeDefined();
    expect(screen.getByText(/Отклонено/i)).toBeDefined();
    expect(screen.getByText(/Среднее время/i)).toBeDefined();
  });

  it('should render period filter after loading', async () => {
    renderWithProviders(<StatsPage />);
    await waitFor(() => {
      expect(screen.getByLabelText(/Период:/i)).toBeDefined();
    });
  });

  it('should render export buttons after loading', async () => {
    renderWithProviders(<StatsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Экспорт CSV/i)).toBeDefined();
    });
    expect(screen.getByText(/Печать/i)).toBeDefined();
  });

  it('should render auto-refresh component after loading', async () => {
    renderWithProviders(<StatsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Обновить/i)).toBeDefined();
    });
  });
});

