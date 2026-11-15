import React, { useState } from 'react';
import SEO from '../components/SEO';
import WhyChooseUs from '../components/WhyChooseUs';
import PromoBanner from '../components/PromoBanner';
import SuccessModal from '../components/SuccessModal';
import CustomerContactInputs from '../components/CustomerContactInputs';
import EnquiryActionButtons from '../components/EnquiryActionButtons';
import { openWhatsApp, PHONE_NUMBER } from '../utils/whatsapp';
import { saveLead } from '../utils/firebase';

export default function Visa() {
  const [formData, setFormData] = useState({
    destination: '',
    passportCountry: 'India',
    purpose: 'Tourist & Leisure',
    travelDate: '',
    travelers: 1,
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = Boolean(
    formData.destination.trim() &&
    formData.name?.trim() &&
    formData.phone?.trim() &&
    formData.phone.trim().replace(/\D/g, '').length >= 10
  );

  const getValidationMessage = () => {
    if (!formData.destination.trim()) return 'Please enter your destination country.';
    if (!formData.name?.trim()) return 'Please enter your name.';
    if (!formData.phone?.trim() || formData.phone.trim().replace(/\D/g, '').length < 10) {
      return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  };

  const handleWhatsApp = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isFormValid) return;

    const message = `New VISA Consultation Request 🚀

Customer: ${formData.name}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}\n` : ''}Destination Country: ${formData.destination}
Passport Issuing Country: ${formData.passportCountry}
Purpose of Visit: ${formData.purpose}
Expected Travel Date: ${formData.travelDate || 'Flexible'}
Travelers: ${formData.travelers} Pax

Please share the document checklist, processing timeline, and visa fees.`;

    openWhatsApp(message);

    setSuccessData({
      name: formData.name,
      phone: formData.phone,
      destination: formData.destination,
      service: `Visa (${formData.purpose}) (WhatsApp)`
    });
    setSuccessModalOpen(true);

    saveLead({
      sourcePage: 'Visa',
      enquiryType: 'Visa Consultation Enquiry (WhatsApp)',
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email?.trim() || '',
      destination: formData.destination.trim(),
      passportCountry: formData.passportCountry,
      purpose: formData.purpose,
      travelDate: formData.travelDate || 'Flexible',
      travelers: formData.travelers,
      travellers: formData.travelers
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
      service: `Visa (${formData.purpose})`
    });
    setSuccessModalOpen(true);

    const payload = {
      sourcePage: 'Visa',
      enquiryType: 'Visa Consultation Enquiry',
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email?.trim() || '',
      destination: formData.destination.trim(),
      passportCountry: formData.passportCountry,
      purpose: formData.purpose,
      travelDate: formData.travelDate || 'Flexible',
      travelers: formData.travelers,
      travellers: formData.travelers
    };

    try {
      await saveLead(payload);
    } catch (err) {
      console.warn('saveLead error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectCountry = (country) => {
    setFormData((prev) => ({ ...prev, destination: country }));
    const formElement = document.getElementById('visa-search-bar');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        canonical="/visa"
        structuredData={structuredData}
      />

      <main className="flex-grow flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative w-full py-10 md:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#1f1610]">
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
              alt="World travel visa passport"
              className="w-full h-full object-cover opacity-30 filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1f1610]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
            {/* Header Text */}
            <div className="text-center text-white max-w-3xl mx-auto mb-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="material-symbols-outlined text-sm">verified</span>
                Certified Visa Experts • 99.2% Approval Rate
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Travel Borders <span className="text-primary">Without Limits.</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2 max-w-xl mx-auto">
                Navigate global entry requirements with ease. Our visa experts handle the complex paperwork so you can focus on your journey.
              </p>

              {/* Trust Indicators above Form (Matches Reference Screenshot 3) */}
              <div className="flex flex-wrap justify-center items-center gap-6 mt-4 text-xs font-semibold text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">schedule</span>
                  Quick &amp; Easy Process
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">person</span>
                  Expert Guidance
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-base">verified_user</span>
                  100% Secure Filing
                </div>
              </div>
            </div>

            {/* Horizontal Visa Search Form (Matches Reference Screenshot 3) */}
            <div
              id="visa-search-bar"
              className="w-full bg-surface-light dark:bg-surface-dark rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-white/10 backdrop-blur-md"
            >
              <form onSubmit={handleWhatsApp} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
                  {/* Your Destination (lg:col-span-4) */}
                  <div className="lg:col-span-4 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Your Destination
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">travel_explore</span>
                      <input
                        type="text"
                        required
                        name="destination"
                        list="countries-list"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Japan, France, UAE, Thailand..."
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 placeholder:text-gray-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Passport Issuing Country (lg:col-span-4) */}
                  <div className="lg:col-span-4 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Passport Country
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">public</span>
                      <input
                        type="text"
                        required
                        name="passportCountry"
                        list="countries-list"
                        value={formData.passportCountry}
                        onChange={handleChange}
                        placeholder="E.g. India"
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* Purpose of Visit (lg:col-span-4) */}
                  <div className="lg:col-span-4 bg-background-light dark:bg-background-dark/70 rounded-xl p-3 border border-gray-200 dark:border-gray-700/80 hover:border-primary/50 transition-colors">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-0.5">
                      Purpose of Visit
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl">work</span>
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="w-full bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-text-main dark:text-text-main-dark focus:ring-0 cursor-pointer"
                      >
                        <option value="Tourist & Leisure">Tourist &amp; Leisure</option>
                        <option value="Business & Meetings">Business &amp; Meetings</option>
                        <option value="Transit Visa">Transit Visa</option>
                        <option value="Family / Friend Visit">Family / Friend Visit</option>
                        <option value="Student Visa">Student Visa</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Sub row with quick options */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-text-muted dark:text-text-muted-dark border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <span>Popular:</span>
                    {['Japan', 'Schengen (Europe)', 'Indonesia (Bali)', 'Dubai (UAE)'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleSelectCountry(c)}
                        className="px-2 py-0.5 rounded bg-background-light dark:bg-background-dark hover:text-primary font-medium transition-colors"
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-primary hover:underline font-bold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">call</span>
                    Direct Visa Desk: +91 93549 62122
                  </a>
                </div>

                {/* Customer Contact Details */}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                  <CustomerContactInputs
                    name={formData.name}
                    phone={formData.phone}
                    email={formData.email}
                    onChange={handleChange}
                    horizontal={true}
                  />
                </div>

                {/* Dual Enquiry Action Buttons */}
                <div className="pt-2">
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

        {/* Promo Offer Banner */}
        <PromoBanner title="Visa Assistance &amp; Travel Offers" />

        {/* Why Choose Us USP Section (Matches Reference Screenshots 1 & 4) */}
        <WhyChooseUs />

        {/* Popular Visa Destinations */}
        <section className="py-16 px-4 lg:px-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-text-main-light dark:text-text-main-dark">
                Popular Visa Destinations
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                We have high success rates and express processing for these countries.
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Japan</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium opacity-90 border border-white/30 px-2 py-1 rounded">
                    Tourist &amp; Business
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectCountry('Japan')}
                    className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Enquire now →
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Schengen Area</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium opacity-90 border border-white/30 px-2 py-1 rounded">
                    Europe Travel Visa
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectCountry('Schengen (Europe)')}
                    className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Enquire now →
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                <h3 className="text-2xl font-bold mb-1">Indonesia</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium opacity-90 border border-white/30 px-2 py-1 rounded">
                    Visa on Arrival
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectCountry('Indonesia (Bali)')}
                    className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Enquire now →
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
