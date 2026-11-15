import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import PackageCard from '../components/PackageCard';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import SuccessModal from '../components/SuccessModal';
import CustomerContactInputs from '../components/CustomerContactInputs';
import EnquiryActionButtons from '../components/EnquiryActionButtons';
import { PACKAGES } from '../data/packages';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';
import { fetchPackages, saveLead } from '../utils/firebase';

export default function TripPackages() {
  const [packagesList, setPackagesList] = useState(PACKAGES);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    destination: '',
    preferredTravelDate: '',
    travelers: 2,
    budget: 'Not decided yet',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    fetchPackages().then((data) => {
      if (data && data.length > 0) {
        setPackagesList(data);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Boolean(
    formData.fullName.trim() &&
    formData.destination.trim() &&
    formData.preferredTravelDate &&
    formData.travelers &&
    (typeof formData.travelers === 'string' ? formData.travelers.trim() : formData.travelers >= 1) &&
    formData.phone?.trim() &&
    formData.phone.trim().replace(/\D/g, '').length >= 10
  );

  const getValidationMessage = () => {
    if (!formData.fullName.trim()) return 'Please enter your name.';
    if (!formData.destination.trim()) return 'Please enter dream destination.';
    if (!formData.preferredTravelDate) return 'Please choose a preferred travel date.';
    if (!formData.travelers || (typeof formData.travelers === 'number' && formData.travelers < 1)) {
      return 'Please enter or select number of travellers.';
    }
    if (!formData.phone?.trim() || formData.phone.trim().replace(/\D/g, '').length < 10) {
      return 'Please enter a valid 10-digit contact number.';
    }
    return '';
  };

  const handleWhatsApp = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isFormValid) return;

    const message = `Hello Fly With Friends 👋

I want to plan a custom holiday trip:
Name: ${formData.fullName}
Contact: ${formData.phone}
${formData.email ? `Email: ${formData.email}\n` : ''}Destination: ${formData.destination}
Preferred Travel Date: ${formData.preferredTravelDate}
Number of Travellers: ${formData.travelers} Pax
Approximate Budget: ${formData.budget || 'Not decided yet'}

Please share a customized package itinerary and budget estimate.`;

    openWhatsApp(message);
  };

  const handleDropNumber = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    const payload = {
      sourcePage: 'TripPackages',
      enquiryType: 'Custom Holiday Package Request',
      name: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email?.trim() || '',
      destination: formData.destination.trim(),
      preferredTravelDate: formData.preferredTravelDate,
      travelDate: formData.preferredTravelDate,
      travelers: formData.travelers,
      travellers: formData.travelers,
      budget: formData.budget || 'Not decided yet',
      groupSize: `${formData.travelers} Travellers`
    };

    const result = await saveLead(payload);
    setIsSubmitting(false);

    if (result.success) {
      setSuccessData({
        name: formData.fullName,
        phone: formData.phone,
        destination: formData.destination,
        service: `Package Plan (${formData.travelers} Pax · ${formData.budget || 'Flexible'})`
      });
      setSuccessModalOpen(true);
    } else {
      alert('Unable to submit enquiry right now. Please try sending via WhatsApp or calling directly.');
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Curated Group Holiday Tour Packages',
    description:
      'Handcrafted domestic and international holiday tour packages designed for groups, friends, and families.',
    itemListElement: PACKAGES.map((pkg, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: pkg.title,
      url: `https://flywithfriends.com/trips?pkg=${pkg.id}`,
    })),
  };

  return (
    <>
      <SEO
        title="Group Tour Packages & Holiday Trips for Friends | Fly With Friends"
        description="Explore handcrafted group holiday packages to Manali, Dubai, Bali, and Vaishno Devi. Tailored itineraries, group discounts, and seamless WhatsApp booking."
        keywords="group tour packages, travel with friends, holiday trips, manali tour package, dubai group trip, bali holiday package, spiritual yatra"
        canonical="/trip-packages"
        schema={schema}
      />

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <header className="relative w-full pt-8 pb-14 md:pt-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-[#1f1610] overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
              alt="Road trip friends adventure"
              className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1f1610]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
            {/* Header Text */}
            <div className="text-center text-white max-w-3xl mx-auto mb-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-sm">luggage</span>
                Handcrafted Holiday Packages
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Curated Trips for <span className="text-primary">Unforgettable Memories.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2 max-w-xl mx-auto">
                Fly With Friends crafts journeys, not just itineraries. From weekend hill station escapes to tropical beach getaways.
              </p>
            </div>

            {/* Horizontal Custom Trip Planner Bar */}
            <div className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-white/10 backdrop-blur-md">
              <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">auto_awesome</span>
                    Plan a Custom Trip with Travel Specialists
                  </span>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">call</span>
                    Direct Call: +91 88517 22264
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  {/* Destination (lg:col-span-4) */}
                  <div className="lg:col-span-4 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Dream Destination
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">map</span>
                      <input
                        type="text"
                        required
                        name="destination"
                        list="indian-cities"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Manali, Goa, Dubai, Bali..."
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Preferred Travel Date (lg:col-span-3) */}
                  <div className="lg:col-span-3 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Preferred Travel Date <span className="text-red-500 font-extrabold">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">calendar_month</span>
                      <input
                        type="date"
                        required
                        name="preferredTravelDate"
                        value={formData.preferredTravelDate}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* Number of Travellers (lg:col-span-2) */}
                  <div className="lg:col-span-2 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Travellers <span className="text-red-500 font-extrabold">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">group</span>
                      <select
                        required
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+ Group'].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Person' : 'People'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Approximate Budget Per Person (lg:col-span-3) */}
                  <div className="lg:col-span-3 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Budget Per Person <span className="text-[10px] text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">payments</span>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 cursor-pointer"
                      >
                        <option value="Not decided yet">Not decided yet</option>
                        <option value="Under ₹5,000">Under ₹5,000</option>
                        <option value="₹5,000–₹10,000">₹5,000–₹10,000</option>
                        <option value="₹10,000–₹20,000">₹10,000–₹20,000</option>
                        <option value="₹20,000–₹50,000">₹20,000–₹50,000</option>
                        <option value="Above ₹50,000">Above ₹50,000</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Customer Contact Details (Full Width) */}
                <div className="w-full pt-3 border-t border-gray-100 dark:border-gray-800">
                  <CustomerContactInputs
                    name={formData.fullName}
                    phone={formData.phone}
                    email={formData.email}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (name === 'name') setFormData((prev) => ({ ...prev, fullName: value }));
                      else setFormData((prev) => ({ ...prev, [name]: value }));
                    }}
                    horizontal={true}
                  />
                </div>

                {/* Dual Enquiry Action Buttons (Full Width) */}
                <div className="w-full pt-2">
                  <EnquiryActionButtons
                    isValid={isFormValid}
                    isSubmitting={isSubmitting}
                    validationMessage={getValidationMessage()}
                    onWhatsApp={handleWhatsApp}
                    onDropNumber={handleDropNumber}
                    whatsAppLabel="Send Enquiry on WhatsApp"
                    dropNumberLabel="Drop Your Number — We'll Reach Out"
                  />
                </div>
              </form>
            </div>
          </div>
        </header>

        {/* 1. All Trip Packages (Package Catalogue immediately visible after Hero) */}
        <section className="py-16 px-4 md:px-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center text-center gap-3 mb-10">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Top Packages</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main dark:text-text-main-dark">
              Trending Holiday Destinations
            </h2>
            <p className="text-sm sm:text-base text-text-muted dark:text-text-muted-dark max-w-2xl leading-relaxed">
              Discover the most sought-after travel experiences handpicked by our experts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto justify-items-center">
            {packagesList.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </section>

        {/* 2. Why Choose Us USP Section */}
        <WhyChooseUs />

        {/* 3. Testimonials (What Our Travelers Say) */}
        <section className="w-full px-4 md:px-10 py-16 bg-surface-light dark:bg-surface-dark border-t border-[#f4ece7] dark:border-[#3a2d25]">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-white">What Our Travelers Say</h3>
              <div className="flex justify-center gap-1 mt-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-current text-xl">star</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-5 rounded-2xl bg-background-light dark:bg-background-dark border border-[#f4ece7] dark:border-[#3a2d25]">
                <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed italic">
                  "Planned our college reunion trip to Manali with Fly With Friends. The bus was super clean and the cottage had an insane river view!"
                </p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                    AS
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-main dark:text-white">Aman Sharma</h4>
                    <p className="text-[10px] text-gray-400">Manali Group Trip</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-background-light dark:bg-background-dark border border-[#f4ece7] dark:border-[#3a2d25]">
                <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed italic">
                  "Booked our Dubai trip including visas and flights. Saved almost ₹15,000 on group fares compared to online travel portals!"
                </p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                    PV
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-main dark:text-white">Pooja Verma</h4>
                    <p className="text-[10px] text-gray-400">Dubai Vacation</p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-background-light dark:bg-background-dark border border-[#f4ece7] dark:border-[#3a2d25]">
                <p className="text-xs text-text-muted dark:text-text-muted-dark leading-relaxed italic">
                  "Our family Vaishno Devi yatra was seamless. Helicopter slots and Katra hotel transfers were arranged on time. Highly recommended!"
                </p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                    RK
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-main dark:text-white">Rajesh Kapoor</h4>
                    <p className="text-[10px] text-gray-400">Vaishno Devi Yatra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Promotional Offers Banner (Relocated after catalogue & testimonials) */}
        <PromoBanner title="Package Discounts &amp; Group Savings" />

        {/* Branded Success Popup */}
        <SuccessModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          data={successData}
        />
      </main>
    </>
  );
}
