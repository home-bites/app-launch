import React from 'react';

export function AtmosphericBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Real Kitchen Photography Background */}
      <img
        src="/assets/kitchen_bg.jpg"
        alt="Kitchen Background"
        className="w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.62] contrast-[1.05]"
      />

      {/* Warm Ambient Kitchen Darkening Gradient Overlay (No artificial glow, just natural kitchen warmth) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d0a] via-[#0a120e]/65 to-[#080d0a]/80" />

      {/* Subtle vignette for natural cinematic focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,9,7,0.85)_100%)]" />
    </div>
  );
}
