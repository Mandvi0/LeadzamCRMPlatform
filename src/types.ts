export type StageType =
  | 'Fresh'
  | 'Attempting Call'
  | 'Connected'
  | 'Interested'
  | 'Meeting Scheduled'
  | 'Won'
  | 'Lost';

export interface Lead {
  id: string;
  name: string;
  displayName?: string;
  leadOwner: string;
  email: string;
  phone: string;
  stage: StageType;
  leadSource: string;
  createdDate: string;
  createdTime: string;
  timestamp: number;
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

