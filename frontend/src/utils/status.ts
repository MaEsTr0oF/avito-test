import type { AnnouncementStatus } from '@/constants/announcements';

type StatusStyleMap = {
  className: string;
  color: string;
  bgColor: string;
};

export const getStatusClassName = (status: AnnouncementStatus): string => {
  const classMap: Record<AnnouncementStatus, string> = {
    pending: 'status_pending',
    approved: 'status_approved',
    rejected: 'status_rejected',
    draft: 'status_draft',
  };

  return classMap[status] || '';
};

export const getStatusColor = (status: AnnouncementStatus): string => {
  const colorMap: Record<AnnouncementStatus, string> = {
    pending: '#ffa726',
    approved: '#66bb6a',
    rejected: '#ef5350',
    draft: '#bdbdbd',
  };

  return colorMap[status] || '#6c757d';
};

export const getStatusStyles = (status: AnnouncementStatus): StatusStyleMap => {
  const styleMap: Record<AnnouncementStatus, StatusStyleMap> = {
    pending: {
      className: 'status_pending',
      color: '#ffffff',
      bgColor: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)',
    },
    approved: {
      className: 'status_approved',
      color: '#ffffff',
      bgColor: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
    },
    rejected: {
      className: 'status_rejected',
      color: '#ffffff',
      bgColor: 'linear-gradient(135deg, #ef5350 0%, #e53935 100%)',
    },
    draft: {
      className: 'status_draft',
      color: '#ffffff',
      bgColor: 'linear-gradient(135deg, #bdbdbd 0%, #9e9e9e 100%)',
    },
  };

  return styleMap[status] || styleMap.draft;
};

