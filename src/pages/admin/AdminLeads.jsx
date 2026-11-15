import React, { useState, useMemo } from 'react';
import { updateLeadStatus, deleteLead } from '../../utils/firebase';

export default function AdminLeads({ leads = [], onRefresh, selectedLead, setSelectedLead }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Status options
  const statusOptions = ['new', 'contacted', 'interested', 'converted', 'closed'];

  // Source options
  const sourceOptions = [
    { label: 'All Sources', value: 'all' },
    { label: 'Flights', value: 'flights' },
    { label: 'Hotels', value: 'hotels' },
    { label: 'Bus', value: 'bus' },
    { label: 'Visa', value: 'visa' },
    { label: 'Packages', value: 'trippackages' },
    { label: 'Custom Planner', value: 'home' },
  ];

  // Search & Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Status filter
      if (statusFilter !== 'all' && (lead.status || 'new') !== statusFilter) {
        return false;
      }

      // Source filter
      if (sourceFilter !== 'all') {
        const src = (lead.sourcePage || lead.enquiryType || '').toLowerCase();
        if (!src.includes(sourceFilter)) return false;
      }

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = (lead.name || '').toLowerCase().includes(q);
        const matchPhone = (lead.phone || '').toLowerCase().includes(q);
        const matchEmail = (lead.email || '').toLowerCase().includes(q);
        const matchDest = (lead.destination || lead.to || lead.packageTitle || '').toLowerCase().includes(q);
        const matchSource = (lead.sourcePage || lead.enquiryType || '').toLowerCase().includes(q);
        return matchName || matchPhone || matchEmail || matchDest || matchSource;
      }

      return true;
    });
  }, [leads, search, statusFilter, sourceFilter]);

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingId(leadId);
    await updateLeadStatus(leadId, newStatus);
    setUpdatingId(null);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({ ...prev, status: newStatus }));
    }
    onRefresh();
  };

  const handleDelete = async (leadId) => {
    await deleteLead(leadId);
    setConfirmDeleteId(null);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(null);
    }
    onRefresh();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'converted':
        return 'bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'contacted':
        return 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'interested':
        return 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'closed':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
      case 'new':
      default:
        return 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
  };

  const getWhatsAppLink = (lead) => {
    const rawPhone = (lead.phone || '').replace(/\D/g, '');
    const cleanPhone = rawPhone.length === 10 ? '91' + rawPhone : rawPhone;
    const greeting = `Hello ${lead.name || 'there'}! 👋\nThis is Fly With Friends regarding your enquiry for *${lead.destination || lead.to || lead.packageTitle || lead.enquiryType || 'travel services'}*.\n\nWe would love to share exclusive deals and assist with your booking. Are you available for a quick chat?`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Leads Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Every customer enquiry submitted across all pages of the website.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="px-3.5 py-2 rounded-xl bg-surface-light dark:bg-[#2a1f18] border border-gray-200 dark:border-[#3e2e23] hover:border-primary text-gray-700 dark:text-gray-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1f1712] rounded-2xl p-4 border border-gray-100 dark:border-[#3a2d24] shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name, phone, destination, or service..."
            className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-semibold text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', ...statusOptions].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-[#2a1f18] text-gray-600 dark:text-gray-400 hover:text-primary'
              }`}
            >
              {st} {st !== 'all' ? `(${leads.filter((l) => (l.status || 'new') === st).length})` : `(${leads.length})`}
            </button>
          ))}
        </div>

        {/* Source Filter Dropdown */}
        <div>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="w-full md:w-auto bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 text-xs font-bold text-text-main dark:text-white focus:outline-none focus:border-primary cursor-pointer"
          >
            {sourceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="bg-white dark:bg-[#1f1712] rounded-2xl border border-gray-100 dark:border-[#3a2d24] shadow-sm overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="p-16 text-center text-gray-400">
            <span className="material-symbols-outlined text-5xl text-gray-300 dark:text-gray-600 mb-2">
              filter_alt_off
            </span>
            <p className="text-base font-bold text-gray-800 dark:text-gray-200">No matching leads found</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              {search || statusFilter !== 'all' || sourceFilter !== 'all'
                ? 'Try clearing your search or filters to see all customer enquiries.'
                : 'Enquiries submitted via Drop Your Number will appear here in real-time.'}
            </p>
            {(search || statusFilter !== 'all' || sourceFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setStatusFilter('all');
                  setSourceFilter('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 dark:bg-[#251c16] text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-[#3a2d24]">
                <tr>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Source Page</th>
                  <th className="py-3.5 px-4">Requested Service / Trip</th>
                  <th className="py-3.5 px-4">Submitted At</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2e231c]">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50/70 dark:hover:bg-[#261d17] transition-colors cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-gray-900 dark:text-white">
                        {lead.name || 'Anonymous Customer'}
                      </div>
                      <div className="text-xs text-primary font-bold flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-xs">phone</span>
                        <span>{lead.phone || 'No phone'}</span>
                      </div>
                      {lead.email && (
                        <div className="text-[11px] text-gray-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px]">mail</span>
                          <span>{lead.email}</span>
                        </div>
                      )}
                    </td>

                    {/* Source */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-primary/10 text-primary border border-primary/20">
                        {lead.sourcePage || lead.enquiryType || 'Web Form'}
                      </span>
                    </td>

                    {/* Requested Service */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-800 dark:text-gray-200">
                        {lead.destination || lead.to || lead.packageTitle || 'General Enquiry'}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {lead.travelDate ? `Date: ${lead.travelDate}` : lead.departureDate ? `Dep: ${lead.departureDate}` : ''}
                        {(lead.travelers || lead.passengers || lead.guests) ? ` · ${lead.travelers || lead.passengers || lead.guests} Pax` : ''}
                      </div>
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-4 text-xs text-gray-400 whitespace-nowrap">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Recent'}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status || 'new'}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-[11px] font-extrabold capitalize px-2.5 py-1 rounded-full border cursor-pointer ${getStatusBadge(lead.status || 'new')}`}
                      >
                        {statusOptions.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Call */}
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            title="Call customer"
                            className="size-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">call</span>
                          </a>
                        )}

                        {/* WhatsApp */}
                        {lead.phone && (
                          <a
                            href={getWhatsAppLink(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp customer"
                            className="size-8 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">chat</span>
                          </a>
                        )}

                        {/* Open Complete Details */}
                        <button
                          onClick={() => setSelectedLead(lead)}
                          title="View all submitted fields"
                          className="size-8 rounded-lg bg-gray-100 dark:bg-[#2a1f18] text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setConfirmDeleteId(lead.id)}
                          title="Delete lead"
                          className="size-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-500 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Complete Lead Details Modal (Full Payload Inspection) */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1f1712] rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-[#3a2d24] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-[#3a2d24]">
              <div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                  {selectedLead.sourcePage || selectedLead.enquiryType || 'Public Form'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-2">
                  {selectedLead.name || 'Anonymous Customer'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Lead ID: <span className="font-mono text-gray-500">{selectedLead.id}</span> · Submitted on{' '}
                  {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString('en-IN') : 'Recent'}
                </p>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="size-9 rounded-full bg-gray-100 dark:bg-[#2a1f18] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Quick Contact & Status Bar */}
            <div className="py-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-[#3a2d24]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400">Current Status:</span>
                <select
                  value={selectedLead.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className={`text-xs font-bold capitalize px-3 py-1 rounded-full border cursor-pointer ${getStatusBadge(selectedLead.status || 'new')}`}
                >
                  {statusOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                {selectedLead.phone && (
                  <>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <span className="material-symbols-outlined text-sm">call</span>
                      <span>Call ({selectedLead.phone})</span>
                    </a>
                    <a
                      href={getWhatsAppLink(selectedLead)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5 shadow"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      <span>Send WhatsApp</span>
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Complete Submitted Original Fields Grid */}
            <div className="py-5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                Complete Form Payload (All Original Fields)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(selectedLead)
                  .filter(([key]) => !['id', 'status', 'createdAt', 'updatedAt'].includes(key))
                  .map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-[#251c16] border border-gray-100 dark:border-[#34271e]"
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-extrabold text-gray-900 dark:text-white break-words">
                        {typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val || '—')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-100 dark:border-[#3a2d24] flex items-center justify-between">
              <button
                onClick={() => setConfirmDeleteId(selectedLead.id)}
                className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                <span>Delete Lead</span>
              </button>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-[#2a1f18] text-gray-800 dark:text-gray-200 text-xs font-bold hover:bg-gray-300 dark:hover:bg-[#34271e] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#1f1712] rounded-3xl p-6 text-center border border-gray-200 dark:border-[#3a2d24] shadow-2xl">
            <div className="size-14 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 mx-auto flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">delete_forever</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Customer Lead?</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              This will permanently delete this enquiry from Firestore. This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
