/**
 * TVLMetric.tsx
 * 
 * A component for displaying Total Value Locked (TVL) metric
 * fetching real-time data from the dashboard metrics API.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TVLMetricProps {
  title?: string;
  subtitle?: string;
}

export const TVLMetric: React.FC<TVLMetricProps> = ({
  title = "TVL",
  subtitle = "Total Value Locked"
}) => {
  // State for TVL data
  const [tvlValue, setTvlValue] = useState("$0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch metrics on component mount
  useEffect(() => {
    const fetchTVL = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard-metrics');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch metrics: ${response.status}`);
        }
        
        const data = await response.json();
        setTvlValue(data.metrics['total-basket-reserve'] || "$0");
        setError(null);
      } catch (err) {
        console.error('Error fetching TVL:', err);
        setError('Failed to load TVL data');
      } finally {
        setLoading(false);
      }
    };

    fetchTVL();
    
    // Optional: Set up polling to refresh data periodically
    const intervalId = setInterval(fetchTVL, 5 * 60 * 1000); // Refresh every 5 minutes
    
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

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
  
  // Show loading state
  if (loading && tvlValue === "$0") {
    return (
      <div style={{ 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        fontSize: '1.5rem'
      }}>
        Loading TVL data...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        fontSize: '1.5rem'
      }}>
        {error}
      </div>
    );
  }
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="tvl-metric-container"
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
      {/* Title */}
      <motion.h2 
        variants={itemVariants}
        className="tvl-title"
        style={{ 
          fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
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
      
      {/* TVL Value - Most prominent */}
      <motion.div variants={itemVariants} className="tvl-value-wrapper">
        <div className="mega-value-container">
          <div className="mega-value-base">{tvlValue}</div>
          <div className="mega-value-shine">{tvlValue}</div>
        </div>
      </motion.div>
      
      {/* Subtitle */}
      {subtitle && (
        <motion.div 
          variants={itemVariants}
          className="tvl-subtitle"
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
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
        .tvl-metric-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .tvl-title {
          text-wrap: balance;
          max-width: 90%;
          hyphens: auto;
        }
        
        /* Specific fullscreen adjustments for this component */
        body.is-fullscreen .tvl-title {
          font-size: clamp(2rem, 4.5vw, 4rem) !important;
        }
        
        body.is-large-screen .tvl-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem) !important;
        }
        
        .tvl-value-wrapper {
          margin: 1rem 0;
        }
        
        /* Prevent value from being too large */
        body.is-fullscreen .tvl-metric-container .mega-value-container {
          font-size: clamp(5rem, 14vw, 15rem) !important;
        }
        
        body.is-large-screen .tvl-metric-container .mega-value-container {
          font-size: clamp(7rem, 16vw, 18rem) !important;
        }
        
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