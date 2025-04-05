/**
 * FullscreenButton.tsx
 * 
 * A component that handles entering/exiting fullscreen mode.
 * Press 'F' key to toggle fullscreen.
 */

'use client';

import { useEffect, useState } from 'react';

export const FullscreenHandler: React.FC = () => {
  // We use this state internally via the event listener
  // so we can keep track of it without explicit DOM queries
  const [, setIsFullscreen] = useState(false);

  // Function to toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Update fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      
      // Add or remove a class on the document body to indicate fullscreen state
      if (document.fullscreenElement) {
        document.body.classList.add('is-fullscreen');
        // Try to detect large screens (approximately 40" or larger)
        if (window.screen.width >= 3000 || window.screen.height >= 1600) {
          document.body.classList.add('is-large-screen');
        }
      } else {
        document.body.classList.remove('is-fullscreen');
        document.body.classList.remove('is-large-screen');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Listen for keyboard input to toggle fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle fullscreen when F key is pressed
      if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // This component doesn't render anything visible
}; 