import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 border-t border-[#f4ece7] dark:border-[#3a2d25] bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          
          {/* Column 1: Company Introduction */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                flight_takeoff
              </span>
              <span className="text-xl font-extrabold tracking-tight text-text-main dark:text-text-main-dark">
                Fly With Friends
              </span>
            </Link>
            <p className="text-sm text-text-muted dark:text-text-muted-dark leading-relaxed pr-4">
              Fly With Friends specializes in curated group journeys, weekend getaways, flights, hotels, and custom travel packages designed for friends and families. We plan the logistics so you can simply pack and enjoy.
            </p>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-text-main-dark">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-text-muted dark:text-text-muted-dark font-medium">
              <li>
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Flights</span>
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Hotels</span>
                </Link>
              </li>
              <li>
                <Link to="/bus" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Bus</span>
                </Link>
              </li>
              <li>
                <Link to="/trip-packages" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Trip Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/visa" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Visa Services</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-text-main-dark">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-text-muted dark:text-text-muted-dark">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">call</span>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+918851722264"
                    className="font-semibold text-text-main dark:text-text-main-dark hover:text-primary transition-colors"
                  >
                    +91 88517 22264
                  </a>
                  <a
                    href="tel:+919354962122"
                    className="font-semibold text-text-main dark:text-text-main-dark hover:text-primary transition-colors"
                  >
                    +91 93549 62122
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl shrink-0">mail</span>
                <a
                  href="mailto:flywithfriends06@gmail.com"
                  className="font-medium hover:text-primary transition-colors break-all"
                >
                  flywithfriends06@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark mb-2">
                Policies
              </h4>
              <Link
                to="/terms"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-main dark:text-text-main-dark hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base text-primary">policy</span>
                <span>Terms & Conditions</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#f4ece7] dark:border-[#3a2d25] pt-8 gap-4">
          <p className="text-text-muted dark:text-text-muted-dark text-xs sm:text-sm">
            © 2026 Fly With Friends, Inc. All rights reserved.
          </p>

          <div className="flex gap-4 items-center">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1C7HStw4XV/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="size-9 rounded-full bg-[#f4ece7] dark:bg-[#3a2d25] flex items-center justify-center text-text-muted dark:text-text-muted-dark hover:bg-primary hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.019 4.388 11.018 10.125 11.927v-8.44H7.078v-3.487h3.047V9.43c0-3.02 1.792-4.686 4.533-4.686 1.312 0 2.686.235 2.686.235v2.96H15.83c-1.491 0-1.956.93-1.956 1.884v2.26h3.328l-.532 3.487h-2.796v8.44C19.612 23.091 24 18.092 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/theflywithfriends?xtok=bXY2ZTYwMGhyZHBu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="size-9 rounded-full bg-[#f4ece7] dark:bg-[#3a2d25] flex items-center justify-center text-text-muted dark:text-text-muted-dark hover:bg-primary hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5C19.44 2 22 4.56 22 7.75v8.5C22 19.44 19.44 22 16.25 22h-8.5C4.56 22 2 19.44 2 16.25v-8.5C2 4.56 4.56 2 7.75 2zm0 1.5C5.46 3.5 3.5 5.46 3.5 7.75v8.5c0 2.29 1.96 4.25 4.25 4.25h8.5c2.29 0 4.25-1.96 4.25-4.25v-8.5c0-2.29-1.96-4.25-4.25-4.25h-8.5z"/>
                <path d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7z"/>
                <circle cx="17.5" cy="6.5" r="1"/>
              </svg>
            </a>

            {/* Gmail / Email */}
            <a
              href="mailto:flywithfriends06@gmail.com"
              aria-label="Email"
              className="size-9 rounded-full bg-[#f4ece7] dark:bg-[#3a2d25] flex items-center justify-center text-text-muted dark:text-text-muted-dark hover:bg-primary hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5l8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
