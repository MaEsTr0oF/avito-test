import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/test-utils';
import AnnouncementCard from '../AnnouncementCard';
import type { Announcement } from '../../../type';

const mockAnnouncement: Announcement = {
  id: 1,
  title: 'iPhone 15 Pro Max',
  description: 'Новый iPhone в отличном состоянии',
  price: 120000,
  category: 'Электроника',
  categoryId: 0,
  status: 'pending',
  priority: 'urgent',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  images: ['https://example.com/image1.jpg'],
  seller: {
    id: 1,
    name: 'Иван Петров',
    rating: '4.8',
    totalAds: 15,
    registeredAt: '2023-01-01T00:00:00Z',
  },
  characteristics: {},
  moderationHistory: [],
};

describe('AnnouncementCard', () => {
  it('отображает название объявления', () => {
    renderWithProviders(<AnnouncementCard item={mockAnnouncement} />);
    
    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument();
  });

  it('отображает цену в правильном формате', () => {
    renderWithProviders(<AnnouncementCard item={mockAnnouncement} />);
    
    expect(screen.getByText(/120[\s\u00A0]000 ₽/)).toBeInTheDocument();
  });

  it('отображает категорию', () => {
    renderWithProviders(<AnnouncementCard item={mockAnnouncement} />);
    
    expect(screen.getByText('Электроника')).toBeInTheDocument();
  });

  it('отображает статус "На модерации"', () => {
    renderWithProviders(<AnnouncementCard item={mockAnnouncement} />);
    
    expect(screen.getByText('На модерации')).toBeInTheDocument();
  });

  it('отображает бейдж "Срочно" для приоритетных объявлений', () => {
    renderWithProviders(<AnnouncementCard item={mockAnnouncement} />);
    
    expect(screen.getByText(/срочно/i)).toBeInTheDocument();
  });

  it('НЕ отображает бейдж "Срочно" для обычных объявлений', () => {
    const normalAnnouncement = { ...mockAnnouncement, priority: 'normal' as const };
    renderWithProviders(<AnnouncementCard item={normalAnnouncement} />);
    
    expect(screen.queryByText(/срочно/i)).not.toBeInTheDocument();
  });

  it('отображает информацию о продавце', () => {
    renderWithProviders(<AnnouncementCard item={mockAnnouncement} />);
    
    expect(screen.getByText('Иван Петров')).toBeInTheDocument();
    expect(screen.getByText(/⭐ 4\.8/)).toBeInTheDocument();
  });

  it('содержит ссылку на детальную страницу', () => {
    renderWithProviders(<AnnouncementCard item={mockAnnouncement} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/item/1');
  });

  it('обрезает длинное описание', () => {
    const longDescription = 'А'.repeat(150);
    const longAnnouncement = { ...mockAnnouncement, description: longDescription };
    renderWithProviders(<AnnouncementCard item={longAnnouncement} />);
    
    const description = screen.getByText(/А{120}\.\.\./);
    expect(description).toBeInTheDocument();
  });
});

