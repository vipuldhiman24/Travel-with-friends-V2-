import React, { useState } from 'react';
import SEO from '../components/SEO';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';

export default function Bus() {
  const [busType, setBusType] = useState('Volvo AC Sleeper');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwap = () => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.to.trim() || !formData.departureDate) {
      alert('Please fill in departure city, arrival city, and date.');
      return;
    }

    const message = `New BUS Enquiry 🚀

From: ${formData.from}
To: ${formData.to}
Departure Date: ${formData.departureDate}
Return Date: ${formData.returnDate || 'None (One Way)'}
Passengers: ${formData.passengers}
Bus Category: ${busType}

Please share bus availability, timings, and ticket/charter rates.`;

    openWhatsApp(message);
  };

  const scrollToHero = (from, to) => {
    if (from && to) {
      setFormData((prev) => ({ ...prev, from, to }));
    }
    const formElement = document.getElementById('bus-search-bar');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Group Bus & Coach Rental Service',
    provider: {
      '@type': 'TravelAgency',
      name: 'Fly With Friends',
      telephone: PHONE_NUMBER,
      url: 'https://flywithfriends.com',
    },
    serviceType: 'Bus Reservation',
    description:
      'Safe, punctual luxury bus charter and group transport for weekend getaways, college tours, and family holidays.',
  };

  return (
    <>
      <SEO
        title="Group Bus Bookings & Luxury Coach Rentals | Fly With Friends"
        description="Reliable bus rentals and group coach booking services across top holiday destinations. Comfortable travel, verified operators, and instant quotes on WhatsApp."
        keywords="group bus booking, luxury bus rental, tour coach hire, outstation bus booking, bus travel for groups, fly with friends"
        canonical="/bus"
        schema={schema}
      />

      <main className="flex flex-col items-center w-full">
        {/* Banner Section with Compact Height */}
        <section className="w-full relative px-4 sm:px-6 lg:px-8 pt-8 pb-14 md:pt-12 md:pb-20 bg-[#1f1610] overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=2000&q=80"
              alt="Highway bus travel"
              className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1f1610]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
            {/* Header */}
            <div className="text-center text-white max-w-3xl mx-auto mb-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-sm">directions_bus</span>
                Safe &amp; Punctual Bus Services
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Your Road Trip <span className="text-primary">Begins Here.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2 max-w-xl mx-auto">
                Volvo multi-axle buses, luxury sleepers, and group coaches. Book tickets or charter full buses with instant quotes.
              </p>
            </div>

            {/* Modern Horizontal Bus Search Widget */}
            <div
              id="bus-search-bar"
              className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-white/10 backdrop-blur-md"
            >
              <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                {/* Top Row: Bus Category Badges */}
                <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-text-muted dark:text-text-muted-dark mr-2">
                    Bus Category:
                  </span>
                  {[
                    'Volvo AC Sleeper',
                    'AC Bharat Benz',
                    'Tempo Traveller (12-26)',
                    'Charter Coach (45+)',
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setBusType(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        busType === cat
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-background-light dark:bg-background-dark text-text-muted hover:text-text-main'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Main Horizontal Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  {/* FROM Input (lg:col-span-3) */}
                  <div className="lg:col-span-3 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      From
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">trip_origin</span>
                      <input
                        type="text"
                        required
                        name="from"
                        list="indian-cities"
                        value={formData.from}
                        onChange={handleChange}
                        placeholder="Origin City / Stand"
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Swap Button (lg:col-span-1) */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center -mx-3 z-10">
                    <button
                      type="button"
                      onClick={handleSwap}
                      aria-label="Swap origin and destination"
                      className="size-9 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-primary shadow-sm hover:rotate-180 hover:bg-primary hover:text-white transition-all flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">sync_alt</span>
                    </button>
                  </div>

                  {/* TO Input (lg:col-span-3) */}
                  <div className="lg:col-span-3 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      To
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                      <input
                        type="text"
                        required
                        name="to"
                        list="indian-cities"
                        value={formData.to}
                        onChange={handleChange}
                        placeholder="Destination City / Stand"
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* DEPARTURE DATE (lg:col-span-2) */}
                  <div className="lg:col-span-2 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Departure Date
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                      <input
                        type="date"
                        required
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* RETURN DATE (OPTIONAL! lg:col-span-3) */}
                  <div className="lg:col-span-3 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Return Date <span className="text-[10px] lowercase text-gray-400">(optional)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">event_repeat</span>
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* PASSENGERS & ACTION BUTTONS (lg:col-span-12) */}
                  <div className="sm:col-span-2 lg:col-span-12 flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
                    {/* Passengers Counter */}
                    <div className="flex items-center gap-2 bg-background-light dark:bg-background-dark/70 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700/80 w-full md:w-auto">
                      <span className="material-symbols-outlined text-primary text-lg">group</span>
                      <span className="text-xs font-bold text-text-muted dark:text-text-muted-dark">Passengers:</span>
                      <select
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                        className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 cursor-pointer"
                      >
                        {[1, 2, 4, 6, 8, 12, 16, 20, 30, 'Full Bus Charter (45+)'].map((p) => (
                          <option key={p} value={p}>
                            {p} {typeof p === 'number' && p === 1 ? 'Passenger' : typeof p === 'number' ? 'Passengers' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="px-4 py-3 rounded-xl border border-primary text-primary font-bold text-xs sm:text-sm hover:bg-primary/10 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base">call</span>
                        <span className="hidden sm:inline">Call Coordinator</span>
                      </a>
                      <button
                        type="submit"
                        className="flex-1 md:flex-initial h-12 px-8 rounded-xl bg-primary hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                      >
                        <span className="material-symbols-outlined text-xl">search</span>
                        <span>Search Buses</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Promo Offer Banner */}
        <PromoBanner title="Bus &amp; Group Travel Discounts" />

        {/* Why Choose Us USP Section */}
        <WhyChooseUs />

        {/* Trending Bus Routes Section */}
        <section className="py-16 px-4 lg:px-10 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Popular Highway Routes</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-text-main-dark mt-1">
              Top Trending Bus Routes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase">Overnight Volvo</span>
                <h3 className="text-xl font-bold text-text-main dark:text-text-main-dark mt-1">Delhi ⇄ Manali</h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                  Semi-sleeper &amp; sleeper luxury buses with live tracking and charging ports.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f4ece7] dark:border-[#3a2d25] flex items-center justify-between">
                <span className="text-sm font-bold text-primary">From ₹899</span>
                <button
                  type="button"
                  onClick={() => scrollToHero('Delhi', 'Manali')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Book Seat →
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase">Weekend Express</span>
                <h3 className="text-xl font-bold text-text-main dark:text-text-main-dark mt-1">Delhi ⇄ Rishikesh</h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                  Daily departures for river rafting, camping, and spiritual retreats.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f4ece7] dark:border-[#3a2d25] flex items-center justify-between">
                <span className="text-sm font-bold text-primary">From ₹549</span>
                <button
                  type="button"
                  onClick={() => scrollToHero('Delhi', 'Rishikesh')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Book Seat →
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-primary uppercase">Devotional Route</span>
                <h3 className="text-xl font-bold text-text-main dark:text-text-main-dark mt-1">Delhi ⇄ Katra</h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                  Direct yatra buses with sanitized washroom halts and comfortable berths.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#f4ece7] dark:border-[#3a2d25] flex items-center justify-between">
                <span className="text-sm font-bold text-primary">From ₹1,199</span>
                <button
                  type="button"
                  onClick={() => scrollToHero('Delhi', 'Katra')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Book Seat →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
