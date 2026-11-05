import React from 'react';
import {
  Plus,
  Users,
  CalendarCheck,
  Phone,
  BarChart2,
  Layers,
  Settings,
  MoreHorizontal,
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onSelectItem: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onSelectItem }) => {
  return (
    <aside className="sidebar">
      {/* Top Logo */}
      <div className="sidebar-logo-container">
        <svg
          className="crm-logo"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main bold checkmark */}
          <path
            d="M5 14L10.5 19.5L23 6"
            stroke="#0875F5"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Secondary wing */}
          <path
            d="M16 6H23V13"
            stroke="#0875F5"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {/* 1. Add Lead Button */}
        <button
          type="button"
          className="sidebar-add-btn"
          onClick={() => onSelectItem('Add Lead')}
          title="Add Lead"
        >
          <div className="add-lead-icon-box">
            <Plus size={19} strokeWidth={2.6} color="#FFFFFF" />
          </div>
          <span className="sidebar-label">Add Lead</span>
        </button>

        {/* 2. Dashboard */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'Dashboard' ? 'active' : ''}`}
          onClick={() => onSelectItem('Dashboard')}
          title="Dashboard"
        >
          <div className="nav-icon-container">
            {/* Speedometer / Gauge Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21a9 9 0 1 1 9-9c0 1.2-.2 2.3-.7 3.3" />
              <path d="M12 12l5-5" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <span className="sidebar-label">Dashboard</span>
        </button>

        {/* 3. All Leads (Active by default) */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'All Leads' ? 'active' : ''}`}
          onClick={() => onSelectItem('All Leads')}
          title="All Leads"
        >
          <div className="nav-icon-container active-pill">
            <Users size={18} strokeWidth={2.2} color="#FFFFFF" />
          </div>
          <span className="sidebar-label active-label">All Leads</span>
        </button>

        {/* 4. Follow-ups */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'Follow-ups' ? 'active' : ''}`}
          onClick={() => onSelectItem('Follow-ups')}
          title="Follow-ups"
        >
          <div className="nav-icon-container">
            <CalendarCheck size={20} strokeWidth={1.8} />
          </div>
          <span className="sidebar-label">Follow-ups</span>
        </button>

        {/* 5. Calls */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'Calls' ? 'active' : ''}`}
          onClick={() => onSelectItem('Calls')}
          title="Calls"
        >
          <div className="nav-icon-container">
            <Phone size={20} strokeWidth={1.8} />
          </div>
          <span className="sidebar-label">Calls</span>
        </button>

        {/* 6. WhatsApp */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'WhatsApp' ? 'active' : ''}`}
          onClick={() => onSelectItem('WhatsApp')}
          title="WhatsApp"
        >
          <div className="nav-icon-container">
            {/* WhatsApp Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              <path
                d="M9.5 9.5c.3-.5.7-.5 1-.2l1.2 1.2c.3.3.3.7 0 1-.3.3-.3.7 0 1 .4.4 1 1 1.4 1.4.3.3.7.3 1 0 .3-.3.7-.3 1 0l1.2 1.2c.3.3.3.7-.2 1-.5.3-1.3.4-2.1-.1-1.2-.7-2.6-2.1-3.3-3.3-.5-.8-.4-1.6-.1-2.1z"
                strokeWidth="1.2"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="sidebar-label">WhatsApp</span>
        </button>

        {/* 7. Reports */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'Reports' ? 'active' : ''}`}
          onClick={() => onSelectItem('Reports')}
          title="Reports"
        >
          <div className="nav-icon-container">
            <BarChart2 size={20} strokeWidth={1.8} />
          </div>
          <span className="sidebar-label">Reports</span>
        </button>

        {/* 8. Lead Sources */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'Lead Sources' ? 'active' : ''}`}
          onClick={() => onSelectItem('Lead Sources')}
          title="Lead Sources"
        >
          <div className="nav-icon-container">
            <Layers size={20} strokeWidth={1.8} />
          </div>
          <span className="sidebar-label">Lead Sources</span>
        </button>

        {/* 9. Automations */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'Automations' ? 'active' : ''}`}
          onClick={() => onSelectItem('Automations')}
          title="Automations"
        >
          <div className="nav-icon-container">
            {/* Connected workflow nodes icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="5" r="2.5" />
              <circle cx="6" cy="18" r="2.5" />
              <circle cx="18" cy="18" r="2.5" />
              <path d="M12 7.5V13M12 13H6v2.5M12 13h6v2.5" />
            </svg>
          </div>
          <span className="sidebar-label">Automations</span>
        </button>

        {/* 10. Settings */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'Settings' ? 'active' : ''}`}
          onClick={() => onSelectItem('Settings')}
          title="Settings"
        >
          <div className="nav-icon-container">
            <Settings size={20} strokeWidth={1.8} />
          </div>
          <span className="sidebar-label">Settings</span>
        </button>

        {/* 11. More */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeItem === 'More' ? 'active' : ''}`}
          onClick={() => onSelectItem('More')}
          title="More"
        >
          <div className="nav-icon-container">
            <MoreHorizontal size={20} strokeWidth={1.8} />
          </div>
          <span className="sidebar-label">More</span>
        </button>
      </nav>

      {/* Bottom User Avatar */}
      <div className="sidebar-bottom">
        <div className="user-avatar" title="User: IS">
          IS
        </div>
      </div>
    </aside>
  );
};
