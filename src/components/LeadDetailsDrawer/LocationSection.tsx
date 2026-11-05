import React, { useState } from 'react';
import { MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import type { Lead } from '../../types';
import { LeadField } from './LeadField';

interface LocationSectionProps {
  lead: Lead;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ lead }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isShowMoreOpen, setIsShowMoreOpen] = useState(false);

  return (
    <div className="location-section-container">
      {/* Location Section Header */}
      <div
        className="location-section-header"
        onClick={() => setIsLocationOpen(!isLocationOpen)}
        role="button"
        tabIndex={0}
      >
        <div className="location-header-title">
          <MapPin size={14} strokeWidth={1.8} color="#6B7280" />
          <span>LOCATION</span>
        </div>
        <button
          type="button"
          className="location-collapse-btn"
          aria-label={isLocationOpen ? 'Collapse Location' : 'Expand Location'}
        >
          {isLocationOpen ? (
            <ChevronUp size={15} strokeWidth={2} color="#6B7280" />
          ) : (
            <ChevronDown size={15} strokeWidth={2} color="#6B7280" />
          )}
        </button>
      </div>

      {/* Location Card Body */}
      {isLocationOpen && (
        <div className="location-card">
          <div className="location-grid">
            {/* First Row */}
            <div className="location-cell">
              <LeadField label="COUNTRY" value={lead.country} />
            </div>
            <div className="location-cell">
              <LeadField label="STATE / PROVINCE" value={lead.state} />
            </div>
            <div className="location-cell">
              <LeadField label="CITY" value={lead.city} />
            </div>

            {/* Second Row */}
            <div className="location-cell">
              <LeadField label="STREET ADDRESS" value={lead.streetAddress} />
            </div>
            <div className="location-cell">
              <LeadField label="STREET ADDRESS LINE 2" value={lead.streetAddress2} />
            </div>
            <div className="location-cell">
              <LeadField label="POSTAL / ZIP CODE" value={lead.postalCode} />
            </div>
          </div>
        </div>
      )}

      {/* Additional Fields (Expanded by Show more) */}
      {isShowMoreOpen && (
        <div className="additional-fields-card">
          <div className="additional-fields-grid">
            <div className="location-cell">
              <LeadField label="ANNUAL REVENUE" value={lead.annualRevenue} />
            </div>
            <div className="location-cell">
              <LeadField label="INDUSTRY" value={lead.industry} />
            </div>
            <div className="location-cell">
              <LeadField label="WEBSITE" value={lead.website} />
            </div>
            <div className="location-cell">
              <LeadField label="NUMBER OF EMPLOYEES" value={lead.employees} />
            </div>
            <div className="location-cell">
              <LeadField label="TIMEZONE" value={lead.timezone} />
            </div>
            <div className="location-cell">
              <LeadField label="DESCRIPTION" value={lead.description} />
            </div>
          </div>
        </div>
      )}

      {/* Show more button */}
      <div className="show-more-wrapper">
        <button
          type="button"
          className="show-more-btn"
          onClick={() => setIsShowMoreOpen(!isShowMoreOpen)}
        >
          <span>{isShowMoreOpen ? 'Show less' : 'Show more'}</span>
          {isShowMoreOpen ? (
            <ChevronUp size={13} strokeWidth={2} color="#6B7280" />
          ) : (
            <ChevronDown size={13} strokeWidth={2} color="#6B7280" />
          )}
        </button>
      </div>
    </div>
  );
};

