import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import WhyChooseUs from '../components/WhyChooseUs';
import { PHONE_NUMBER } from '../utils/whatsapp';

export default function Terms() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms and Conditions',
    url: 'https://flywithfriends.com/terms.html',
    description:
      'Consolidated booking terms, cancellation policy, refund rules, privacy statement, and payment security standards for Fly With Friends.',
  };

  return (
    <>
      <SEO
        title="Terms & Conditions, Cancellation & Refund Policy | Fly With Friends"
        description="Read the official terms and conditions, cancellation policy, refund policy, privacy practices, and payment security guidelines for Fly With Friends."
        keywords="fly with friends terms and conditions, travel booking cancellation policy, refund policy, travel privacy policy, payment security"
        canonical="https://flywithfriends.com/terms.html"
        structuredData={structuredData}
      />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-8 py-12 flex flex-col gap-10">
        {/* Header Section */}
        <section className="text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            Official Policies
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-main dark:text-text-main-dark">
            Terms &amp; Conditions
          </h1>
          <p className="text-base md:text-lg text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto">
            Please review our consolidated operational policies, guidelines, and booking conditions below.
          </p>
        </section>

        {/* Policies Container */}
        <section className="flex flex-col gap-8">
          {/* 1. Terms & Conditions */}
          <article
            id="terms"
            className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">gavel</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Section 1</span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-main dark:text-text-main-dark">
                  Terms &amp; Conditions
                </h2>
              </div>
            </div>
            <ul className="space-y-3.5 text-sm sm:text-base text-text-main/80 dark:text-text-main-dark/80">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Booking Confirmation:</strong> Bookings and reservations are subject to formal confirmation upon receipt of the necessary advance payment and required booking details.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Price &amp; Availability:</strong> Quoted prices, flight fares, bus seats, and hotel availability remain dynamic and are subject to change without prior notice prior to booking confirmation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Third-Party Suppliers:</strong> Travel services, including airline flights, accommodations, road transport, and visa documentation, may be provided by licensed third-party service partners.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Accurate Information:</strong> Customers are required to provide accurate, up-to-date passenger information matching their government-issued identity documents at the time of booking.
                </span>
              </li>
            </ul>
          </article>

          {/* 2. Cancellation Policy */}
          <article
            id="cancellation"
            className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">event_busy</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Section 2</span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-main dark:text-text-main-dark">
                  Cancellation Policy
                </h2>
              </div>
            </div>
            <ul className="space-y-3.5 text-sm sm:text-base text-text-main/80 dark:text-text-main-dark/80">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Official Channels:</strong> Cancellation requests must be submitted directly through our official contact channels, including our registered phone number, email, or WhatsApp.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Supplier Charges:</strong> Cancellation charges and penalties vary depending on the specific booking category and the applicable terms of airlines, hotels, or transport operators.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Non-Refundable Fares:</strong> Certain promotional deals, seasonal packages, holiday bookings, or specialized group reservations may be strictly non-refundable.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Transparent Communication:</strong> Any applicable deductions, convenience fees, or cancellation surcharges will be communicated clearly to customers prior to processing.
                </span>
              </li>
            </ul>
          </article>

          {/* 3. Refund Policy */}
          <article
            id="refund"
            className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">currency_exchange</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Section 3</span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-main dark:text-text-main-dark">
                  Refund Policy
                </h2>
              </div>
            </div>
            <ul className="space-y-3.5 text-sm sm:text-base text-text-main/80 dark:text-text-main-dark/80">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Refund Eligibility:</strong> Refund eligibility is determined strictly based on the specific booking conditions, fare category, and cancellation rules of the respective travel service.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Original Payment Method:</strong> Approved refunds are credited back through the original payment method or authorized banking channel wherever possible.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Processing Timelines:</strong> Processing timelines may vary based on third-party supplier settlements, airline procedures, and banking partner clearing schedules.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Itemized Deductions:</strong> Applicable deductions, banking fees, or non-recoverable supplier charges will be communicated clearly to the customer.
                </span>
              </li>
            </ul>
          </article>

          {/* 4. Privacy Policy */}
          <article
            id="privacy"
            className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">lock</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Section 4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-main dark:text-text-main-dark">
                  Privacy Policy
                </h2>
              </div>
            </div>
            <ul className="space-y-3.5 text-sm sm:text-base text-text-main/80 dark:text-text-main-dark/80">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Data Collection:</strong> Customer personal details (such as names, contact numbers, email addresses, and travel dates) are collected solely for travel enquiries and booking purposes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Service Delivery:</strong> Personal information is used strictly to coordinate, fulfill, and provide requested travel-related services and customer assistance.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>No Third-Party Sale:</strong> We respect your privacy and never sell, rent, or trade your personal information to third parties for commercial marketing purposes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Data Protection:</strong> Reasonable physical, administrative, and technological security measures are taken to safeguard customer information against unauthorized access or disclosure.
                </span>
              </li>
            </ul>
          </article>

          {/* 5. Payment Security */}
          <article
            id="security"
            className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl border border-[#f4ece7] dark:border-[#3a2d25] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">security</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Section 5</span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-main dark:text-text-main-dark">
                  Payment Security
                </h2>
              </div>
            </div>
            <ul className="space-y-3.5 text-sm sm:text-base text-text-main/80 dark:text-text-main-dark/80">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Authorised Channels Only:</strong> All payments should be remitted exclusively through our officially designated and authorized payment gateways, UPI IDs, or company bank accounts.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Protect Confidential Credentials:</strong> Customers should never share OTPs, banking passwords, CVV numbers, or card PINs with anyone, including our support agents.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>No Card Details Stored:</strong> Sensitive payment credentials, CVV codes, and full card details are never collected or stored directly on our website.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">check_circle</span>
                <span>
                  <strong>Payment Confirmation:</strong> Official booking receipts, payment acknowledgements, or voucher confirmations are provided promptly upon successful verification of funds.
                </span>
              </li>
            </ul>
          </article>
        </section>

        {/* Why Choose Us USP Section */}
        <WhyChooseUs />

        {/* Contact Assistance CTA */}
        <section className="mt-4 p-6 sm:p-8 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-text-main dark:text-text-main-dark">
              Have questions about our policies?
            </h3>
            <p className="text-sm text-text-muted dark:text-text-muted-dark">
              Our travel support team is available to assist you with any clarifications.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              Call Support
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl border border-primary text-primary hover:bg-primary/10 font-bold text-sm transition-all"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
