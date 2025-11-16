# 🚀 Avito Test Project - Система модерации объявлений

Полнофункциональная система модерации объявлений с React frontend и Node.js backend.

---

## 📋 Содержание

- [О проекте](#о-проекте)
- [Быстрый старт](#быстрый-старт)
- [Структура проекта](#структура-проекта)
- [Frontend](#frontend)
- [Backend API](#backend-api)
- [Deployment](#deployment)

---

## 🎯 О проекте

Система модерации объявлений для стажёрского задания Avito (осень 2025).

### Функциональность

✅ **Список объявлений** - фильтрация, поиск, сортировка, пагинация  
✅ **Детальный просмотр** - модерация, история, навигация  
✅ **Статистика** - метрики, графики, экспорт, auto-refresh  
✅ **Адаптивный дизайн** - от 1920px до 360px  
✅ **Тёмная/светлая тема** - с сохранением в localStorage  

---

## 🚀 Быстрый старт

### С Docker (рекомендуется)

```bash
# Запустить всё одной командой
docker-compose up -d

# Открыть в браузере
# Frontend: http://localhost
# Backend:  http://localhost:3001
```

### Без Docker

#### Backend
```bash
cd tech-int3-server
npm install
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

**Готово!** Frontend на http://localhost:5173

---

## 📁 Структура проекта

```
avito-test/
├── frontend/              # React + TypeScript приложение
│   ├── src/
│   │   ├── features/     # Страницы (list, item, stats)
│   │   ├── components/   # Переиспользуемые компоненты
│   │   ├── store/        # Redux store
│   │   └── ...
│   ├── Dockerfile        # Production build
│   └── README.md         # 📄 Детальная документация
│
├── tech-int3-server/      # Node.js + Express API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Business logic
│   │   └── models/       # Data models
│   └── server.js
│
├── docker-compose.yml     # Production
├── docker-compose.dev.yml # Development
└── Makefile              # Удобные команды
```

---

## 💻 Frontend

**📄 Полная документация:** [frontend/README.md](./frontend/README.md)

### Технологии

- **React 19** + **TypeScript**
- **Redux Toolkit** + **RTK Query**
- **React Router** для роутинга
- **SCSS Modules** для стилей
- **Chart.js** для графиков
- **Vite** для сборки
- **Vitest** для тестирования

### Страницы

| Роут | Описание | Функционал |
|------|----------|------------|
| `/list` | Список объявлений | Поиск, фильтры, сортировка, пагинация |
| `/item/:id` | Детальная страница | Модерация, галерея, история |
| `/stats` | Статистика | Метрики, графики, экспорт |

### Команды

```bash
cd frontend

npm run dev              # Development server
npm run build            # Production build
npm test                 # Запустить тесты (93 tests)
npm run lint             # Проверка кода
```

### Тесты

```
✅ Test Files:  17 passed
✅ Tests:       93 passed
✅ Duration:    ~9 seconds
```

---

## 🌐 Backend API

### Base URL
```
http://localhost:3001/api/v1
```

### Endpoints

#### Объявления

**Получить список объявлений**
```http
GET /api/v1/ads
```

Query параметры:
- `search` - поиск по названию
- `status` - фильтр по статусу (pending, approved, rejected, draft)
- `category` - фильтр по категории
- `minPrice`, `maxPrice` - диапазон цен
- `priority` - фильтр по приоритету (normal, urgent)
- `sortBy` - сортировка (createdAt, price, priority)
- `sortOrder` - порядок (asc, desc)
- `page`, `limit` - пагинация

Response:
```json
{
  "ads": [
    {
      "id": 1,
      "title": "iPhone 14 Pro",
      "description": "Описание...",
      "price": 89990,
      "category": "Электроника",
      "status": "pending",
      "priority": "normal",
      "createdAt": "2025-01-15T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    }
  ],
  "total": 100
}
```

**Получить объявление по ID**
```http
GET /api/v1/ads/:id
```

Response:
```json
{
  "id": 1,
  "title": "iPhone 14 Pro",
  "description": "Описание товара...",
  "price": 89990,
  "category": "Электроника",
  "status": "pending",
  "priority": "normal",
  "images": [
    "/assets/placeholder.jpg",
    "/assets/placeholder.jpg",
    "/assets/placeholder.jpg"
  ],
  "characteristics": {
    "Бренд": "Apple",
    "Модель": "iPhone 14 Pro",
    "Цвет": "Графитовый",
    "Память": "256GB"
  },
  "seller": {
    "id": 101,
    "name": "Иван Иванов",
    "rating": "4.8",
    "totalAnnouncements": 25,
    "registeredAt": "2024-01-15T10:00:00.000Z"
  },
  "moderationHistory": [
    {
      "moderatorId": 1,
      "moderatorName": "Модератор 1",
      "action": "pending",
      "timestamp": "2025-01-15T10:30:00.000Z",
      "reason": null,
      "comment": "На проверке"
    }
  ],
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```

**Обновить статус объявления**
```http
PUT /api/v1/ads/:id/status
```

Body:
```json
{
  "status": "approved",
  "reason": "Запрещённый товар" // Опционально для rejected
}
```

Response:
```json
{
  "id": 1,
  "status": "approved",
  "message": "Статус объявления обновлён"
}
```

**Одобрить объявление**
```http
PUT /api/v1/ads/:id/approve
```

**Отклонить объявление**
```http
PUT /api/v1/ads/:id/reject
```

Body:
```json
{
  "reason": "Запрещённый товар"
}
```

#### Модераторы

**Получить список модераторов**
```http
GET /api/v1/moderators
```

Response:
```json
{
  "moderators": [
    {
      "id": 1,
      "name": "Модератор 1",
      "totalChecked": 150,
      "approved": 100,
      "rejected": 30,
      "rework": 20
    }
  ]
}
```

### Статусы объявлений

- `pending` - На проверке
- `approved` - Одобрено
- `rejected` - Отклонено
- `draft` - Черновик

### Категории

- Электроника
- Недвижимость
- Транспорт
- Одежда и обувь
- Товары для дома
- Хобби и отдых

### Приоритеты

- `normal` - Обычный
- `urgent` - Срочный

---

## 🐳 Deployment

### Docker Production

```bash
# Сборка и запуск
docker-compose up -d

# Проверка статуса
docker-compose ps

# Логи
docker-compose logs -f

# Остановка
docker-compose down
```

**Доступ:**
- Frontend: http://localhost
- Backend: http://localhost:3001

### Docker Development

```bash
# С hot-reload
docker-compose -f docker-compose.dev.yml up
```

**Доступ:**
- Frontend: http://localhost:5173 (Vite)
- Backend: http://localhost:3001

### Makefile команды

```bash
make up              # Запустить production
make dev             # Запустить development
make down            # Остановить
make logs            # Показать логи
make clean           # Очистить
make test            # Запустить тесты
```

### Production Build (без Docker)

#### Frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

#### Backend
```bash
cd tech-int3-server
npm start
```

---

## 📊 Архитектура

### Frontend Architecture

```
User Interface (React)
         ↓
Redux Store (State Management)
         ↓
RTK Query (API Client + Cache)
         ↓
Backend API (REST)
```

**Ключевые паттерны:**
- Feature-based структура
- Container/Presentational компоненты
- Custom hooks для переиспользования
- Typed Redux hooks
- CSS Modules + CSS Variables

### Backend Architecture

```
Client Request
       ↓
Express Router
       ↓
Controller (Business Logic)
       ↓
Model (Data Access)
       ↓
Response
```

---

## 🎨 Дизайн

### Темы

- 🌞 **Светлая тема** (по умолчанию)
- 🌙 **Тёмная тема** (с сохранением в localStorage)
- 🔄 Автоматическое определение системной темы

### Адаптивность

Полная поддержка от 1920px до 360px:
- Desktop (1920px - 1280px)
- Laptop (1280px - 1024px)
- Tablet (1024px - 768px)
- Mobile Large (768px - 480px)
- Mobile Medium (480px - 360px)

**Особенности:**
- Fluid typography с `clamp()`
- Responsive images
- Sidebar → Drawer на мобильных
- Touch-friendly элементы (48px+)

---

## ⚡ Производительность

### Метрики

| Метрика | Значение |
|---------|----------|
| First Load | <2s |
| Build time | ~15s |
| Bundle size | ~500 KB (gzipped) |
| Docker image | ~205 MB total |
| Test suite | ~9s (93 tests) |

### Оптимизации

- ✅ React.memo для компонентов
- ✅ Debounce для поиска (300ms)
- ✅ RTK Query caching
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Gzip compression (Nginx)
- ✅ Static asset caching (1 year)

---

## 🧪 Тестирование

### Frontend Tests

```bash
cd frontend
npm test
```

**Результаты:**
- Test Files: 17 passed
- Tests: 93 passed
- Coverage: ~64%

**Тестируются:**
- Компоненты (RTL)
- Redux slices
- RTK Query services
- Utility функции
- Integration tests

---

## 📚 Документация

### Frontend
Полная документация: [frontend/README.md](./frontend/README.md)
- Структура проекта
- Все компоненты
- Redux state management
- API integration
- Стилизация
- Тестирование

---

## 🔐 Environment

### Production
```env
# Backend
PORT=3001
NODE_ENV=production

# Frontend (build time)
VITE_API_URL=http://localhost:3001/api/v1
```

### Development
```env
# Vite proxy настроен в vite.config.ts
# Не требуется .env файл
```

---

## 📦 Dependencies

### Frontend
- react, react-dom: 19.2.0
- typescript: 5.9.3
- @reduxjs/toolkit: 2.10.1
- react-router-dom: 7.9.5
- chart.js: 4.5.1
- framer-motion: 12.23.24
- vitest: 4.0.9

### Backend
- express: 4.18.2
- node: 20+

---

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Feature-based architecture
- SCSS Modules

---
