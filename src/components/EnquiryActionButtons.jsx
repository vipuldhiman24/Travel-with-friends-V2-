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
  showCallButton = true,
  callPhoneNumber = PHONE_NUMBER, // tel:+918851722264
  callButtonLabel = `Call Now: ${DISPLAY_PHONE_NUMBER}`, // +91 88517 22264
  stacked = false,
  className = ''
}) {
  const handleDropClick = (e) => {
    if (!isValid) {
      if (e && e.preventDefault) e.preventDefault();
      alert(validationMessage || 'Please enter your name, contact number, and destination details.');
      return;
    }
    if (onDropNumber) onDropNumber(e);
  };

  const handleWhatsAppClick = (e) => {
    if (!isValid) {
      if (e && e.preventDefault) e.preventDefault();
      alert(validationMessage || 'Please enter your name, contact number, and destination details.');
      return;
    }
    if (onWhatsApp) onWhatsApp(e);
  };

  return (
    <div className={`flex flex-col gap-2.5 w-full ${className}`}>
      {/* Inline validation hint when fields are incomplete */}
      {!isValid && validationMessage && (
        <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/40">
          <span className="material-symbols-outlined text-sm">info</span>
          <span>{validationMessage}</span>
        </div>
      )}

      {/* MAIN BUTTON ON THE FORMS: Direct Call to +91 88517 22264 */}
      {showCallButton && (
        <a
          href={`tel:${callPhoneNumber}`}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-primary to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] group"
        >
          <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">
            call
          </span>
          <span className="tracking-wide">{callButtonLabel}</span>
        </a>
      )}

      {/* Secondary Actions: Drop Your Number & WhatsApp */}
      <div className={`grid ${stacked ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-2 w-full`}>
        {/* Drop Your Number — We'll Reach Out */}
        <button
          type="button"
          onClick={handleDropClick}
          disabled={isSubmitting}
          className={`w-full py-3 px-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
            isValid
              ? 'bg-primary hover:bg-orange-600 text-white shadow-md shadow-orange-500/20'
              : 'bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30'
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin material-symbols-outlined text-base">sync</span>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">ring_volume</span>
              <span className="text-center">{dropNumberLabel}</span>
            </>
          )}
        </button>

        {/* Send Enquiry on WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          disabled={isSubmitting}
          className={`w-full py-3 px-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
            isValid
              ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md shadow-green-600/20'
              : 'bg-[#25D366]/20 hover:bg-[#25D366]/30 text-green-700 dark:text-green-400 border border-[#25D366]/30'
          }`}
        >
          <span className="material-symbols-outlined text-base">chat</span>
          <span className="text-center">{whatsAppLabel}</span>
        </button>
      </div>
    </div>
  );
}
