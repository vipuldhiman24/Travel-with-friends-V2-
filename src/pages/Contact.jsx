import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import { openWhatsAppQuick, PHONE_NUMBER } from '../utils/whatsapp';

export default function Contact() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Fly With Friends Contact Page',
    url: 'https://flywithfriends.com/Contact.html',
    mainEntity: {
      '@type': 'TravelAgency',
      name: 'Fly With Friends',
      telephone: PHONE_NUMBER,
      email: 'flywithfriends06@gmail.com',
      url: 'https://flywithfriends.com',
    },
  };

  return (
    <>
      <SEO
        title="Contact Us | Group Travel Support & Bookings - Fly With Friends"
        description="Get in touch with Fly With Friends for group flight deals, tour planning, or booking queries. Call +91 93549 62122 or chat with our travel agents on WhatsApp."
        keywords="contact fly with friends, travel agent contact, group travel customer support, book travel on whatsapp, travel agency phone"
        canonical="https://flywithfriends.com/Contact.html"
        structuredData={structuredData}
      />

      <main className="flex-grow">
        {/* Minimalist Hero Section */}
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-4 overflow-hidden">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Hero Icon */}
            <div className="mb-8 relative group cursor-default">
              <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
              <div className="relative flex items-center justify-center size-32 sm:size-40 rounded-full bg-surface-light dark:bg-surface-dark border-4 border-background-light dark:border-background-dark shadow-2xl text-primary transform transition-transform hover:scale-105 duration-300">
                <span
                  className="material-symbols-outlined text-[64px] sm:text-[80px]"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
                >
                  flight_takeoff
                </span>
              </div>

              {/* Floating Decorative Icons */}
              <div
                className="absolute -top-2 -right-6 bg-white dark:bg-surface-dark p-2 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: '1s' }}
              >
                <span className="material-symbols-outlined text-green-500">chat_bubble</span>
              </div>
              <div
                className="absolute -bottom-2 -left-6 bg-white dark:bg-surface-dark p-2 rounded-full shadow-lg animate-bounce"
                style={{ animationDelay: '2s' }}
              >
                <span className="material-symbols-outlined text-blue-500">groups</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-main-light dark:text-text-main-dark tracking-tight leading-[1.1] mb-6">
              Planning a Group Trip? <br />
              <span className="text-primary">Let's Fly Together.</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-sec-light dark:text-text-sec-dark max-w-2xl mx-auto mb-10 leading-relaxed">
              Skip the complex search engines. Chat with our specialized agents directly on WhatsApp for exclusive group flight deals and instant support.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <button
                type="button"
                onClick={() => openWhatsAppQuick()}
                className="flex items-center justify-center gap-3 w-full sm:w-auto min-w-[240px] h-14 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white text-base font-bold rounded-full transition-all shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-1"
              >
                {/* WhatsApp SVG Icon */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.04 0C5.5 0 .16 5.34.16 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.2-1.63a11.9 11.9 0 0 0 5.84 1.49h.01c6.54 0 11.88-5.34 11.88-11.93C23.93 5.34 18.58 0 12.04 0zm6.91 17.23c-.29.82-1.69 1.56-2.32 1.66-.59.09-1.36.13-2.2-.14-.51-.16-1.17-.38-2.02-.75-3.56-1.54-5.88-5.3-6.06-5.55-.17-.25-1.45-1.93-1.45-3.69 0-1.75.92-2.62 1.25-2.98.33-.36.72-.45.96-.45h.69c.22 0 .52-.08.82.62.29.7 1 2.43 1.09 2.6.09.18.15.38.03.62-.12.25-.18.4-.36.62-.18.22-.38.49-.54.66-.18.18-.37.37-.16.73.22.36.97 1.6 2.08 2.59 1.43 1.28 2.63 1.68 3 1.86.37.18.58.15.8-.09.22-.25.92-1.07 1.17-1.44.25-.37.5-.31.84-.18.35.12 2.2 1.04 2.57 1.23.37.18.62.28.72.44.09.15.09.9-.2 1.72z" />
                </svg>
                Enquire on WhatsApp
              </button>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center justify-center w-full sm:w-auto h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white text-base font-bold rounded-full transition-all shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1"
              >
                {/* Phone Icon */}
                <svg className="w-6 h-6 fill-current mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57.58 0 1.05.47 1.05 1.05v3.49c0 .58-.47 1.05-1.05 1.05C10.61 21.6 2.4 13.39 2.4 3.45c0-.58.47-1.05 1.05-1.05h3.49c.58 0 1.05.47 1.05 1.05 0 1.21.2 2.42.57 3.54.11.36.03.76-.24 1.05l-2.3 2.3z" />
                </svg>
                Call Us
              </a>
            </div>

            {/* Trust Bar */}
            <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">verified</span>
                <span className="text-sm font-medium">Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">support_agent</span>
                <span className="text-sm font-medium">24/7 Agent Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">group</span>
                <span className="text-sm font-medium">Trusted by the community</span>
              </div>
            </div>

            {/* Contact Information Cards */}
            <div className="mt-16 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Phone Card */}
              <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f3ece7] dark:border-[#3d3028] shadow-sm hover:shadow-md transition-shadow">
                <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">call</span>
                </div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">Call Us Directly</h3>
                <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-3">Speak with our travel coordinators instantly.</p>
                <a href={`tel:${PHONE_NUMBER}`} className="text-primary font-bold hover:underline inline-flex items-center gap-1.5">
                  <span>+91 93549 62122</span>
                  <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f3ece7] dark:border-[#3d3028] shadow-sm hover:shadow-md transition-shadow">
                <div className="size-12 rounded-xl bg-green-100 dark:bg-green-950/40 text-[#25D366] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 0C5.5 0 .16 5.34.16 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.2-1.63a11.9 11.9 0 0 0 5.84 1.49h.01c6.54 0 11.88-5.34 11.88-11.93C23.93 5.34 18.58 0 12.04 0zm6.91 17.23c-.29.82-1.69 1.56-2.32 1.66-.59.09-1.36.13-2.2-.14-.51-.16-1.17-.38-2.02-.75-3.56-1.54-5.88-5.3-6.06-5.55-.17-.25-1.45-1.93-1.45-3.69 0-1.75.92-2.62 1.25-2.98.33-.36.72-.45.96-.45h.69c.22 0 .52-.08.82.62.29.7 1 2.43 1.09 2.6.09.18.15.38.03.62-.12.25-.18.4-.36.62-.18.22-.38.49-.54.66-.18.18-.37.37-.16.73.22.36.97 1.6 2.08 2.59 1.43 1.28 2.63 1.68 3 1.86.37.18.58.15.8-.09.22-.25.92-1.07 1.17-1.44.25-.37.5-.31.84-.18.35.12 2.2 1.04 2.57 1.23.37.18.62.28.72.44.09.15.09.9-.2 1.72z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">WhatsApp Chat</h3>
                <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-3">Quick quotes & itinerary assistance.</p>
                <a
                  href="https://wa.me/919354962122?text=Hello%20Fly%20With%20Friends,%20I%20would%20like%20to%20enquire%20about%20travel%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-bold hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Chat on WhatsApp</span>
                  <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f3ece7] dark:border-[#3d3028] shadow-sm hover:shadow-md transition-shadow">
                <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark mb-1">Email Enquiries</h3>
                <p className="text-xs text-text-sec-light dark:text-text-sec-dark mb-3">Send your group requirements anytime.</p>
                <a
                  href="mailto:flywithfriends06@gmail.com"
                  className="text-text-main-light dark:text-text-main-dark font-semibold hover:text-primary transition-colors text-sm break-all inline-flex items-center gap-1.5"
                >
                  <span>flywithfriends06@gmail.com</span>
                  <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-20 bg-surface-light dark:bg-surface-dark" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-main-light dark:text-text-main-dark">Our Services</h2>
                <p className="text-text-sec-light dark:text-text-sec-dark text-lg">
                  Everything you need for your next group adventure, handled by experts.
                </p>
              </div>
              <Link to="/" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                View All Services <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Hotels Card */}
              <Link to="/hotels" className="block">
                <div className="group p-6 rounded-xl border border-[#e7d9cf] dark:border-[#3d3028] bg-background-light dark:bg-background-dark hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">hotel</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-text-main-light dark:text-text-main-dark">Hotels</h3>
                  <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Comfy stays curated for your entire crew.</p>
                </div>
              </Link>

              {/* Bus Card */}
              <Link to="/bus" className="block">
                <div className="group p-6 rounded-xl border border-[#e7d9cf] dark:border-[#3d3028] bg-background-light dark:bg-background-dark hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="size-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">directions_bus</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-text-main-light dark:text-text-main-dark">Bus</h3>
                  <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Reliable and easy group transport options.</p>
                </div>
              </Link>

              {/* Packages Card */}
              <Link to="/trip-packages" className="block">
                <div className="group p-6 rounded-xl border border-[#e7d9cf] dark:border-[#3d3028] bg-background-light dark:bg-background-dark hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="size-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">backpack</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-text-main-light dark:text-text-main-dark">Packages</h3>
                  <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Full holiday bundles designed for groups.</p>
                </div>
              </Link>

              {/* Visa Card */}
              <Link to="/visa" className="block">
                <div className="group p-6 rounded-xl border border-[#e7d9cf] dark:border-[#3d3028] bg-background-light dark:bg-background-dark hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">badge</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-text-main-light dark:text-text-main-dark">Visa Services</h3>
                  <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Hassle-free documentation assistance.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Timeline */}
        <section className="py-20 bg-background-light dark:bg-background-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark">How It Works</h2>
              <p className="text-text-sec-light dark:text-text-sec-dark mt-2">Three simple steps to your next journey</p>
            </div>

            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="relative size-24 rounded-full bg-surface-light dark:bg-surface-dark shadow-lg border-2 border-[#f3ece7] dark:border-[#3d3028] flex items-center justify-center z-10 group-hover:border-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-4xl text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                      search
                    </span>
                    <div className="absolute -top-3 -right-3 size-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
                      1
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-text-main-light dark:text-text-main-dark">Browse</h3>
                  <p className="mt-2 text-text-sec-light dark:text-text-sec-dark text-sm leading-relaxed">
                    Look through our services and get inspired for your next destination.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="relative size-24 rounded-full bg-surface-light dark:bg-surface-dark shadow-lg border-2 border-[#f3ece7] dark:border-[#3d3028] flex items-center justify-center z-10 group-hover:border-[#25D366] transition-colors duration-300">
                    <svg
                      className="w-10 h-10 fill-current text-text-main-light dark:text-text-main-dark group-hover:text-[#25D366] transition-colors"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <div className="absolute -top-3 -right-3 size-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
                      2
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-text-main-light dark:text-text-main-dark">Chat</h3>
                  <p className="mt-2 text-text-sec-light dark:text-text-sec-dark text-sm leading-relaxed">
                    Click the button to chat with an agent on WhatsApp for instant quotes.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="relative size-24 rounded-full bg-surface-light dark:bg-surface-dark shadow-lg border-2 border-[#f3ece7] dark:border-[#3d3028] flex items-center justify-center z-10 group-hover:border-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-4xl text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                      flight_takeoff
                    </span>
                    <div className="absolute -top-3 -right-3 size-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
                      3
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-text-main-light dark:text-text-main-dark">Fly</h3>
                  <p className="mt-2 text-text-sec-light dark:text-text-sec-dark text-sm leading-relaxed">
                    Receive your tickets securely and enjoy your group trip with friends!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <PromoBanner title="Special Group Booking Offers" />

        {/* Why Choose Us */}
        <WhyChooseUs />
      </main>
    </>
  );
}
