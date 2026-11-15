import React, { useState, useMemo } from 'react';
import { createPackage, updatePackage, deletePackage } from '../../utils/firebase';

const EMPTY_PACKAGE = {
  id: '',
  title: '',
  location: '',
  image: '/assets/packages/manali.jpg',
  price: 'Starting from ₹4,999 per person',
  duration: '3 Nights / 4 Days',
  badge: '⭐ Popular Tour',
  group: '2 – 10 People',
  shortDesc: '',
  showOnHome: false,
  status: 'published',
  sortOrder: 0,
  itinerary: [
    { day: 'Day 1', heading: 'Arrival & Welcome', description: 'Arrive at destination, hotel check-in and evening leisure.' },
    { day: 'Day 2', heading: 'Sightseeing & Exploration', description: 'Full day sightseeing tour visiting key attractions and scenic spots.' },
    { day: 'Day 3', heading: 'Departure', description: 'Morning breakfast, check out and onward journey transfer.' }
  ]
};

export default function AdminPackages({ packages = [], onRefresh }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'published' | 'draft'
  const [homeFilter, setHomeFilter] = useState('all'); // 'all' | 'featured' | 'not-featured'
  const [editingPkg, setEditingPkg] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Count homepage featured packages
  const featuredCount = useMemo(() => {
    return packages.filter((p) => p.showOnHome).length;
  }, [packages]);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      // Status filter
      if (statusFilter !== 'all' && (pkg.status || 'published') !== statusFilter) {
        return false;
      }

      // Home filter
      if (homeFilter === 'featured' && !pkg.showOnHome) return false;
      if (homeFilter === 'not-featured' && pkg.showOnHome) return false;

      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = (pkg.title || '').toLowerCase().includes(q);
        const matchLoc = (pkg.location || '').toLowerCase().includes(q);
        return matchTitle || matchLoc;
      }

      return true;
    });
  }, [packages, search, statusFilter, homeFilter]);

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingPkg({
      ...EMPTY_PACKAGE,
      id: String(Date.now()),
      showOnHome: featuredCount < 4
    });
  };

  const handleOpenEdit = (pkg) => {
    setIsNew(false);
    setEditingPkg({
      ...pkg,
      itinerary: pkg.itinerary && pkg.itinerary.length > 0 ? [...pkg.itinerary] : [...EMPTY_PACKAGE.itinerary]
    });
  };

  const handleFormChange = (field, val) => {
    setEditingPkg((prev) => ({ ...prev, [field]: val }));
  };

  // Itinerary handlers
  const handleAddItineraryDay = () => {
    setEditingPkg((prev) => {
      const nextDayNum = (prev.itinerary?.length || 0) + 1;
      return {
        ...prev,
        itinerary: [
          ...(prev.itinerary || []),
          {
            day: `Day ${nextDayNum}`,
            heading: `Day ${nextDayNum} Exploration`,
            description: 'Scheduled activities and scenic travel.'
          }
        ]
      };
    });
  };

  const handleRemoveItineraryDay = (index) => {
    setEditingPkg((prev) => {
      const updated = prev.itinerary.filter((_, idx) => idx !== index);
      return { ...prev, itinerary: updated };
    });
  };

  const handleItineraryChange = (index, field, value) => {
    setEditingPkg((prev) => {
      const updated = [...prev.itinerary];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, itinerary: updated };
    });
  };

  // Toggle homepage feature directly from table
  const handleToggleHomeDirect = async (pkg) => {
    const nextState = !pkg.showOnHome;
    if (nextState && featuredCount >= 4) {
      alert('Maximum 4 packages can be shown on the homepage. Please deselect another package first.');
      return;
    }
    await updatePackage(pkg.id, { showOnHome: nextState });
    onRefresh();
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    if (!editingPkg.title.trim() || !editingPkg.location.trim() || !editingPkg.price.trim()) {
      alert('Please fill title, location, and price.');
      return;
    }

    // Check homepage limit
    if (editingPkg.showOnHome) {
      const currentlyFeaturedExcludingThis = packages.filter(
        (p) => p.showOnHome && String(p.id) !== String(editingPkg.id)
      ).length;
      if (currentlyFeaturedExcludingThis >= 4) {
        alert('Maximum 4 packages can be selected for the homepage. Please deselect another package first.');
        return;
      }
    }

    setSaving(true);
    if (isNew) {
      await createPackage(editingPkg);
    } else {
      await updatePackage(editingPkg.id, editingPkg);
    }
    setSaving(false);
    setEditingPkg(null);
    onRefresh();
  };

  const handleDeletePackage = async (pkgId) => {
    await deletePackage(pkgId);
    setConfirmDeleteId(null);
    onRefresh();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Trip Packages Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Create, update, and manage travel packages with live homepage controls.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenNew}
            className="px-4 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Add New Package</span>
          </button>
          <button
            onClick={onRefresh}
            className="px-3.5 py-2.5 rounded-xl bg-surface-light dark:bg-[#2a1f18] border border-gray-200 dark:border-[#3e2e23] hover:border-primary text-gray-700 dark:text-gray-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Notice Banner: Homepage 4 Max Rule */}
      <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-base">star</span>
          </span>
          <div className="text-xs">
            <span className="font-bold text-gray-900 dark:text-white">Homepage Featured Selection: </span>
            <span className="text-gray-600 dark:text-gray-300">
              {featuredCount} of 4 featured slots currently selected. Only published and selected packages appear on the homepage.
            </span>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-black ${featuredCount === 4 ? 'bg-orange-200 text-orange-800' : 'bg-primary text-white'}`}>
          {featuredCount} / 4 Slots
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1f1712] rounded-2xl p-4 border border-gray-100 dark:border-[#3a2d24] shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by package title or destination..."
            className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-semibold text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 text-xs font-bold text-text-main dark:text-white focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* Home Featured Filter */}
          <select
            value={homeFilter}
            onChange={(e) => setHomeFilter(e.target.value)}
            className="bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 text-xs font-bold text-text-main dark:text-white focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">All Packages</option>
            <option value="featured">On Homepage</option>
            <option value="not-featured">Not on Homepage</option>
          </select>
        </div>
      </div>

      {/* Packages Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPackages.map((pkg) => {
          const isAtLimit = featuredCount >= 4 && !pkg.showOnHome;

          return (
            <div
              key={pkg.id}
              className="bg-white dark:bg-[#1f1712] rounded-3xl overflow-hidden border border-gray-100 dark:border-[#3a2d24] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Image banner with badges */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/packages/vaishno-devi.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md ${
                    pkg.status === 'draft' ? 'bg-yellow-500/80 text-black' : 'bg-green-600/80 text-white'
                  }`}>
                    {pkg.status || 'published'}
                  </span>

                  {pkg.badge && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {/* Bottom title & location in image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-xs text-orange-200 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>{pkg.location}</span>
                  </p>
                  <h3 className="text-lg font-black leading-snug line-clamp-1">{pkg.title}</h3>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                      <span>{pkg.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">groups</span>
                      <span>{pkg.group || '2 – 10 Pax'}</span>
                    </span>
                    <span className="font-extrabold text-primary text-sm">{pkg.price}</span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                    {pkg.shortDesc || 'Comprehensive holiday itinerary.'}
                  </p>

                  <div className="text-[11px] text-gray-400">
                    <span>Itinerary: </span>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      {pkg.itinerary?.length || 0} Days planned
                    </span>
                  </div>
                </div>

                {/* Homepage Selection Checkbox & Actions */}
                <div className="pt-4 border-t border-gray-100 dark:border-[#3a2d24] flex items-center justify-between">
                  {/* Homepage Checkbox */}
                  <label
                    title={isAtLimit ? 'Maximum 4 packages on homepage. Deselect another package first.' : ''}
                    className={`flex items-center gap-2 cursor-pointer text-xs font-bold ${
                      isAtLimit ? 'opacity-40 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(pkg.showOnHome)}
                      disabled={isAtLimit}
                      onChange={() => handleToggleHomeDirect(pkg)}
                      className="size-4 text-primary focus:ring-primary rounded cursor-pointer"
                    />
                    <span>Show on Homepage</span>
                    {pkg.showOnHome && (
                      <span className="size-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </label>

                  {/* Edit / Delete Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(pkg)}
                      className="px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(pkg.id)}
                      className="size-8 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-500 hover:bg-red-600 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Create / Edit Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-[#1f1712] rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-[#3a2d24] max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100 dark:border-[#3a2d24]">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {isNew ? 'Create New Package' : 'Edit Travel Package'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Package ID: <span className="font-mono text-primary font-bold">{editingPkg.id}</span>
                </p>
              </div>
              <button
                onClick={() => setEditingPkg(null)}
                className="size-9 rounded-full bg-gray-100 dark:bg-[#2a1f18] text-gray-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="py-5 space-y-5 text-xs sm:text-sm">
              {/* Title & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Package Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPkg.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder="E.g. Scenic Manali Escape – 3 Nights / 4 Days"
                    className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 font-semibold text-text-main dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Destination Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPkg.location}
                    onChange={(e) => handleFormChange('location', e.target.value)}
                    placeholder="E.g. Manali, Himachal Pradesh, India"
                    className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 font-semibold text-text-main dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Price, Duration, Group Size, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Price String <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPkg.price}
                    onChange={(e) => handleFormChange('price', e.target.value)}
                    placeholder="Starting from ₹4,999"
                    className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 font-semibold text-text-main dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editingPkg.duration}
                    onChange={(e) => handleFormChange('duration', e.target.value)}
                    placeholder="3 Nights / 4 Days"
                    className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 font-semibold text-text-main dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Group Size
                  </label>
                  <input
                    type="text"
                    value={editingPkg.group}
                    onChange={(e) => handleFormChange('group', e.target.value)}
                    placeholder="2 – 10 People"
                    className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 font-semibold text-text-main dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Highlight Badge
                  </label>
                  <input
                    type="text"
                    value={editingPkg.badge}
                    onChange={(e) => handleFormChange('badge', e.target.value)}
                    placeholder="🔥 Best Seller"
                    className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 font-semibold text-text-main dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Image URL with Required Hint (Part B3) and Live Preview */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#251c16] border border-gray-200 dark:border-[#34271e] space-y-3">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-200">
                  Package Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingPkg.image}
                  onChange={(e) => handleFormChange('image', e.target.value)}
                  placeholder="https://images.unsplash.com/... or /assets/packages/..."
                  className="w-full bg-white dark:bg-[#1a130e] border border-gray-200 dark:border-[#44352b] rounded-xl py-2.5 px-3 font-semibold text-text-main dark:text-white focus:outline-none focus:border-primary"
                />

                {/* Instructional hint as requested in requirement B3 */}
                <div className="flex items-start gap-2 text-xs text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/50">
                  <span className="material-symbols-outlined text-sm mt-0.5">info</span>
                  <span>
                    Paste a direct, publicly accessible image URL. The link must point to an image that can be displayed on a website.
                  </span>
                </div>

                {/* Live Image Preview */}
                <div className="flex items-center gap-4 pt-1">
                  <div className="size-20 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-200 shrink-0">
                    <img
                      src={editingPkg.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/packages/vaishno-devi.jpg';
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-bold text-gray-700 dark:text-gray-300 block">Live Preview</span>
                    <span>Valid image previews immediately. Local presets (`/assets/packages/...`) work automatically.</span>
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows="2"
                  value={editingPkg.shortDesc}
                  onChange={(e) => handleFormChange('shortDesc', e.target.value)}
                  placeholder="Summary of the holiday tour experience..."
                  className="w-full bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2.5 px-3 font-medium text-text-main dark:text-white focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Dynamic Itinerary Days Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200">
                      Trip Itinerary ({editingPkg.itinerary?.length || 0} Days)
                    </h3>
                    <p className="text-[11px] text-gray-400">Add or remove days dynamically</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Add Itinerary Day</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {editingPkg.itinerary?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-[#251c16] border border-gray-200 dark:border-[#34271e] space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={item.day}
                          onChange={(e) => handleItineraryChange(idx, 'day', e.target.value)}
                          placeholder="Day 1"
                          className="w-24 bg-white dark:bg-[#1a130e] border border-gray-200 dark:border-gray-700 rounded-lg py-1 px-2 text-xs font-bold text-primary"
                        />
                        <input
                          type="text"
                          value={item.heading}
                          onChange={(e) => handleItineraryChange(idx, 'heading', e.target.value)}
                          placeholder="Day heading..."
                          className="flex-1 bg-white dark:bg-[#1a130e] border border-gray-200 dark:border-gray-700 rounded-lg py-1 px-2 text-xs font-semibold text-text-main dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryDay(idx)}
                          title="Remove day"
                          className="size-7 rounded-lg text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                      <textarea
                        rows="2"
                        value={item.description}
                        onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)}
                        placeholder="Detailed itinerary description..."
                        className="w-full bg-white dark:bg-[#1a130e] border border-gray-200 dark:border-gray-700 rounded-lg py-1 px-2 text-xs text-gray-700 dark:text-gray-300 resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Homepage Featured Selection */}
              <div className="pt-3 border-t border-gray-100 dark:border-[#3a2d24] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 mb-1">Publish Status</label>
                    <select
                      value={editingPkg.status || 'published'}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                      className="bg-background-light dark:bg-background-dark/70 border border-gray-200 dark:border-[#3a2d24] rounded-xl py-2 px-3 text-xs font-bold text-text-main dark:text-white"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  {/* Homepage Checkbox with Max 4 Rule */}
                  <div className="pt-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800 dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={Boolean(editingPkg.showOnHome)}
                        onChange={(e) => handleFormChange('showOnHome', e.target.checked)}
                        className="size-4 text-primary focus:ring-primary rounded cursor-pointer"
                      />
                      <span>Show on Homepage (Max 4 slots)</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingPkg(null)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <span className="animate-spin material-symbols-outlined text-sm">sync</span>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-sm">save</span>
                        <span>Save Package</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
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
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Package?</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              This will remove the package from Firestore and the public website.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePackage(confirmDeleteId)}
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
