import React from 'react';

export type LeadTabType = 'Activity' | 'Calls' | 'Workflow' | 'Tasks' | 'Revenue';

interface LeadTabsProps {
  activeTab: LeadTabType;
  onTabChange: (tab: LeadTabType) => void;
}

const TABS: LeadTabType[] = ['Activity', 'Calls', 'Workflow', 'Tasks', 'Revenue'];

export const LeadTabs: React.FC<LeadTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="lead-tabs-nav">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`lead-tab-item ${activeTab === tab ? 'is-active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

