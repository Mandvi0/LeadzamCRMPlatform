import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle2,
  CalendarCheck,
  RefreshCw,
  Check,
} from 'lucide-react';
import type { Lead } from '../../types';
import './schedule-followup.css';

export interface FollowUpRep {
  id: string;
  name: string;
  initials: string;
  role: string;
  badge?: string;
  scheduledCount: number;
  avatarColor: string;
}

export const FOLLOW_UP_REPS: FollowUpRep[] = [
  {
    id: 'rep-1',
    name: 'Mandvi Bhardwaj',
    initials: 'MB',
    role: 'Sales Director',
    badge: 'Assigned',
    scheduledCount: 14,
    avatarColor: '#0875F5',
  },
  {
    id: 'rep-2',
    name: 'Ishu Bhardwaj',
    initials: 'IB',
    role: 'Senior Account Executive',
    scheduledCount: 8,
    avatarColor: '#0875F5',
  },
  {
    id: 'rep-3',
    name: 'Harsh Mishra',
    initials: 'HM',
    role: 'Solutions Architect',
    scheduledCount: 5,
    avatarColor: '#8B5CF6',
  },
  {
    id: 'rep-4',
    name: 'Sarah Connor',
    initials: 'SC',
    role: 'Growth Lead',
    scheduledCount: 11,
    avatarColor: '#10B981',
  },
];

interface ScheduleFollowUpModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSchedule: (details: {
    rep: FollowUpRep;
    date: string;
    time: string;
    note: string;
    sendReminder: boolean;
  }) => void;
}

interface PresetOption {
  id: string;
  label: string;
  timeLabel: string;
  dateValue: string;
  timeValue: string;
}

const PRESET_OPTIONS: PresetOption[] = [
  {
    id: '1h',
    label: 'In 1 hour',
    timeLabel: '11:30 AM',
    dateValue: 'Today, Oct 24, 2026',
    timeValue: '11:30 AM',
  },
  {
    id: '3h',
    label: 'In 3 hours',
    timeLabel: '01:30 PM',
    dateValue: 'Today, Oct 24, 2026',
    timeValue: '01:30 PM',
  },
  {
    id: 'tomorrow',
    label: 'Tomorrow',
    timeLabel: '09:00 AM',
    dateValue: 'Tomorrow, Oct 25, 2026',
    timeValue: '09:00 AM',
  },
];

export const ScheduleFollowUpModal: React.FC<ScheduleFollowUpModalProps> = ({
  isOpen,
  lead,
  onClose,
  onSchedule,
}) => {
  const [selectedRep, setSelectedRep] = useState<FollowUpRep>(FOLLOW_UP_REPS[0]);
  const [isRepDropdownOpen, setIsRepDropdownOpen] = useState(false);

  const [selectedPreset, setSelectedPreset] = useState<string>('tomorrow');
  const [followUpDate, setFollowUpDate] = useState<string>('Tomorrow, Oct 25, 2026');
  const [followUpTime, setFollowUpTime] = useState<string>('09:00 AM');
  const [reminderNote, setReminderNote] = useState<string>('');
  const [sendReminder, setSendReminder] = useState<boolean>(true);

  const repDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (repDropdownRef.current && !repDropdownRef.current.contains(e.target as Node)) {
        setIsRepDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keyboard navigation & escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lead) {
    return null;
  }

  const handlePresetSelect = (preset: PresetOption) => {
    setSelectedPreset(preset.id);
    setFollowUpDate(preset.dateValue);
    setFollowUpTime(preset.timeValue);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      rep: selectedRep,
      date: followUpDate,
      time: followUpTime,
      note: reminderNote,
      sendReminder,
    });
  };

  return (
    <div
      className="followup-modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="followup-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================
            1. TOP HEADER
           ========================================= */}
        <div className="followup-modal-header">
          <div className="followup-header-title-row">
            <div className="followup-header-title-left">
              <h2 className="followup-modal-title">Schedule follow-up</h2>
              <span className="followup-stage-badge">
                <span className="followup-stage-dot" />
                <span>{lead.stage} Lead</span>
              </span>
            </div>
            <button
              type="button"
              className="followup-modal-close-btn"
              onClick={onClose}
              title="Close (Esc)"
            >
              <X size={18} strokeWidth={2} color="#4B5563" />
            </button>
          </div>

          <div className="followup-header-subtitle">
            <span className="subtitle-prefix">Lead:</span>
            <span className="subtitle-lead-name">{lead.name}</span>
            <span className="subtitle-bullet">•</span>
            <span className="subtitle-intent">High Intent Lead</span>
          </div>
        </div>

        {/* =========================================
            2. MODAL BODY (SCROLLABLE)
           ========================================= */}
        <form className="followup-modal-body" onSubmit={handleFormSubmit}>
          {/* Section 1: Assign Lead Owner */}
          <div className="followup-section">
            <div className="followup-section-header">
              <span className="section-title">Assign Lead Owner</span>
              <span className="section-subtext">Responsible rep</span>
            </div>
            <p className="section-description">
              Assign or reassign team member responsible for this follow-up
            </p>

            {/* Rep Card / Dropdown Trigger */}
            <div className="rep-dropdown-container" ref={repDropdownRef}>
              <div
                className="assigned-rep-card"
                onClick={() => setIsRepDropdownOpen(!isRepDropdownOpen)}
                role="button"
                tabIndex={0}
              >
                <div className="assigned-rep-left">
                  <div
                    className="rep-avatar"
                    style={{ backgroundColor: selectedRep.avatarColor }}
                  >
                    {selectedRep.initials}
                  </div>
                  <div className="rep-info">
                    <div className="rep-name-row">
                      <span className="rep-name">{selectedRep.name}</span>
                      {selectedRep.badge && (
                        <span className="rep-assigned-badge">{selectedRep.badge}</span>
                      )}
                    </div>
                    <span className="rep-details">
                      {selectedRep.role} • {selectedRep.scheduledCount} follow-ups scheduled
                    </span>
                  </div>
                </div>
                <ChevronDown size={17} strokeWidth={2} color="#6B7280" />
              </div>

              {/* Rep Dropdown Menu */}
              {isRepDropdownOpen && (
                <div className="rep-dropdown-menu">
                  {FOLLOW_UP_REPS.map((rep) => (
                    <div
                      key={rep.id}
                      className={`rep-dropdown-item ${selectedRep.id === rep.id ? 'is-selected' : ''}`}
                      onClick={() => {
                        setSelectedRep(rep);
                        setIsRepDropdownOpen(false);
                      }}
                    >
                      <div className="rep-item-left">
                        <div
                          className="rep-avatar small-avatar"
                          style={{ backgroundColor: rep.avatarColor }}
                        >
                          {rep.initials}
                        </div>
                        <div className="rep-item-info">
                          <span className="rep-item-name">{rep.name}</span>
                          <span className="rep-item-role">{rep.role}</span>
                        </div>
                      </div>
                      {selectedRep.id === rep.id && (
                        <Check size={16} strokeWidth={2.4} color="#0875F5" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Quick Scheduling Presets */}
          <div className="followup-section">
            <h3 className="section-title">Quick scheduling presets</h3>
            <div className="presets-grid">
              {PRESET_OPTIONS.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                return (
                  <div
                    key={preset.id}
                    className={`preset-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handlePresetSelect(preset)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="preset-card-content">
                      <span className="preset-label">{preset.label}</span>
                      <span className="preset-time">{preset.timeLabel}</span>
                    </div>
                    {isSelected && (
                      <div className="preset-check-icon">
                        <CheckCircle2 size={16} strokeWidth={2.2} color="#0875F5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Follow-up Date and Time Inputs */}
          <div className="datetime-row">
            {/* Follow-up Date */}
            <div className="datetime-field date-field">
              <label className="field-label">Follow-up Date</label>
              <div className="input-box">
                <Calendar size={16} strokeWidth={1.8} color="#6B7280" />
                <input
                  type="text"
                  className="field-text-input"
                  value={followUpDate}
                  onChange={(e) => {
                    setFollowUpDate(e.target.value);
                    setSelectedPreset('');
                  }}
                />
              </div>
            </div>

            {/* Time */}
            <div className="datetime-field time-field">
              <label className="field-label">Time</label>
              <div className="input-box">
                <Clock size={16} strokeWidth={1.8} color="#6B7280" />
                <input
                  type="text"
                  className="field-text-input"
                  value={followUpTime}
                  onChange={(e) => {
                    setFollowUpTime(e.target.value);
                    setSelectedPreset('');
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Reminder Note (Optional) */}
          <div className="followup-section">
            <div className="followup-section-header">
              <label className="field-label" htmlFor="reminder-note-input">
                Reminder note (optional)
              </label>
              <span className="section-subtext">Shared in lead timeline</span>
            </div>
            <textarea
              id="reminder-note-input"
              className="note-textarea"
              placeholder="e.g. Follow up regarding Meta ad inquiry on enterprise CAPI integration package..."
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              rows={3}
            />
          </div>

          {/* Section 5: Notification Checkbox Banner */}
          <div
            className="notification-banner"
            onClick={() => setSendReminder(!sendReminder)}
            role="button"
            tabIndex={0}
          >
            <div className="notification-left">
              <div className={`custom-modal-checkbox ${sendReminder ? 'checked' : ''}`}>
                {sendReminder && <Check size={12} strokeWidth={3} color="#FFFFFF" />}
              </div>
              <span className="notification-text">
                Send reminder via WhatsApp & Email notification
              </span>
            </div>

            {/* Notification device / action icon */}
            <div className="notification-icon-box">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0875F5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
          </div>

          {/* =========================================
              3. MODAL FOOTER
             ========================================= */}
          <div className="followup-modal-footer">
            <div className="footer-sync-info">
              <RefreshCw size={15} strokeWidth={2} color="#6B7280" className="sync-icon" />
              <div className="sync-text-lines">
                <span>Syncs directly to Google Calendar &</span>
                <span>WhatsApp bot queue</span>
              </div>
            </div>

            <div className="footer-action-buttons">
              <button
                type="button"
                className="footer-cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="footer-submit-btn"
              >
                <CalendarCheck size={16} strokeWidth={2} color="#FFFFFF" />
                <span>Schedule follow-up</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

