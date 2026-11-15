import React, { useState } from 'react';
import SEO from '../components/SEO';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import SuccessModal from '../components/SuccessModal';
import CustomerContactInputs from '../components/CustomerContactInputs';
import EnquiryActionButtons from '../components/EnquiryActionButtons';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';
import { saveLead } from '../utils/firebase';

export default function Hotels() {
  const [formData, setFormData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    hotelRating: '4 Star',
    stayType: 'Hotel',
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToSearch = (destination) => {
    if (destination) {
      setFormData((prev) => ({ ...prev, destination }));
    }
    const bar = document.getElementById('hotel-search-bar');
    if (bar) {
      bar.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const isFormValid = Boolean(
    formData.destination.trim() &&
    formData.checkIn &&
    formData.checkIn >= todayStr &&
    (!formData.checkOut || formData.checkOut >= formData.checkIn) &&
    formData.name?.trim() &&
    formData.phone?.trim() &&
    formData.phone.trim().replace(/\D/g, '').length >= 10
  );

  const getValidationMessage = () => {
    if (!formData.destination.trim()) return 'Please enter destination city or hotel name.';
    if (!formData.checkIn) return 'Please choose a check-in date.';
    if (formData.checkIn < todayStr) return 'Check-in date cannot be in the past.';
    if (formData.checkOut && formData.checkOut < formData.checkIn) return 'Check-out date cannot be earlier than check-in date.';
    if (!formData.name?.trim()) return 'Please enter your name.';
    if (!formData.phone?.trim() || formData.phone.trim().replace(/\D/g, '').length < 10) {
      return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  };

  const handleWhatsApp = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isFormValid) return;

    const message = `New HOTEL Enquiry 🚀

Customer: ${formData.name}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}\n` : ''}Destination: ${formData.destination}
Check-In Date: ${formData.checkIn}
Check-Out Date: ${formData.checkOut || 'Flexible'}
Guests: ${formData.guests}
Rooms: ${formData.rooms}
Preferred Rating: ${formData.hotelRating}
Stay Type: ${formData.stayType}

Please share available hotel deals and group discount rates.`;

    openWhatsApp(message);

    setSuccessData({
      name: formData.name,
      phone: formData.phone,
      destination: formData.destination,
      service: `Hotel Stay (${formData.hotelRating}) (WhatsApp)`
    });
    setSuccessModalOpen(true);

    saveLead({
      sourcePage: 'Hotels',
      enquiryType: 'Hotel Accommodation Enquiry (WhatsApp)',
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email?.trim() || '',
      destination: formData.destination.trim(),
      travelDate: formData.checkIn,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut || 'Flexible',
      guests: formData.guests,
      travellers: formData.guests,
      rooms: formData.rooms,
      hotelRating: formData.hotelRating,
      stayType: formData.stayType
    }).catch((err) => console.warn('saveLead warning:', err));
  };

  const handleDropNumber = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setSuccessData({
      name: formData.name,
      phone: formData.phone,
      destination: formData.destination,
      service: `Hotel Stay (${formData.hotelRating})`
    });
    setSuccessModalOpen(true);

    const payload = {
      sourcePage: 'Hotels',
      enquiryType: 'Hotel Accommodation Enquiry',
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email?.trim() || '',
      destination: formData.destination.trim(),
      travelDate: formData.checkIn,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut || 'Flexible',
      guests: formData.guests,
      travellers: formData.guests,
      rooms: formData.rooms,
      hotelRating: formData.hotelRating,
      stayType: formData.stayType
    };

    try {
      await saveLead(payload);
    } catch (err) {
      console.warn('saveLead error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Group Hotel Accommodation Service',
    provider: {
      '@type': 'TravelAgency',
      name: 'Fly With Friends',
      telephone: PHONE_NUMBER,
      url: 'https://flywithfriends.com',
    },
    serviceType: 'Lodging Reservation',
    description:
      'Curated hotel rooms and resorts tailored for groups and friends with verified amenities and negotiated group rates.',
  };

  return (
    <>
      <SEO
        title="Group Hotel Bookings & Accommodation Deals | Fly With Friends"
        description="Find and book comfortable, verified hotel stays curated for groups, friends, and families. Best price guarantee and 24/7 dedicated travel support."
        keywords="group hotel booking, budget stays for groups, holiday resort booking, hotels for friends, travel accommodation"
        canonical="/hotels"
        schema={schema}
      />

      <main className="flex-grow">
        {/* Hero Section with Full-Width Luxury Resort Background */}
        <section className="relative w-full overflow-hidden pt-8 pb-14 md:pt-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-[#1f1610]">
          {/* Background image layer with luxury hotel ambience */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
              alt="Luxury Resort Stays"
              className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105"
            />
            {/* Dark overlays for high contrast and readability on all devices */}
            <div className="absolute inset-0 bg-black/45 md:bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1f1610]" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
            {/* Header Copy */}
            <div className="text-center text-white max-w-3xl mx-auto mb-6 md:mb-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-sm">hotel</span>
                Curated Stays &amp; Group Rooms
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Group Stays Handpicked for <br className="hidden sm:inline" />
                <span className="text-primary">Comfort &amp; Community.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2 max-w-xl mx-auto">
                Skip endless booking tabs. Get handpicked, verified resorts with adjoining rooms and special group rates across India and abroad.
              </p>
            </div>

            {/* Modern Horizontal Hotel Search Widget */}
            <div
              id="hotel-search-bar"
              className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-white/10 backdrop-blur-md"
            >
              <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                {/* Top Row: Stay Type Tabs */}
                <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                  {['Hotel', 'Resort', 'Villa / Homestay', 'Boutique Stay'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, stayType: type }))}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        formData.stayType === type
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-background-light dark:bg-background-dark text-text-muted hover:text-text-main'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Horizontal Inputs Grid (Desktop row / Mobile compact) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  {/* Destination (lg:col-span-4) */}
                  <div className="lg:col-span-4 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      City / Hotel Location
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                      <input
                        type="text"
                        required
                        name="destination"
                        list="indian-cities"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Goa, Manali, Bali, Jaipur..."
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Check-In (lg:col-span-2) */}
                  <div className="lg:col-span-2 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Check-In
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* Check-Out (lg:col-span-2) */}
                  <div className="lg:col-span-2 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Check-Out <span className="text-[10px] lowercase text-gray-400">(optional)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">event_repeat</span>
                      <input
                        type="date"
                        min={formData.checkIn || todayStr}
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* Guests & Rating (lg:col-span-4) */}
                  <div className="lg:col-span-4 flex flex-col sm:flex-row items-center gap-2">
                    <div className="w-full bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                        Guests &amp; Rating
                      </label>
                      <div className="flex items-center gap-3">
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, '10+ Group'].map((g) => (
                            <option key={g} value={g}>
                              {g} {g === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>

                        <span className="text-gray-300">|</span>

                        <select
                          name="hotelRating"
                          value={formData.hotelRating}
                          onChange={handleChange}
                          className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-primary focus:ring-0 cursor-pointer"
                        >
                          <option value="Budget Friendly">Budget Friendly</option>
                          <option value="3 Star">3 ★ Standard</option>
                          <option value="4 Star">4 ★ Premium</option>
                          <option value="5 Star">5 ★ Luxury</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Contact Details (Full Width, outside grid) */}
                <div className="w-full pt-4 border-t border-gray-100 dark:border-gray-800">
                  <CustomerContactInputs
                    name={formData.name}
                    phone={formData.phone}
                    email={formData.email}
                    onChange={handleChange}
                    horizontal={true}
                  />
                </div>

                {/* Dual Enquiry Action Buttons (Full Width, outside grid) */}
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
        </section>

        {/* Promotional Offers Banner */}
        <PromoBanner title="Hotel Offers &amp; Group Discounts" />

        {/* Why Choose Us USP Section */}
        <WhyChooseUs />

        {/* Popular Hotel Destinations */}
        <section className="py-16 px-4 lg:px-10 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Handpicked Stays</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-text-main-dark mt-1">
              Top Group Stay Destinations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/assets/packages/manali.jpg"
                  onError={(e) => { e.currentTarget.src = '/assets/Manali.jpg'; }}
                  alt="Mountain View Cottages in Manali"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  Himachal Pradesh
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-text-main dark:text-text-main-dark">
                  Riverside &amp; Mountain Cottages
                </h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                  Ideal for group bonfires, adjoining balconies, and scenic valley views.
                </p>
                <div className="mt-4 pt-3 border-t border-[#f4ece7] dark:border-[#3a2d25] flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">From ₹1,999/night</span>
                  <button
                    type="button"
                    onClick={() => scrollToSearch('Manali')}
                    className="text-xs font-bold text-primary hover:text-orange-600 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Enquire Now →
                  </button>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/assets/packages/bali.jpg"
                  onError={(e) => { e.currentTarget.src = '/assets/Bali.jfif'; }}
                  alt="Private Pool Villas in Bali"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  Indonesia
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-text-main dark:text-text-main-dark">
                  Private Pool Villas &amp; Resorts
                </h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                  Exclusive group privacy, private chef options, and tropical gardens.
                </p>
                <div className="mt-4 pt-3 border-t border-[#f4ece7] dark:border-[#3a2d25] flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">From ₹6,499/night</span>
                  <button
                    type="button"
                    onClick={() => scrollToSearch('Bali')}
                    className="text-xs font-bold text-primary hover:text-orange-600 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Enquire Now →
                  </button>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/assets/packages/dubai.jpg"
                  onError={(e) => { e.currentTarget.src = '/assets/Burj Khalifa.jfif'; }}
                  alt="City Suites in Dubai"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  UAE
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-text-main dark:text-text-main-dark">
                  Downtown Luxury Suites
                </h3>
                <p className="text-xs text-text-muted dark:text-text-muted-dark mt-1">
                  Connected rooms, metro access, rooftop pools, and skyline views.
                </p>
                <div className="mt-4 pt-3 border-t border-[#f4ece7] dark:border-[#3a2d25] flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">From ₹8,999/night</span>
                  <button
                    type="button"
                    onClick={() => scrollToSearch('Dubai')}
                    className="text-xs font-bold text-primary hover:text-orange-600 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Enquire Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

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
