export type Period = 'today' | '7days' | '30days';

export interface MetricsData {
  totalChecked: number;
  approvedPercent: number;
  rejectedPercent: number;
  avgTimeMinutes: number;
}

export interface ActivityData {
  labels: string[];
  values: number[];
}

export interface DecisionsData {
  approved: number;
  rejected: number;
  rework: number;
}

export interface CategoriesData {
  labels: string[];
  values: number[];
}

export interface ChartData {
  activityByDay: ActivityData;
  decisions: DecisionsData;
  categories: CategoriesData;
}

export interface StatsResponse {
  metrics: MetricsData;
  chartData: ChartData;
}

export interface StatsState {
  metrics: MetricsData | null;
  chartData: ChartData | null;
  period: Period;
  loading: boolean;
  error: string | null;
}

