import React from 'react';
import { Phone, FileText, CheckSquare, Calendar } from 'lucide-react';
import type { Lead } from '../../types';

interface QuickActionsProps {
  lead: Lead;
  onOpenFollowUp?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ lead, onOpenFollowUp }) => {
  return (
    <div className="quick-actions-bar">
      {/* 1. Call */}
      <button
        type="button"
        className="quick-action-btn"
        onClick={() => alert(`Initiating call to ${lead.name} (${lead.phone})`)}
        title="Call"
      >
        <Phone size={15} strokeWidth={2} color="#0875F5" />
        <span>Call</span>
      </button>

      {/* 2. WhatsApp */}
      <button
        type="button"
        className="quick-action-btn"
        onClick={() => alert(`Opening WhatsApp chat with ${lead.name}`)}
        title="WhatsApp"
      >
        {/* WhatsApp Icon */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0875F5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>WhatsApp</span>
      </button>

      {/* 3. Note */}
      <button
        type="button"
        className="quick-action-btn"
        onClick={() => alert(`Add note for ${lead.name}`)}
        title="Note"
      >
        <FileText size={15} strokeWidth={2} color="#0875F5" />
        <span>Note</span>
      </button>

      {/* 4. To-Do */}
      <button
        type="button"
        className="quick-action-btn"
        onClick={() => alert(`Create to-do task for ${lead.name}`)}
        title="To-Do"
      >
        <CheckSquare size={15} strokeWidth={2} color="#0875F5" />
        <span>To-Do</span>
      </button>

      {/* 5. Follow-up */}
      <button
        type="button"
        className="quick-action-btn"
        onClick={onOpenFollowUp}
        title="Follow-up"
      >
        <Calendar size={15} strokeWidth={2} color="#0875F5" />
        <span>Follow-up</span>
      </button>
    </div>
  );
};

