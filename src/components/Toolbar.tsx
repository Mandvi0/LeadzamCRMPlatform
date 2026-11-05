import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Filter,
  Columns3,
  RotateCw,
  MoreHorizontal,
  Check,
} from 'lucide-react';
import type { ColumnVisibility, StageType } from '../types';

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStageFilter: string;
  onStageFilterChange: (stage: string) => void;
  columnVisibility: ColumnVisibility;
  onToggleColumn: (col: keyof ColumnVisibility) => void;
  onRefresh: () => void;
}

const STAGE_OPTIONS: (StageType | 'All')[] = [
  'All',
  'Fresh',
  'Attempting Call',
  'Connected',
  'Interested',
  'Meeting Scheduled',
  'Won',
  'Lost',
];

const COLUMN_LABELS: { key: keyof ColumnVisibility; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'leadOwner', label: 'Lead Owner' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'stage', label: 'Stage' },
  { key: 'leadSource', label: 'Lead Source' },
  { key: 'created', label: 'Created' },
];

export const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedStageFilter,
  onStageFilterChange,
  columnVisibility,
  onToggleColumn,
  onRefresh,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isColumnsOpen, setIsColumnsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (filterRef.current && !filterRef.current.contains(target)) {
        setIsFilterOpen(false);
      }
      if (columnsRef.current && !columnsRef.current.contains(target)) {
        setIsColumnsOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleRefreshClick = () => {
    setIsRotating(true);
    onRefresh();
    setTimeout(() => setIsRotating(false), 500);
  };

  // Count active columns out of 7
  const visibleColumnCount = COLUMN_LABELS.filter((col) => columnVisibility[col.key]).length;

  return (
    <div className="table-toolbar">
      {/* Search Input Box */}
      <div className="toolbar-search-wrapper">
        <Search size={15} strokeWidth={1.8} color="#9CA3AF" className="search-icon" />
        <input
          type="text"
          className="toolbar-search-input"
          placeholder="Search name, email, company, phone or lead ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Right Control Group */}
      <div className="toolbar-actions-group">
        {/* 1. Filters Button & Dropdown */}
        <div className="dropdown-container" ref={filterRef}>
          <button
            type="button"
            className={`toolbar-btn ${isFilterOpen || selectedStageFilter !== 'All' ? 'active-btn' : ''}`}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsColumnsOpen(false);
              setIsMoreOpen(false);
            }}
            title="Filter leads"
          >
            <Filter size={14} strokeWidth={1.8} color="#4B5563" />
            <span className="btn-label">Filters</span>
            {selectedStageFilter !== 'All' && <span className="active-dot"></span>}
          </button>

          {isFilterOpen && (
            <div className="popover-menu filter-menu">
              <div className="popover-header">Filter by Stage</div>
              <div className="popover-list">
                {STAGE_OPTIONS.map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    className={`popover-item ${selectedStageFilter === stage ? 'selected' : ''}`}
                    onClick={() => {
                      onStageFilterChange(stage);
                      setIsFilterOpen(false);
                    }}
                  >
                    <span>{stage === 'All' ? 'All Stages' : stage}</span>
                    {selectedStageFilter === stage && (
                      <Check size={14} strokeWidth={2.2} color="#0875F5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="toolbar-divider" />

        {/* 2. Columns Button & Dropdown */}
        <div className="dropdown-container" ref={columnsRef}>
          <button
            type="button"
            className={`toolbar-btn ${isColumnsOpen ? 'active-btn' : ''}`}
            onClick={() => {
              setIsColumnsOpen(!isColumnsOpen);
              setIsFilterOpen(false);
              setIsMoreOpen(false);
            }}
            title="Customize columns"
          >
            <Columns3 size={14} strokeWidth={1.8} color="#4B5563" />
            <span className="btn-label">Columns</span>
            <span className="columns-count-badge">{visibleColumnCount}</span>
          </button>

          {isColumnsOpen && (
            <div className="popover-menu columns-menu">
              <div className="popover-header">Visible Columns</div>
              <div className="popover-list">
                {COLUMN_LABELS.map((col) => {
                  const isChecked = columnVisibility[col.key];
                  return (
                    <button
                      key={col.key}
                      type="button"
                      className="popover-item checkbox-item"
                      onClick={() => onToggleColumn(col.key)}
                    >
                      <span className="item-checkbox-box">
                        {isChecked && <Check size={12} strokeWidth={2.5} color="#FFFFFF" />}
                      </span>
                      <span>{col.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="toolbar-divider" />

        {/* 3. Refresh Button */}
        <button
          type="button"
          className="toolbar-btn icon-only-btn"
          onClick={handleRefreshClick}
          title="Refresh data"
        >
          <RotateCw
            size={14}
            strokeWidth={1.8}
            color="#4B5563"
            className={`refresh-icon ${isRotating ? 'spinning' : ''}`}
          />
        </button>

        <div className="toolbar-divider" />

        {/* 4. More Options Button */}
        <div className="dropdown-container" ref={moreRef}>
          <button
            type="button"
            className={`toolbar-btn icon-only-btn ${isMoreOpen ? 'active-btn' : ''}`}
            onClick={() => {
              setIsMoreOpen(!isMoreOpen);
              setIsFilterOpen(false);
              setIsColumnsOpen(false);
            }}
            title="More actions"
          >
            <MoreHorizontal size={15} strokeWidth={1.8} color="#4B5563" />
          </button>

          {isMoreOpen && (
            <div className="popover-menu more-menu">
              <button
                type="button"
                className="popover-item"
                onClick={() => {
                  alert('Exporting 8 leads to CSV...');
                  setIsMoreOpen(false);
                }}
              >
                Export Leads (CSV)
              </button>
              <button
                type="button"
                className="popover-item"
                onClick={() => {
                  alert('Bulk update dialog');
                  setIsMoreOpen(false);
                }}
              >
                Bulk Update
              </button>
              <button
                type="button"
                className="popover-item"
                onClick={() => {
                  alert('Lead table settings');
                  setIsMoreOpen(false);
                }}
              >
                Table Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
