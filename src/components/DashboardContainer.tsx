/**
 * DashboardContainer.tsx
 * 
 * The main container component for the conference dashboard.
 * Enhanced for better fullscreen display on large screens.
 */

'use client';

import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useScreen } from '../contexts/ScreenContext';
import { ProgressBar } from './ProgressBar';
import { MegaMetric } from './MegaMetric';
import { VolumeMetrics } from './VolumeMetrics';
import { BridgedAssets } from './BridgedAssets';
import { ChainsMetric } from './ChainsMetric';
import { TVLMetric } from './TVLMetric';
import { AllTimeVolumeMetric } from './AllTimeVolumeMetric';
import { 
  volumeMetrics, 
  bridgedAssets, 
  chainsMetrics,
  allTimeVolumeMetrics
} from '../data/mockData';
import { AnimatedBackground } from './AnimatedBackground';
import { FullscreenHandler } from './FullscreenButton';

export const DashboardContainer: React.FC = () => {
  // Get data from context
  const { currentScreen, currentIndex } = useScreen();
  
  // Log screen context data for debugging
  useEffect(() => {
    console.log('Dashboard Container - Current Screen:', {
      title: currentScreen?.title,
      id: currentScreen?.id,
      value: currentScreen?.value,
      index: currentIndex
    });
  }, [currentScreen, currentIndex]);

  // Determine which component to render based on the currentScreen
  const renderCurrentScreen = () => {
    // Switch based on screen value to determine which component to render
    switch (currentScreen.value) {
      case 'tvl-metric':
        return <TVLMetric key={`screen-${currentIndex}-tvl`} />;
      
      case 'all-time-volume':
        return <AllTimeVolumeMetric key={`screen-${currentIndex}-all-time-volume`} {...allTimeVolumeMetrics} />;
      
      case 'bridged-assets':
        return <BridgedAssets key={`screen-${currentIndex}-bridged-assets`} {...bridgedAssets} />;
      
      case 'volume-metrics':
        return <VolumeMetrics key={`screen-${currentIndex}-volume-metrics`} {...volumeMetrics} />;
        
      case 'chains-ecosystem':
        return <ChainsMetric key={`screen-${currentIndex}-chains-ecosystem`} {...chainsMetrics} />;
        
      default:
        // For standard metrics, render the MegaMetric component
        return <MegaMetric key={`screen-${currentIndex}-${currentScreen.id}`} data={currentScreen} />;
    }
  };

  return (
    <div className="dashboard-root" style={{ 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'black',
      color: 'white'
    }}>
      {/* Keyboard fullscreen handler (press 'F' to toggle) */}
      <FullscreenHandler />
      
      {/* Animated gradient background */}
      <AnimatedBackground />
      
      {/* Main content area */}
      <div className="dashboard-content" style={{ 
        position: 'relative', 
        zIndex: 10,
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <div className="dashboard-inner" style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 20
        }}>
          {/* Main Metric Display with AnimatePresence for transitions */}
          <AnimatePresence mode="wait" initial={false}>
            <div 
              key={`screen-container-${currentIndex}`} 
              className="screen-container"
              style={{ 
                width: '100%', 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' 
              }}
            >
              {renderCurrentScreen()}
            </div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Progress bar at the bottom */}
      <ProgressBar />
      
      {/* Additional styles for fullscreen scaling */}
      <style jsx global>{`
        .dashboard-root {
          --base-font-size: 16px;
        }
        
        /* Scale up content in fullscreen mode */
        body.is-fullscreen .dashboard-root {
          --base-font-size: 18px;
        }
        
        /* Scale up even more for large screens */
        body.is-large-screen .dashboard-root {
          --base-font-size: 22px;
        }
        
        .screen-container {
          transform-origin: center center;
          transition: transform 0.3s ease;
          max-width: 95vw; /* Ensure content doesn't overflow horizontally */
          max-height: 90vh; /* Ensure content doesn't overflow vertically */
        }
        
        /* Use more moderate scaling with better bounds */
        body.is-fullscreen .screen-container {
          transform: scale(var(--scale-factor, 1.1));
        }
        
        body.is-large-screen .screen-container {
          transform: scale(var(--scale-factor, 1.3));
        }
        
        /* Make sure all components respect container boundaries */
        .mega-value-container,
        .tvl-metric-container,
        .all-time-volume-container,
        .volume-metrics-container {
          width: 100%;
          max-width: 95vw;
          overflow: hidden;
        }
        
        /* Ensure content stays centered and visible */
        .mega-value-base, 
        .mega-value-shine {
          width: 100%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}; 