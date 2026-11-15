import React, { useState } from 'react';
import SEO from '../components/SEO';
import PackageCard from '../components/PackageCard';
import { PACKAGES } from '../data/packages';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';

export default function TripPackages() {
  const [formData, setFormData] = useState({
    fullName: '',
    destination: '',
    travelDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.destination.trim() || !formData.travelDate) {
      alert('Please fill name, destination, and travel date.');
      return;
    }

    const message = `New Custom Trip Enquiry 🚀\n\nFull Name: ${formData.fullName}\nDestination: ${formData.destination}\nTravel Date: ${formData.travelDate}\n`;
    openWhatsApp(message);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Curated Group Holiday Tour Packages",
    "provider": {
      "@type": "TravelAgency",
      "name": "Fly With Friends",
      "telephone": "+918851722264",
      "url": "https://flywithfriends.com"
    },
    "serviceType": "Holiday Tour Packages",
    "description": "Tailor-made domestic and international vacation packages including stays, guided sightseeing, transfers, and activities."
  };

  return (
    <>
      <SEO
        title="Curated Holiday & Vacation Tour Packages | Fly With Friends"
        description="Explore handcrafted holiday packages for friends and families. Weekend getaways, adventure trips, beach escapes, and mountain trekking planned without chaos."
        keywords="holiday packages, group tour packages, weekend getaways, adventure trips, vacation packages for friends, budget holiday tours, fly with friends"
        canonical="/Trip_packages.html"
        schema={schema}
      />

      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        {/* Hero Section */}
        <header className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBSRl9oS26qzj_s53TEgCGD0qyyq2AJSr8WnDh_DpANhjd1zCE35-amuVX6TVEwO8iF4UjwCFVa3dY_fo1DjzYYNJoEj6AeaG-Jns_47uWdsfqoDsIEbFJ5uYvn3hI5Q77-5heMRpQl8yvid4nNfsSyQF9qSvlxjlnbS3FEMgYoUFfidM7pUFXDOL_XEFbL6fFyPx4cR3a2qHWZBIx7ICrS4lnOcfeGgjDBex9w_2VA5F1xt7aERHdIvtGxG6YNC3QyaxlkPgdm2Jiw')",
              }}
            />
            <div className="absolute inset-0 bg-background-dark/40 dark:bg-background-dark/60" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-[1280px] px-6 md:px-12 lg:px-40 py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="material-symbols-outlined text-sm">stars</span> Superior Service
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 drop-shadow-lg">
                Not Just a Trip. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">
                  A Chapter in Your Life.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                Fly With Friends crafts journeys, not itineraries. Experience the superior service that turns a simple vacation into a lasting legacy.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <span className="material-symbols-outlined text-primary">check_circle</span> Dedicated Trip Guidance
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <span className="material-symbols-outlined text-primary">check_circle</span> Personalized Stories
                </div>
              </div>
            </div>

            {/* Inquiry Form Card */}
            <div className="w-full max-w-md lg:w-[420px] bg-white dark:bg-[#2a201a] rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-xl border border-white/20 dark:border-white/10">
              <h3 className="text-xl font-bold text-[#1b130e] dark:text-white mb-1">Custom Trip? We will help 🐨</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Tell us where and what you need</p>

              <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">
                      person
                    </span>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-3 bg-background-light dark:bg-background-dark border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 text-[#1b130e] dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Destination
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">
                      map
                    </span>
                    <input
                      type="text"
                      required
                      name="destination"
                      list="indian-cities"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Manali, Goa, Thailand..."
                      className="w-full pl-10 pr-4 py-3 bg-background-light dark:bg-background-dark border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 text-[#1b130e] dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Travel Date
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-[20px]">
                      calendar_month
                    </span>
                    <input
                      type="date"
                      required
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-background-light dark:bg-background-dark border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/50 text-[#1b130e] dark:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Start Chat on WhatsApp
                </button>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-xl transition-all flex items-center gap-2 justify-center text-sm"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>Call Us Directly</span>
                </a>
              </form>
            </div>
          </div>
        </header>

        {/* Packages Grid */}
        <section className="py-16 px-4 md:px-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center text-center gap-4 mb-10">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 bg-clip-text text-transparent drop-shadow-sm">
              Trending Destinations
            </h3>
            <p className="text-base md:text-lg text-text-main dark:text-text-main-dark max-w-2xl leading-relaxed">
              Discover the most sought-after travel experiences handpicked by our experts. These trending packages blend adventure, comfort, and unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto justify-items-center">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 md:px-10 lg:px-40 py-20 bg-white dark:bg-surface-dark">
          <div className="max-w-[960px] mx-auto flex flex-col gap-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-text-main dark:text-white">What Our Travelers Say</h2>
              <div className="flex justify-center gap-1 mt-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-current">star</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-background-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gray-300 overflow-hidden">
                    <img alt="Portrait of Riya" className="w-full h-full object-cover" src="/assets/user.jpg" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-text-main dark:text-white">Riya Sharma</h5>
                    <p className="text-xs text-gray-500">Manali Mountain Escape</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                  "At first I was unsure about booking with a smaller company, but everything was so well managed. The trip was smooth, fun, and surprisingly affordable."
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-background-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gray-300 overflow-hidden">
                    <img alt="Portrait of Arjun" className="w-full h-full object-cover" src="/assets/user.jpg" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-text-main dark:text-white">Arjun Verma</h5>
                    <p className="text-xs text-gray-500">Kasol &amp; Tosh Trip</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                  "The team was super helpful and kept everything within budget. It felt personal and gave us great value for money for our group of 8."
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-background-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gray-300 overflow-hidden">
                    <img alt="Portrait of Neha" className="w-full h-full object-cover" src="/assets/user.jpg" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-text-main dark:text-white">Neha Singh</h5>
                    <p className="text-xs text-gray-500">Jim Corbett Safari</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                  "The service was excellent. The guides were friendly, the itinerary well-planned, and it all fit perfectly into our group schedule."
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
