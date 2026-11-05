import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Toolbar } from './components/Toolbar';
import { LeadsTable } from './components/LeadsTable';
import { Pagination } from './components/Pagination';
import { INITIAL_LEADS } from './data/mockLeads';
import type { Lead, SortField, SortOrder, ColumnVisibility } from './types';
import './App.css';

export function App() {
  const [activeSidebarItem, setActiveSidebarItem] = useState('All Leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('All');
  const [sortField, setSortField] = useState<SortField>('created');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    checkbox: true,
    name: true,
    leadOwner: true,
    email: true,
    phone: true,
    stage: true,
    leadSource: true,
    created: true,
  });

  // Filter leads by search query and stage
  const filteredLeads = useMemo(() => {
    return INITIAL_LEADS.filter((lead) => {
      // Stage filter
      if (selectedStageFilter !== 'All' && lead.stage !== selectedStageFilter) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = lead.name.toLowerCase().includes(query);
        const matchesEmail = lead.email.toLowerCase().includes(query);
        const matchesPhone = lead.phone.toLowerCase().includes(query);
        const matchesStage = lead.stage.toLowerCase().includes(query);
        const matchesSource = lead.leadSource.toLowerCase().includes(query);
        const matchesOwner = lead.leadOwner.toLowerCase().includes(query);

        return (
          matchesName ||
          matchesEmail ||
          matchesPhone ||
          matchesStage ||
          matchesSource ||
          matchesOwner
        );
      }

      return true;
    });
  }, [searchQuery, selectedStageFilter]);

  // Sort leads
  const sortedLeads = useMemo(() => {
    const list = [...filteredLeads];

    list.sort((a: Lead, b: Lead) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'leadOwner') {
        comparison = a.leadOwner.localeCompare(b.leadOwner);
      } else if (sortField === 'stage') {
        comparison = a.stage.localeCompare(b.stage);
      } else if (sortField === 'created') {
        comparison = a.timestamp - b.timestamp;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return list;
  }, [filteredLeads, sortField, sortOrder]);

  // Pagination slicing
  const paginatedLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedLeads.slice(startIndex, startIndex + pageSize);
  }, [sortedLeads, currentPage, pageSize]);

  const totalPages = Math.max(1, Math.ceil(sortedLeads.length / pageSize));

  // Toggle single row selection
  const handleToggleRow = (id: string) => {
    setSelectedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Toggle select all
  const handleToggleSelectAll = () => {
    if (selectedRowIds.size === paginatedLeads.length) {
      setSelectedRowIds(new Set());
    } else {
      setSelectedRowIds(new Set(paginatedLeads.map((l) => l.id)));
    }
  };

  // Handle column sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Reset/Refresh data
  const handleRefresh = () => {
    setSearchQuery('');
    setSelectedStageFilter('All');
    setSortField('created');
    setSortOrder('desc');
    setSelectedRowIds(new Set());
    setCurrentPage(1);
    setColumnVisibility({
      checkbox: true,
      name: true,
      leadOwner: true,
      email: true,
      phone: true,
      stage: true,
      leadSource: true,
      created: true,
    });
  };

  // Toggle column visibility
  const handleToggleColumn = (col: keyof ColumnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [col]: !prev[col],
    }));
  };

  return (
    <div className="app-container">
      {/* 1. Left Sidebar */}
      <Sidebar
        activeItem={activeSidebarItem}
        onSelectItem={(item) => setActiveSidebarItem(item)}
      />

      {/* 2. Main Content Layout */}
      <div className="main-content-layout">
        {/* Top Navigation */}
        <TopNav totalCount={sortedLeads.length} />

        {/* Dashboard Main Area with Card */}
        <main className="dashboard-main-area">
          <div className="dashboard-card">
            {/* Table Toolbar */}
            <Toolbar
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              selectedStageFilter={selectedStageFilter}
              onStageFilterChange={(stage) => {
                setSelectedStageFilter(stage);
                setCurrentPage(1);
              }}
              columnVisibility={columnVisibility}
              onToggleColumn={handleToggleColumn}
              onRefresh={handleRefresh}
            />

            {/* Leads Table */}
            <LeadsTable
              leads={paginatedLeads}
              selectedRowIds={selectedRowIds}
              onToggleRow={handleToggleRow}
              onToggleSelectAll={handleToggleSelectAll}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              columnVisibility={columnVisibility}
            />

            {/* Bottom Pagination */}
            <Pagination
              totalCount={sortedLeads.length}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
