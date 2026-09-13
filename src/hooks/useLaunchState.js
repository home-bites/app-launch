import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEYS = {
  STATE: 'hombites_launch_state',
  STARTED_AT: 'hombites_launch_started_at',
  ENDS_AT: 'hombites_launch_ends_at',
};

// 45 minutes countdown in seconds
export const TOTAL_DURATION_SECONDS = 45 * 60; // 2700 seconds

export function useLaunchState() {
  const [launchState, setLaunchState] = useState(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEYS.STATE);
      const endsAt = Number(localStorage.getItem(STORAGE_KEYS.ENDS_AT));
      
      if (savedState === 'completed') {
        return 'completed';
      }
      
      if (savedState === 'publishing' && endsAt) {
        const remaining = Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
        if (remaining <= 0) {
          return 'completed';
        }
        return 'publishing';
      }
    } catch (e) {
      console.error('Failed to read launch state from localStorage:', e);
    }
    return 'idle';
  });

  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    try {
      const endsAt = Number(localStorage.getItem(STORAGE_KEYS.ENDS_AT));
      if (endsAt) {
        return Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
      }
    } catch (e) {
      console.error('Failed to calculate initial remaining seconds:', e);
    }
    return TOTAL_DURATION_SECONDS;
  });

  const [showPoppers, setShowPoppers] = useState(false);
  const isLaunchingRef = useRef(false);

  // Synchronize timer based strictly on real timestamps
  useEffect(() => {
    if (launchState !== 'publishing') return;

    const interval = setInterval(() => {
      try {
        const endsAt = Number(localStorage.getItem(STORAGE_KEYS.ENDS_AT));
        if (!endsAt) return;

        const now = Date.now();
        const diffSeconds = Math.max(0, Math.floor((endsAt - now) / 1000));
        
        setRemainingSeconds(diffSeconds);

        if (diffSeconds <= 0) {
          clearInterval(interval);
          setLaunchState('completed');
          localStorage.setItem(STORAGE_KEYS.STATE, 'completed');
        }
      } catch (e) {
        console.error('Error during timer tick:', e);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [launchState]);

  // Main shared launch trigger
  const launchApp = useCallback(() => {
    // 1. Prevent duplicate activation
    if (launchState !== 'idle' || isLaunchingRef.current) {
      return;
    }
    isLaunchingRef.current = true;

    const now = Date.now();
    const endsAt = now + TOTAL_DURATION_SECONDS * 1000;

    // Persist immediately
    try {
      localStorage.setItem(STORAGE_KEYS.STATE, 'publishing');
      localStorage.setItem(STORAGE_KEYS.STARTED_AT, String(now));
      localStorage.setItem(STORAGE_KEYS.ENDS_AT, String(endsAt));
    } catch (e) {
      console.error('Failed to persist launch state:', e);
    }

    // Trigger visual launch sequence
    setLaunchState('launching');
    setShowPoppers(true);
    setRemainingSeconds(TOTAL_DURATION_SECONDS);

    // Transition smoothly to publishing state
    setTimeout(() => {
      setLaunchState('publishing');
    }, 800);

    // Poppers will auto-remove at ~2000ms
  }, [launchState]);

  const onPopperComplete = useCallback(() => {
    setShowPoppers(false);
  }, []);

  // QA & Evaluation helper: Reset state to idle
  const resetLaunch = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.STATE);
      localStorage.removeItem(STORAGE_KEYS.STARTED_AT);
      localStorage.removeItem(STORAGE_KEYS.ENDS_AT);
    } catch (e) {}
    isLaunchingRef.current = false;
    setShowPoppers(false);
    setRemainingSeconds(TOTAL_DURATION_SECONDS);
    setLaunchState('idle');
  }, []);

  // QA & Evaluation helper: Fast forward to final 5 seconds
  const fastForwardToEnd = useCallback(() => {
    try {
      const now = Date.now();
      const endsAt = now + 5000; // 5 seconds remaining
      localStorage.setItem(STORAGE_KEYS.STATE, 'publishing');
      localStorage.setItem(STORAGE_KEYS.ENDS_AT, String(endsAt));
      setRemainingSeconds(5);
      setLaunchState('publishing');
    } catch (e) {}
  }, []);

  // Calculate actual progress: 0 at 45:00, 1 at 00:00
  const progress = Math.min(
    1,
    Math.max(0, (TOTAL_DURATION_SECONDS - remainingSeconds) / TOTAL_DURATION_SECONDS)
  );

  // Formatted MM:SS
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  // Active status timeline stage based on countdown milestones
  // 45:00 - 35:00 -> Stage 0: Preparing your app (Done), Stage 1: Publishing to Play Store (Active)
  // 35:00 - 20:00 -> Stage 1: Publishing to Play Store (Active)
  // 20:00 - 08:00 -> Stage 2: Verifying & Processing (Active)
  // 08:00 - 01:00 -> Stage 3: Almost There (Active)
  // 01:00 - 00:00 -> Stage 3/4: Finalizing / Live
  let currentStepIndex = 1; // 0-indexed: 0: Preparing, 1: Publishing, 2: Verifying, 3: Almost There, 4: Live
  if (remainingSeconds > 35 * 60) {
    currentStepIndex = 1; // Preparing is complete, Publishing is in progress
  } else if (remainingSeconds > 20 * 60) {
    currentStepIndex = 1;
  } else if (remainingSeconds > 8 * 60) {
    currentStepIndex = 2;
  } else if (remainingSeconds > 0) {
    currentStepIndex = 3;
  } else {
    currentStepIndex = 4;
  }

  return {
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
  };
}
