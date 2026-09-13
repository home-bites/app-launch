import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function CompletedHero({ onReset }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center z-20 space-y-8 select-none">
        
        {/* Celebration Badge (No glow) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/15 text-xs font-semibold tracking-[0.2em] text-[#B7D52D]">
          <span className="w-2 h-2 rounded-full bg-[#B7D52D]" />
          OFFICIAL RELEASE COMPLETE
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
            <span className="text-white">Hom</span>
            <span className="text-[#FF7A00]">Bites</span>
            <span className="text-white"> Is Live</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-medium">
            Now available on Google Play Store
          </p>
        </div>

        {/* Center Completed Ring (No glow) */}
        <div className="relative p-6">
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full relative flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border-4 border-[#B7D52D] shadow-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(14, 26, 20, 0.95) 0%, rgba(8, 15, 12, 0.98) 100%)',
              }}
            />

            {/* Inner Content - Clean logo directly without container */}
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#0B4D3B] border border-[#B7D52D]/60 flex items-center justify-center text-[#B7D52D] shadow">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <img
                src="/assets/hombites_logo.png"
                alt="HomBites"
                className="h-10 sm:h-12 w-auto object-contain"
              />

              <span className="text-xs font-bold tracking-widest text-[#B7D52D] uppercase">
                Ready to Order
              </span>
            </div>
          </div>

          {/* Pedestal */}
          <div className="w-56 sm:w-64 h-8 mx-auto -mt-4 rounded-[50%] bg-gradient-to-b from-[#1c2a22] via-[#101914] to-[#080d0a] border-t border-white/20 shadow-2xl relative z-10" />
        </div>

      </div>
    </section>
  );
}
