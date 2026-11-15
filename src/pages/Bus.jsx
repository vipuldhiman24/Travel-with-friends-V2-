import React, { useState } from 'react';
import SEO from '../components/SEO';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';

export default function Bus() {
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

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.to.trim() || !formData.departureDate) {
      alert('Please fill departure city, arrival city, and date.');
      return;
    }

    const message = `New BUS Enquiry 🚀\n\nFrom: ${formData.from}\nTo: ${formData.to}\nDeparture Date: ${formData.departureDate}\nReturn Date: ${formData.returnDate || 'One Way'}\nPassengers: ${formData.passengers}\n`;
    openWhatsApp(message);
  };

  const scrollToHero = (from, to) => {
    if (from && to) {
      setFormData((prev) => ({ ...prev, from, to }));
    }
    const formElement = document.getElementById('hero-text');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Group Bus & Coach Rental Service",
    "provider": {
      "@type": "TravelAgency",
      "name": "Fly With Friends",
      "telephone": "+918851722264",
      "url": "https://flywithfriends.com"
    },
    "serviceType": "Bus Reservation",
    "description": "Safe, punctual luxury bus charter and group transport for weekend getaways, college tours, and family holidays."
  };

  return (
    <>
      <SEO
        title="Group Bus Bookings & Luxury Coach Rentals | Fly With Friends"
        description="Reliable bus rentals and group coach booking services across top holiday destinations. Comfortable travel, verified operators, and instant quotes on WhatsApp."
        keywords="group bus booking, luxury bus rental, tour coach hire, outstation bus booking, bus travel for groups, fly with friends"
        canonical="/Bus.html"
        schema={schema}
      />

      <main className="flex flex-col items-center">
        {/* Banner Section */}
        <div className="w-full relative">
          <div
            className="flex min-h-[500px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 pb-32"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAk44IXxicANysji8LQzFIgIoiPLSOepjJ1LnP-B58YscJfFGm7tPbfXXYO-HAhXj7QcTrzMAtaTDLo98Ix45W20UDgtkYC1YyMS_IU2wi22aiaFFSd6k-htQ9gEnObr1OtcmUEVbNAbz6sIAo2mM5LGXz6LnE2CXisPXlkXFD3apolKbfT_qbL-WVIJYEzL18HkDvZifIuARxYNyZSuOWh-_xQt5KORCSBsduVJ0L9coH-wYywjBbYoYuyQuitSQpeD0f6Z2szx3aW")',
            }}
          >
            <div className="flex flex-col gap-4 text-center max-w-3xl">
              <h1 id="hero-text" className="text-white text-5xl font-black leading-tight tracking-[-0.033em] drop-shadow-md">
                Your 🚌 Journey Begins Here
              </h1>
              <h2 className="text-white/90 text-lg font-medium leading-normal drop-shadow-sm">
                Plan your next adventure with ease. Send us your travel details, and we'll arrange the perfect bus trip for you.
              </h2>
            </div>
          </div>
        </div>

        {/* Bus Form Card */}
        <div className="w-full px-4 sm:px-10 flex justify-center -mt-24 z-20 mb-20">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl p-6 sm:p-10 w-full max-w-5xl border border-[#f4ece7] dark:border-[#3a2d25]">
            <form onSubmit={handleWhatsApp} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* FROM */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-main dark:text-text-main-dark">From</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-text-muted">
                      <span className="material-symbols-outlined">trip_origin</span>
                    </div>
                    <input
                      required
                      type="text"
                      name="from"
                      list="indian-cities"
                      value={formData.from}
                      onChange={handleChange}
                      placeholder="Origin City or Station"
                      className="w-full bg-[#fcfaf8] dark:bg-background-dark border border-[#e8d9ce] dark:border-border-dark text-text-main dark:text-text-main-dark text-base rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-4 pl-12 placeholder:text-[#9c6c49]/60 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* TO */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-main dark:text-text-main-dark">To</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-text-muted">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <input
                      required
                      type="text"
                      name="to"
                      list="indian-cities"
                      value={formData.to}
                      onChange={handleChange}
                      placeholder="Destination City or Station"
                      className="w-full bg-[#fcfaf8] dark:bg-background-dark border border-[#e8d9ce] dark:border-border-dark text-text-main dark:text-text-main-dark text-base rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-4 pl-12 placeholder:text-[#9c6c49]/60 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* DEPARTURE */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-main dark:text-text-main-dark">Departure Date</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-text-muted">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <input
                      required
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      className="w-full bg-[#fcfaf8] dark:bg-background-dark border border-[#e8d9ce] dark:border-border-dark text-text-main dark:text-text-main-dark text-base rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-4 pl-12 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* RETURN */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-main dark:text-text-main-dark">Return Date</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-text-muted">
                      <span className="material-symbols-outlined">event</span>
                    </div>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      className="w-full bg-[#fcfaf8] dark:bg-background-dark border border-[#e8d9ce] dark:border-border-dark text-text-main dark:text-text-main-dark text-base rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-4 pl-12 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* PASSENGERS */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-text-main dark:text-text-main-dark">Passengers</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-text-muted">
                      <span className="material-symbols-outlined">group</span>
                    </div>
                    <input
                      required
                      min="1"
                      type="number"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      placeholder="No. of Passengers"
                      className="w-full bg-[#fcfaf8] dark:bg-background-dark border border-[#e8d9ce] dark:border-border-dark text-text-main dark:text-text-main-dark text-base rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary block p-4 pl-12 placeholder:text-[#9c6c49]/60 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:justify-start">
                <button
                  type="submit"
                  className="md:w-auto w-full px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-3 justify-center"
                >
                  <span className="material-symbols-outlined">chat</span>
                  <span>Send Enquiry via WhatsApp</span>
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

        {/* Selling Points */}
        <div className="w-full max-w-7xl px-4 sm:px-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] hover:shadow-md transition-shadow">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">airline_seat_recline_extra</span>
              </div>
              <h3 className="text-lg font-bold text-text-main dark:text-text-main-dark">Premium Comfort</h3>
              <p className="text-text-muted dark:text-text-muted-dark">Spacious seats, air conditioning, and power outlets on verified buses.</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] hover:shadow-md transition-shadow">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <h3 className="text-lg font-bold text-text-main dark:text-text-main-dark">Safety First</h3>
              <p className="text-text-muted dark:text-text-muted-dark">Verified operators with experienced drivers and strict hygiene standards.</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] hover:shadow-md transition-shadow">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">price_check</span>
              </div>
              <h3 className="text-lg font-bold text-text-main dark:text-text-main-dark">Transparent Pricing</h3>
              <p className="text-text-muted dark:text-text-muted-dark">No hidden charges or toll surprises. Clear upfront quotes for your group.</p>
            </div>
          </div>
        </div>

        {/* Visual Road Separator */}
        <div className="w-full bg-background-light dark:bg-background-dark py-8 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 relative h-16 flex items-center">
            <div
              className="absolute w-full h-1 top-1/2 -translate-y-1/2 left-0 road-line bg-repeat-x"
              style={{
                backgroundImage: 'linear-gradient(90deg, #e7d9d0 50%, transparent 50%)',
                backgroundSize: '40px 100%',
              }}
            />
            <div className="relative z-10 bg-background-light dark:bg-background-dark px-4 ml-10 md:ml-40 flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-4xl">directions_bus</span>
              <span className="text-xs font-bold text-text-muted dark:text-text-muted-dark uppercase tracking-widest mt-1">On the way</span>
            </div>
          </div>
        </div>

        {/* Trending Bus Routes */}
        <div className="w-full bg-background-light dark:bg-background-dark pb-24 px-6 lg:px-20">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            <div>
              <h3 className="text-text-main dark:text-text-main-dark text-3xl font-black tracking-tight mb-2">Trending Bus Routes</h3>
              <p className="text-text-muted dark:text-text-muted-dark text-lg">Explore our most popular group road trip routes.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Route 1 */}
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-surface-dark">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABpso6McIN3vQ4dBGct_TupsUj__2MparBFwh0HPgxmRYLNN9e2sCsOyG24uRinafVkuI3qYkZxxNbY-Yl0FpQxXL-cYS7ZdwQssFUIZErBMGVeOEtYaS5BEUBLDnKmBruQmB5UQfm8IzhZV0kMRnVeveG96CQa8QJGX-ClnQfWnS92zsQ_LmewJj62gxgwJpG198D7Te0povk5GiBOg3GGl9X6Nq0g4sHnC69RchieQXIUUSqPkgmve89efILQfu_kKSZdp1QcoSV')",
                    }}
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-surface-dark/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-text-main dark:text-text-main-dark shadow-sm">
                  Best Seller
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-text-main dark:text-text-main-dark">Manali Highway</h4>
                  <p className="text-text-muted dark:text-text-muted-dark text-sm">Delhi to Manali</p>
                  <button
                    onClick={() => scrollToHero('Delhi', 'Manali')}
                    className="mt-3 w-full py-2.5 rounded-lg border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-bold text-sm transition-colors hover:bg-primary hover:text-white hover:border-primary"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>

              {/* Route 2 */}
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-surface-dark">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBubW6Mu3ecpt7fD0WVsOeHZCTduoDk682cjaYs_dY_6SYEKeyOmEM9ILQCnRnchyq8oKgNBqquytNCqgeMQw-vg-swIXOD3mZUJ70ypIyxiv71GKWtCuAlV_lkGtC0lXby1hhtRCF5IFRVLtXQPK7h0lPKRKYb38KuNnNrTkzEJYFJMYGmjY6r23pPknSW5vUV_cGJQsQIS3E_DVBvgvgn5U1OW_GnfovDAGjQAjn0GHAySS2i3W4kcwAnJ0SQHrvo0nBBhA_MV5BT')",
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-text-main dark:text-text-main-dark">Coastal Cruiser</h4>
                  <p className="text-text-muted dark:text-text-muted-dark text-sm">Mumbai to Goa</p>
                  <button
                    onClick={() => scrollToHero('Mumbai', 'Goa')}
                    className="mt-3 w-full py-2.5 rounded-lg border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-bold text-sm transition-colors hover:bg-primary hover:text-white hover:border-primary"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>

              {/* Route 3 */}
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-surface-dark">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvHctBj2JDlK40iSgqgxbgaYA0_TffCkvjmhIhsPKM6_ta7xfWQJkpg5j3ySFrI4o-xRYXWdLJsvIRnINi33-x6pVPB81WiqmBmUA0ezQZc4t0GOkQPUHCFDf-ryKJ2R_-zlVA-R0yuij83IchrMrlrjdJR5Ov_DuRaHcmHQrVH6ikj-l0YgOgyQOAHTy5c0ZnlIx395nxPaAklMhZU0_kFOYoVMGRZETkxwT8JBVkATzU3GcOEm9To5JlgzrNQwXw-n4WgCMMVMXp')",
                    }}
                  />
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-text-main dark:text-text-main-dark">Royal Rajasthan</h4>
                  <p className="text-text-muted dark:text-text-muted-dark text-sm">Jaipur to Udaipur</p>
                  <button
                    onClick={() => scrollToHero('Jaipur', 'Udaipur')}
                    className="mt-3 w-full py-2.5 rounded-lg border border-border-light dark:border-border-dark text-text-main dark:text-text-main-dark font-bold text-sm transition-colors hover:bg-primary hover:text-white hover:border-primary"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
