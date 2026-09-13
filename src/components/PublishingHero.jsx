import React from 'react';
import { Check, Clock } from 'lucide-react';

// Clean Official Google Play Store Vector Icon (No glow aura)
export function GooglePlayIcon({ className = "w-9 h-9" }) {
  return (
    <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gp_red" x1="60%" y1="70%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D93025" />
          <stop offset="100%" stopColor="#EA4335" />
        </linearGradient>
        <linearGradient id="gp_blue" x1="0%" y1="0%" x2="70%" y2="70%">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="100%" stopColor="#1A73E8" />
        </linearGradient>
        <linearGradient id="gp_yellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBC04" />
          <stop offset="100%" stopColor="#F9AB00" />
        </linearGradient>
        <linearGradient id="gp_green" x1="0%" y1="100%" x2="70%" y2="30%">
          <stop offset="0%" stopColor="#34A853" />
          <stop offset="100%" stopColor="#1E8E3E" />
        </linearGradient>
      </defs>
      <path d="M48.2 24.3C45.3 27.4 43.6 32.3 43.6 38.6V473.4C43.6 479.7 45.3 484.6 48.2 487.7L50.4 489.8L281.8 258.4V253.6L50.4 22.2L48.2 24.3Z" fill="url(#gp_blue)" />
      <path d="M359.1 335.7L281.8 258.4V253.6L359.1 176.3L360.8 177.3L452.3 229.3C478.4 244.1 478.4 267.9 452.3 282.7L360.8 334.7L359.1 335.7Z" fill="url(#gp_yellow)" />
      <path d="M360.8 334.7L281.8 256L48.2 489.8C56.9 499 71.1 500.1 87.2 491L360.8 334.7Z" fill="url(#gp_red)" />
      <path d="M360.8 177.3L87.2 21C71.1 11.9 56.9 13 48.2 22.2L281.8 256L360.8 177.3Z" fill="url(#gp_green)" />
    </svg>
  );
}

const TIMELINE_STEPS = [
  { id: 0, title: 'Preparing your app' },
  { id: 1, title: 'Publishing to Google Play Store' },
  { id: 2, title: 'Verifying & Processing' },
  { id: 3, title: 'Almost There' },
  { id: 4, title: 'Live on Google Play Store' },
];

export function PublishingHero({
  formattedMinutes,
  formattedSeconds,
  remainingSeconds,
  progress,
  currentStepIndex,
}) {
  // Circular progress calculations
  const center = 175;
  const radius = 145;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Traveling bead position at head of progress ring
  const angle = progress * 2 * Math.PI - Math.PI / 2;
  const beadX = center + radius * Math.cos(angle);
  const beadY = center + radius * Math.sin(angle);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        
        {/* Left Column: Heading & Connected Timeline */}
        <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left z-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/15 text-xs font-semibold tracking-[0.2em] text-[#FF7A00]">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
            IT'S HAPPENING!
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              <span className="text-white">Hom</span>
              <span className="text-[#FF7A00]">Bites</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white/95 uppercase">
              Is Going Live
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/80 font-normal">
            Publishing to Google Play Store
          </p>

          {/* Connected Vertical Timeline (Clean, no glowing laser) */}
          <div className="w-full max-w-sm pt-2 space-y-0 text-left">
            {TIMELINE_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              const isPending = idx > currentStepIndex;

              return (
                <div key={step.id} className="relative flex items-start gap-4 pb-6 last:pb-0">
                  {/* Connecting vertical line */}
                  {idx !== TIMELINE_STEPS.length - 1 && (
                    <div
                      className={`absolute left-[15px] top-[26px] bottom-0 w-[2px] transition-colors duration-500 ${
                        isCompleted ? 'bg-[#0B4D3B]' : 'bg-white/10'
                      }`}
                    />
                  )}

                  {/* Step Node Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    {isCompleted && (
                      <div className="w-8 h-8 rounded-full bg-[#0B4D3B] border border-[#B7D52D]/60 flex items-center justify-center text-[#B7D52D] shadow-md">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}

                    {isActive && (
                      <div className="w-8 h-8 rounded-full bg-[#FF7A00]/20 border-2 border-[#FF7A00] flex items-center justify-center text-[#FF7A00] shadow-md">
                        <Clock className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    )}

                    {isPending && (
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/30">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      </div>
                    )}
                  </div>

                  {/* Step Title & Status */}
                  <div className="pt-1">
                    <div
                      className={`text-sm font-bold transition-colors duration-300 ${
                        isActive
                          ? 'text-[#FF7A00]'
                          : isCompleted
                          ? 'text-white/95'
                          : 'text-white/40'
                      }`}
                    >
                      {step.title}
                    </div>
                    {isActive && (
                      <span className="text-xs text-[#FF7A00] flex items-center gap-1.5 mt-0.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                        In progress & verification
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Circular Loading & Countdown Dial */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center z-30">
          <div className="relative flex flex-col items-center select-none">
            
            {/* Natural Pedestal Base Shadow (No neon glow) */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-10 rounded-full bg-black/70 blur-xl pointer-events-none" />

            {/* Circular Progress Interface Container */}
            <div className="relative w-[310px] h-[310px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
              
              {/* Clean SVG Ring System (No glow filters) */}
              <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none overflow-visible"
                viewBox="0 0 350 350"
              >
                <defs>
                  {/* Outer Progress Gradient */}
                  <linearGradient id="progressGradClean" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B7D52D" />
                    <stop offset="50%" stopColor="#FFB800" />
                    <stop offset="100%" stopColor="#FF7A00" />
                  </linearGradient>
                </defs>

                {/* Track Background Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                  fill="transparent"
                />

                {/* Inner Dotted Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius - 16}
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                  fill="transparent"
                />

                {/* Active Progress Ring Arc (Clean stroke, no glow filter) */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  stroke="url(#progressGradClean)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  fill="transparent"
                  style={{
                    transition: 'stroke-dashoffset 0.4s ease-out',
                  }}
                />

                {/* Solid Traveling Bead at Head of Arc */}
                {progress > 0.005 && (
                  <circle
                    cx={beadX}
                    cy={beadY}
                    r="6.5"
                    fill="#FFFFFF"
                    stroke="#FF7A00"
                    strokeWidth="2"
                  />
                )}
              </svg>

              {/* Inner Glassmorphic Pedestal Face */}
              <div
                className="w-[245px] h-[245px] sm:w-[275px] sm:h-[275px] rounded-full flex flex-col items-center justify-center text-center p-4 relative overflow-hidden shadow-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 26, 21, 0.96) 0%, rgba(8, 15, 12, 0.98) 100%)',
                  boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.12), inset 0 -4px 16px rgba(0,0,0,0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Google Play Store Icon (Clean, no glow) */}
                <div className="mb-2 relative">
                  <GooglePlayIcon className="w-9 h-9 sm:w-10 sm:h-10 relative z-10" />
                </div>

                {/* Status Subtitle */}
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-white/80 uppercase mb-1">
                  Publishing to Play Store
                </span>

                {/* Big Countdown Timer */}
                <div className="tabular-nums text-4xl sm:text-5xl font-black tracking-tight text-white">
                  {formattedMinutes}:{formattedSeconds}
                </div>

                {/* Minutes / Seconds Label */}
                <div className="flex items-center gap-6 text-[9px] sm:text-[10px] tracking-[0.25em] text-[#B7D52D] uppercase mt-0.5 font-mono font-semibold">
                  <span>Minutes</span>
                  <span>Seconds</span>
                </div>

                {/* Supporting message */}
                <span className="text-[11px] text-[#B7D52D] font-bold tracking-wide mt-2">
                  Your app will be live soon!
                </span>
              </div>
            </div>

            {/* Pedestal Base Ring */}
            <div className="w-56 sm:w-72 h-8 sm:h-9 mx-auto -mt-3 rounded-[50%] bg-gradient-to-b from-[#1c2a22] via-[#101914] to-[#080d0a] border-t border-white/20 shadow-2xl relative z-10">
              <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF7A00]/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Right Column: Clean Announcement Card with App Preview */}
        <div className="order-3 lg:order-3 lg:col-span-3 flex flex-col items-center lg:items-end justify-center z-20 space-y-4">
          <div className="w-full max-w-xs p-5 rounded-3xl glass-panel-clean border border-white/15 shadow-2xl relative overflow-hidden text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF7A00]/20 border border-[#FF7A00]/40 flex items-center justify-center text-xl">
                🎉
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white leading-tight">
                  Big things
                </h3>
                <p className="text-xs text-[#B7D52D] font-semibold">
                  are on the way!
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
              HomBites will be available on Google Play Store in{' '}
              <span className="font-bold text-[#FF7A00]">
                {Math.max(1, Math.ceil(remainingSeconds / 60))} minutes
              </span>.
            </p>

            {/* App UI Sneak Peek preview thumbnail */}
            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/15 flex items-center gap-3 shadow-inner">
              <img
                src="/assets/phone_mockup.png"
                alt="App Sneak Peek"
                className="w-10 h-14 object-cover object-top rounded-lg border border-white/20 shadow"
              />
              <div className="space-y-0.5">
                <div className="text-[11px] font-bold text-white">
                  Exclusive Launch Offers
                </div>
                <div className="text-[10px] text-[#B7D52D] font-medium">
                  Biryani Dhamaka & Grand Thalis
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>Thank you for being part of this journey</span>
              <span className="text-sm">💚</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
