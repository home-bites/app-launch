import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Leaf, Users, Heart, ArrowRight, CornerDownLeft, ChefHat, Star } from 'lucide-react';

const FEATURED_DISHES = [
  {
    id: 'andhra',
    name: 'Royal Andhra Thali',
    tag: 'Grand Feast',
    rating: '4.9',
    img: '/assets/dish_andhrathali.jpg',
  },
  {
    id: 'curry',
    name: 'Homestyle Chicken Curry',
    tag: 'Chef Special',
    rating: '4.8',
    img: '/assets/dish_curryrice.jpg',
  },
  {
    id: 'ragimudde',
    name: 'Country Ragi Mudde',
    tag: 'Traditional',
    rating: '4.9',
    img: '/assets/dish_ragimudde.jpg',
  },
];

export function LaunchHero({ onLaunch, isLaunching }) {
  const buttonRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeDishIdx, setActiveDishIdx] = useState(0);

  // Auto-rotate featured dishes every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDishIdx((prev) => (prev + 1) % FEATURED_DISHES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Smooth 3D tilt calculation on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    const tiltX = -normalizedY * 6;
    const tiltY = normalizedX * 6;

    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Keyboard accessibility: ENTER triggers launchApp()
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onLaunch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onLaunch]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
        
        {/* Left Column: Launch Branding & Value Pillars */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left z-20 space-y-6">
          
          {/* Subtle Clean Badge (No glow) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/15 text-xs font-semibold tracking-[0.2em] text-[#B7D52D]">
            <span className="w-2 h-2 rounded-full bg-[#B7D52D]" />
            THE WAIT IS OVER
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              <span className="text-white">Hom</span>
              <span className="text-[#FF7A00]">Bites</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white/95 uppercase">
              App Launch
            </h2>
          </div>

          <p className="text-base sm:text-lg text-white/80 max-w-md font-normal leading-relaxed">
            Great food. Local favorites. Now closer than ever. Genuine homemade cooking from passionate local kitchens.
          </p>

          {/* Three Clean Feature Pillars (No glow) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 w-full max-w-sm">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl glass-pill-clean hover:bg-white/10 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-[#0B4D3B]/50 border border-white/15 flex items-center justify-center text-[#B7D52D] mb-2">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-white/90 leading-snug">
                Fresh Food<br />Everyday
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl glass-pill-clean hover:bg-white/10 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-[#0B4D3B]/50 border border-white/15 flex items-center justify-center text-[#B7D52D] mb-2">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-white/90 leading-snug">
                Stronger<br />Communities
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-2xl glass-pill-clean hover:bg-white/10 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-[#FF7A00]/30 border border-white/15 flex items-center justify-center text-[#FF7A00] mb-2">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-white/90 leading-snug">
                Happier<br />You
              </span>
            </div>
          </div>
        </div>

        {/* Center Column: 3D Circular Launch Object & Pedestal */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center z-30">
          <div className="relative flex flex-col items-center">
            
            {/* Natural Pedestal Shadow (No neon glow) */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-10 rounded-full bg-black/70 blur-xl pointer-events-none" />

            {/* Main 3D Circular Button Object */}
            <div
              className="relative p-2 perspective-[1000px] select-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={buttonRef}
                type="button"
                onClick={onLaunch}
                disabled={isLaunching}
                aria-label="Launch HomBites App"
                className={`
                  group relative w-64 h-64 sm:w-80 sm:h-80 rounded-full cursor-pointer
                  transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B7D52D]
                  ${isLaunching ? 'scale-95' : isHovered ? 'scale-[1.02]' : 'animate-breathe'}
                `}
                style={{
                  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isLaunching ? 'scale(0.96)' : isHovered ? 'scale(1.02)' : 'scale(1)'}`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Layer 1: Refined Satin Rim (Lime green to orange gradient border, NO outer glow) */}
                <div
                  className="absolute inset-0 rounded-full p-[3px] shadow-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #B7D52D 0%, #10B981 40%, #FF7A00 100%)',
                  }}
                >
                  {/* Layer 2: Concentric Beveled Obsidian Surface */}
                  <div className="w-full h-full rounded-full bg-[#0d1612] p-3 sm:p-4 border border-white/15 shadow-inner flex items-center justify-center relative overflow-hidden">
                    
                    {/* Layer 3: Subtle rotating hairline ring */}
                    <div className="absolute inset-3 rounded-full border border-white/10 animate-spin-slow pointer-events-none" />

                    {/* Layer 4: Deep Frosted Glass Face */}
                    <div
                      className="w-full h-full rounded-full flex flex-col items-center justify-center p-4 relative overflow-hidden"
                      style={{
                        background: 'radial-gradient(circle, rgba(14, 25, 20, 0.95) 0%, rgba(8, 15, 12, 0.98) 100%)',
                        boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.15), inset 0 -4px 12px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {/* Official HomBites Logo - NO CONTAINER, displayed directly */}
                      <div className="relative z-10 mb-2 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                        <img
                          src="/assets/hombites_logo.png"
                          alt="HomBites"
                          className="h-11 sm:h-13 w-auto object-contain"
                        />
                      </div>

                      {/* Launch App Prompt */}
                      <div className="relative z-10 flex flex-col items-center space-y-1.5 mt-1">
                        <span className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-white uppercase">
                          Launch App
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#B7D52D] group-hover:translate-x-1 group-hover:bg-[#B7D52D] group-hover:text-[#0B4D3B] transition-all duration-300 shadow">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Cylindrical Pedestal under the circular button */}
              <div className="w-56 sm:w-72 h-8 sm:h-9 mx-auto -mt-4 rounded-[50%] bg-gradient-to-b from-[#1c2a22] via-[#101914] to-[#080d0a] border-t border-white/20 shadow-2xl relative z-10">
                <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B7D52D]/60 to-transparent" />
              </div>
            </div>

            {/* Launch Instructions below Pedestal */}
            <div className="flex flex-col items-center space-y-2 mt-5">
              <span className="text-xs sm:text-sm text-white/70 font-medium tracking-wide">
                Click to Launch or Press Enter
              </span>
              <button
                type="button"
                onClick={onLaunch}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-white/90 font-mono transition-colors active:scale-95 shadow"
              >
                <span>Enter</span>
                <CornerDownLeft className="w-3.5 h-3.5 text-[#B7D52D]" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Food Showcase & Mobile App Preview */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center z-20 space-y-4 select-none w-full">
          
          {/* Clean Food Card Showcase (using images 2, 3, 4) */}
          <div className="w-full max-w-xs rounded-3xl glass-panel-clean p-3 border border-white/15 shadow-2xl overflow-hidden relative group">
            {/* Dish Image */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-md">
              <img
                src={FEATURED_DISHES[activeDishIdx].img}
                alt={FEATURED_DISHES[activeDishIdx].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              
              {/* Top Badges */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold text-[#B7D52D]">
                  <ChefHat className="w-3 h-3" />
                  <span>{FEATURED_DISHES[activeDishIdx].tag}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span>{FEATURED_DISHES[activeDishIdx].rating}</span>
                </span>
              </div>

              {/* Bottom Dish Info */}
              <div className="absolute bottom-2.5 inset-x-3 text-left">
                <div className="text-xs font-bold text-white">
                  {FEATURED_DISHES[activeDishIdx].name}
                </div>
                <div className="text-[10px] text-white/70">
                  Prepared by Verified Home Chefs
                </div>
              </div>
            </div>

            {/* Thumbnail Selectors (Images 2, 3, 4) */}
            <div className="flex items-center justify-between gap-2 mt-2 px-1">
              {FEATURED_DISHES.map((dish, idx) => (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => setActiveDishIdx(idx)}
                  className={`relative flex-1 h-12 rounded-xl overflow-hidden border transition-all duration-200 ${
                    idx === activeDishIdx
                      ? 'border-[#FF7A00] ring-2 ring-[#FF7A00]/60 scale-105'
                      : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Real Mobile App Screen Card (Image 5 Phone Mockup) */}
          <div className="w-full max-w-xs rounded-2xl glass-panel-clean p-3 border border-white/15 flex items-center gap-3.5 shadow-xl">
            <div className="w-12 h-16 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 shadow-md">
              <img
                src="/assets/phone_mockup.png"
                alt="HomBites Mobile App"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-left space-y-0.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A00]">
                Customer Mobile App
              </div>
              <div className="text-xs font-bold text-white leading-tight">
                Order Homemade Delicacies
              </div>
              <div className="text-[10px] text-white/60">
                15,000+ Foodies On Waitlist
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
