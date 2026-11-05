import React, { useState } from 'react';
import { Phone, FileText, CheckCircle2, RefreshCw } from 'lucide-react';
import type { Lead, ActivityItem } from '../../types';
import { LeadTabs } from './LeadTabs';
import type { LeadTabType } from './LeadTabs';

interface ActivitySectionProps {
  lead: Lead;
}

type FilterChip = 'Calls' | 'Notes' | 'WhatsApp' | 'Stage' | 'Tasks';

const CHIPS: FilterChip[] = ['Calls', 'Notes', 'WhatsApp', 'Stage', 'Tasks'];

export const ActivitySection: React.FC<ActivitySectionProps> = ({ lead }) => {
  const [activeTab, setActiveTab] = useState<LeadTabType>('Activity');
  const [selectedChips, setSelectedChips] = useState<Set<FilterChip>>(new Set());

  const toggleChip = (chip: FilterChip) => {
    setSelectedChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) {
        next.delete(chip);
      } else {
        next.add(chip);
      }
      return next;
    });
  };

  const getFilteredActivities = (): ActivityItem[] => {
    const list = lead.activities || [];

    // Filter by tab first
    if (activeTab === 'Calls') {
      return list.filter((a) => a.type === 'call');
    }
    if (activeTab === 'Tasks') {
      return list.filter((a) => a.type === 'task');
    }
    if (activeTab === 'Workflow') {
      return list.filter((a) => a.type === 'stage');
    }
    if (activeTab === 'Revenue') {
      return list.filter((a) => a.title.toLowerCase().includes('deal') || a.title.toLowerCase().includes('won'));
    }

    // Filter by chips if any are selected
    if (selectedChips.size === 0) {
      return list;
    }

    return list.filter((a) => {
      if (selectedChips.has('Calls') && a.type === 'call') return true;
      if (selectedChips.has('Notes') && a.type === 'note') return true;
      if (selectedChips.has('WhatsApp') && a.type === 'whatsapp') return true;
      if (selectedChips.has('Stage') && a.type === 'stage') return true;
      if (selectedChips.has('Tasks') && a.type === 'task') return true;
      return false;
    });
  };

  const activities = getFilteredActivities();

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone size={14} color="#0875F5" />;
      case 'note':
        return <FileText size={14} color="#8B5CF6" />;
      case 'stage':
        return <RefreshCw size={14} color="#10B981" />;
      case 'task':
        return <CheckCircle2 size={14} color="#F59E0B" />;
      default:
        return <FileText size={14} color="#6B7280" />;
    }
  };

  return (
    <div className="activity-section-container">
      {/* 1. Horizontal Tab Navigation */}
      <LeadTabs activeTab={activeTab} onTabChange={(t) => setActiveTab(t)} />

      {/* 2. Filter Chips */}
      <div className="filter-chips-row">
        {CHIPS.map((chip) => {
          const isSelected = selectedChips.has(chip);
          return (
            <button
              key={chip}
              type="button"
              className={`filter-chip-btn ${isSelected ? 'is-selected' : ''}`}
              onClick={() => toggleChip(chip)}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* 3. Activity Timeline Feed */}
      <div className="activity-feed-list">
        {activities.length > 0 ? (
          activities.map((act) => (
            <div key={act.id} className="activity-feed-item">
              <div className="activity-icon-badge">{renderActivityIcon(act.type)}</div>
              <div className="activity-content-box">
                <div className="activity-item-header">
                  <span className="activity-item-title">{act.title}</span>
                  <span className="activity-item-time">{act.timestamp}</span>
                </div>
                {act.description && (
                  <p className="activity-item-desc">{act.description}</p>
                )}
                {act.user && (
                  <span className="activity-item-author">By {act.user}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="activity-empty-state">
            <p>No {activeTab.toLowerCase()} recorded for this lead yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
