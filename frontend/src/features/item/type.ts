export type AnnouncementStatus = 'pending' | 'approved' | 'rejected' | 'draft';
export type Priority = 'normal' | 'urgent';

export interface Seller {
  name: string;
  rating: number;
  totalAds: number;
  registrationDate: string;
}

export interface ModerationHistoryItem {
  id: number;
  moderator: string;
  date: string;
  decision: 'approved' | 'rejected' | 'rework';
  comment?: string;
}

export interface AnnouncementDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: number;
  category: string;
  status: AnnouncementStatus;
  priority: Priority;
  seller: Seller;
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistoryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateStatusPayload {
  id: number;
  status: AnnouncementStatus;
  reason?: string;
}

export interface RejectReason {
  id: string;
  label: string;
}

export interface ItemState {
  currentItem: AnnouncementDetail | null;
  loading: boolean;
  error: string | null;
}

export interface GetAnnouncementByIdResponse {
  ad: AnnouncementDetail;
}

export interface UpdateStatusResponse {
  success: boolean;
  message: string;
  ad: AnnouncementDetail;
}

