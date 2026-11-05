import React from 'react';
import {
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  GripVertical,
  UserPlus,
  FileText,
  Sparkles,
  Check,
} from 'lucide-react';
import type { Lead, SortField, SortOrder, ColumnVisibility } from '../types';

interface LeadsTableProps {
  leads: Lead[];
  selectedRowIds: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleSelectAll: () => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  columnVisibility: ColumnVisibility;
  onSelectLead: (lead: Lead) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  selectedRowIds,
  onToggleRow,
  onToggleSelectAll,
  sortField,
  sortOrder,
  onSort,
  columnVisibility,
  onSelectLead,
}) => {
  const isAllSelected = leads.length > 0 && selectedRowIds.size === leads.length;

  const renderSortArrow = (field: SortField) => {
    if (sortField === field) {
      return sortOrder === 'desc' ? (
        <ArrowDown size={12} strokeWidth={2.2} color="#0875F5" />
      ) : (
        <ArrowUp size={12} strokeWidth={2.2} color="#0875F5" />
      );
    }
    return <ArrowUpDown size={11} strokeWidth={1.8} color="#9CA3AF" />;
  };

  const getStageBadgeClass = (stage: string) => {
    switch (stage) {
      case 'Fresh':
        return 'badge-fresh';
      case 'Attempting Call':
        return 'badge-attempting-call';
      case 'Connected':
        return 'badge-connected';
      case 'Interested':
        return 'badge-interested';
      case 'Meeting Scheduled':
        return 'badge-meeting-scheduled';
      case 'Won':
        return 'badge-won';
      case 'Lost':
        return 'badge-lost';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className="leads-table-container">
      <table className="leads-table">
        <colgroup>
          {columnVisibility.checkbox && <col style={{ width: '42px', minWidth: '42px' }} />}
          {columnVisibility.name && <col style={{ width: '199px', minWidth: '180px' }} />}
          {columnVisibility.leadOwner && <col style={{ width: '178px', minWidth: '160px' }} />}
          {columnVisibility.email && <col style={{ width: '230px', minWidth: '200px' }} />}
          {columnVisibility.phone && <col style={{ width: '156px', minWidth: '140px' }} />}
          {columnVisibility.stage && <col style={{ width: '184px', minWidth: '160px' }} />}
          {columnVisibility.leadSource && <col style={{ width: '166px', minWidth: '150px' }} />}
          {columnVisibility.created && <col style={{ minWidth: '220px' }} />}
        </colgroup>

        {/* Table Header */}
        <thead>
          <tr className="table-header-row">
            {/* Checkbox Column */}
            {columnVisibility.checkbox && (
              <th className="th-cell th-checkbox">
                <button
                  type="button"
                  className={`custom-checkbox ${isAllSelected ? 'checked' : ''}`}
                  onClick={onToggleSelectAll}
                  aria-label="Select all rows"
                >
                  {isAllSelected && <Check size={11} strokeWidth={3} color="#FFFFFF" />}
                </button>
              </th>
            )}

            {/* Name Column */}
            {columnVisibility.name && (
              <th className="th-cell th-name" onClick={() => onSort('name')}>
                <div className="th-content">
                  <span className={sortField === 'name' ? 'th-text active-sort-text' : 'th-text'}>
                    Name
                  </span>
                  {renderSortArrow('name')}
                </div>
              </th>
            )}

            {/* Lead Owner Column */}
            {columnVisibility.leadOwner && (
              <th className="th-cell th-lead-owner" onClick={() => onSort('leadOwner')}>
                <div className="th-content">
                  <span className={sortField === 'leadOwner' ? 'th-text active-sort-text' : 'th-text'}>
                    Lead Owner
                  </span>
                  {renderSortArrow('leadOwner')}
                </div>
              </th>
            )}

            {/* Email Column */}
            {columnVisibility.email && (
              <th className="th-cell th-email">
                <div className="th-content">
                  <span className="th-text">Email</span>
                </div>
              </th>
            )}

            {/* Phone Column */}
            {columnVisibility.phone && (
              <th className="th-cell th-phone">
                <div className="th-content">
                  <span className="th-text">Phone</span>
                </div>
              </th>
            )}

            {/* Stage Column */}
            {columnVisibility.stage && (
              <th className="th-cell th-stage" onClick={() => onSort('stage')}>
                <div className="th-content">
                  <span className={sortField === 'stage' ? 'th-text active-sort-text' : 'th-text'}>
                    Stage
                  </span>
                  {renderSortArrow('stage')}
                </div>
              </th>
            )}

            {/* Lead Source Column */}
            {columnVisibility.leadSource && (
              <th className="th-cell th-lead-source">
                <div className="th-content">
                  <span className="th-text">Lead Source</span>
                </div>
              </th>
            )}

            {/* Created Column (Highlighted in blue with downward arrow and grip handle) */}
            {columnVisibility.created && (
              <th
                className={`th-cell th-created ${sortField === 'created' ? 'active-column' : ''}`}
                onClick={() => onSort('created')}
              >
                <div className="th-created-wrapper">
                  <div className="th-content">
                    <span className="th-created-text">Created</span>
                    {renderSortArrow('created')}
                  </div>
                  <div className="th-grip-handle" title="Reorder column">
                    <GripVertical size={13} strokeWidth={1.8} color="#D1D5DB" />
                  </div>
                </div>
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body - exactly eight rows */}
        <tbody>
          {leads.map((lead, index) => {
            const isSelected = selectedRowIds.has(lead.id);
            // In reference, row 0 has the subtle light blue background tint
            const isRowHighlighted = index === 0 || isSelected;

            return (
              <tr
                key={lead.id}
                className={`table-body-row ${isRowHighlighted ? 'row-highlighted' : ''}`}
                onClick={() => onSelectLead(lead)}
              >
                {/* 1. Checkbox */}
                {columnVisibility.checkbox && (
                  <td
                    className="td-cell td-checkbox"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRow(lead.id);
                    }}
                  >
                    <button
                      type="button"
                      className={`custom-checkbox ${isSelected ? 'checked' : ''}`}
                      aria-label={`Select ${lead.name}`}
                    >
                      {isSelected && <Check size={11} strokeWidth={3} color="#FFFFFF" />}
                    </button>
                  </td>
                )}

                {/* 2. Name with SAMPLE badge */}
                {columnVisibility.name && (
                  <td className="td-cell td-name">
                    <div className="name-cell-content">
                      <span
                        className="lead-name-text"
                        title={lead.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLead(lead);
                        }}
                      >
                        {lead.displayName || lead.name}
                      </span>
                      <span className="sample-badge">
                        <Sparkles size={10} strokeWidth={2} color="#64748B" />
                        <span>SAMPLE</span>
                      </span>
                    </div>
                  </td>
                )}

                {/* 3. Lead Owner */}
                {columnVisibility.leadOwner && (
                  <td className="td-cell td-lead-owner">
                    {lead.leadOwner !== 'Unassigned' ? (
                      <div className="lead-owner-assigned">
                        <span className="table-owner-avatar">
                          {lead.leadOwnerInitials || lead.leadOwner.substring(0, 2).toUpperCase()}
                        </span>
                        <span className="owner-assigned-name">{lead.leadOwner}</span>
                      </div>
                    ) : (
                      <div className="lead-owner-content">
                        <UserPlus size={14} strokeWidth={1.6} color="#9CA3AF" />
                        <span className="unassigned-text">{lead.leadOwner}</span>
                      </div>
                    )}
                  </td>
                )}

                {/* 4. Email */}
                {columnVisibility.email && (
                  <td className="td-cell td-email">
                    <span className="email-text" title={lead.email}>
                      {lead.email}
                    </span>
                  </td>
                )}

                {/* 5. Phone */}
                {columnVisibility.phone && (
                  <td className="td-cell td-phone">
                    <span className="phone-text">{lead.phone}</span>
                  </td>
                )}

                {/* 6. Stage Pill Badge */}
                {columnVisibility.stage && (
                  <td className="td-cell td-stage">
                    <span className={`stage-pill ${getStageBadgeClass(lead.stage)}`}>
                      <span className="stage-dot"></span>
                      <span className="stage-label">{lead.stage}</span>
                    </span>
                  </td>
                )}

                {/* 7. Lead Source */}
                {columnVisibility.leadSource && (
                  <td className="td-cell td-lead-source">
                    <div className="lead-source-content">
                      <FileText size={14} strokeWidth={1.6} color="#9CA3AF" />
                      <span className="source-text">{lead.leadSource}</span>
                    </div>
                  </td>
                )}

                {/* 8. Created */}
                {columnVisibility.created && (
                  <td className="td-cell td-created">
                    <div className="created-cell-content">
                      <span className="created-date">{lead.createdDate}</span>
                      <span className="created-time"> · {lead.createdTime}</span>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Empty table area matching reference screenshot */}
      <div className="table-empty-space"></div>
    </div>
  );
};
