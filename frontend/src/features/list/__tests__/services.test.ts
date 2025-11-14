import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createTestStore } from '@/test/test-utils';
import { announcementsApi } from '../services';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('announcementsApi', () => {
  describe('getAnnouncements query', () => {
    it('should handle successful fetch', async () => {
      const mockData = {
        ads: [
          {
            id: 1,
            title: 'Test Ad',
            price: 1000,
            category: 'Электроника',
            status: 'pending',
            createdAt: new Date().toISOString(),
          },
        ],
        total: 1,
      };

      server.use(
        http.get('http://localhost:3001/api/v1/ads', () => {
          return HttpResponse.json(mockData);
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        announcementsApi.endpoints.getAnnouncements.initiate({})
      );

      expect(result.status).toBe('fulfilled');
      expect(result.data).toBeDefined();
      expect(result.data?.ads).toBeDefined();
      expect(result.data?.total).toBe(1);
    });

    it('should handle network error', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads', () => {
          return HttpResponse.error();
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        announcementsApi.endpoints.getAnnouncements.initiate({})
      );

      expect(result.status).toBe('rejected');
      expect(result.error).toBeDefined();
    });

    it('should handle 500 error', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads', () => {
          return HttpResponse.json(
            { error: 'Server Error' },
            { status: 500 }
          );
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        announcementsApi.endpoints.getAnnouncements.initiate({})
      );

      expect(result.status).toBe('rejected');
    });
  });
});

