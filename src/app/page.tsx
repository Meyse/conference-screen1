/**
 * page.tsx
 * 
 * Main page component for the conference dashboard app.
 * It wraps the dashboard with the ScreenProvider for context.
 */

'use client';

import React, { useEffect } from 'react';
import { ScreenProvider } from '../contexts/ScreenContext';
import { DashboardContainer } from '../components/DashboardContainer';

export default function Home() {
  // Track screen dimensions for responsive adjustments
  useEffect(() => {
    const updateDimensions = () => {
      // Get viewport dimensions
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      
      // Set CSS variables for viewport dimensions
      document.documentElement.style.setProperty('--viewport-width', `${vw}px`);
      document.documentElement.style.setProperty('--viewport-height', `${vh}px`);
      
      // Detect if we're on a very large screen
      if (vw >= 3000 || vh >= 1600) {
        document.body.classList.add('is-large-screen');
      } else {
        document.body.classList.remove('is-large-screen');
      }
      
      // Calculate and set appropriate scale factor based on screen size
      let scaleFactor = 1;
      
      if (vw >= 3440) {
        scaleFactor = 1.6; // For very large screens (reduced from 2)
      } else if (vw >= 2560) {
        scaleFactor = 1.3; // For large screens (reduced from 1.5)
      } else if (vw >= 1920) {
        scaleFactor = 1.1; // For standard desktop screens
      }
      
      document.documentElement.style.setProperty('--scale-factor', scaleFactor.toString());
      
      console.log(`Viewport dimensions: ${vw}x${vh}, Scale factor: ${scaleFactor}`);
    };
    
    // Initial update
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  return (
    <>
      <style jsx global>{`
        /* Ensure stacking context properly renders z-indexes */
        html, body {
          isolation: isolate;
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          background-color: black;
          color: white;
        }
        
        /* Force content visibility */
        .dashboard-content {
          isolation: isolate;
          z-index: 10 !important;
          position: relative !important;
        }
        
        /* Ensure metric text is visible */
        .mega-value {
          color: white !important;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.4) !important;
          font-size: clamp(6rem, 20vw, 18rem) !important;
          font-weight: 900 !important;
          z-index: 100 !important;
          position: relative !important;
        }
        
        h2 {
          color: white !important;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3) !important;
          z-index: 100 !important;
          position: relative !important;
        }
        
        /* Use CSS variables for responsive sizing */
        :root {
          --viewport-width: 100vw;
          --viewport-height: 100vh;
          --scale-factor: 1;
        }
        
        /* More moderate media query for large screens */
        @media (min-width: 2560px) {
          :root {
            --scale-factor: 1.3;
          }
          
          .mega-value-container {
            font-size: clamp(6rem, 15vw, 16rem) !important;
          }
          
          h2 {
            font-size: clamp(2.5rem, 5vw, 4.5rem) !important;
          }
        }
        
        /* More controlled sizing for very large screens (40" and up) */
        @media (min-width: 3440px) {
          :root {
            --scale-factor: 1.6;
          }
          
          .mega-value-container {
            font-size: clamp(8rem, 16vw, 20rem) !important;
          }
          
          h2 {
            font-size: clamp(3rem, 6vw, 5rem) !important;
            margin-bottom: 2rem !important;
          }
        }
        
        /* Add content boundaries to prevent overflow */
        .screen-container > div {
          max-width: 100%;
          overflow: hidden;
        }
        
        /* Ensure text wrapping on small screens */
        h2, .subtitle, .time-period {
          max-width: 95vw;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }
      `}</style>
      <ScreenProvider>
        <DashboardContainer />
      </ScreenProvider>
    </>
  );
}
