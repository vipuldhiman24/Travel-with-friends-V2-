import React from 'react';
import { openWhatsApp } from '../utils/whatsapp';

export default function PromoBanner({ className = '', title = 'Exclusive Travel Offers' }) {
  const handleClaimOffer = () => {
    const message = `Hello Fly With Friends 👋\nI want to claim the *FLYFRIENDS* discount offer for my upcoming trip booking! Please share available discounts.`;
    openWhatsApp(message);
  };

  return (
    <section className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-extrabold text-text-main dark:text-text-main-dark flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">local_offer</span>
            {title}
          </h3>
          <span className="text-xs font-bold text-primary uppercase tracking-wider hidden sm:inline-block">
            Limited Time Deal
          </span>
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-orange-50 via-white to-orange-100/60 dark:from-surface-dark dark:via-[#35271e] dark:to-surface-dark border-2 border-primary/25 shadow-lg p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Background decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

        {/* Left Side: Offer Pitch */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left z-10">
          <div className="size-20 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-orange-600 text-white flex flex-col items-center justify-center shadow-md shadow-orange-500/30">
            <span className="material-symbols-outlined text-3xl">campaign</span>
            <span className="text-[10px] font-black uppercase tracking-tight">Big Savings</span>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              Best Price Guarantee
            </div>
            <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-text-main dark:text-text-main-dark leading-tight">
              On Domestic &amp; Group Travel <br className="hidden sm:inline" />
              <span className="text-primary">with Fly With Friends</span>
            </h4>
            <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark mt-1 font-medium">
              ✨ Cheapest prices and discounts — <strong className="text-text-main dark:text-white">just ask for it and we got you!</strong>
            </p>
          </div>
        </div>

        {/* Right Side: Coupon Pill & Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full lg:w-auto justify-end">
          {/* Coupon Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-primary via-orange-500 to-amber-500 text-white shadow-md flex flex-col items-center sm:items-start min-w-[200px] w-full sm:w-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">UP TO</span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight leading-none my-1">
              ₹ 1000+ OFF
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-white text-primary font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                FLYFRIENDS
              </span>
              <span className="text-[11px] text-white/90 font-medium">Instant Discount</span>
            </div>
            <span className="text-[10px] text-white/80 mt-2 font-medium">
              *Applies to flights, hotels, buses &amp; packages
            </span>
          </div>

          {/* Action CTA */}
          <button
            type="button"
            onClick={handleClaimOffer}
            className="w-full sm:w-auto h-12 sm:h-14 px-6 rounded-2xl bg-primary hover:bg-orange-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 shrink-0 group hover:scale-105"
          >
            <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">
              chat
            </span>
            <span>Claim Discount</span>
          </button>
        </div>
      </div>
    </section>
  );
}
