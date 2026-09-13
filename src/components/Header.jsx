import React from 'react';

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 px-6 sm:px-12 py-5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo - NO container, clean rendering */}
        <div className="flex items-center">
          <img
            src="/assets/hombites_logo.png"
            alt="HomBites"
            className="h-11 sm:h-13 w-auto object-contain hover:scale-105 transition-transform duration-200 select-none"
          />
        </div>

        {/* Right side: Clean minimal launch tag (Get the App button REMOVED) */}
        <div className="flex items-center">
          <span className="text-xs font-semibold tracking-widest text-[#B7D52D] uppercase px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
            Mobile Launch Event
          </span>
        </div>
      </div>
    </header>
  );
}
