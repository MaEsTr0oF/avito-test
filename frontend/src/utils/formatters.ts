import { STATUS_LABELS, type AnnouncementStatus } from '@/constants/announcements';

export const formatPrice = (price: number, currency: string = '₽'): string => {
  return `${price.toLocaleString('ru-RU')} ${currency}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('ru-RU');
};

export const formatDateTime = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Date(date).toLocaleDateString('ru-RU', options || defaultOptions);
};

export const formatShortDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const getStatusLabel = (status: AnnouncementStatus): string => {
  return STATUS_LABELS[status] || status;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

export const formatRating = (rating: number | string): string => {
  const numRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  return numRating.toFixed(1);
};

export const formatTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'только что';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${getNounForm(diffInMinutes, 'минута', 'минуты', 'минут')} назад`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${getNounForm(diffInHours, 'час', 'часа', 'часов')} назад`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${getNounForm(diffInDays, 'день', 'дня', 'дней')} назад`;
  }

  return formatDate(date);
};

const getNounForm = (number: number, one: string, two: string, five: string): string => {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) {
    return five;
  }
  if (n1 > 1 && n1 < 5) {
    return two;
  }
  if (n1 === 1) {
    return one;
  }
  return five;
};

