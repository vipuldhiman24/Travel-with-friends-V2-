import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AirplaneLoader from './components/AirplaneLoader';
import DataLists from './components/DataLists';

import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Bus from './pages/Bus';
import TripPackages from './pages/TripPackages';
import Trips from './pages/Trips';
import Visa from './pages/Visa';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Admin from './pages/Admin';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-display">
      {/* 1s Airplane Takeoff Loader on Page Load / Route Changes */}
      {!isAdminRoute && <AirplaneLoader />}

      {/* Global Datalists for City/Airport/Country autocompletion */}
      <DataLists />

      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Shared Navigation Header */}
      {!isAdminRoute && <Navbar />}

      {/* Main Page Routing */}
      <Routes>
        {/* Admin Portal */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<Admin />} />

        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />

        {/* Flights */}
        <Route path="/flights" element={<Flights />} />
        <Route path="/Flights.html" element={<Flights />} />
        <Route path="/flights.html" element={<Flights />} />

        {/* Hotels */}
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/Hotels.html" element={<Hotels />} />
        <Route path="/hotels.html" element={<Hotels />} />

        {/* Bus */}
        <Route path="/bus" element={<Bus />} />
        <Route path="/Bus.html" element={<Bus />} />
        <Route path="/bus.html" element={<Bus />} />

        {/* Packages */}
        <Route path="/trip-packages" element={<TripPackages />} />
        <Route path="/Trip_packages.html" element={<TripPackages />} />
        <Route path="/trip_packages.html" element={<TripPackages />} />
        <Route path="/trip-packages.html" element={<TripPackages />} />

        {/* Dynamic Package Details */}
        <Route path="/trips" element={<Trips />} />
        <Route path="/Trips.html" element={<Trips />} />
        <Route path="/trips.html" element={<Trips />} />

        {/* Visa */}
        <Route path="/visa" element={<Visa />} />
        <Route path="/Visa.html" element={<Visa />} />
        <Route path="/visa.html" element={<Visa />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/Contact.html" element={<Contact />} />
        <Route path="/contact.html" element={<Contact />} />

        {/* Terms & Policies */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/terms.html" element={<Terms />} />
        <Route path="/Terms.html" element={<Terms />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Shared Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
