import React from 'react';
import { PHONE_NUMBER, DISPLAY_PHONE_NUMBER } from '../utils/whatsapp';

export default function EnquiryActionButtons({
  isValid,
  isSubmitting = false,
  validationMessage = '',
  onWhatsApp,
  onDropNumber,
  whatsAppLabel = 'Send Enquiry on WhatsApp',
  dropNumberLabel = "Drop Your Number — We'll Reach Out",
  showCallButton = false,
  stacked = false,
  className = ''
}) {
  return (
    <div className={`flex flex-col gap-2.5 w-full ${className}`}>
      {/* Inline validation hint when disabled */}
      {!isValid && validationMessage && (
        <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/40">
          <span className="material-symbols-outlined text-sm">info</span>
          <span>{validationMessage}</span>
        </div>
      )}

      {/* Buttons layout: 2-column or stacked, perfectly contained within the container */}
      <div className={`grid ${stacked ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-2.5 w-full`}>
        {/* Button 1: Send Enquiry on WhatsApp */}
        <button
          type="button"
          onClick={onWhatsApp}
          disabled={!isValid || isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm shadow-md shadow-green-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-lg">chat</span>
          <span className="text-center">{whatsAppLabel}</span>
        </button>

        {/* Button 2: Drop Your Number — We'll Reach Out */}
        <button
          type="button"
          onClick={onDropNumber}
          disabled={!isValid || isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin material-symbols-outlined text-lg">sync</span>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">ring_volume</span>
              <span className="text-center">{dropNumberLabel}</span>
            </>
          )}
        </button>
      </div>

      {/* Direct Call Button (full-width row, prevents overflow on narrow sidebars) */}
      {showCallButton && (
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="w-full py-2.5 px-4 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">call</span>
          <span>Call Us Directly: {DISPLAY_PHONE_NUMBER}</span>
        </a>
      )}
    </div>
  );
}
