export type StageType =
  | 'Fresh'
  | 'Attempting Call'
  | 'Connected'
  | 'Interested'
  | 'Meeting Scheduled'
  | 'Won'
  | 'Lost';

export interface ActivityItem {
  id: string;
  type: 'stage' | 'call' | 'note' | 'whatsapp' | 'task' | 'created';
  title: string;
  description?: string;
  timestamp: string;
  user?: string;
}

export interface Lead {
  id: string;
  name: string;
  displayName?: string;
  leadOwner: string;
  leadOwnerInitials?: string;
  email: string;
  phone: string;
  countryCode?: string;
  stage: StageType;
  leadSource: string;
  createdDate: string;
  createdTime: string;
  timestamp: number;
  company?: string;
  jobTitle?: string;
  lastActivity?: string;
  country?: string;
  state?: string;
  city?: string;
  streetAddress?: string;
  streetAddress2?: string;
  postalCode?: string;
  annualRevenue?: string;
  industry?: string;
  website?: string;
  employees?: string;
  timezone?: string;
  description?: string;
  activities?: ActivityItem[];
}

export type SortField = 'name' | 'leadOwner' | 'stage' | 'created';
export type SortOrder = 'asc' | 'desc';

export interface ColumnVisibility {
  checkbox: boolean;
  name: boolean;
  leadOwner: boolean;
  email: boolean;
  phone: boolean;
  stage: boolean;
  leadSource: boolean;
  created: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  color: string;
}
