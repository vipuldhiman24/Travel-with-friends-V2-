import React, { useState } from 'react';
import SEO from '../components/SEO';
import { sendWhatsAppForm, PHONE_NUMBER } from '../utils/whatsapp';

export default function Visa() {
  const [formData, setFormData] = useState({
    country: '',
    destination: '',
    travelDate: '',
    travelers: '',
    packageType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendWhatsAppForm('PACKAGE', {
      Country: formData.country,
      Destination: formData.destination,
      'Travel Dates': formData.travelDate,
      Travelers: formData.travelers,
      'Package Type': formData.packageType,
    });
  };

  const scrollToApplication = () => {
    const el = document.getElementById('application');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Travel Visa Assistance Service',
    provider: {
      '@type': 'TravelAgency',
      name: 'Fly With Friends',
      telephone: PHONE_NUMBER,
      url: 'https://flywithfriends.com',
    },
    serviceType: 'Visa Consultation & Filing',
    description:
      'End-to-end tourist and business visa application assistance, document checklist preparation, and slot booking.',
  };

  return (
    <>
      <SEO
        title="Fast & Hassle-Free Visa Services & Documentation | Fly With Friends"
        description="Get hassle-free tourist and business visa assistance with Fly With Friends. Expert documentation support for Japan, Schengen, Dubai, Thailand, and more."
        keywords="visa assistance, tourist visa services, business visa consultant, international visa support, travel visa documentation, fly with friends"
        canonical="https://flywithfriends.com/Visa.html"
        structuredData={structuredData}
      />

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full py-12 lg:py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-10 text-border-dark dark:text-border-light">
            <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern height="20" id="dot-pattern" patternUnits="userSpaceOnUse" width="20">
                  <circle cx="2" cy="2" fill="currentColor" r="1.5"></circle>
                </pattern>
              </defs>
              <rect fill="url(#dot-pattern)" height="100%" width="100%"></rect>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-light/50 to-background-light dark:via-background-dark/50 dark:to-background-dark"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col gap-6 animate-fade-in-up">
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200 dark:border-orange-800/30">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Official Partner
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-main-light dark:text-text-main-dark leading-[1.15]">
                  Travel borders <br />
                  <span className="text-primary relative inline-block">
                    without limits.
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-primary opacity-30"
                      fill="none"
                      viewBox="0 0 200 9"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.00025 6.99992C18.5002 2.49992 48.5002 0.99992 78.5002 2.49992C116.002 4.37492 168.001 7.49992 198.001 3.99992"
                        stroke="currentColor"
                        strokeWidth="3"
                      ></path>
                    </svg>
                  </span>
                </h1>
              </div>

              <p id="application" className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                Navigate global entry requirements with ease. Our visa experts handle the complex paperwork so you can focus on your journey.
              </p>

              <div className="relative w-full max-w-md hidden lg:block mt-6 group">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-dashed border-primary/30 z-0 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 duration-500"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-dots-pattern opacity-50 z-0"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10 h-64 w-full">
                  <img
                    alt="Van driving through canyon"
                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0MO3HOFwSlHi-ugElVqqOoDm4JoveUV6qR4ZBe4Eg4Esfg7UXkzR9zZpG9mydjZHqtAEyTF8sJmcGWFt0hIFn1uhD9vp48EFFTaVWRLgkpZqKWn1GEsJ0QSNkKKeip6odAdvz7iOzk39N2keTkIBF3fQKmiVw7c160x72o059Xokkt3t4lYcDsKxNBF8c_HDg1rFatuOPj0BQbS8kYTdGStOrHzCw5HM0kROCAo_eiWkxjPp3_V-y_BzQIZXmdead_xIV8Ag1hen-"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-primary">public</span>
                      <span className="text-xs font-bold uppercase tracking-wide opacity-90">Global Access</span>
                    </div>
                    <p className="text-sm font-medium opacity-80">120+ Countries Supported</p>
                  </div>
                </div>
                <div className="absolute -right-6 top-10 bg-surface-light dark:bg-surface-dark p-3 rounded-xl shadow-lg border border-border-light dark:border-border-dark flex items-center gap-3 z-20 animate-float">
                  <div className="size-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                    <span className="material-symbols-outlined">check</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Approval Rate</p>
                    <p className="text-lg font-bold">99.2%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7 w-full">
              <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 md:p-8 shadow-2xl shadow-orange-500/10 border border-border-light dark:border-border-dark relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-orange-400 to-primary"></div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-text-main-light dark:text-text-main-dark">
                    <span className="material-symbols-outlined text-primary">assignment</span>
                    Start Your Application
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Fill in the details below and we'll start processing instantly.
                  </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  {/* COUNTRY */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                      Country
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        public
                      </span>
                      <input
                        type="text"
                        required
                        name="country"
                        list="countries-list"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="E.g. Thailand, France..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main-light dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-bold"
                      />
                    </div>
                  </div>

                  {/* DESTINATION */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                      Destination
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        location_on
                      </span>
                      <input
                        type="text"
                        required
                        name="destination"
                        list="countries-list"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="E.g. Maldives, Italy..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main-light dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-bold"
                      />
                    </div>
                  </div>

                  {/* DATES + TRAVELERS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* DATES */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                        Dates
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          calendar_today
                        </span>
                        <input
                          type="date"
                          required
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleChange}
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main-light dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm font-bold"
                        />
                      </div>
                    </div>

                    {/* TRAVELERS */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                        Travelers
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          group
                        </span>
                        <input
                          type="number"
                          min="1"
                          required
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleChange}
                          placeholder="No. of people"
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main-light dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PACKAGE TYPE */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                      Package Type
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                        category
                      </span>
                      <select
                        required
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleChange}
                        className="w-full h-12 pl-12 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main-light dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-bold text-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select package</option>
                        <option>Honeymoon Special</option>
                        <option>Family Vacation</option>
                        <option>Adventure Trip</option>
                        <option>Luxury Retreat</option>
                        <option>Group Tour</option>
                        <option>Solo Expedition</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* SUBMIT BUTTONS */}
                  <button
                    type="submit"
                    className="w-full h-14 mt-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-3 group"
                  >
                    Request Details
                  </button>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="md:w-auto w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-3 justify-center"
                  >
                    <span className="material-symbols-outlined">call</span>
                    <span>Call Now</span>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-surface-light dark:bg-surface-dark border-y border-border-light dark:border-border-dark py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-colors group cursor-pointer">
              <div className="size-12 shrink-0 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">
                  Expert Consultation
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Guidance from visa specialists with over 10 years of experience in complex cases.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-colors group cursor-pointer">
              <div className="size-12 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">description</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">
                  Document Assistance
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  We help you organize, verify, and format every single paper required.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-background-dark transition-colors group cursor-pointer">
              <div className="size-12 shrink-0 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors text-text-main-light dark:text-text-main-dark">
                  Fast Processing
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Priority handling for urgent travel needs to save your valuable time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16 px-4 lg:px-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-text-main-light dark:text-text-main-dark">
                Popular Visa Destinations
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                We have high success rates for these countries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* JAPAN */}
            <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Japan tourist and business visa assistance"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Ejr0v-_viIQtl6Y4uVpVnLBU6w4i2W2YBgTOIQHR02dXUO4LYlxnraEq0PKRhdGSfqvTkxuxoRHyyPT6eT0oSeG9dkfKWWjqUuczUyyp4QzIbSqNZAXZx2Yb-AWdoHpNBQZmC7a5QLcVtaN9yKUkDbUHpuak-CAgBHVB1AGQhjp0HexZ1j1iGo1kivB3-B81vNGa8Bo9EbRUcH-I8XY7bIIeB5_dabpnTzJ9F43hOmAfYro19GIDF1doldYEmB3ZxP1pqX4lQZSG"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Japan</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium opacity-90 border border-white/30 px-2 py-1 rounded">
                    Tourist & Business
                  </span>
                  <button
                    type="button"
                    onClick={scrollToApplication}
                    className="consult-btn bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Enquire now?
                  </button>
                </div>
              </div>
            </div>

            {/* SCHENGEN */}
            <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Schengen Europe travel visa application"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJkBNw7ed3erOj6xcsieReCgx_HLJ0vnoGSszTwRgMP-lMa0NdLuMR5wX9v3M0nQe3bc23zquwBdFAde7IZIxLOR4N6RJ8qqt71-izrxC0xQoouU7CiylYZvrOx9b0BXKXyKt-wHW1krgFWaro2awkBEV1rlDibHM3LbmFLvhDoPvAbNEMHfEhmymvVHUmb7Ygh0QcTAb2_jab68NhljCJQ_2iCjBMJFokZV_p9DPLY9lXijSnFFuupBz14p_GDN_Vp5SXMbhUSUns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Schengen Area</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium opacity-90 border border-white/30 px-2 py-1 rounded">
                    Europe Travel Visa
                  </span>
                  <button
                    type="button"
                    onClick={scrollToApplication}
                    className="consult-btn bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Enquire now?
                  </button>
                </div>
              </div>
            </div>

            {/* INDONESIA */}
            <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Indonesia Bali visa on arrival service"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZBf_XhujDC8ALjP0DEriqAYqb19cZe5eYl0ffdLljvFfacV7AXnJcRRa_jdyIx7MDR8OUW0BaOt7cUTNR0W4OSnU9MS6CdrOZ90AZcZMcTJnq1tOu97sDxnGSDkYPJCUW4voDelSxrQtGyYIJkTzAgsE5ZTEk4PiWkUrEeUnSKGdTux4wmEBhR2UqSKpdFcqo-WKQ_XhsED63mLXlRvzTc7qOdmfYv5Exv3VnnWGOfAj3-bpBqGxZNirodxubmnLnqnIobHexCIU_"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Indonesia</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium opacity-90 border border-white/30 px-2 py-1 rounded">
                    Visa on Arrival
                  </span>
                  <button
                    type="button"
                    onClick={scrollToApplication}
                    className="consult-btn bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Enquire now?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
