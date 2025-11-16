# 📱 Frontend - Система модерации объявлений Avito

React + TypeScript приложение для модерации объявлений с адаптивным дизайном и полным функционалом.

## 📋 Содержание

- [Технологии](#технологии)
- [Установка и запуск](#установка-и-запуск)
- [Структура проекта](#структура-проекта)
- [Архитектура](#архитектура)
- [Страницы](#страницы)
- [Компоненты](#компоненты)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Стилизация](#стилизация)
- [Тестирование](#тестирование)
- [Оптимизации](#оптимизации)

---

## 🛠️ Технологии

### Core
- **React 19.2.0** - UI библиотека
- **TypeScript 5.9.3** - Типизация
- **Vite 7.2.2** - Build tool и dev server

### State Management
- **Redux Toolkit 2.10.1** - Управление состоянием
- **RTK Query** - Кэширование и API запросы
- **React Redux 9.2.0** - React bindings

### Routing
- **React Router DOM 7.9.5** - Client-side routing

### Styling
- **SCSS/SASS 1.94.0** - CSS препроцессор
- **CSS Modules** - Scoped styles

### Data Visualization
- **Chart.js 4.5.1** - Графики
- **React Chartjs 2 5.3.1** - React wrapper

### Animations
- **Framer Motion 12.23.24** - Анимации компонентов

### HTTP Client
- **Axios 1.13.2** - HTTP запросы

### Export
- **React CSV 2.2.2** - CSV экспорт
- **PDFMake 0.2.20** - PDF генерация

### Testing
- **Vitest 4.0.9** - Test runner
- **React Testing Library 16.3.0** - Component testing
- **MSW 2.12.1** - API mocking
- **Happy DOM 20.0.10** - DOM implementation

### Code Quality
- **ESLint 9.39.1** - Linter
- **TypeScript ESLint 8.46.3** - TypeScript linting
- **Prettier 3.6.2** - Code formatter

---

## 🚀 Установка и запуск

### Требования
- Node.js 20+
- npm 9+

### Установка

```bash
cd frontend
npm install
```

### Команды

```bash
# Development
npm run dev              # Запустить dev server (http://localhost:5173)
npm run build            # Production build
npm run preview          # Preview production build

# Linting
npm run lint             # Проверка кода

# Testing
npm test                 # Запустить тесты
npm run test:ui          # Тесты с UI интерфейсом
npm run test:coverage    # Тесты с coverage отчётом
```

---

## 📁 Структура проекта

```
frontend/
├── public/              # Статические файлы
│   └── vite.svg
│
├── src/
│   ├── app/            # Конфигурация приложения
│   │   ├── App.tsx     # Главный компонент
│   │   ├── App.scss    # Глобальные стили
│   │   └── routes.tsx  # Конфигурация роутинга
│   │
│   ├── components/     # Переиспользуемые компоненты
│   │   ├── Modal/
│   │   ├── Navigation/
│   │   └── ThemeToggle/
│   │
│   ├── features/       # Feature-based модули
│   │   ├── list/       # Список объявлений
│   │   │   ├── components/
│   │   │   │   ├── AnnouncementCard/
│   │   │   │   ├── Filters/
│   │   │   │   ├── FiltersBar/
│   │   │   │   ├── FiltersSidebar/
│   │   │   │   └── Pagination/
│   │   │   ├── __tests__/
│   │   │   ├── ListPage.tsx
│   │   │   ├── services.ts
│   │   │   ├── slice.ts
│   │   │   ├── type.ts
│   │   │   └── list.module.scss
│   │   │
│   │   ├── item/       # Детальная страница
│   │   │   ├── components/
│   │   │   │   ├── CharacteristicsTable/
│   │   │   │   ├── ImageGallery/
│   │   │   │   ├── ModerationActions/
│   │   │   │   ├── ModerationHistory/
│   │   │   │   ├── NavigationButtons/
│   │   │   │   └── SellerInfo/
│   │   │   ├── __tests__/
│   │   │   ├── ItemPage.tsx
│   │   │   ├── services.ts
│   │   │   ├── slice.ts
│   │   │   ├── type.ts
│   │   │   └── item.module.scss
│   │   │
│   │   └── stats/      # Статистика
│   │       ├── components/
│   │       │   ├── AutoRefresh/
│   │       │   ├── Charts/
│   │       │   ├── ExportButtons/
│   │       │   ├── MetricCards/
│   │       │   └── PeriodFilter/
│   │       ├── __tests__/
│   │       ├── StatsPage.tsx
│   │       ├── services.ts
│   │       ├── slice.ts
│   │       ├── dataAdapter.ts
│   │       ├── type.ts
│   │       └── stats.module.scss
│   │
│   ├── store/          # Redux store
│   │   ├── index.ts    # Store конфигурация
│   │   └── hooks.ts    # Типизированные хуки
│   │
│   ├── hooks/          # Custom hooks
│   │   ├── useDebounce.ts
│   │   └── useAbortController.ts
│   │
│   ├── utils/          # Утилиты
│   │   ├── formatters.ts
│   │   ├── status.ts
│   │   ├── validation.ts
│   │   └── index.ts
│   │
│   ├── constants/      # Константы
│   │   └── announcements.ts
│   │
│   ├── styles/         # Глобальные стили
│   │   ├── variables.scss
│   │   ├── mixins.scss
│   │   └── theme.scss
│   │
│   ├── test/           # Тестовые утилиты
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   │
│   ├── main.tsx        # Entry point
│   └── index.scss      # Глобальные стили
│
├── Dockerfile          # Production Docker образ
├── Dockerfile.dev      # Development Docker образ
├── nginx.conf          # Nginx конфигурация
├── vite.config.ts      # Vite конфигурация
├── vitest.config.ts    # Vitest конфигурация
├── tsconfig.json       # TypeScript конфигурация
├── package.json        # Dependencies
└── README.md           # Эта документация
```

---

## 🏗️ Архитектура

### Feature-Based Architecture

Проект организован по **feature-based** принципу, где каждая фича содержит:
- Компоненты
- Redux slice (state + reducers + selectors)
- RTK Query services (API)
- Types
- Тесты
- Стили

**Преимущества:**
- ✅ Изолированность кода
- ✅ Легко масштабировать
- ✅ Простое переиспользование
- ✅ Удобное тестирование

### Паттерны

#### 1. Container/Presentational Components
```typescript
// Container (ListPage.tsx)
const ListPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAnnouncements);
  // Логика...
  return <AnnouncementsList data={data} />;
};

// Presentational (AnnouncementCard.tsx)
const AnnouncementCard = memo(({ item }: Props) => {
  return <div>{item.title}</div>;
});
```

#### 2. Custom Hooks
```typescript
// useDebounce.ts
export const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};
```

#### 3. Typed Redux Hooks
```typescript
// store/hooks.ts
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Использование в компонентах
const data = useAppSelector(selectAnnouncements);
const dispatch = useAppDispatch();
```

---

## 📄 Страницы

### 1. Список объявлений (`/list`)

**Компонент:** `features/list/ListPage.tsx`

**Функциональность:**
- 📋 Отображение списка объявлений (10 на странице)
- 🔍 Поиск с debounce (300ms)
- 🎛️ Фильтрация:
  - По статусу (pending, approved, rejected, draft)
  - По категории (Электроника, Недвижимость, Транспорт, и т.д.)
  - По цене (от-до)
  - По приоритету (normal, urgent)
- 📊 Сортировка:
  - По дате создания
  - По цене
  - По приоритету
  - Порядок: по возрастанию/убыванию
- 📄 Пагинация с навигацией
- ✕ Сброс всех фильтров
- 📱 Адаптивный дизайн (1920px - 360px)

**Структура:**
```
ListPage/
├── ListPage.tsx          # Главный контейнер
├── components/
│   ├── AnnouncementCard/ # Карточка объявления
│   ├── FiltersBar/       # Поиск и сортировка (топ)
│   ├── FiltersSidebar/   # Фильтры (сайдбар)
│   │   ├── SearchFilter/
│   │   ├── StatusFilter/
│   │   ├── CategoryFilter/
│   │   ├── PriorityFilter/
│   │   ├── PriceFilter/
│   │   └── SortFilter/
│   └── Pagination/       # Пагинация
├── slice.ts              # Redux state
├── services.ts           # RTK Query API
└── __tests__/            # Тесты
```

**Redux State:**
```typescript
interface ListState {
  filters: {
    search: string;
    status: string[];
    category: string;
    minPrice: number;
    maxPrice: number;
    priority: string;
    sortBy: string;
    sortOrder: string;
    page: number;
    limit: number;
  };
}
```

---

### 2. Детальная страница (`/item/:id`)

**Компонент:** `features/item/ItemPage.tsx`

**Функциональность:**
- 🖼️ Галерея изображений (карусель с навигацией)
- 📝 Полная информация об объявлении
- 📊 Таблица характеристик
- 👤 Информация о продавце:
  - Имя, рейтинг
  - Количество объявлений
  - Дата регистрации
- 📜 История модерации:
  - Модератор, дата, действие
  - Причина отклонения
  - Комментарии
- ✅ Панель действий модерации:
  - Одобрить (зелёная кнопка)
  - Отклонить (красная кнопка) + модальное окно с причинами
  - Вернуть на доработку (жёлтая кнопка)
- ⬅️➡️ Навигация между объявлениями (prev/next)

**Структура:**
```
ItemPage/
├── ItemPage.tsx                # Главный контейнер
├── components/
│   ├── ImageGallery/           # Карусель изображений
│   ├── CharacteristicsTable/   # Таблица характеристик
│   ├── SellerInfo/             # Инфо о продавце
│   ├── ModerationHistory/      # История модерации
│   ├── ModerationActions/      # Кнопки действий
│   └── NavigationButtons/      # Prev/Next навигация
├── slice.ts                    # Redux state
├── services.ts                 # RTK Query API
└── __tests__/                  # Тесты
```

**Модальное окно отклонения:**
```typescript
const REJECT_REASONS = [
  { value: 'prohibited', label: 'Запрещённый товар' },
  { value: 'spam', label: 'Спам' },
  { value: 'poor_quality', label: 'Низкое качество' },
  { value: 'inappropriate', label: 'Неподходящий контент' },
  { value: 'other', label: 'Другое' }
];
```

---

### 3. Статистика (`/stats`)

**Компонент:** `features/stats/StatsPage.tsx`

**Функциональность:**
- 📊 Карточки метрик:
  - Всего проверено объявлений
  - Процент одобренных
  - Процент отклонённых
  - Среднее время проверки
- 📈 Графики (Chart.js):
  - Активность модерации по дням (столбчатая)
  - Распределение решений (круговая)
  - Объявления по категориям (горизонтальная)
- 📅 Фильтр по периоду:
  - Сегодня
  - Последние 7 дней
  - Последние 30 дней
- 📥 Экспорт:
  - CSV файл
  - PDF отчёт
  - Печать
- 🔄 Auto-refresh:
  - Каждые 5 минут
  - С таймером обратного отсчёта
  - Pause/Play управление
  - Только когда вкладка активна

**Структура:**
```
StatsPage/
├── StatsPage.tsx          # Главный контейнер
├── components/
│   ├── MetricCards/       # Карточки с метриками
│   ├── Charts/            # Графики Chart.js
│   ├── PeriodFilter/      # Выбор периода
│   ├── ExportButtons/     # CSV/PDF экспорт
│   └── AutoRefresh/       # Авто-обновление
├── dataAdapter.ts         # Адаптация данных из /ads
├── slice.ts               # Redux state
├── services.ts            # RTK Query API
└── __tests__/             # Тесты
```

**Data Flow:**
```
Backend (/api/v1/ads) 
  ↓
RTK Query (statsApi)
  ↓
transformResponse (dataAdapter)
  ↓
Redux State (statsSlice)
  ↓
Components (Charts, MetricCards)
```

---

## 🧩 Компоненты

### Глобальные компоненты

#### 1. Navigation
**Путь:** `components/Navigation/`

Навигационное меню с:
- 📋 Ссылка на "Объявления" (`/list`)
- 📊 Ссылка на "Статистика" (`/stats`)
- Active state styling
- Sticky positioning
- Адаптивный дизайн (бургер-меню на мобильных)

```typescript
<NavLink to="/list" className={({ isActive }) => isActive ? styles.active : ''}>
  📋 Объявления
</NavLink>
```

#### 2. ThemeToggle
**Путь:** `components/ThemeToggle/`

Переключатель темы:
- 🌓 Светлая/тёмная тема
- Сохранение в `localStorage`
- Чтение системной темы (`prefers-color-scheme`)
- CSS переменные для цветов
- Floating кнопка в правом нижнем углу

```typescript
const [theme, setTheme] = useState<'light' | 'dark'>(() => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved as 'light' | 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
});
```

#### 3. Modal
**Путь:** `components/Modal/`

Универсальное модальное окно:
- 🎯 Portal в `document.body`
- ⌨️ ESC для закрытия
- 🖱️ Клик вне модала для закрытия
- 🔒 Focus trap
- Overlay с blur эффектом

```typescript
<Modal isOpen={isOpen} onClose={handleClose}>
  <h2>Причина отклонения</h2>
  {/* Контент */}
</Modal>
```

---

## 🗄️ State Management

### Redux Store Structure

```typescript
{
  list: {
    filters: { search, status, category, ... },
    announcements: Announcement[],
    total: number,
    loading: boolean,
    error: string | null
  },
  item: {
    currentItem: AnnouncementDetail | null,
    loading: boolean,
    error: string | null
  },
  stats: {
    period: '7days' | 'today' | '30days',
    metrics: MetricsData,
    chartData: ChartData
  },
  announcementsApi: { /* RTK Query cache */ },
  itemApi: { /* RTK Query cache */ },
  statsApi: { /* RTK Query cache */ }
}
```

### Redux Slices

#### listSlice
```typescript
// Reducers
setSearch(state, action)        // Установить поисковый запрос
setStatus(state, action)        // Установить статус фильтр
setCategory(state, action)      // Установить категорию
setPriceRange(state, action)    // Установить диапазон цен
setPriority(state, action)      // Установить приоритет
setSortBy(state, action)        // Установить поле сортировки
setSortOrder(state, action)     // Установить порядок сортировки
setPage(state, action)          // Установить страницу
resetFilters(state)             // Сбросить все фильтры

// Selectors (встроенные в slice)
selectFilters(state)            // Получить все фильтры
selectAnnouncements(state)      // Получить объявления
selectTotal(state)              // Получить общее количество
selectLoading(state)            // Получить loading state
```

#### itemSlice
```typescript
// Reducers
setItem(state, action)          // Установить текущее объявление
setLoading(state, action)       // Установить loading
setError(state, action)         // Установить ошибку

// Selectors
selectItem(state)               // Получить текущее объявление
selectLoading(state)
selectError(state)
```

#### statsSlice
```typescript
// Reducers
setPeriod(state, action)        // Установить период статистики

// Selectors
selectPeriod(state)             // Получить текущий период
selectMetrics(state)            // Получить метрики
selectChartData(state)          // Получить данные для графиков
```

### RTK Query Services

#### announcementsApi
```typescript
endpoints: {
  getAnnouncements: builder.query({
    query: (params) => ({
      url: '/ads',
      params: { ...params }
    }),
    transformResponse: (response) => ({
      items: response.ads,
      total: response.total
    })
  })
}
```

#### itemApi
```typescript
endpoints: {
  getAnnouncementById: builder.query({
    query: (id) => `/ads/${id}`
  }),
  updateAnnouncementStatus: builder.mutation({
    query: ({ id, status, reason }) => ({
      url: `/ads/${id}/status`,
      method: 'PUT',
      body: { status, reason }
    }),
    // Optimistic updates
    onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
      const patchResult = dispatch(
        itemApi.util.updateQueryData('getAnnouncementById', args.id, (draft) => {
          draft.status = args.status;
        })
      );
      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
    }
  })
}
```

#### statsApi
```typescript
endpoints: {
  getStats: builder.query({
    query: (period) => '/ads',  // Используем общий endpoint
    transformResponse: (response, meta, arg) => {
      // Адаптируем данные через dataAdapter
      return transformAnnouncementsToStats(response.ads, arg);
    }
  })
}
```

---

## 🌐 API Integration

### Backend Endpoints

#### Объявления
```
GET  /api/v1/ads
GET  /api/v1/ads/:id
PUT  /api/v1/ads/:id/status
PUT  /api/v1/ads/:id/approve
PUT  /api/v1/ads/:id/reject
```

#### Структура данных

**Announcement (список):**
```typescript
{
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  priority: 'normal' | 'urgent';
  createdAt: string;
  updatedAt: string;
}
```

**AnnouncementDetail:**
```typescript
{
  ...Announcement,
  images: string[];
  characteristics: Record<string, string>;
  seller: {
    id: number;
    name: string;
    rating: string;
    totalAnnouncements: number;
    registeredAt: string;
  };
  moderationHistory: Array<{
    moderatorId: number;
    moderatorName: string;
    action: 'approved' | 'rejected' | 'rework' | 'pending';
    timestamp: string;
    reason?: string;
    comment?: string;
  }>;
}
```

**Response для списка:**
```json
{
  "ads": [...],
  "total": 100
}
```

---

## 🎨 Стилизация

### Архитектура стилей

**SCSS Modules** + **CSS Variables** для темизации

#### Структура
```
styles/
├── variables.scss    # SCSS переменные (размеры, breakpoints)
├── mixins.scss       # SCSS миксины (flex, grid)
└── theme.scss        # CSS переменные для тем
```

#### CSS Variables (темы)

```scss
// theme.scss
:root {
  // Light theme
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #212121;
  --text-secondary: #757575;
  --color-primary: #007bff;
  --color-success: #4caf50;
  --color-error: #f44336;
  --color-warning: #ff9800;
  
  // Spacing
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  // Border radius
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
}

[data-theme="dark"] {
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  // ...
}
```

#### SCSS Modules

```scss
// AnnouncementCard.module.scss
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.card {
  padding: var(--spacing-lg);
  background: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--shadow-md);
  }
}
```

### Адаптивность

**Breakpoints:**
```scss
// variables.scss
$breakpoint-xs: 360px;
$breakpoint-sm: 480px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1920px;
```

**Fluid Typography:**
```scss
font-size: clamp(14px, 2vw, 18px);
padding: clamp(var(--spacing-sm), 2vw, var(--spacing-lg));
```

**Media Queries:**
```scss
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    transform: translateX(-100%);
    
    &.open {
      transform: translateX(0);
    }
  }
}
```

---

## 🧪 Тестирование

### Test Stack
- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **MSW** - API mocking
- **Happy DOM** - DOM implementation

### Статистика
```
Test Files:  17 passed
Tests:       93 passed
Duration:    ~9 seconds
```

### Примеры тестов

#### Component Test
```typescript
// AnnouncementCard.test.tsx
import { describe, it, expect } from 'vitest';
import { renderBasic as render, screen } from '@/test/test-utils';
import AnnouncementCard from '../AnnouncementCard';

describe('AnnouncementCard', () => {
  const mockItem = {
    id: 1,
    title: 'Test Item',
    price: 1000,
    status: 'pending',
    category: 'Электроника',
    priority: 'normal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  it('renders item title', () => {
    render(<AnnouncementCard item={mockItem} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('formats price correctly', () => {
    render(<AnnouncementCard item={mockItem} />);
    expect(screen.getByText(/1 000 ₽/)).toBeInTheDocument();
  });
});
```

#### Integration Test
```typescript
// ListPage.test.tsx
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('http://localhost:3001/api/v1/ads', () => {
    return HttpResponse.json({ 
      ads: mockAds, 
      total: mockAds.length 
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ListPage', () => {
  it('renders list of announcements after loading', async () => {
    renderWithProviders(<ListPage />);
    await waitFor(() => {
      expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    });
  });
});
```

### Test Utils

```typescript
// test-utils.tsx
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
```

---

## ⚡ Оптимизации

### Performance

#### 1. React.memo
```typescript
export const AnnouncementCard = memo(({ item }: Props) => {
  return <div>{item.title}</div>;
});
```

#### 2. Debounce для поиска
```typescript
const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  dispatch(setSearch(debouncedSearch));
}, [debouncedSearch]);
```

#### 3. AbortController для запросов
```typescript
export const useAbortController = () => {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return abortControllerRef.current?.signal;
};
```

#### 4. Code Splitting
```typescript
const StatsPage = lazy(() => import('@/features/stats/StatsPage'));
const ItemPage = lazy(() => import('@/features/item/ItemPage'));
```

#### 5. RTK Query Caching
```typescript
// Автоматическое кэширование
getAnnouncements: builder.query({
  keepUnusedDataFor: 60, // 60 секунд
  providesTags: ['Announcements']
})
```

### Bundle Size Optimization

- ✅ Tree shaking (Vite)
- ✅ Code splitting
- ✅ Dynamic imports
- ✅ Minification
- ✅ Compression (Nginx gzip)

### Accessibility

- ✅ ARIA attributes
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast (WCAG AA)

---

## 🐳 Docker

### Production Build

**Multi-stage Dockerfile:**
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Размер образа:** ~25 MB

### Development

```bash
docker-compose -f docker-compose.dev.yml up
```

**Особенности:**
- Volume mounting для hot-reload
- Vite dev server
- API proxy настроен

---

## 📝 Environment Variables

```env
# Build time
VITE_API_URL=http://localhost:3001/api/v1
```

**Использование:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';
```

---

## 🔧 Конфигурация

### tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@features/*": ["./src/features/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@store/*": ["./src/store/*"],
      "@utils/*": ["./src/utils/*"],
      "@constants/*": ["./src/constants/*"]
    }
  }
}
```

### vite.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // ... другие алиасы
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
```

---

## 📊 Метрики проекта

### Код
- **Всего строк:** ~15,000+
- **Компонентов:** 35+
- **Custom hooks:** 3
- **Redux slices:** 3
- **RTK Query APIs:** 3
- **Utility функций:** 10+

### Тестирование
- **Test files:** 17
- **Tests:** 93
- **Coverage:** ~64%

### Performance
- **First Load:** <2s
- **Build time:** ~15s
- **Bundle size:** ~500 KB (gzipped)
- **Lighthouse Score:** 90+

---

## 🚀 Deployment

### Production Build

```bash
npm run build
```

Output: `dist/` директория

### Preview

```bash
npm run preview
```

### Docker Production

```bash
docker build -t avito-frontend .
docker run -p 80:80 avito-frontend
```

---

## 🤝 Contributing

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- SCSS Modules для стилей
- Feature-based architecture
- Typed Redux hooks

