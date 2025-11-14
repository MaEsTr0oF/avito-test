import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createTestStore } from '@/test/test-utils';
import { statsApi } from '../services';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('statsApi', () => {
  describe('getStats query', () => {
    it('should handle successful fetch', async () => {
      const mockData = [
        {
          id: 1,
          title: 'Test',
          price: 1000,
          category: 'Электроника',
          status: 'approved',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      server.use(
        http.get('http://localhost:3001/api/v1/ads', () => {
          return HttpResponse.json({ ads: mockData });
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        statsApi.endpoints.getStats.initiate('7days')
      );

      expect(result.status).toBe('fulfilled');
      expect(result.data).toBeDefined();
      expect(result.data?.metrics).toBeDefined();
      expect(result.data?.chartData).toBeDefined();
    });

    it('should handle network error', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads', () => {
          return HttpResponse.error();
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        statsApi.endpoints.getStats.initiate('7days')
      );

      expect(result.status).toBe('rejected');
      expect(result.error).toBeDefined();
    });

    it('should handle 500 server error', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads', () => {
          return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
          );
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        statsApi.endpoints.getStats.initiate('7days')
      );

      expect(result.status).toBe('rejected');
      expect(result.error).toBeDefined();
    });

    it('should handle 404 not found', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads', () => {
          return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        statsApi.endpoints.getStats.initiate('7days')
      );

      expect(result.status).toBe('rejected');
      expect(result.error).toBeDefined();
    });


    it('should handle invalid JSON response', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads', () => {
          return new Response('Invalid JSON{', {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        statsApi.endpoints.getStats.initiate('7days')
      );

      expect(result.status).toBe('rejected');
      expect(result.error).toBeDefined();
    });
  });
});

