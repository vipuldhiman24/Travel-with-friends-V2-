import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import { PACKAGES } from '../data/packages';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';

export default function Trips() {
  const [searchParams] = useSearchParams();
  const pkgId = Number(searchParams.get('pkg')) || 2; // Default to Manali (ID: 2) if not specified

  const pkg = PACKAGES.find((p) => p.id === pkgId) || PACKAGES[0];

  const handleWhatsApp = () => {
    const message = `Hello Fly With Friends 👋\n\nI want to enquire about the package:\n*${pkg.title}*\nLocation: ${pkg.location}\nDuration: ${pkg.duration}\nPrice: ${pkg.price}\n\nPlease share availability and group discount details.`;
    openWhatsApp(message);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": pkg.title,
    "description": pkg.shortDesc,
    "touristType": "Group Travelers",
    "offers": {
      "@type": "Offer",
      "price": pkg.price,
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <SEO
        title={`${pkg.title} | Fly With Friends`}
        description={pkg.shortDesc}
        keywords="group trips, custom holiday itineraries, weekend getaway planning, friends travel group, travel with friends"
        canonical={`/Trips.html?pkg=${pkg.id}`}
        schema={schema}
      />

      <main className="min-h-screen pb-20">
        {/* Hero Section */}
        <div className="relative w-full h-[500px] md:h-[600px] group">
          <div
            id="pkg-image"
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url("${pkg.image}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-16">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                Trending Now
              </span>
            </div>
            <h1 id="pkg-title" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 tracking-tight">
              {pkg.title}
            </h1>
            <div className="flex items-center gap-2 text-white/90">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span id="pkg-location" className="text-lg font-medium">{pkg.location}</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Trip Summary Card */}
              <div className="bg-white dark:bg-[#2a201a] rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                  <div className="flex items-center gap-4 px-2">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Starting From</p>
                      <p id="pkg-price" className="text-xl font-bold text-gray-900 dark:text-white">
                        {pkg.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 px-2 pt-4 md:pt-0">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Duration</p>
                      <p id="pkg-duration" className="text-lg font-bold text-gray-900 dark:text-white">
                        {pkg.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 px-2 pt-4 md:pt-0">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Group Size</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{pkg.group || '2 – 12 People'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Vibe / Description */}
              <section className="bg-white dark:bg-[#2a201a] rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">sentiment_satisfied</span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">The Experience</h2>
                </div>
                <p id="pkg-desc" className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {pkg.shortDesc}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">landscape</span> Sightseeing
                  </span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">hotel</span> Comfortable Stays
                  </span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">directions_bus</span> Transfers
                  </span>
                  <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">support_agent</span> Coordinator
                  </span>
                </div>
              </section>

              {/* Itinerary */}
              <section className="bg-white dark:bg-[#2a201a] rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary text-2xl">map</span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trip Itinerary</h2>
                </div>

                <div className="relative border-l-2 border-primary/20 ml-3 space-y-12">
                  {pkg.itinerary?.map((item, idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-white dark:bg-gray-800" />
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-bold text-primary uppercase tracking-wider">{item.day}</span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.heading}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column Sticky Sidebar */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white dark:bg-[#2a201a] rounded-xl shadow-xl border border-primary/10 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-primary/10">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Ready to explore?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Gather your friends and reserve your spot.</p>
                  </div>
                  <div className="p-6 flex flex-col gap-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Price</p>
                        <p className="text-2xl font-extrabold text-primary">{pkg.price}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Best Deal</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleWhatsApp}
                        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all"
                      >
                        <span className="material-symbols-outlined">chat</span>
                        <span>Send Enquiry via WhatsApp</span>
                      </button>

                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow transition-all"
                      >
                        <span className="material-symbols-outlined">call</span>
                        <span>Call Us: +91 88517 22264</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Inclusions */}
                <div className="bg-white dark:bg-[#2a201a] rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Quick Inclusions</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                      <span>Verified Hotel Accommodations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                      <span>Sightseeing &amp; Transfers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                      <span>Dedicated Trip Support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <PromoBanner title="Special Group Discount" className="mt-12" />

        {/* Why Choose Us */}
        <WhyChooseUs />
      </main>
    </>
  );
}
