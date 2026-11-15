import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PackageCard from '../components/PackageCard';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import SuccessModal from '../components/SuccessModal';
import CustomerContactInputs from '../components/CustomerContactInputs';
import EnquiryActionButtons from '../components/EnquiryActionButtons';
import { PACKAGES } from '../data/packages';
import { sendTripEnquiry, PHONE_NUMBER } from '../utils/whatsapp';
import { fetchHomePagePackages, saveLead } from '../utils/firebase';

export default function Home() {
  const [packagesList, setPackagesList] = useState(PACKAGES.slice(0, 4));
  const [formData, setFormData] = useState({
    destination: '',
    travelDate: '',
    travelers: 2,
    duration: '3–5 Days',
    style: 'Leisure',
    requests: '',
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    fetchHomePagePackages().then((data) => {
      if (data && data.length > 0) {
        setPackagesList(data);
      }
    });
  }, []);

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Boolean(
    formData.destination.trim() &&
    formData.travelDate &&
    formData.travelDate >= todayStr &&
    formData.travelers &&
    formData.duration &&
    formData.name?.trim() &&
    formData.phone?.trim() &&
    formData.phone.trim().replace(/\D/g, '').length >= 10
  );

  const getValidationMessage = () => {
    if (!formData.destination.trim()) return 'Please enter your destination.';
    if (!formData.travelDate) return 'Please pick travel dates.';
    if (formData.travelDate < todayStr) return 'Travel date cannot be in the past.';
    if (!formData.duration) return 'Please select trip duration.';
    if (!formData.name?.trim()) return 'Please enter your name.';
    if (!formData.phone?.trim() || formData.phone.trim().replace(/\D/g, '').length < 10) {
      return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  };

  const handleWhatsAppSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    sendTripEnquiry(formData);
  };

  const handleDropNumber = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    const payload = {
      sourcePage: 'Home',
      enquiryType: 'Custom Trip Plan Request',
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email?.trim() || '',
      destination: formData.destination.trim(),
      travelDate: formData.travelDate,
      duration: formData.duration,
      travelers: formData.travelers,
      travellers: formData.travelers,
      style: formData.style,
      requests: formData.requests || ''
    };

    try {
      const result = await saveLead(payload);
      if (result && result.success) {
        setSuccessData({
          name: formData.name,
          phone: formData.phone,
          destination: formData.destination,
          service: `Custom Trip (${formData.style} · ${formData.duration})`
        });
        setSuccessModalOpen(true);
        setFormData({
          destination: '',
          travelDate: '',
          travelers: 2,
          duration: '3–5 Days',
          style: 'Leisure',
          requests: '',
          name: '',
          phone: '',
          email: '',
        });
      } else {
        alert('Unable to submit your enquiry at this moment. Please check your network or call us directly.');
      }
    } catch (err) {
      console.error('saveLead error:', err);
      alert('Unable to submit your enquiry at this moment. Please check your network or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Fly With Friends",
    "alternateName": "Travel With Friends",
    "description": "Curated group travel experiences, holiday tour packages, flights, hotels, and bus booking services for friends and families.",
    "url": "https://flywithfriends.com",
    "logo": "https://flywithfriends.com/assets/logo.png",
    "image": "https://flywithfriends.com/assets/logo.png",
    "telephone": "+919354962122",
    "email": "flywithfriends06@gmail.com",
    "priceRange": "$$",
    "sameAs": [
      "https://www.facebook.com/share/1C7HStw4XV/",
      "https://www.instagram.com/theflywithfriends?xtok=bXY2ZTYwMGhyZHBu"
    ]
  };

  return (
    <>
      <SEO
        title="Fly With Friends | Group Travel Packages, Flights, Hotels & Bus Bookings"
        description="Plan unforgettable group trips without chaos. Fly With Friends offers curated group flight deals, hotel accommodations, bus rentals, custom holiday tour packages, and visa assistance."
        keywords="group travel, holiday packages, group flights booking, budget hotels for groups, bus rentals, tour packages for friends, fly with friends, weekend getaways, visa assistance"
        canonical="/"
        schema={schema}
      />

      <main className="travel-atmosphere flex-grow w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-10">
        
        {/* Header & Category Navigation */}
        <section className="flex flex-col gap-8">
          <div className="text-center space-y-3 pt-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-main dark:text-text-main-dark">
              Trips with Friends, Planned Without the Chaos
            </h1>
            <p className="text-lg text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto">
              Weekend scenes, college trips, birthday getaways, or just a long-overdue plan —
              we handle the travel so your group can just show up and enjoy.
            </p>
          </div>

          {/* Aesthetic Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 py-2">
            <Link
              to="/flights"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="material-symbols-outlined text-text-muted dark:text-text-muted-dark group-hover:text-primary">flight</span>
              <span className="font-bold text-text-main dark:text-text-main-dark">Flights</span>
            </Link>
            <Link
              to="/hotels"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="material-symbols-outlined text-text-muted dark:text-text-muted-dark group-hover:text-primary">hotel</span>
              <span className="font-bold text-text-main dark:text-text-main-dark">Hotels</span>
            </Link>
            <Link
              to="/bus"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="material-symbols-outlined text-text-muted dark:text-text-muted-dark group-hover:text-primary">directions_bus</span>
              <span className="font-bold text-text-main dark:text-text-main-dark">Bus</span>
            </Link>
            <Link
              to="/trip-packages"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="material-symbols-outlined text-text-muted dark:text-text-muted-dark group-hover:text-primary">luggage</span>
              <span className="font-bold text-text-main dark:text-text-main-dark">Packages</span>
            </Link>
            <Link
              to="/visa"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="material-symbols-outlined text-text-muted dark:text-text-muted-dark group-hover:text-primary">badge</span>
              <span className="font-bold text-text-main dark:text-text-main-dark">Visa</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-text-muted dark:text-text-muted-dark font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
              Carefully Selected Packages
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">support_agent</span>
              Dedicated Trip Support
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">favorite</span>
              Curated Experiences
            </div>
          </div>
        </section>

        {/* Main Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Trending Packages */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-text-main dark:text-text-main-dark">
                Trending Destinations
              </h3>
            </div>

            {/* Package cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packagesList.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                to="/Trip_packages.html"
                className="px-8 py-3 rounded-xl border-2 border-primary/20 hover:border-primary text-primary font-bold transition-all hover:bg-primary/5"
              >
                Load More Packages
              </Link>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-[#f4ece7] dark:border-[#3a2d25]">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-main dark:text-text-main-dark leading-tight">
                    Trips , Flights , Busses ?
                  </h3>
                  <p className="text-xs text-text-muted dark:text-text-muted-dark">We plan, you pack.</p>
                </div>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-4">
                {/* Destination */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark ml-1">
                    Destination
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-muted">
                      search
                    </span>
                    <input
                      name="destination"
                      required
                      type="text"
                      list="indian-cities"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="e.g. Manali, Kasol, Goa"
                      className="w-full bg-background-light dark:bg-background-dark border-0 rounded-xl py-3 pl-12 pr-4 text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary placeholder:text-text-muted/50 font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Travel Date */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark ml-1">
                    Travel Dates
                  </label>
                  <input
                    name="travelDate"
                    required
                    type="date"
                    min={todayStr}
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full bg-background-light dark:bg-background-dark border-0 rounded-xl py-3 px-4 text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary font-medium text-sm"
                  />
                </div>

                {/* Travelers + Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark ml-1">
                      Travelers
                    </label>
                    <input
                      name="travelers"
                      required
                      type="number"
                      min="1"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full bg-background-light dark:bg-background-dark border-0 rounded-xl py-3 px-4 text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary font-medium text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark ml-1">
                      Duration
                    </label>
                    <select
                      name="duration"
                      required
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full bg-background-light dark:bg-background-dark border-0 rounded-xl py-3 px-4 text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary font-medium text-sm cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option>1–2 Days</option>
                      <option>2–3 Days</option>
                      <option>3–5 Days</option>
                      <option>5–7 Days</option>
                      <option>7+ Days</option>
                    </select>
                  </div>
                </div>

                {/* Trip Style */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark ml-1">
                    Trip Style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Leisure', 'Adventure', 'Family', 'Honeymoon', 'Mountains', 'Trekking', 'Weekend Getaway'].map((st) => (
                      <label key={st} className="cursor-pointer">
                        <input
                          type="radio"
                          name="style"
                          value={st}
                          checked={formData.style === st}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="px-3 py-1.5 rounded-lg bg-background-light dark:bg-background-dark peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary text-xs font-bold border border-transparent transition-all">
                          {st}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Requests */}
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark ml-1">
                    Additional Requests
                  </label>
                  <textarea
                    name="requests"
                    rows="3"
                    value={formData.requests}
                    onChange={handleChange}
                    placeholder="Any specific hotel preferences or activities?"
                    className="w-full bg-background-light dark:bg-background-dark border-0 rounded-xl py-3 px-4 text-text-main dark:text-text-main-dark focus:ring-2 focus:ring-primary resize-none font-medium text-sm"
                  />
                </div>

                {/* Customer Contact Details */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <CustomerContactInputs
                    name={formData.name}
                    phone={formData.phone}
                    email={formData.email}
                    onChange={handleChange}
                    horizontal={false}
                  />
                </div>

                {/* Dual Enquiry Action Buttons */}
                <div className="pt-2">
                  <EnquiryActionButtons
                    isValid={isFormValid}
                    isSubmitting={isSubmitting}
                    validationMessage={getValidationMessage()}
                    onWhatsApp={handleWhatsAppSubmit}
                    onDropNumber={handleDropNumber}
                    whatsAppLabel="Send Enquiry on WhatsApp"
                    dropNumberLabel="Drop Your Number — We'll Reach Out"
                    showCallButton={true}
                    stacked={true}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Promo Offer Banner */}
        <PromoBanner title="Special Holiday Offers &amp; Group Discounts" />

        {/* Why Choose Us USP Section */}
        <WhyChooseUs />

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
