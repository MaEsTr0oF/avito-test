import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { renderWithProviders, screen, waitFor } from '@/test/test-utils';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import ListPage from '../ListPage';

const mockAnnouncements = [
  {
    id: 1,
    title: 'iPhone 15',
    description: 'Новый iPhone',
    price: 100000,
    category: 'Электроника',
    categoryId: 0,
    status: 'pending',
    priority: 'normal',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    images: ['https://example.com/image1.jpg'],
    seller: {
      id: 1,
      name: 'Продавец 1',
      rating: '4.5',
      totalAds: 10,
      registeredAt: '2023-01-01T00:00:00Z',
    },
    characteristics: {},
    moderationHistory: [],
  },
  {
    id: 2,
    title: 'MacBook Pro',
    description: 'Ноутбук Apple',
    price: 200000,
    category: 'Электроника',
    categoryId: 0,
    status: 'approved',
    priority: 'urgent',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    images: ['https://example.com/image2.jpg'],
    seller: {
      id: 2,
      name: 'Продавец 2',
      rating: '4.8',
      totalAds: 20,
      registeredAt: '2023-01-01T00:00:00Z',
    },
    characteristics: {},
    moderationHistory: [],
  },
];

const server = setupServer(
  http.get('http://localhost:3001/api/v1/ads', () => {
    return HttpResponse.json({
      ads: mockAnnouncements,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 2,
        itemsPerPage: 10,
      },
    });
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('ListPage - Интеграционные тесты', () => {
  it('отображает заголовок страницы', async () => {
    renderWithProviders(<ListPage />);
    
    expect(screen.getByText('Модерация объявлений')).toBeInTheDocument();
    expect(screen.getByText(/управление и модерация объявлений/i)).toBeInTheDocument();
  });

  it('отображает компонент фильтров', () => {
    renderWithProviders(<ListPage />);
    
    expect(screen.getByText('Фильтры')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/введите название/i)).toBeInTheDocument();
  });

  it('отображает индикатор загрузки', () => {
    renderWithProviders(<ListPage />);
    
    expect(screen.getByText(/загрузка объявлений/i)).toBeInTheDocument();
  });

  it('загружает и отображает список объявлений', async () => {
    renderWithProviders(<ListPage />);
    
    await waitFor(() => {
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
    });
  });

  it('отображает пагинацию после загрузки', async () => {
    renderWithProviders(<ListPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/показано 1–2 из 2 объявлений/i)).toBeInTheDocument();
    });
  });

  it('отображает сообщение при отсутствии данных', async () => {
    server.use(
      http.get('http://localhost:3001/api/v1/ads', () => {
        return HttpResponse.json({
          ads: [],
          pagination: {
            currentPage: 1,
            totalPages: 0,
            totalItems: 0,
            itemsPerPage: 10,
          },
        });
      })
    );

    renderWithProviders(<ListPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/объявления не найдены/i)).toBeInTheDocument();
    });
  });

  it('отображает ошибку при проблемах с загрузкой', async () => {
    server.use(
      http.get('http://localhost:3001/api/v1/ads', () => {
        return HttpResponse.error();
      })
    );

    renderWithProviders(<ListPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/ошибка при загрузке данных/i)).toBeInTheDocument();
    });
  });

  it('отображает кнопку сброса фильтров', () => {
    renderWithProviders(<ListPage />);
    
    const resetButtons = screen.getAllByText(/сбросить фильтры/i);
    expect(resetButtons.length).toBeGreaterThan(0);
  });
});

