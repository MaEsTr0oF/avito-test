import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createTestStore } from '@/test/test-utils';
import { itemApi } from '../services';

const mockItem = {
  id: 1,
  title: 'Test',
  price: 1000,
  images: [],
  category: 'Электроника',
  status: 'pending',
  seller: {
    id: 1,
    name: 'Seller',
    rating: '4.5',
    totalAds: 10,
    registeredAt: new Date().toISOString(),
  },
  characteristics: {},
  moderationHistory: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('itemApi', () => {
  describe('getAnnouncementById query', () => {
    it('should handle successful fetch', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads/:id', () => {
          return HttpResponse.json(mockItem);
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        itemApi.endpoints.getAnnouncementById.initiate('1')
      );

      expect(result.status).toBe('fulfilled');
      expect(result.data).toBeDefined();
      expect(result.data?.title).toBe('Test');
    });

    it('should handle 404 not found', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads/:id', () => {
          return HttpResponse.json({ error: 'Not found' }, { status: 404 });
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        itemApi.endpoints.getAnnouncementById.initiate('999')
      );

      expect(result.status).toBe('rejected');
      expect(result.error).toBeDefined();
    });

    it('should handle network error', async () => {
      server.use(
        http.get('http://localhost:3001/api/v1/ads/:id', () => {
          return HttpResponse.error();
        })
      );

      const store = createTestStore();
      const result = await store.dispatch(
        itemApi.endpoints.getAnnouncementById.initiate('1')
      );

      expect(result.status).toBe('rejected');
    });
  });

  describe('updateAnnouncementStatus mutation', () => {
    it('should handle successful update', async () => {
      server.use(
        http.put('http://localhost:3001/api/v1/ads/:id/status', () => {
          return HttpResponse.json({ ...mockItem, status: 'approved' });
        })
      );

      const store = createTestStore();
      const promise = store.dispatch(
        itemApi.endpoints.updateAnnouncementStatus.initiate({
          id: '1',
          status: 'approved',
        })
      );

      const result = await promise;
      
      expect(result.data?.status).toBe('approved');
    });

    it('should handle update failure', async () => {
      server.use(
        http.put('http://localhost:3001/api/v1/ads/:id/status', () => {
          return HttpResponse.json({ error: 'Update failed' }, { status: 400 });
        })
      );

      const store = createTestStore();
      const promise = store.dispatch(
        itemApi.endpoints.updateAnnouncementStatus.initiate({
          id: '1',
          status: 'approved',
        })
      );

      const result = await promise;
      
      expect(result.error).toBeDefined();
    });

    it('should handle network error during update', async () => {
      server.use(
        http.put('http://localhost:3001/api/v1/ads/:id/status', () => {
          return HttpResponse.error();
        })
      );

      const store = createTestStore();
      const promise = store.dispatch(
        itemApi.endpoints.updateAnnouncementStatus.initiate({
          id: '1',
          status: 'approved',
        })
      );

      const result = await promise;
      
      expect(result.error).toBeDefined();
    });
  });
});

