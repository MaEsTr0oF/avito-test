import type { Announcement } from '@/features/list/type';
import type { Period, StatsResponse } from './type';

const isWithinPeriod = (date: string, period: Period): boolean => {
  const itemDate = new Date(date);
  const now = new Date();
  const diffTime = now.getTime() - itemDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  switch (period) {
    case 'today':
      return diffDays === 0;
    case '7days':
      return diffDays <= 7;
    case '30days':
      return diffDays <= 30;
    default:
      return false;
  }
};

const getDaysInPeriod = (period: Period): number => {
  switch (period) {
    case 'today':
      return 1;
    case '7days':
      return 7;
    case '30days':
      return 30;
  }
};

const getDayLabel = (date: Date, period: Period): string => {
  if (period === 'today') {
    return 'Сегодня';
  } else if (period === '7days') {
    const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return dayNames[date.getDay()];
  } else {
    return `${date.getDate()}.${date.getMonth() + 1}`;
  }
};

export const transformAnnouncementsToStats = (
  announcements: Announcement[],
  period: Period
): StatsResponse => {
  const filteredAnnouncements = announcements.filter(
    (item) => item.updatedAt && isWithinPeriod(item.updatedAt, period)
  );

  const totalChecked = filteredAnnouncements.length;
  const approved = filteredAnnouncements.filter((item) => item.status === 'approved').length;
  const rejected = filteredAnnouncements.filter((item) => item.status === 'rejected').length;
  const rework = filteredAnnouncements.filter((item) => item.status === 'draft').length;

  const approvedPercent = totalChecked > 0 ? Math.round((approved / totalChecked) * 100) : 0;
  const rejectedPercent = totalChecked > 0 ? Math.round((rejected / totalChecked) * 100) : 0;

  const days = getDaysInPeriod(period);
  const activityMap = new Map<string, number>();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const label = getDayLabel(date, period);
    activityMap.set(label, 0);
  }

  filteredAnnouncements.forEach((item) => {
    if (item.updatedAt) {
      const itemDate = new Date(item.updatedAt);
      itemDate.setHours(0, 0, 0, 0);
      const label = getDayLabel(itemDate, period);
      
      if (activityMap.has(label)) {
        activityMap.set(label, (activityMap.get(label) || 0) + 1);
      }
    }
  });

  const activityLabels = Array.from(activityMap.keys());
  const activityValues = Array.from(activityMap.values());

  const categoriesMap = new Map<string, number>();
  filteredAnnouncements.forEach((item) => {
    const category = item.category || 'Другое';
    categoriesMap.set(category, (categoriesMap.get(category) || 0) + 1);
  });

  const categoriesLabels = Array.from(categoriesMap.keys()).slice(0, 8);
  const categoriesValues = categoriesLabels.map((label) => categoriesMap.get(label) || 0);

  const totalTime = filteredAnnouncements.reduce((sum, item) => {
    if (item.createdAt && item.updatedAt) {
      const created = new Date(item.createdAt).getTime();
      const updated = new Date(item.updatedAt).getTime();
      return sum + (updated - created);
    }
    return sum;
  }, 0);

  const avgTimeMinutes = totalChecked > 0 
    ? Math.round(totalTime / totalChecked / 1000 / 60) 
    : 0;

  return {
    metrics: {
      totalChecked,
      approvedPercent,
      rejectedPercent,
      avgTimeMinutes,
    },
    chartData: {
      activityByDay: {
        labels: activityLabels,
        values: activityValues,
      },
      decisions: {
        approved,
        rejected,
        rework,
      },
      categories: {
        labels: categoriesLabels,
        values: categoriesValues,
      },
    },
  };
};

