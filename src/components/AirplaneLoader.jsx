import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AirplaneLoader() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 850);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div
      id="airplane-page-loader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background-light/90 dark:bg-[#18110c]/90 backdrop-blur-md transition-opacity duration-300 pointer-events-auto"
    >
      <div className="relative flex flex-col items-center justify-center p-8">
        <div className="absolute -top-6 -left-6 size-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative size-20 rounded-2xl bg-white dark:bg-[#2c241e] shadow-xl border border-[#f4ece7] dark:border-[#4a3b32] flex items-center justify-center mb-4 overflow-hidden">
          <span
            className="material-symbols-outlined text-primary text-4xl airplane-anim"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            flight_takeoff
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#9c6c49] dark:text-[#b08d74]">
            Fly With Friends
          </span>
          <span className="flex gap-1 items-center">
            <span className="size-1 rounded-full bg-primary animate-ping" />
          </span>
        </div>
      </div>
    </div>
  );
}
