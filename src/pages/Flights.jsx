import React, { useState } from 'react';
import SEO from '../components/SEO';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';

export default function Flights() {
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

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.to.trim() || !formData.departureDate) {
      alert('Please fill in departure city, arrival city, and departure date.');
      return;
    }

    const message = `New FLIGHT Enquiry 🚀\n\nFrom: ${formData.from}\nTo: ${formData.to}\nDeparture Date: ${formData.departureDate}\nReturn Date: ${formData.returnDate || 'One Way'}\nTravelers: ${formData.travelers}\n`;
    openWhatsApp(message);
  };

  const scrollToQuote = (destination) => {
    if (destination) {
      setFormData((prev) => ({ ...prev, to: destination }));
    }
    const hero = document.getElementById('quote-form');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Group Flight Booking Service",
    "provider": {
      "@type": "TravelAgency",
      "name": "Fly With Friends",
      "telephone": "+918851722264",
      "url": "https://flywithfriends.com"
    },
    "serviceType": "Flight Reservation",
    "description": "Domestic and international group flight reservations with special group discounts, seat blocks, and dedicated support."
  };

  return (
    <>
      <SEO
        title="Group Flight Bookings & Discount Airline Fares | Fly With Friends"
        description="Book domestic and international group flights at discounted rates. Get dedicated travel support, seat synchronization, and instant WhatsApp booking quotes."
        keywords="group flight booking, cheap airline tickets, group flights discount, domestic flights, international flights, fly with friends"
        canonical="/Flights.html"
        schema={schema}
      />

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full flex items-center min-h-[850px] lg:min-h-[750px] px-4 lg:px-10 py-12">
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <div className="absolute inset-0 bg-gray-500/70" />
            <div
              className="absolute inset-0 hidden md:block bg-cover bg-no-repeat animate-background-pan"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2Ejr0v-_viIQtl6Y4uVpVnLBU6w4i2W2YBgTOIQHR02dXUO4LYlxnraEq0PKRhdGSfqvTkxuxoRHyyPT6eT0oSeG9dkfKWWjqUuczUyyp4QzIbSqNZAXZx2Yb-AWdoHpNBQZmC7a5QLcVtaN9yKUkDbUHpuak-CAgBHVB1AGQhjp0HexZ1j1iGo1kivB3-B81vNGa8Bo9EbRUcH-I8XY7bIIeB5_dabpnTzJ9F43hOmAfYro19GIDF1doldYEmB3ZxP1pqX4lQZSG')",
                backgroundSize: '150% auto',
              }}
            />
            <div className="absolute inset-0 bg-black/45 md:bg-black/40" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center animate-fade-in-up">
            <div className="text-white space-y-8 lg:pr-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-200 text-sm font-semibold tracking-wide">
                <span className="material-symbols-outlined text-base">flight_takeoff</span>
                Your Personal Flight Experts
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                Find Your Perfect Flight, <br />
                <span className="text-primary">Effortlessly.</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 opacity-90 leading-relaxed max-w-xl">
                Tell us your travel plans and let our experts find the best deals for you. Skip the endless searching and get curated flight options at the best prices!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <span className="material-symbols-outlined">savings</span>
                  </div>
                  <span className="font-medium">Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <span className="material-symbols-outlined">support_agent</span>
                  </div>
                  <span className="font-medium">24/7 Expert Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <span className="material-symbols-outlined">custom_typography</span>
                  </div>
                  <span className="font-medium">Tailored Itineraries</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <span className="font-medium" id="quote">Instant Quotes</span>
                </div>
              </div>
            </div>

            {/* Flight Quote Card */}
            <div className="w-full" id="quote-form">
              <div className="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 dark:border-white/5 backdrop-blur-sm">
                <div className="mb-6 border-b border-border-light dark:border-border-dark pb-4">
                  <h3 className="text-2xl font-bold text-text-main dark:text-text-main-dark">Request a Flight Quote</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Get personalized flight options via WhatsApp</p>
                </div>

                <form onSubmit={handleWhatsApp} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* FROM */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-text-main dark:text-text-main-dark">From</label>
                      <div className="relative group">
                        <span className="material-symbols-outlined absolute inset-y-0 left-4 flex items-center text-text-muted">
                          flight_takeoff
                        </span>
                        <input
                          required
                          name="from"
                          list="flight-airports"
                          value={formData.from}
                          onChange={handleChange}
                          placeholder="Departure Airport"
                          className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl p-4 pl-12 text-sm text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary"
                          type="text"
                        />
                      </div>
                    </div>

                    {/* TO */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-text-main dark:text-text-main-dark">To</label>
                      <div className="relative group">
                        <span className="material-symbols-outlined absolute inset-y-0 left-4 flex items-center text-text-muted">
                          flight_land
                        </span>
                        <input
                          required
                          name="to"
                          list="flight-airports"
                          value={formData.to}
                          onChange={handleChange}
                          placeholder="Arrival Airport"
                          className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl p-4 pl-12 text-sm text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* DEPART */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-text-main dark:text-text-main-dark">Departure Date</label>
                      <input
                        required
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl p-4 text-sm text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* RETURN */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-text-main dark:text-text-main-dark">Return Date</label>
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl p-4 text-sm text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    {/* TRAVELERS */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-text-main dark:text-text-main-dark">Travelers</label>
                      <input
                        required
                        min="1"
                        type="number"
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        placeholder="No. of Travelers"
                        className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl p-4 text-sm text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <span className="material-symbols-outlined">chat</span>
                      <span>WhatsApp Enquiry</span>
                    </button>
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="md:w-auto w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-3 justify-center"
                    >
                      <span className="material-symbols-outlined">call</span>
                      <span>Call Now</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Icons Section */}
        <section className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-10">
          <div className="max-w-7xl mx-auto px-4 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-main dark:text-text-main-dark">Hassle-Free Booking</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">We handle everything from search to booking.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined text-2xl">airplane_ticket</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-main dark:text-text-main-dark">Exclusive Deals</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Access to unpublished fares and group discounts.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-all duration-300 hover:scale-105 cursor-pointer">
              <div className="size-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined text-2xl">headset_mic</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-main dark:text-text-main-dark">Personalized Service</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dedicated agent for your travel needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Flight Destinations */}
        <section className="py-16 px-4 lg:px-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-text-main dark:text-text-main-dark">Top Flight Destinations</h2>
              <p className="text-gray-500 dark:text-gray-400">Get the best fares for these popular routes.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CARD 1 */}
            <div
              onClick={() => scrollToQuote('Thailand')}
              className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://th.bing.com/th/id/OIP.h6F6n_5TDtaOtYAcWEPqJQHaE8?w=213&h=150&c=6&o=7&dpr=1.4&pid=1.7&rm=3"
                alt="Thailand flights"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Thailand</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Bustling Bangkok to serene beaches</span>
                  <span className="bg-primary px-3 py-1 rounded-full text-sm font-bold shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Enquire Now
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div
              onClick={() => scrollToQuote('Bali')}
              className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZBf_XhujDC8ALjP0DEriqAYqb19cZe5eYl0ffdLljvFfacV7AXnJcRRa_jdyIx7MDR8OUW0BaOt7cUTNR0W4OSnU9MS6CdrOZ90AZcZMcTJnq1tOu97sDxnGSDkYPJCUW4voDelSxrQtGyYIJkTzAgsE5ZTEk4PiWkUrEeUnSKGdTux4wmEBhR2UqSKpdFcqo-WKQ_XhsED63mLXlRvzTc7qOdmfYv5Exv3VnnWGOfAj3-bpBqGxZNirodxubmnLnqnIobHexCIU_"
                alt="Bali flights"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Bali</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">Island of the Gods</span>
                  <span className="bg-primary px-3 py-1 rounded-full text-sm font-bold shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Enquire Now
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div
              onClick={() => scrollToQuote('Dubai')}
              className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0MO3HOFwSlHi-ugElVqqOoDm4JoveUV6qR4ZBe4Eg4Esfg7UXkzR9zZpG9mydjZHqtAEyTF8sJmcGWFt0hIFn1uhD9vp48EFFTaVWRLgkpZqKWn1GEsJ0QSNkKKeip6odAdvz7iOzk39N2keTkIBF3fQKmiVw7c160x72o059Xokkt3t4lYcDsKxNBF8c_HDg1rFatuOPj0BQbS8kYTdGStOrHzCw5HM0kROCAo_eiWkxjPp3_V-y_BzQIZXmdead_xIV8Ag1hen-"
                alt="Dubai flights"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Dubai</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">The Futuristic Oasis</span>
                  <span className="bg-primary px-3 py-1 rounded-full text-sm font-bold shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Enquire Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
