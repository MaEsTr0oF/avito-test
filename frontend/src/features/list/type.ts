type Announcement = {
	id: number;
	title: string;
	description: string;
	price: number;
	category: string;
	categoryId: number;
	status: 'pending' | 'approved' | 'rejected' | 'draft';
	priority: 'normal' | 'urgent';
	createdAt: string;
	updatedAt: string;
	images: string[];
	seller: {
	  id: number;
	  name: string;
	  rating: string;
	  totalAds: number;
	  registeredAt: string;
	};
	characteristics: Record<string, string>;
	moderationHistory: Array<{
	  id: number;
	  moderatorId: number;
	  moderatorName: string;
	  action: 'approved' | 'rejected' | 'requestChanges';
	  reason: string | null;
	  comment: string;
	  timestamp: string;
	}>;
};
 
type Pagination = {
currentPage: number;
totalPages: number;
totalItems: number;
itemsPerPage: number;
};

type GetAnnouncementsResponse = {
ads: Announcement[];
pagination: Pagination;
};

type GetAnnouncementsParams = {
page?: number;
limit?: number;
status?: 'pending' | 'approved' | 'rejected' | 'draft' | Array<'pending' | 'approved' | 'rejected' | 'draft'>;
categoryId?: number;
minPrice?: number;
maxPrice?: number;
search?: string;
sortBy?: 'createdAt' | 'price' | 'priority';
sortOrder?: 'asc' | 'desc';
priority?: 'normal' | 'urgent';
};

type ApproveRejectResponse = {
message: string;
ad: Announcement;
};

type FilterState = {
	search: string;
	statuses: Array<'pending' | 'approved' | 'rejected' | 'draft'>;
	categoryId: number | undefined;
	priority: 'normal' | 'urgent' | undefined;
	minPrice: number | undefined;
	maxPrice: number | undefined;
	sortBy: 'createdAt' | 'price' | 'priority';
	sortOrder: 'asc' | 'desc';
	page: number;
	limit: number;
}

type ListState = {
	items: Announcement[];
	loading: boolean;
	error: string | null;
	selectedIds: number[];
	filters: FilterState;
}

export type {ListState, FilterState, Announcement, Pagination, GetAnnouncementsResponse, GetAnnouncementsParams, ApproveRejectResponse };