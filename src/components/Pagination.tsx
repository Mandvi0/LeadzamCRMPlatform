import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  const pageSizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (pageSizeRef.current && !pageSizeRef.current.contains(event.target as Node)) {
        setIsPageSizeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const startRecord = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  return (
    <footer className="pagination-bar">
      {/* Left: Record Range */}
      <div className="pagination-left">
        <span className="showing-text">
          Showing <span className="font-medium">{startRecord}–{endRecord}</span> of{' '}
          <span className="font-medium">{totalCount}</span> leads
        </span>
      </div>

      {/* Center: Pagination Controls */}
      <div className="pagination-center">
        <button
          type="button"
          className="page-nav-btn prev-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Previous page"
        >
          &lt; Prev
        </button>

        <div className="page-indicator">
          <span className="page-text">Page</span>
          <span className="page-box">{currentPage}</span>
          <span className="page-text">of {totalPages}</span>
        </div>

        <button
          type="button"
          className="page-nav-btn next-btn"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title="Next page"
        >
          Next &gt;
        </button>
      </div>

      {/* Right: Rows per page */}
      <div className="pagination-right">
        <span className="rows-label">Rows per page</span>
        <div className="rows-dropdown-container" ref={pageSizeRef}>
          <button
            type="button"
            className="rows-select-btn"
            onClick={() => setIsPageSizeOpen(!isPageSizeOpen)}
            title="Select rows per page"
          >
            <span>{pageSize}</span>
            <ChevronDown size={14} strokeWidth={1.8} color="#6B7280" />
          </button>

          {isPageSizeOpen && (
            <div className="rows-options-menu">
              {PAGE_SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`rows-option-item ${pageSize === size ? 'selected' : ''}`}
                  onClick={() => {
                    onPageSizeChange(size);
                    setIsPageSizeOpen(false);
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
