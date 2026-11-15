import React, { useState } from 'react';
import SEO from '../components/SEO';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';

export default function Flights() {
  const [tripType, setTripType] = useState('one-way'); // 'one-way' | 'round-trip' | 'multi-city'
  const [fareType, setFareType] = useState('regular'); // 'regular' | 'student' | 'senior' | 'group'
  const [travelClass, setTravelClass] = useState('Economy');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    travelers: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwapAirports = () => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleGroupInquiry = () => {
    const message = `Hello Fly With Friends 👋\nI am looking for *Exclusive Group Flight Fares* for more than 9 travelers. Please connect me with a group flight specialist.`;
    openWhatsApp(message);
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.to.trim() || !formData.departureDate) {
      alert('Please fill in departure city, arrival city, and departure date.');
      return;
    }

    const isRound = tripType === 'round-trip' && formData.returnDate;
    const message = `New FLIGHT Enquiry 🚀

Trip Type: ${tripType === 'round-trip' ? 'Round Trip' : tripType === 'multi-city' ? 'Multi City' : 'One Way'}
From: ${formData.from}
To: ${formData.to}
Departure Date: ${formData.departureDate}
Return Date: ${isRound ? formData.returnDate : 'None (One Way)'}
Travelers: ${formData.travelers} Pax
Class: ${travelClass}
Fare Category: ${fareType.toUpperCase()}

Please share the best flight options and quotes.`;

    openWhatsApp(message);
  };

  const scrollToQuote = (destination) => {
    if (destination) {
      setFormData((prev) => ({ ...prev, to: destination }));
    }
    const hero = document.getElementById('flight-search-bar');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Group Flight Booking Service',
    provider: {
      '@type': 'TravelAgency',
      name: 'Fly With Friends',
      telephone: PHONE_NUMBER,
      url: 'https://flywithfriends.com',
    },
    serviceType: 'Flight Reservation',
    description:
      'Domestic and international group flight reservations with special group discounts, seat blocks, and dedicated support.',
  };

  return (
    <>
      <SEO
        title="Group Flight Bookings & Discount Airline Fares | Fly With Friends"
        description="Book domestic and international group flights at discounted rates. Get dedicated travel support, seat synchronization, and instant WhatsApp booking quotes."
        keywords="group flight booking, cheap airline tickets, group flights discount, domestic flights, international flights, fly with friends"
        canonical="/flights"
        schema={schema}
      />

      <main className="flex-grow flex flex-col">
        {/* Hero Section with Moving Background (Works on both Mobile & Desktop) */}
        <section className="relative w-full overflow-hidden pt-8 pb-14 md:pt-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-[#1f1610]">
          {/* Moving background image layer - active on both mobile & desktop */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div
              className="absolute -inset-[8%] w-[116%] h-[116%] bg-cover bg-center bg-no-repeat animate-flight-pan"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2Ejr0v-_viIQtl6Y4uVpVnLBU6w4i2W2YBgTOIQHR02dXUO4LYlxnraEq0PKRhdGSfqvTkxuxoRHyyPT6eT0oSeG9dkfKWWjqUuczUyyp4QzIbSqNZAXZx2Yb-AWdoHpNBQZmC7a5QLcVtaN9yKUkDbUHpuak-CAgBHVB1AGQhjp0HexZ1j1iGo1kivB3-B81vNGa8Bo9EbRUcH-I8XY7bIIeB5_dabpnTzJ9F43hOmAfYro19GIDF1doldYEmB3ZxP1pqX4lQZSG')",
              }}
            />
            {/* Dark overlays for high contrast and readability on all devices */}
            <div className="absolute inset-0 bg-black/45 md:bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#1f1610]" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
            {/* Header copy */}
            <div className="text-center text-white max-w-3xl mx-auto mb-6 md:mb-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-sm">flight</span>
                Personal &amp; Group Flight Experts
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Find Your Perfect Flight, <span className="text-primary">Effortlessly.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2 max-w-xl mx-auto">
                Skip endless search portals. Get curated flight itineraries and negotiated group fares directly on WhatsApp.
              </p>
            </div>

            {/* Modern Horizontal Search Form Widget (Matches Reference Screenshot 5) */}
            <div
              id="flight-search-bar"
              className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-white/10 backdrop-blur-md"
            >
              <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                {/* Top Row: Trip Type Radio Buttons & Group Fares Pill */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        value="one-way"
                        checked={tripType === 'one-way'}
                        onChange={() => setTripType('one-way')}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>One Way</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        value="round-trip"
                        checked={tripType === 'round-trip'}
                        onChange={() => setTripType('round-trip')}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Round Trip</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tripType"
                        value="multi-city"
                        checked={tripType === 'multi-city'}
                        onChange={() => setTripType('multi-city')}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>Multi City</span>
                    </label>
                  </div>

                  {/* Group Fares Banner Pill */}
                  <button
                    type="button"
                    onClick={handleGroupInquiry}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/40 text-primary border border-orange-200 dark:border-orange-800/40 text-xs font-bold hover:bg-primary hover:text-white transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">groups</span>
                    <span>More than 9 Pax? <strong>Get Exclusive Group Fares</strong></span>
                  </button>
                </div>

                {/* Main Horizontal Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  {/* FROM Input (lg:col-span-3) */}
                  <div className="lg:col-span-3 relative bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      From
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">flight_takeoff</span>
                      <input
                        type="text"
                        required
                        name="from"
                        list="flight-airports"
                        value={formData.from}
                        onChange={handleChange}
                        placeholder="Departure City / Airport"
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Swap Button (Hidden on small, absolute/inline on desktop) */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center -mx-3 z-10">
                    <button
                      type="button"
                      onClick={handleSwapAirports}
                      aria-label="Swap departure and arrival"
                      className="size-9 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-primary shadow-sm hover:rotate-180 hover:bg-primary hover:text-white transition-all flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">sync_alt</span>
                    </button>
                  </div>

                  {/* TO Input (lg:col-span-3) */}
                  <div className="lg:col-span-3 relative bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      To
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">flight_land</span>
                      <input
                        type="text"
                        required
                        name="to"
                        list="flight-airports"
                        value={formData.to}
                        onChange={handleChange}
                        placeholder="Arrival City / Airport"
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* DEPARTURE DATE (lg:col-span-2) */}
                  <div className="lg:col-span-2 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Departure
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

                  {/* RETURN DATE (OPTIONAL! lg:col-span-2) */}
                  <div className="lg:col-span-2 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                        Return <span className="text-[10px] lowercase text-gray-400">(optional)</span>
                      </label>
                      {tripType !== 'round-trip' && (
                        <button
                          type="button"
                          onClick={() => setTripType('round-trip')}
                          className="text-[10px] text-primary font-bold hover:underline"
                        >
                          + Round Trip
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">event_repeat</span>
                      {tripType === 'round-trip' ? (
                        <input
                          type="date"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleChange}
                          className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setTripType('round-trip')}
                          className="w-full text-left text-xs font-semibold text-gray-400 hover:text-primary transition-colors py-0.5 truncate"
                        >
                          Tap to add return date
                        </button>
                      )}
                    </div>
                  </div>

                  {/* TRAVELERS & CLASS + CTA (lg:col-span-12 or subgrid) */}
                  <div className="sm:col-span-2 lg:col-span-12 flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
                    {/* Travelers Count & Class */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                      <div className="flex items-center gap-2 bg-background-light dark:bg-background-dark/70 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700/80">
                        <span className="material-symbols-outlined text-primary text-lg">group</span>
                        <span className="text-xs font-bold text-text-muted dark:text-text-muted-dark">Pax:</span>
                        <select
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleChange}
                          className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+ Group'].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? 'Traveler' : 'Travelers'}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2 bg-background-light dark:bg-background-dark/70 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700/80">
                        <span className="material-symbols-outlined text-primary text-lg">airline_seat_recline_extra</span>
                        <select
                          value={travelClass}
                          onChange={(e) => setTravelClass(e.target.value)}
                          className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 cursor-pointer"
                        >
                          <option value="Economy">Economy</option>
                          <option value="Premium Economy">Premium Economy</option>
                          <option value="Business">Business</option>
                          <option value="First Class">First Class</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit CTA Buttons */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="px-4 py-3 rounded-xl border border-primary text-primary font-bold text-xs sm:text-sm hover:bg-primary/10 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base">call</span>
                        <span className="hidden sm:inline">Call Us</span>
                      </a>
                      <button
                        type="submit"
                        className="flex-1 md:flex-initial h-12 px-8 rounded-xl bg-primary hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                      >
                        <span className="material-symbols-outlined text-xl">search</span>
                        <span>Search Flights</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Special Fares Badges (Matches Reference Screenshot 5) */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-1 mr-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400">
                      More Benefits
                    </span>
                    <span className="text-xs font-bold text-text-main dark:text-text-main-dark">
                      Special Fares:
                    </span>
                  </div>

                  <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    fareType === 'regular'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 text-text-muted hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="fareType"
                      value="regular"
                      checked={fareType === 'regular'}
                      onChange={() => setFareType('regular')}
                      className="sr-only"
                    />
                    <span>👤 Regular</span>
                    <span className="text-[10px] font-normal text-text-muted">(Lowest Fares)</span>
                  </label>

                  <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    fareType === 'student'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 text-text-muted hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="fareType"
                      value="student"
                      checked={fareType === 'student'}
                      onChange={() => setFareType('student')}
                      className="sr-only"
                    />
                    <span>🎓 Student</span>
                    <span className="text-[10px] font-normal text-text-muted">(Extra Baggage)</span>
                  </label>

                  <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    fareType === 'senior'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 text-text-muted hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="fareType"
                      value="senior"
                      checked={fareType === 'senior'}
                      onChange={() => setFareType('senior')}
                      className="sr-only"
                    />
                    <span>👴 Senior Citizen</span>
                    <span className="text-[10px] font-normal text-text-muted">(Exclusive Discount)</span>
                  </label>

                  <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    fareType === 'group'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-gray-700 text-text-muted hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="fareType"
                      value="group"
                      checked={fareType === 'group'}
                      onChange={() => setFareType('group')}
                      className="sr-only"
                    />
                    <span>👥 Group Deal</span>
                    <span className="text-[10px] font-normal text-text-muted">(Special Rates)</span>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Promotional Offers Banner (Matches Reference Screenshot 2) */}
        <PromoBanner title="Airline Offers &amp; Group Discounts" />

        {/* Why Choose Us USP Section (Matches Reference Screenshots 1 & 4 in our theme colors) */}
        <WhyChooseUs />

        {/* Top Flight Destinations */}
        <section className="py-16 px-4 lg:px-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-wider">Top Routes</span>
              <h2 className="text-3xl font-bold text-text-main dark:text-text-main-dark mt-1">
                Popular Flight Destinations
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Direct and connecting flights with negotiated group discounts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Route 1 */}
            <div className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer shadow-md hover:shadow-xl transition-all">
              <img
                src="/assets/Manali.jpg"
                alt="Delhi to Kullu Manali Flights"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold text-orange-300 uppercase">Mountain Getaway</span>
                  <h3 className="text-xl font-bold">Delhi ⇄ Kullu / Manali</h3>
                  <p className="text-xs text-gray-200 mt-0.5">Starting from ₹3,499</p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToQuote('Kullu (KUU)')}
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow hover:bg-orange-600 transition-colors"
                >
                  Enquire
                </button>
              </div>
            </div>

            {/* Route 2 */}
            <div className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer shadow-md hover:shadow-xl transition-all">
              <img
                src="/assets/Burj Khalifa.jfif"
                alt="Mumbai to Dubai Flights"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold text-orange-300 uppercase">International</span>
                  <h3 className="text-xl font-bold">Mumbai ⇄ Dubai (DXB)</h3>
                  <p className="text-xs text-gray-200 mt-0.5">Starting from ₹12,999</p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToQuote('Dubai (DXB)')}
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow hover:bg-orange-600 transition-colors"
                >
                  Enquire
                </button>
              </div>
            </div>

            {/* Route 3 */}
            <div className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer shadow-md hover:shadow-xl transition-all">
              <img
                src="/assets/Bali.jfif"
                alt="Delhi to Bali Flights"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold text-orange-300 uppercase">Tropical Vacation</span>
                  <h3 className="text-xl font-bold">Delhi ⇄ Bali (DPS)</h3>
                  <p className="text-xs text-gray-200 mt-0.5">Starting from ₹18,499</p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToQuote('Bali (DPS)')}
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow hover:bg-orange-600 transition-colors"
                >
                  Enquire
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
