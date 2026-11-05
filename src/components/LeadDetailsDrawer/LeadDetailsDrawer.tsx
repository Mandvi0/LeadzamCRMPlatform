import React, { useEffect, useRef } from 'react';
import type { Lead, StageType, TeamMember } from '../../types';
import { LeadDetailsHeader } from './LeadDetailsHeader';
import { LeadInformation } from './LeadInformation';
import { LocationSection } from './LocationSection';
import { QuickActions } from './QuickActions';
import { ActivitySection } from './ActivitySection';
import './lead-details.css';

interface LeadDetailsDrawerProps {
  isOpen: boolean;
  lead: Lead | null;
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

export const LeadDetailsDrawer: React.FC<LeadDetailsDrawerProps> = ({
  isOpen,
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
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling while drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lead) {
    return null;
  }

  return (
    <>
      {/* 1. Translucent Dark Overlay */}
      <div
        className="drawer-backdrop-overlay"
        onClick={onClose}
        aria-label="Close lead details overlay"
      />

      {/* 2. Right-side Drawer Panel */}
      <aside
        className="lead-details-drawer"
        ref={drawerRef}
        aria-modal="true"
        role="dialog"
      >
        {/* Fixed Header Row */}
        <LeadDetailsHeader
          lead={lead}
          onClose={onClose}
          onPrevLead={onPrevLead}
          onNextLead={onNextLead}
          hasPrevLead={hasPrevLead}
          hasNextLead={hasNextLead}
          onStageChange={onStageChange}
          onOwnerChange={onOwnerChange}
          onRefresh={onRefresh}
          onOpenFollowUp={onOpenFollowUp}
        />

        {/* Scrollable Drawer Body */}
        <div className="drawer-scrollable-body">
          {/* Contact Information Section */}
          <LeadInformation lead={lead} />

          {/* Location Section & Show more */}
          <LocationSection lead={lead} />

          {/* Quick Action Buttons (Call, WhatsApp, Note, To-Do, Follow-up) */}
          <QuickActions lead={lead} onOpenFollowUp={onOpenFollowUp} />

          {/* Activity Section with Tabs & Filters */}
          <ActivitySection lead={lead} />
        </div>
      </aside>
    </>
  );
};

