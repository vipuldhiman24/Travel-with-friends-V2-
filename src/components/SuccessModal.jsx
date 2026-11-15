import React from 'react';

export default function SuccessModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#201813] rounded-3xl p-6 sm:p-8 shadow-2xl border border-primary/20 text-center transform transition-all animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 size-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-text-main hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Decorative Top Badge / Icon */}
        <div className="mx-auto mb-5 size-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-primary/20 animate-bounce">
          <span
            className="material-symbols-outlined text-[42px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48" }}
          >
            check_circle
          </span>
        </div>

        {/* Heading & Subtitle */}
        <h3 className="text-2xl sm:text-3xl font-black text-text-main dark:text-white tracking-tight mb-2">
          Thank You!
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-6">
          Our experts will reach out to you soon.
        </p>

        {/* Submitted Summary Details Box */}
        {data && (
          <div className="bg-background-light dark:bg-background-dark/80 rounded-2xl p-4 text-left border border-gray-100 dark:border-gray-800/80 mb-6 space-y-2 text-xs sm:text-sm">
            {data.name && (
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-text-muted dark:text-text-muted-dark">Customer:</span>
                <span className="font-bold text-text-main dark:text-white">{data.name}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-text-muted dark:text-text-muted-dark">Contact:</span>
                <span className="font-bold text-primary">{data.phone}</span>
              </div>
            )}
            {(data.destination || data.to) && (
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-text-muted dark:text-text-muted-dark">Destination:</span>
                <span className="font-bold text-text-main dark:text-white">{data.destination || data.to}</span>
              </div>
            )}
            {data.service && (
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-text-muted dark:text-text-muted-dark">Service:</span>
                <span className="font-semibold capitalize text-text-main dark:text-white">{data.service}</span>
              </div>
            )}
          </div>
        )}

        {/* Primary Action Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full py-3.5 px-6 rounded-2xl bg-primary hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Wonderful!
        </button>

        {/* Small reassurance footer */}
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-4 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-xs text-green-500">lock</span>
          <span>Fly With Friends · We respect your privacy &amp; time</span>
        </p>
      </div>
    </div>
  );
}
