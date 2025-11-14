import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, waitFor, render } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { createTestStore } from '@/test/test-utils';
import ItemPage from '../ItemPage';

const mockAnnouncement = {
  ad: {
    id: 1,
    title: 'Тестовое объявление',
    description: 'Описание тестового объявления',
    price: 50000,
    images: ['/test-image.jpg'],
    categoryId: 0,
    category: 'Электроника',
    status: 'pending' as const,
    priority: 'normal' as const,
    seller: {
      name: 'Тестовый продавец',
      rating: 4.5,
      totalAds: 10,
      registrationDate: '2024-01-01',
    },
    characteristics: {
      'Состояние': 'Новое',
      'Гарантия': '1 год',
    },
    moderationHistory: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
};

const server = setupServer(
  http.get('http://localhost:3001/api/v1/ads/:id', () => {
    return HttpResponse.json(mockAnnouncement);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderItemPage(id: string) {
  const store = createTestStore();
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/item/${id}`]}>
        <Routes>
          <Route path="/item/:id" element={<ItemPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('ItemPage', () => {
  it('should render loading state', () => {
    renderItemPage('1');
    expect(screen.getByText(/Загрузка объявления/i)).toBeInTheDocument();
  });

  it('should render announcement details after loading', async () => {
    renderItemPage('1');

    await waitFor(() => {
      expect(screen.getByText('Тестовое объявление')).toBeInTheDocument();
    });

    expect(screen.getByText(/50.*000.*₽/)).toBeInTheDocument();
    expect(screen.getByText('Описание тестового объявления')).toBeInTheDocument();
    expect(screen.getByText('Тестовый продавец')).toBeInTheDocument();
  });

  it('should render error state on API failure', async () => {
    server.use(
      http.get('http://localhost:3001/api/v1/ads/:id', () => {
        return HttpResponse.json({}, { status: 404 });
      })
    );

    renderItemPage('999');

    await waitFor(() => {
      expect(screen.getByText(/Ошибка при загрузке/i)).toBeInTheDocument();
    });
  });

  it('should display seller information', async () => {
    renderItemPage('1');

    await waitFor(() => {
      expect(screen.getByText('Информация о продавце')).toBeInTheDocument();
      expect(screen.getByText('Тестовый продавец')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
    });
  });

  it('should display characteristics', async () => {
    renderItemPage('1');

    await waitFor(() => {
      expect(screen.getByText('Характеристики')).toBeInTheDocument();
      expect(screen.getByText('Состояние')).toBeInTheDocument();
      expect(screen.getByText('Новое')).toBeInTheDocument();
    });
  });

  it('should display moderation actions', async () => {
    renderItemPage('1');

    await waitFor(() => {
      expect(screen.getByText('Действия модератора')).toBeInTheDocument();
      expect(screen.getByText('Одобрить')).toBeInTheDocument();
      expect(screen.getByText('Отклонить')).toBeInTheDocument();
      expect(screen.getByText('На доработку')).toBeInTheDocument();
    });
  });
});

