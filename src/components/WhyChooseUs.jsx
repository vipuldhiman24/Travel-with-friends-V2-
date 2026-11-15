import React from 'react';

export default function WhyChooseUs({ className = '' }) {
  const features = [
    {
      id: 1,
      icon: 'smartphone',
      emojiTitle: '📱 User-Friendly Experience',
      badge: '⚡ Simple & Fast',
      description: 'Simple, fast, and mobile-friendly booking — enquiry to confirmation anytime, anywhere.',
      accent: 'from-orange-500/20 to-transparent',
    },
    {
      id: 2,
      icon: 'luggage',
      emojiTitle: '🌍 Curated Holiday Packages',
      badge: '🌴 Handcrafted Trips',
      description: 'From weekend getaways to family & friend expeditions, choose thoughtfully crafted packages to suit every traveler.',
      accent: 'from-amber-500/20 to-transparent',
    },
    {
      id: 3,
      icon: 'verified_user',
      emojiTitle: '💙 Trusted by Thousands',
      badge: '✨ Happy Community',
      description: 'Join our growing community of happy travelers who trust Fly With Friends for their journeys, every time.',
      accent: 'from-primary/20 to-transparent',
    },
    {
      id: 4,
      icon: 'support_agent',
      emojiTitle: '💁 24/7 Dedicated Support',
      badge: '📞 Always Available',
      description: 'Our travel experts are always ready to assist you — before, during, and after your trip on Call & WhatsApp.',
      accent: 'from-orange-600/20 to-transparent',
    },
  ];

  return (
    <section className={`py-12 md:py-16 w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-10 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-sm">stars</span>
            Our Promise
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-main dark:text-text-main-dark tracking-tight">
            Why Choose Us ?
          </h2>
          <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark mt-1 max-w-2xl">
            We make group & individual travel effortless with direct agent support, zero hidden fees, and curated deals.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Subtle top-right decorative circle quadrant matching reference */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-neutral-200/50 dark:bg-white/5 pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div>
                {/* Icon Badge */}
                <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>

                {/* Title with Emoji */}
                <h3 className="text-base sm:text-lg font-bold text-text-main dark:text-text-main-dark mb-2 flex items-center gap-2">
                  {item.emojiTitle}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-muted dark:text-text-muted-dark leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="mt-4 pt-3 border-t border-[#f4ece7]/60 dark:border-[#3a2d25]/60 flex items-center text-xs font-semibold text-primary">
                <span>{item.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
