import React, { useState } from 'react';
import { Type, Tag, EyeOff, Eye } from 'lucide-react';
import type { Lead } from '../../types';
import { LeadField } from './LeadField';

interface LeadInformationProps {
  lead: Lead;
}

export const LeadInformation: React.FC<LeadInformationProps> = ({ lead }) => {
  const [hideEmpty, setHideEmpty] = useState(false);

  // Extract national phone number by removing +91 or +country code for display
  const rawPhone = lead.phone.replace(/^\+\d+\s*/, '');
  const countryCode = lead.countryCode || 'IN';

  return (
    <div className="lead-info-card">
      <div className="contact-info-grid">
        {/* Row 1 - Column 1: Phone */}
        <div className="contact-info-cell">
          <div className="phone-display-wrapper">
            <span className="country-code-badge">{countryCode}</span>
            <span className="phone-number-text">{rawPhone || lead.phone}</span>
          </div>
        </div>

        {/* Row 1 - Column 2: Empty placeholder */}
        <div className="contact-info-cell">
          <span className="empty-dash-text">—</span>
        </div>

        {/* Row 1 - Column 3: Email */}
        <div className="contact-info-cell email-info-cell">
          <span className="email-value-text">{lead.email}</span>
        </div>

        {/* Row 2 - Column 1: Company */}
        <div className="contact-info-cell">
          <LeadField
            label="COMPANY"
            value={lead.company}
            icon={<Type size={11} strokeWidth={2.2} color="#9CA3AF" />}
            hideEmpty={hideEmpty}
          />
        </div>

        {/* Row 2 - Column 2: Job Title */}
        <div className="contact-info-cell">
          <LeadField
            label="JOB TITLE"
            value={lead.jobTitle}
            icon={<Type size={11} strokeWidth={2.2} color="#9CA3AF" />}
            hideEmpty={hideEmpty}
          />
        </div>

        {/* Row 2 - Column 3: Lead Source */}
        <div className="contact-info-cell">
          <LeadField
            label="LEAD SOURCE"
            value={lead.leadSource}
            icon={<Tag size={11} strokeWidth={2.2} color="#9CA3AF" />}
            hideEmpty={hideEmpty}
          />
        </div>
      </div>

      {/* Hide empty toggle control */}
      <div className="hide-empty-wrapper">
        <button
          type="button"
          className={`hide-empty-btn ${hideEmpty ? 'active' : ''}`}
          onClick={() => setHideEmpty(!hideEmpty)}
        >
          {hideEmpty ? (
            <>
              <Eye size={13} strokeWidth={1.8} color="#6B7280" />
              <span>Show empty</span>
            </>
          ) : (
            <>
              <EyeOff size={13} strokeWidth={1.8} color="#6B7280" />
              <span>Hide empty</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

