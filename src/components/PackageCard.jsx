import React from 'react';
import { Link } from 'react-router-dom';

export default function PackageCard({ pkg }) {
  const whatsappUrl = `https://wa.me/918851722264?text=${encodeURIComponent(
    `Hi, I want to enquire about the package: ${pkg.title} (${pkg.duration})`
  )}`;

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col w-full group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            if (/vaishno/i.test(pkg.title)) e.currentTarget.src = '/assets/packages/vaishno-devi.jpg';
            else if (/manali/i.test(pkg.title)) e.currentTarget.src = '/assets/packages/manali.jpg';
            else if (/dubai/i.test(pkg.title)) e.currentTarget.src = '/assets/packages/dubai.jpg';
            else if (/bali/i.test(pkg.title)) e.currentTarget.src = '/assets/packages/bali.jpg';
          }}
        />
        {pkg.badge && (
          <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {pkg.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-text-muted dark:text-text-muted-dark font-medium">
            <span className="material-symbols-outlined text-sm text-primary">location_on</span>
            <span>{pkg.location}</span>
          </div>
          <h4 className="font-bold text-lg text-text-main dark:text-text-main-dark leading-snug">
            {pkg.title}
          </h4>
          <p className="text-xs text-text-muted dark:text-text-muted-dark line-clamp-2">
            {pkg.shortDesc}
          </p>
        </div>

        <div className="pt-3 border-t border-[#f4ece7] dark:border-[#3a2d25] flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted dark:text-text-muted-dark block">Starting at</span>
            <span className="text-base font-bold text-primary">{pkg.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={`/trips?pkg=${pkg.id}`}
              className="px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
            >
              Details
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm"
            >
              Enquire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
