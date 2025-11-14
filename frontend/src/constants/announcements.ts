export type AnnouncementStatus = 'pending' | 'approved' | 'rejected' | 'draft';
export type AnnouncementPriority = 'normal' | 'urgent';
export type SortField = 'createdAt' | 'price' | 'priority';
export type SortOrder = 'asc' | 'desc';

export const ANNOUNCEMENT_STATUSES = [
  { value: 'pending' as const, label: 'На модерации' },
  { value: 'approved' as const, label: 'Одобрено' },
  { value: 'rejected' as const, label: 'Отклонено' },
  { value: 'draft' as const, label: 'Черновик' },
] as const;

export const STATUS_LABELS: Record<AnnouncementStatus, string> = {
  pending: 'На модерации',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
};

export const CATEGORIES = [
  { id: 0, name: 'Электроника' },
  { id: 1, name: 'Недвижимость' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Работа' },
  { id: 4, name: 'Услуги' },
  { id: 5, name: 'Животные' },
  { id: 6, name: 'Мода' },
  { id: 7, name: 'Детское' },
] as const;

export const REJECT_REASONS = [
  { id: 'prohibited' as const, label: 'Запрещённый товар' },
  { id: 'fake' as const, label: 'Подозрение на мошенничество' },
  { id: 'poor_quality' as const, label: 'Некачественные фото' },
  { id: 'wrong_category' as const, label: 'Неверная категория' },
  { id: 'incomplete' as const, label: 'Неполное описание' },
  { id: 'duplicate' as const, label: 'Дубликат объявления' },
  { id: 'other' as const, label: 'Другая причина' },
] as const;

export const PRIORITY_LABELS: Record<AnnouncementPriority, string> = {
  normal: 'Обычный',
  urgent: 'Срочный',
};

export const SORT_OPTIONS = [
  { value: 'createdAt' as const, label: 'Дате создания' },
  { value: 'price' as const, label: 'Цене' },
  { value: 'priority' as const, label: 'Приоритету' },
] as const;

export const SORT_ORDER_OPTIONS = [
  { value: 'desc' as const, label: 'По убыванию' },
  { value: 'asc' as const, label: 'По возрастанию' },
] as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
} as const;

