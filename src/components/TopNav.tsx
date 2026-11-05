import React from 'react';
import {
  Home,
  ChevronRight,
  ChevronDown,
  Compass,
  Moon,
  Clock,
  Bell,
} from 'lucide-react';

interface TopNavProps {
  totalCount: number;
}

export const TopNav: React.FC<TopNavProps> = ({ totalCount }) => {
  return (
    <header className="top-nav">
      {/* Left Breadcrumb Section */}
      <div className="top-nav-left">
        <button type="button" className="nav-icon-btn home-btn" title="Home">
          <Home size={15} strokeWidth={1.8} color="#4B5563" />
        </button>
        <ChevronRight size={13} strokeWidth={1.6} color="#9CA3AF" className="breadcrumb-separator" />
        <div className="breadcrumb-current">
          <span className="breadcrumb-title">All Leads</span>
          <span className="lead-count-badge">{totalCount}</span>
          <ChevronDown size={13} strokeWidth={1.8} color="#6B7280" className="breadcrumb-chevron" />
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="top-nav-right">
        {/* Complete Setup Pill */}
        <button type="button" className="complete-setup-btn" title="Complete Setup (0/22 completed)">
          <div className="setup-icon-box">
            <Compass size={13} strokeWidth={2.2} color="#0875F5" />
          </div>
          <span className="setup-text">Complete setup</span>
          <div className="setup-progress-bar">
            <div className="setup-progress-fill" style={{ width: '0%' }}></div>
          </div>
          <span className="setup-count">0/22</span>
        </button>

        {/* Action Icons */}
        <div className="top-nav-actions">
          <button type="button" className="nav-icon-btn" title="Toggle theme">
            <Moon size={16} strokeWidth={1.8} color="#4B5563" />
          </button>
          <button type="button" className="nav-icon-btn" title="Recent activities">
            <Clock size={16} strokeWidth={1.8} color="#4B5563" />
          </button>
          <button type="button" className="nav-icon-btn" title="Notifications">
            <Bell size={16} strokeWidth={1.8} color="#4B5563" />
          </button>
        </div>
      </div>
    </header>
  );
};

