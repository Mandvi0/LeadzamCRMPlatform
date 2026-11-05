import React from 'react';

interface LeadFieldProps {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
  hideEmpty?: boolean;
}

export const LeadField: React.FC<LeadFieldProps> = ({
  label,
  value,
  icon,
  hideEmpty = false,
}) => {
  const displayValue = value && value.trim() !== '' ? value : '—';
  const isEmpty = displayValue === '—';

  if (hideEmpty && isEmpty) {
    return null;
  }

  return (
    <div className={`lead-field-item ${isEmpty ? 'is-empty' : ''}`}>
      <div className="lead-field-label">
        {icon && <span className="field-label-icon">{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="lead-field-value">{displayValue}</div>
    </div>
  );
};

