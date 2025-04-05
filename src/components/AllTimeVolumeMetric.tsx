/**
 * AllTimeVolumeMetric.tsx
 * 
 * A component for displaying the All-time on-chain DeFi volume metric
 * with eye-catching animations and styling.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AllTimeVolumeMetricProps {
  title?: string;
  value?: string;
  subtitle?: string;
}

export const AllTimeVolumeMetric: React.FC<AllTimeVolumeMetricProps> = ({
  title = "All-time on-chain DeFi volume",
  value = "$500M+",
  subtitle = "Processed through the protocol"
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="all-time-volume-container"
      style={{ 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      {/* Title - using smaller font size for this longer title */}
      <motion.h2 
        variants={itemVariants}
        className="all-time-volume-title"
        style={{ 
          fontSize: 'clamp(1.75rem, 4vw, 3.5rem)', // Reduced from the default
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '1.5rem',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          maxWidth: '90%',
          lineHeight: '1.2'
        }}
      >
        {title}
      </motion.h2>
      
      {/* Value - Most prominent */}
      <motion.div variants={itemVariants} className="all-time-volume-value-wrapper">
        <div className="mega-value-container">
          <div className="mega-value-base">{value}</div>
          <div className="mega-value-shine">{value}</div>
        </div>
      </motion.div>
      
      {/* Subtitle */}
      {subtitle && (
        <motion.div 
          variants={itemVariants}
          className="all-time-volume-subtitle"
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', // Reduced from the default
            color: 'rgb(209, 213, 219)',
            marginTop: '2rem',
            maxWidth: '80%'
          }}
        >
          {subtitle}
        </motion.div>
      )}
      
      {/* Animations and styles */}
      <style jsx global>{`
        .all-time-volume-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .all-time-volume-title {
          text-wrap: balance;
          max-width: 90%;
          hyphens: auto;
        }
        
        /* Specific fullscreen adjustments for this component */
        body.is-fullscreen .all-time-volume-title {
          font-size: clamp(2rem, 4.5vw, 4rem) !important; 
          /* Smaller than general h2 styling to prevent overflow */
        }
        
        body.is-large-screen .all-time-volume-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem) !important;
        }
        
        .all-time-volume-value-wrapper {
          margin: 1rem 0;
        }
        
        /* Prevent value from being too large */
        body.is-fullscreen .all-time-volume-container .mega-value-container {
          font-size: clamp(5rem, 14vw, 15rem) !important;
        }
        
        body.is-large-screen .all-time-volume-container .mega-value-container {
          font-size: clamp(7rem, 16vw, 18rem) !important;
        }
        
        /* Base animation styles */
        .mega-value-container {
          position: relative;
          font-size: clamp(5rem, 18vw, 16rem);
          font-weight: 900;
          line-height: 1;
          display: inline-block;
        }
        
        .mega-value-base {
          background: linear-gradient(90deg, #3b82f6, #ffffff, #8b5cf6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          animation: gradientMove 5s ease-in-out infinite;
          filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.5));
          position: relative;
          z-index: 1;
        }
        
        .mega-value-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          -webkit-mask-image: linear-gradient(
            -75deg, 
            rgba(0,0,0,0.6) 30%, 
            rgba(0,0,0,0.8) 46%, 
            rgba(255,255,255,0.9) 50%, 
            rgba(0,0,0,0.8) 54%, 
            rgba(0,0,0,0.6) 70%
          );
          -webkit-mask-size: 200% 100%;
          animation: shine 2.5s linear infinite;
          z-index: 2;
        }
        
        @keyframes shine {
          0% {
            -webkit-mask-position: 150% 0;
          }
          100% {
            -webkit-mask-position: -50% 0;
          }
        }
        
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
            transform: scale(1);
          }
          50% {
            background-position: 100% 50%;
            transform: scale(1.03);
          }
          100% {
            background-position: 0% 50%;
            transform: scale(1);
          }
        }
      `}</style>
    </motion.div>
  );
}; 