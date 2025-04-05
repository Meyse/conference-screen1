/**
 * ScreenContext.tsx
 * 
 * This context provider manages the screen rotation for the conference dashboard.
 * It handles timing, transitions, and provides screen data to components.
 */

'use client';

import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { screens, MetricScreen } from '../data/mockData';

interface ScreenContextType {
  currentScreen: MetricScreen;
  nextScreen: MetricScreen;
  progress: number; // 0-100 progress to next screen
  totalScreens: number;
  currentIndex: number;
}

// Create the context with an initial empty state
const ScreenContext = createContext<ScreenContextType>({
  currentScreen: screens[0],
  nextScreen: screens[1],
  progress: 0,
  totalScreens: screens.length,
  currentIndex: 0
});

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state - starting with the first screen
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const transitioningRef = useRef(false);
  const [validScreens, setValidScreens] = useState(true);

  // Verify the screens array is valid on mount
  useEffect(() => {
    if (!screens || screens.length === 0) {
      console.error('No screens defined in mockData.ts');
      setValidScreens(false);
    }
  }, []);

  // Function to move to the next screen
  const goToNextScreen = useCallback(() => {
    if (transitioningRef.current) {
      console.log('Skipping transition - already in progress');
      return;
    }

    transitioningRef.current = true;
    console.log('Moving to next screen');
    
    // Calculate the next index, ensuring it's within bounds
    const nextIndex = (currentIndex + 1) % screens.length;
    
    // Reset progress and update the current index
    setProgress(0);
    setCurrentIndex(nextIndex);
    
    // Clear the transitioning flag after a short delay
    setTimeout(() => {
      transitioningRef.current = false;
    }, 500);
  }, [currentIndex]);

  // Function to update progress based on time elapsed
  const updateProgress = useCallback(() => {
    if (transitioningRef.current) {
      return; // Don't update progress during transitions
    }

    setProgress(prevProgress => {
      // Calculate how much to increment based on display time
      // displayTime is in seconds, and we update every 100ms
      const increment = 100 / (screens[currentIndex].displayTime * 10);
      const newProgress = prevProgress + increment;
      
      // If progress reaches 100%, move to next screen
      if (newProgress >= 100) {
        goToNextScreen();
        return 0;
      }
      
      return newProgress;
    });
  }, [currentIndex, goToNextScreen]);

  // Set up interval for progress updates
  useEffect(() => {
    if (!validScreens) return;

    const currentScreen = screens[currentIndex];
    console.log('Setting up timer for screen:', currentScreen.title);
    
    // Start the interval timer to update progress every 100ms
    const id = setInterval(updateProgress, 100);
    
    // Add a backup timer to force next screen if something goes wrong
    const backupId = setTimeout(() => {
      console.log('Backup timer triggered - forcing next screen');
      goToNextScreen();
    }, (currentScreen.displayTime + 1) * 1000); // Add 1 second buffer
    
    // Clean up function
    return () => {
      clearInterval(id);
      clearTimeout(backupId);
    };
  }, [currentIndex, updateProgress, goToNextScreen, validScreens]);

  // Return early if no valid screens
  if (!validScreens) {
    return null;
  }

  // Get current and next screen objects
  const currentScreen = screens[currentIndex];
  const nextScreen = screens[(currentIndex + 1) % screens.length];
  const totalScreens = screens.length;

  // Create the context value
  const contextValue = {
    currentScreen,
    nextScreen,
    progress,
    totalScreens,
    currentIndex,
  };

  // Render the provider with our value
  return (
    <ScreenContext.Provider value={contextValue}>
      {children}
    </ScreenContext.Provider>
  );
};

// Custom hook to use the screen context
export const useScreen = (): ScreenContextType => {
  const context = useContext(ScreenContext);
  
  if (!context) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }
  
  return context;
}; 