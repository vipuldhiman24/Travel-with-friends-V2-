import React from 'react';

export default function CustomerContactInputs({
  name,
  phone,
  email,
  onChange,
  className = '',
  horizontal = false
}) {
  return (
    <div className={`w-full ${className}`}>
      <div className={`grid ${horizontal ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'} gap-3`}>
        {/* Full Name */}
        <div className="bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">person</span>
            <input
              type="text"
              name="name"
              required
              value={name || ''}
              onChange={onChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">phone</span>
            <input
              type="tel"
              name="phone"
              required
              value={phone || ''}
              onChange={onChange}
              placeholder="10-digit mobile number"
              className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Email Address (optional) */}
        {horizontal && (
          <div className="bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
              Email <span className="text-[10px] lowercase text-gray-400">(optional)</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">mail</span>
              <input
                type="email"
                name="email"
                value={email || ''}
                onChange={onChange}
                placeholder="you@email.com"
                className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
