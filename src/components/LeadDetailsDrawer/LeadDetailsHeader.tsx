import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  RotateCw,
  GitMerge,
  Trash2,
  Sparkles,
  Plus,
  Clock,
  ChevronDown,
  Check,
  Link2,
} from 'lucide-react';
import type { Lead, StageType, TeamMember } from '../../types';
import { TEAM_MEMBERS } from '../../data/mockLeads';

interface LeadDetailsHeaderProps {
  lead: Lead;
  onClose: () => void;
  onPrevLead: () => void;
  onNextLead: () => void;
  hasPrevLead: boolean;
  hasNextLead: boolean;
  onStageChange: (stage: StageType) => void;
  onOwnerChange: (owner: TeamMember) => void;
  onRefresh: () => void;
  onOpenFollowUp?: () => void;
}

const STAGE_OPTIONS: StageType[] = [
  'Fresh',
  'Attempting Call',
  'Connected',
  'Interested',
  'Meeting Scheduled',
  'Won',
  'Lost',
];

export const LeadDetailsHeader: React.FC<LeadDetailsHeaderProps> = ({
  lead,
  onClose,
  onPrevLead,
  onNextLead,
  hasPrevLead,
  hasNextLead,
  onStageChange,
  onOwnerChange,
  onRefresh,
  onOpenFollowUp,
}) => {
  const [isStageOpen, setIsStageOpen] = useState(false);
  const [isOwnerOpen, setIsOwnerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const ownerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (stageRef.current && !stageRef.current.contains(target)) {
        setIsStageOpen(false);
      }
      if (ownerRef.current && !ownerRef.current.contains(target)) {
        setIsOwnerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const getStageBadgeClass = (stage: StageType) => {
    switch (stage) {
      case 'Fresh':
        return 'drawer-stage-fresh';
      case 'Attempting Call':
      case 'Connected':
      case 'Interested':
      case 'Meeting Scheduled':
        return 'drawer-stage-purple';
      case 'Won':
        return 'drawer-stage-won';
      case 'Lost':
        return 'drawer-stage-lost';
      default:
        return 'drawer-stage-fresh';
    }
  };

  const currentInitials = lead.leadOwnerInitials || (lead.leadOwner === 'Unassigned' ? '' : lead.leadOwner.substring(0, 2).toUpperCase());

  return (
    <div className="drawer-header-container">
      {/* 1. First Toolbar Row */}
      <div className="drawer-top-toolbar">
        <div className="drawer-top-toolbar-left">
          {/* Close button */}
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            title="Close (Esc)"
          >
            <X size={16} strokeWidth={2} color="#64748B" />
          </button>

          <div className="drawer-toolbar-divider" />

          {/* Prev / Next buttons */}
          <div className="drawer-nav-group">
            <button
              type="button"
              className="drawer-nav-arrow-btn"
              disabled={!hasPrevLead}
              onClick={onPrevLead}
              title="Previous lead"
            >
              &lt; Prev
            </button>
            <button
              type="button"
              className="drawer-nav-arrow-btn"
              disabled={!hasNextLead}
              onClick={onNextLead}
              title="Next lead"
            >
              Next &gt;
            </button>
          </div>

          {/* SAMPLE Badge */}
          <div className="sample-badge drawer-sample-badge">
            <Sparkles size={10} strokeWidth={2} color="#64748B" />
            <span>SAMPLE</span>
          </div>
        </div>

        {/* Toolbar Actions Right */}
        <div className="drawer-top-toolbar-right">
          <button
            type="button"
            className="drawer-action-text-btn"
            onClick={handleRefreshClick}
            title="Refresh lead details"
          >
            <RotateCw
              size={13}
              strokeWidth={1.8}
              color="#64748B"
              className={isRefreshing ? 'spinning' : ''}
            />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="drawer-action-text-btn"
            onClick={() => alert('Opening Smart Form...')}
            title="Smart form"
          >
            <Link2 size={13} strokeWidth={1.8} color="#64748B" />
            <span>Smart form</span>
          </button>

          <button
            type="button"
            className="drawer-action-text-btn"
            onClick={() => alert('Merge leads dialog...')}
            title="Merge lead"
          >
            <GitMerge size={13} strokeWidth={1.8} color="#64748B" />
            <span>Merge</span>
          </button>

          <button
            type="button"
            className="drawer-action-text-btn"
            onClick={() => {
              if (confirm(`Are you sure you want to delete lead ${lead.name}?`)) {
                onClose();
              }
            }}
            title="Delete lead"
          >
            <Trash2 size={13} strokeWidth={1.8} color="#64748B" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* 2. Second Header Row */}
      <div className="drawer-title-row">
        {/* Left: Lead Name & Subtitle */}
        <div className="drawer-title-left">
          <h1 className="drawer-lead-name">{lead.name}</h1>
          <div className="drawer-subtitle-row">
            <button
              type="button"
              className="drawer-followup-pill-btn"
              onClick={onOpenFollowUp}
              title="Add follow-up"
            >
              <Plus size={12} strokeWidth={2.4} color="#374151" />
              <span>Follow-up</span>
            </button>
            <div className="drawer-last-activity">
              <Clock size={12} strokeWidth={1.8} color="#6B7280" />
              <span>{lead.lastActivity || '30m ago'}</span>
            </div>
          </div>
        </div>

        {/* Right: Stage & Owner dropdowns */}
        <div className="drawer-title-right">
          {/* Stage Dropdown */}
          <div className="drawer-dropdown-wrapper" ref={stageRef}>
            <button
              type="button"
              className={`drawer-stage-dropdown-btn ${getStageBadgeClass(lead.stage)}`}
              onClick={() => {
                setIsStageOpen(!isStageOpen);
                setIsOwnerOpen(false);
              }}
              title="Change Stage"
            >
              <span className="stage-dot" />
              <span className="drawer-dropdown-label">{lead.stage}</span>
              <ChevronDown size={13} strokeWidth={2} />
            </button>

            {isStageOpen && (
              <div className="drawer-popover-menu">
                <div className="drawer-popover-title">Update Stage</div>
                {STAGE_OPTIONS.map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`drawer-popover-item ${lead.stage === st ? 'is-selected' : ''}`}
                    onClick={() => {
                      onStageChange(st);
                      setIsStageOpen(false);
                    }}
                  >
                    <div className="drawer-popover-item-content">
                      <span className={`stage-pill ${st === 'Fresh' ? 'badge-fresh' : st === 'Won' ? 'badge-won' : st === 'Lost' ? 'badge-lost' : 'badge-connected'}`}>
                        <span className="stage-dot" />
                        <span>{st}</span>
                      </span>
                    </div>
                    {lead.stage === st && <Check size={14} strokeWidth={2.2} color="#0875F5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Owner Dropdown */}
          <div className="drawer-dropdown-wrapper" ref={ownerRef}>
            <button
              type="button"
              className="drawer-owner-dropdown-btn"
              onClick={() => {
                setIsOwnerOpen(!isOwnerOpen);
                setIsStageOpen(false);
              }}
              title="Change Lead Owner"
            >
              {currentInitials ? (
                <span className="drawer-owner-avatar">{currentInitials}</span>
              ) : (
                <span className="drawer-owner-avatar unassigned-avatar">?</span>
              )}
              <span className="drawer-owner-name">{lead.leadOwner}</span>
              <ChevronDown size={13} strokeWidth={1.8} color="#6B7280" />
            </button>

            {isOwnerOpen && (
              <div className="drawer-popover-menu">
                <div className="drawer-popover-title">Assign Lead Owner</div>
                {TEAM_MEMBERS.map((tm) => (
                  <button
                    key={tm.id}
                    type="button"
                    className={`drawer-popover-item ${lead.leadOwner === tm.name ? 'is-selected' : ''}`}
                    onClick={() => {
                      onOwnerChange(tm);
                      setIsOwnerOpen(false);
                    }}
                  >
                    <div className="drawer-popover-item-content">
                      {tm.initials ? (
                        <span
                          className="drawer-owner-avatar"
                          style={{ backgroundColor: tm.color }}
                        >
                          {tm.initials}
                        </span>
                      ) : (
                        <span className="drawer-owner-avatar unassigned-avatar">?</span>
                      )}
                      <span>{tm.name}</span>
                    </div>
                    {lead.leadOwner === tm.name && (
                      <Check size={14} strokeWidth={2.2} color="#0875F5" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

