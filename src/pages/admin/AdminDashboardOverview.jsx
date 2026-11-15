import React from 'react';

export default function AdminDashboardOverview({
  leads = [],
  packages = [],
  onNavigateTab,
  onOpenLeadDetail
}) {
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => (l.status || 'new') === 'new').length;
  const contactedLeads = leads.filter((l) => l.status === 'contacted').length;
  const convertedLeads = leads.filter((l) => l.status === 'converted').length;

  const totalPackages = packages.length;
  const homepagePackages = packages.filter((p) => p.showOnHome).length;
  const publishedPackages = packages.filter((p) => p.status === 'published').length;

  // Source breakdown counts
  const sourceStats = {
    Flights: leads.filter((l) => (l.sourcePage || l.enquiryType || '').toLowerCase().includes('flight')).length,
    Hotels: leads.filter((l) => (l.sourcePage || l.enquiryType || '').toLowerCase().includes('hotel')).length,
    Bus: leads.filter((l) => (l.sourcePage || l.enquiryType || '').toLowerCase().includes('bus')).length,
    Visa: leads.filter((l) => (l.sourcePage || l.enquiryType || '').toLowerCase().includes('visa')).length,
    Packages: leads.filter((l) => (l.sourcePage || l.enquiryType || '').toLowerCase().includes('package') || (l.sourcePage || '').includes('Trips')).length,
    Custom: leads.filter((l) => (l.sourcePage || l.enquiryType || '').toLowerCase().includes('custom') || l.sourcePage === 'Home').length,
  };

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Real-time business performance and incoming customer enquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('leads')}
            className="px-4 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">inbox</span>
            <span>View All Leads ({totalLeads})</span>
          </button>
          <button
            onClick={() => onNavigateTab('packages')}
            className="px-4 py-2.5 rounded-xl bg-surface-light dark:bg-[#2a1f18] border border-gray-200 dark:border-[#3e2e23] hover:border-primary text-gray-800 dark:text-gray-200 font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">luggage</span>
            <span>Manage Packages</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid (Live Firestore Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Leads */}
        <div className="bg-white dark:bg-[#1f1712] rounded-2xl p-6 border border-gray-100 dark:border-[#3a2d24] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Leads</span>
            <div className="size-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">mark_email_unread</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">{totalLeads}</span>
            <span className="text-xs text-gray-400">enquiries</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span className="size-2 rounded-full bg-blue-500" />
            <span>Across all website forms</span>
          </p>
        </div>

        {/* New Uncontacted Leads */}
        <div className="bg-white dark:bg-[#1f1712] rounded-2xl p-6 border border-gray-100 dark:border-[#3a2d24] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">New Leads</span>
            <div className="size-11 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">notifications_active</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">{newLeads}</span>
            <span className="text-xs text-gray-400">pending response</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span className="size-2 rounded-full bg-amber-500" />
            <span>Requires customer follow-up</span>
          </p>
        </div>

        {/* Total Packages */}
        <div className="bg-white dark:bg-[#1f1712] rounded-2xl p-6 border border-gray-100 dark:border-[#3a2d24] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Packages</span>
            <div className="size-11 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">explore</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">{totalPackages}</span>
            <span className="text-xs text-gray-400">({publishedPackages} published)</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span className="size-2 rounded-full bg-purple-500" />
            <span>Itineraries in database</span>
          </p>
        </div>

        {/* Homepage Featured Packages */}
        <div className="bg-white dark:bg-[#1f1712] rounded-2xl p-6 border border-gray-100 dark:border-[#3a2d24] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Home Featured</span>
            <div className="size-11 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">star</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-primary">{homepagePackages} / 4</span>
            <span className="text-xs text-gray-400">slots filled</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <span className="size-2 rounded-full bg-primary" />
            <span>Live on public homepage</span>
          </p>
        </div>
      </div>

      {/* Breakdown by Service & Enquiry Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enquiry Sources Breakdown */}
        <div className="bg-white dark:bg-[#1f1712] rounded-2xl p-6 border border-gray-100 dark:border-[#3a2d24] shadow-sm">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">pie_chart</span>
            <span>Leads by Service</span>
          </h2>
          <div className="space-y-3">
            {Object.entries(sourceStats).map(([service, count]) => {
              const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
              return (
                <div key={service} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
                    <span>{service}</span>
                    <span>{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Status Pipeline */}
        <div className="bg-white dark:bg-[#1f1712] rounded-2xl p-6 border border-gray-100 dark:border-[#3a2d24] shadow-sm">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">bar_chart</span>
            <span>Lead Status Pipeline</span>
          </h2>
          <div className="space-y-3 text-xs font-medium">
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">
              <span className="flex items-center gap-2 font-bold">
                <span className="size-2.5 rounded-full bg-blue-500" />
                New Enquiries
              </span>
              <span className="font-black text-sm">{newLeads}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300">
              <span className="flex items-center gap-2 font-bold">
                <span className="size-2.5 rounded-full bg-amber-500" />
                Contacted
              </span>
              <span className="font-black text-sm">{contactedLeads}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300">
              <span className="flex items-center gap-2 font-bold">
                <span className="size-2.5 rounded-full bg-green-500" />
                Converted (Booked)
              </span>
              <span className="font-black text-sm">{convertedLeads}</span>
            </div>
          </div>
        </div>

        {/* Quick Contact & Business Card */}
        <div className="bg-gradient-to-br from-primary/10 via-[#1f1712] to-[#1f1712] rounded-2xl p-6 border border-primary/20 shadow-sm flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
              Official Helpline
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3">
              Direct Contact Desk
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              All enquiries are pre-configured to reach this WhatsApp &amp; voice number.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-white/60 dark:bg-black/30 border border-primary/20">
              <p className="text-xs text-gray-400 font-semibold">Registered Number:</p>
              <p className="text-lg font-black text-primary">+91 88517 22264</p>
              <p className="text-[11px] text-gray-400 mt-1">Email: flywithfriends06@gmail.com</p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-2">
            <a
              href="https://wa.me/918851722264"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Test
            </a>
            <a
              href="tel:+918851722264"
              className="py-2 px-3 rounded-xl border border-primary text-primary font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              Test Call
            </a>
          </div>
        </div>
      </div>

      {/* Recent Leads Quick Table */}
      <div className="bg-white dark:bg-[#1f1712] rounded-2xl border border-gray-100 dark:border-[#3a2d24] shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-[#3a2d24] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Customer Leads</h2>
            <p className="text-xs text-gray-400 mt-0.5">Showing the latest incoming enquiries</p>
          </div>
          <button
            onClick={() => onNavigateTab('leads')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({totalLeads})</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600 mb-2">inbox</span>
            <p className="text-sm font-semibold">No enquiries submitted yet.</p>
            <p className="text-xs text-gray-400 mt-1">Submit an enquiry from any public page to see it here live.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 dark:bg-[#251c16] text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-[#3a2d24]">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Service / Source</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-[#2e231c]">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 dark:hover:bg-[#261d17] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900 dark:text-white">{lead.name || 'Anonymous Traveler'}</div>
                      <div className="text-xs text-primary font-semibold">{lead.phone || 'No phone'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary">
                        {lead.sourcePage || lead.enquiryType || 'Web'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 font-medium">
                      {lead.destination || lead.to || lead.packageTitle || 'General Enquiry'}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Recent'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                        lead.status === 'converted' ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400' :
                        lead.status === 'contacted' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400' :
                        lead.status === 'interested' ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400' :
                        'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                      }`}>
                        {lead.status || 'new'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onOpenLeadDetail(lead)}
                        className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Inspect Full Enquiry
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
