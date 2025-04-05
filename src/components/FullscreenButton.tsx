/**
 * FullscreenHandler.tsx
 * 
 * A component that handles fullscreen mode via keyboard shortcut ('F' key)
 * Ideal for conference displays to maximize screen real estate.
 */

'use client';

import React, { useState, useEffect } from 'react';

export const FullscreenHandler: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update fullscreen state when it changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'f' && !event.ctrlKey && !event.altKey && !event.metaKey) {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // This component doesn't render anything visible
  return (
    <div className="fullscreen-indicator">
      {isFullscreen && (
        <div className="fullscreen-toast">
          Fullscreen mode enabled (press F to exit)
        </div>
      )}
    </div>
  );
}; 