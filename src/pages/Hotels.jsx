import React, { useState } from 'react';
import SEO from '../components/SEO';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';

export default function Hotels() {
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    travelers: 2,
    hotelRating: '3 Star',
    packageType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.destination.trim() || !formData.dates) {
      alert('Please fill in destination and travel dates.');
      return;
    }

    const message = `New HOTEL Enquiry 🚀\n\nDestination: ${formData.destination}\nTravel Dates: ${formData.dates}\nTravelers: ${formData.travelers}\nHotel Rating: ${formData.hotelRating}\nPackage Type: ${formData.packageType || 'Standard'}\n`;
    openWhatsApp(message);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Group Hotel Accommodation Service",
    "provider": {
      "@type": "TravelAgency",
      "name": "Fly With Friends",
      "telephone": "+918851722264",
      "url": "https://flywithfriends.com"
    },
    "serviceType": "Lodging Reservation",
    "description": "Curated hotel rooms and resorts tailored for groups and friends with verified amenities and negotiated group rates."
  };

  return (
    <>
      <SEO
        title="Group Hotel Bookings & Accommodation Deals | Fly With Friends"
        description="Find and book comfortable, verified hotel stays curated for groups, friends, and families. Best price guarantee and 24/7 dedicated travel support."
        keywords="group hotel booking, budget stays for groups, holiday resort booking, hotels for friends, travel accommodation"
        canonical="/Hotels.html"
        schema={schema}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-4 py-8 lg:py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold w-fit">
                <span className="material-symbols-outlined text-sm">hotel</span>
                Curated Group Stays
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-text-main dark:text-white leading-[1.1]">
                Group Stays Handpicked for <br className="hidden sm:inline" />
                <span className="text-primary">Comfort & Community.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                Skip endless booking tabs. Get handpicked, verified resorts and boutique stays with adjoining rooms and special group rates across India and global destinations.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] text-center">
                  <span className="material-symbols-outlined text-primary text-2xl mb-1">verified</span>
                  <div className="text-xs font-bold text-text-main dark:text-white">Verified Stays</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] text-center">
                  <span className="material-symbols-outlined text-primary text-2xl mb-1">group</span>
                  <div className="text-xs font-bold text-text-main dark:text-white">Group Blocks</div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] text-center">
                  <span className="material-symbols-outlined text-primary text-2xl mb-1">savings</span>
                  <div className="text-xs font-bold text-text-main dark:text-white">Direct Rates</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hotel Enquiry Form */}
            <div className="lg:col-span-5">
              <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">edit_note</span>
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-text-main dark:text-white">Enquire Now</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Get a quote via WhatsApp instantly</p>
                  </div>
                </div>

                <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                  {/* Destination */}
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
                        list="indian-cities"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="E.g. Goa, Manali, Bali..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-bold"
                      />
                    </div>
                  </div>

                  {/* Dates + Travelers */}
                  <div className="grid grid-cols-2 gap-4">
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
                          name="dates"
                          value={formData.dates}
                          onChange={handleChange}
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm font-bold"
                        />
                      </div>
                    </div>

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
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-400 text-sm font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hotel Star Rating */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                      Hotel Category
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['2 Star', '3 Star', '4 Star', '5 Star'].map((star) => (
                        <label key={star} className="cursor-pointer">
                          <input
                            type="radio"
                            name="hotelRating"
                            value={star}
                            checked={formData.hotelRating === star}
                            onChange={handleChange}
                            className="peer hidden"
                          />
                          <div className="flex flex-col items-center justify-center gap-1 h-14 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-gray-400 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                            <span className="material-symbols-outlined text-xl">star</span>
                            <span className="text-xs font-bold">{star.split(' ')[0]}★</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Package Type */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                      Package Type
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                        category
                      </span>
                      <select
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleChange}
                        className="w-full h-12 pl-12 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 text-text-main dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-bold text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Select package (Optional)</option>
                        <option>Honeymoon Special</option>
                        <option>Family Vacation</option>
                        <option>Adventure Trip</option>
                        <option>Luxury Retreat</option>
                        <option>Group Tour</option>
                        <option>Solo Expedition</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-14 mt-2 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    Request Details via WhatsApp
                  </button>

                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 justify-center text-sm"
                  >
                    <span className="material-symbols-outlined text-lg">call</span>
                    <span>Call Us Directly</span>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white dark:bg-surface-dark py-20 px-4">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                <span className="h-0.5 w-8 bg-primary" />
                Why Choose Us
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-white leading-tight">
                We Make Travel <br />Simple &amp; Memorable
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                From solo adventures to large group expeditions, Fly With Friends handles the logistics so you can focus on the experience. We partner with verified properties to give you authentic journeys.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 mt-4">
                <div className="flex flex-col gap-2">
                  <div className="text-primary mb-2">
                    <span className="material-symbols-outlined text-4xl">verified_user</span>
                  </div>
                  <h4 className="font-bold text-lg text-text-main dark:text-white">Trusted Booking</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Secure booking coordination and verified stays.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-primary mb-2">
                    <span className="material-symbols-outlined text-4xl">support_agent</span>
                  </div>
                  <h4 className="font-bold text-lg text-text-main dark:text-white">Direct Support</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Available via call &amp; WhatsApp for trip guidance.</p>
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  alt="Friends enjoying holiday"
                  className="rounded-2xl object-cover h-64 w-full translate-y-8"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFp8IhZB0xq5YydsYZ8PxYWXTDh-rojzysr5WKaYyD_AEXPmT5l176L-_HQIu_hv8WGLDmrFMS7qTgc6FdMRVRE19G4dCkVIR_23qUVB6s6xh6qRjc3JxfonuREX-MRigkVbHp43c8BZ1AQk15sqTaFX8KdaC8Tve8nL_-3aLOAbuCvyMj0IJVRMWzs-tFhgh1j6c3tFk02oapASweb8ledsi7Ip8Bfgm-EqECVRF-fvJSGFZK7Sj39J3rH0WAy_RPHiUrV_VTV87k"
                />
                <img
                  alt="Venice canal with gondola"
                  className="rounded-2xl object-cover h-64 w-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbu9sY-512mKk_LuqOEJ-mbcJwCuobjW1fWglRYBurnh5pu2U9zNjMfrOt4VtmLYYtOBNv9M1a22uKvFbUAd0iLRvF-S3pxkrVB0pb_Cux1L4RjiHBKyATaffvz_WhoZLW3tErVesLiospIoVbzLdz2Bf2OblJwpXnCkLi6hsCCRsvJ3q-wQIec6ZKDAMf7-8rUAZiydbhxjyT54iVLfNTwP1G3W-yrQeZgbEyve474Kr8aCCU96En7U-i_-Xs5Ap496xFJbxYwZVY"
                />
              </div>
              <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-orange-100 dark:bg-orange-900/30 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
