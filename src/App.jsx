import React, { useState } from 'react';
import { useLaunchState } from './hooks/useLaunchState';
import { AtmosphericBackground } from './components/AtmosphericBackground';
import { Header } from './components/Header';
import { LaunchHero } from './components/LaunchHero';
import { PublishingHero } from './components/PublishingHero';
import { CompletedHero } from './components/CompletedHero';
import { CelebrationPoppers } from './components/CelebrationPoppers';
import { RotateCcw, FastForward, RefreshCw, Sliders } from 'lucide-react';

export default function App() {
  const {
    launchState,
    remainingSeconds,
    formattedMinutes,
    formattedSeconds,
    progress,
    currentStepIndex,
    showPoppers,
    launchApp,
    onPopperComplete,
    resetLaunch,
    fastForwardToEnd,
  } = useLaunchState();

  const [showQaControls, setShowQaControls] = useState(false);

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Cinematic Restaurant Backdrop */}
      <AtmosphericBackground />

      {/* Top Navigation */}
      <Header />

      {/* Confetti & Ribbon Poppers: Removed strictly from DOM after 2.0s */}
      {showPoppers && <CelebrationPoppers onComplete={onPopperComplete} />}

      {/* Main Experience View depending on Launch State Machine */}
      <main className="flex-1 flex flex-col justify-center relative z-10">
        {(launchState === 'idle' || launchState === 'launching') && (
          <LaunchHero
            onLaunch={launchApp}
            isLaunching={launchState === 'launching'}
          />
        )}

        {launchState === 'publishing' && (
          <PublishingHero
            formattedMinutes={formattedMinutes}
            formattedSeconds={formattedSeconds}
            remainingSeconds={remainingSeconds}
            progress={progress}
            currentStepIndex={currentStepIndex}
          />
        )}

        {launchState === 'completed' && (
          <CompletedHero onReset={resetLaunch} />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 py-4 px-6 text-center text-xs text-white/30 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full border-t border-white/5">
        <div>
          © {new Date().getFullYear()} <span className="text-white/60 font-medium">HomBites</span> Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-[#B7D52D]/80">
            Official Mobile Launch Event
          </span>
          <button
            type="button"
            onClick={() => setShowQaControls((prev) => !prev)}
            aria-label="Toggle Test Controls"
            className="p-1 rounded text-white/30 hover:text-white/70 transition-colors"
            title="QA State Controls"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Discreet QA & Evaluation Panel */}
      {showQaControls && (
        <div className="fixed bottom-12 right-6 z-50 p-4 rounded-2xl glass-panel shadow-2xl border border-white/20 text-xs space-y-2 max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between font-bold text-white pb-1 border-b border-white/10">
            <span>QA State Inspector</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 uppercase tracking-widest text-[#B7D52D]">
              {launchState}
            </span>
          </div>

          <div className="text-white/60 space-y-0.5 font-mono text-[11px]">
            <div>Remaining: {remainingSeconds}s ({formattedMinutes}:{formattedSeconds})</div>
            <div>Progress: {(progress * 100).toFixed(1)}%</div>
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate Reload (Test Persistence)</span>
            </button>

            {launchState === 'publishing' && (
              <button
                type="button"
                onClick={fastForwardToEnd}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF7A00]/20 hover:bg-[#FF7A00]/30 text-[#FF7A00] font-medium transition-colors border border-[#FF7A00]/30"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Fast Forward to 00:05 (Test Live)</span>
              </button>
            )}

            <button
              type="button"
              onClick={resetLaunch}
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium transition-colors border border-red-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Initial State</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
