import React, { useState, useEffect } from 'react';
import AdminLogin from './admin/AdminLogin';
import AdminDashboardOverview from './admin/AdminDashboardOverview';
import AdminLeads from './admin/AdminLeads';
import AdminPackages from './admin/AdminPackages';
import {
  getAdminSession,
  adminLogout,
  fetchLeads,
  fetchPackagesAdmin
} from '../utils/firebase';

export default function Admin() {
  const [user, setUser] = useState(() => getAdminSession());
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'leads' | 'packages'
  const [leads, setLeads] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, packagesData] = await Promise.all([
        fetchLeads(),
        fetchPackagesAdmin()
      ]);
      setLeads(leadsData);
      setPackages(packagesData);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const handleLogout = async () => {
    await adminLogout();
    setUser(null);
  };

  const handleOpenLeadDetail = (lead) => {
    setSelectedLead(lead);
    setActiveTab('leads');
  };

  if (!user) {
    return <AdminLogin onLoginSuccess={(u) => setUser(u)} />;
  }

  const unreadLeadsCount = leads.filter((l) => (l.status || 'new') === 'new').length;

  return (
    <div className="min-h-screen bg-[#140e0a] text-gray-100 flex flex-col font-display">
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1c140f] border-b border-[#35271e] px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden size-9 rounded-xl bg-[#281e17] text-gray-300 flex items-center justify-center hover:text-white"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>

          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-2.5">
            <span
              className="material-symbols-outlined text-primary text-2xl"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
            >
              flight_takeoff
            </span>
            <span className="font-black text-base sm:text-lg text-white tracking-tight">
              Fly With Friends
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
              Admin
            </span>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          {/* View Live Website Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#281e17] hover:bg-[#34271e] text-gray-300 hover:text-white text-xs font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            <span>View Live Site</span>
          </a>

          {/* User Email Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#241a13] border border-[#35271e] text-xs">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-300 font-semibold">{user.email || 'admin@flywithfriends.com'}</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Sign out of admin"
            className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-bold border border-red-800/40 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a120d] border-r border-[#32241b] p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between md:hidden">
              <span className="text-sm font-bold text-white">Menu Navigation</span>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-3">
                Main Menu
              </span>

              {/* Overview Tab */}
              <button
                onClick={() => {
                  setActiveTab('overview');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-primary text-white shadow-lg shadow-orange-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-[#251b14]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">dashboard</span>
                  <span>Dashboard</span>
                </div>
              </button>

              {/* Leads Tab */}
              <button
                onClick={() => {
                  setActiveTab('leads');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'leads'
                    ? 'bg-primary text-white shadow-lg shadow-orange-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-[#251b14]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">inbox</span>
                  <span>Customer Leads</span>
                </div>
                {unreadLeadsCount > 0 && (
                  <span className="size-5 rounded-full bg-amber-500 text-black text-[10px] font-black flex items-center justify-center">
                    {unreadLeadsCount}
                  </span>
                )}
              </button>

              {/* Trip Packages Tab */}
              <button
                onClick={() => {
                  setActiveTab('packages');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-primary text-white shadow-lg shadow-orange-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-[#251b14]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl">luggage</span>
                  <span>Trip Packages</span>
                </div>
                <span className="text-[11px] font-bold text-gray-500">
                  {packages.length}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Support / Version Footer */}
          <div className="pt-4 border-t border-[#32241b] text-xs text-gray-500 space-y-2">
            <div className="flex items-center justify-between">
              <span>Firebase ID:</span>
              <span className="font-mono text-[10px] text-gray-400">flywithfriends-c5164</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Status:</span>
              <span className="text-[10px] font-bold text-green-400 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-green-500" />
                Online
              </span>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-x-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <span className="animate-spin material-symbols-outlined text-4xl text-primary mb-3">
                sync
              </span>
              <p className="text-sm font-bold text-gray-300">Loading Dashboard Data from Firestore...</p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <AdminDashboardOverview
                  leads={leads}
                  packages={packages}
                  onNavigateTab={setActiveTab}
                  onOpenLeadDetail={handleOpenLeadDetail}
                />
              )}

              {activeTab === 'leads' && (
                <AdminLeads
                  leads={leads}
                  onRefresh={loadData}
                  selectedLead={selectedLead}
                  setSelectedLead={setSelectedLead}
                />
              )}

              {activeTab === 'packages' && (
                <AdminPackages
                  packages={packages}
                  onRefresh={loadData}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
