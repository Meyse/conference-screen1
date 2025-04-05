/**
 * ProgressBar.tsx
 * 
 * A progress bar component that shows timing to the next screen
 * and displays information about what's coming next.
 * Enhanced for better visual appeal and readability on conference displays.
 */

'use client';

import React, { useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScreen } from '../contexts/ScreenContext';

// Use memo to prevent unnecessary re-renders
export const ProgressBar: React.FC = memo(() => {
  const { progress, nextScreen, totalScreens, currentIndex, currentScreen } = useScreen();

  // Calculate the actual index for display, handling zero-based indexing
  const displayIndex = currentIndex + 1;
  
  // Log for debugging
  useEffect(() => {
    console.log('ProgressBar rendering:', {
      currentIndex,
      displayIndex,
      totalScreens,
      currentScreen: currentScreen?.title,
      nextScreen: nextScreen?.title
    });
  }, [currentIndex, displayIndex, totalScreens, currentScreen, nextScreen]);

  return (
    <div className="progress-container" style={{ 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      zIndex: 50,
      backgroundColor: 'rgba(11, 15, 25, 0.9)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 0',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '80px'
    }}>
      <div className="progress-content" style={{ 
        width: '90%', 
        maxWidth: '1600px', 
        margin: '0 auto', 
        padding: '0 1.5rem' 
      }}>
        <div className="progress-info" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          {/* Next Screen Title with Transition */}
          <div className="progress-next" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem' 
          }}>
            <span className="progress-next-label" style={{ 
              color: '#94a3b8',
              fontWeight: 600,
              letterSpacing: '0.05em'
            }}>NEXT:</span>
            
            <AnimatePresence mode="wait" initial={false}>
              <motion.span 
                key={`next-title-${nextScreen?.id}-${currentIndex}`}
                className="progress-next-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  color: 'white',
                  fontWeight: 700,
                  position: 'relative',
                  display: 'inline-block',
                  minWidth: '200px'
                }}
              >
                {nextScreen?.title || 'Loading...'}
              </motion.span>
            </AnimatePresence>
          </div>
          
          {/* Screen Position Counter */}
          <div className="progress-position" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.3rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span 
                key={`screen-number-${currentIndex}`}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="screen-number" 
                style={{ color: '#60a5fa', fontWeight: 700 }}
              >
                {displayIndex}
              </motion.span>
            </AnimatePresence>
            <span className="screen-divider" style={{ color: '#94a3b8' }}>/</span>
            <span className="total-screens" style={{ color: '#94a3b8', fontWeight: 600 }}>{totalScreens}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="progress-bar-container" style={{ width: '100%' }}>
          <div className="progress-bar" style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: 'rgba(55, 65, 81, 0.3)', 
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <motion.div 
              className="progress-fill" 
              style={{ 
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa)',
                borderRadius: '9999px'
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// Add display name for better debugging
ProgressBar.displayName = 'ProgressBar'; 