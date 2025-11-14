import { describe, it, expect } from 'vitest';
import { transformAnnouncementsToStats } from '../dataAdapter';
import type { Announcement } from '@/features/list/type';

describe('dataAdapter', () => {
  const mockAnnouncements: Announcement[] = [
    {
      id: 1,
      title: 'Test 1',
      description: 'Description 1',
      price: 1000,
      category: 'Электроника',
      categoryId: 1,
      status: 'approved',
      priority: 'normal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: [],
      seller: {
        id: 1,
        name: 'Seller 1',
        rating: '4.5',
        totalAds: 10,
        registeredAt: new Date().toISOString(),
      },
      characteristics: {},
      moderationHistory: [],
    },
    {
      id: 2,
      title: 'Test 2',
      description: 'Description 2',
      price: 2000,
      category: 'Недвижимость',
      categoryId: 2,
      status: 'rejected',
      priority: 'urgent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: [],
      seller: {
        id: 2,
        name: 'Seller 2',
        rating: '3.5',
        totalAds: 5,
        registeredAt: new Date().toISOString(),
      },
      characteristics: {},
      moderationHistory: [],
    },
    {
      id: 3,
      title: 'Test 3',
      description: 'Description 3',
      price: 3000,
      category: 'Транспорт',
      categoryId: 3,
      status: 'draft',
      priority: 'normal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: [],
      seller: {
        id: 3,
        name: 'Seller 3',
        rating: '5.0',
        totalAds: 20,
        registeredAt: new Date().toISOString(),
      },
      characteristics: {},
      moderationHistory: [],
    },
  ];

  describe('transformAnnouncementsToStats', () => {
    it('should calculate correct metrics for 7days period', () => {
      const result = transformAnnouncementsToStats(mockAnnouncements, '7days');

      expect(result.metrics.totalChecked).toBe(3);
      expect(result.metrics.approvedPercent).toBeGreaterThanOrEqual(0);
      expect(result.metrics.rejectedPercent).toBeGreaterThanOrEqual(0);
      expect(result.metrics.avgTimeMinutes).toBeGreaterThanOrEqual(0);
    });

    it('should have correct decisions distribution', () => {
      const result = transformAnnouncementsToStats(mockAnnouncements, '7days');

      expect(result.chartData.decisions.approved).toBe(1);
      expect(result.chartData.decisions.rejected).toBe(1);
      expect(result.chartData.decisions.rework).toBe(1);
    });

    it('should generate activity labels for 7days', () => {
      const result = transformAnnouncementsToStats(mockAnnouncements, '7days');

      expect(result.chartData.activityByDay.labels).toHaveLength(7);
      expect(result.chartData.activityByDay.values).toHaveLength(7);
    });

    it('should generate activity labels for today', () => {
      const result = transformAnnouncementsToStats(mockAnnouncements, 'today');

      expect(result.chartData.activityByDay.labels).toHaveLength(1);
      expect(result.chartData.activityByDay.labels[0]).toBe('Сегодня');
    });

    it('should generate activity labels for 30days', () => {
      const result = transformAnnouncementsToStats(mockAnnouncements, '30days');

      expect(result.chartData.activityByDay.labels).toHaveLength(30);
      expect(result.chartData.activityByDay.values).toHaveLength(30);
    });

    it('should correctly categorize announcements', () => {
      const result = transformAnnouncementsToStats(mockAnnouncements, '7days');

      expect(result.chartData.categories.labels.length).toBeGreaterThan(0);
      expect(result.chartData.categories.values.length).toBeGreaterThan(0);
      expect(result.chartData.categories.labels).toContain('Электроника');
    });

    it('should return zero metrics for empty announcements', () => {
      const result = transformAnnouncementsToStats([], '7days');

      expect(result.metrics.totalChecked).toBe(0);
      expect(result.metrics.approvedPercent).toBe(0);
      expect(result.metrics.rejectedPercent).toBe(0);
      expect(result.metrics.avgTimeMinutes).toBe(0);
    });
  });
});

