export interface DashboardMetric {
  title: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  href: string;
  loading: boolean;
}

export interface DashboardQuickAction {
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
}
