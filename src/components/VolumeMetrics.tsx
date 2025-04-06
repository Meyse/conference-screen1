/**
 * VolumeMetrics.tsx
 * 
 * A component for displaying volume metrics across different time periods (24H/7D/30D)
 * with the 24H volume being the most prominent. Fetches real-time data from the dashboard-metrics API.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VolumeMetricsProps {
  title: string;
}

export const VolumeMetrics: React.FC<VolumeMetricsProps> = ({
  title = "Live DeFi Volume"
}) => {
  const [metrics, setMetrics] = useState({
    volume24h: "$0",
    volume7d: "$0",
    volume30d: "$0"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard-metrics');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch metrics: ${response.status}`);
        }
        
        const data = await response.json();
        
        setMetrics({
          volume24h: data.metrics['total-volume-24h'] || "$0",
          volume7d: data.metrics['total-volume-7d'] || "$0",
          volume30d: data.metrics['total-volume-30d'] || "$0"
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Failed to load metrics data');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    
    // Optional: Set up polling to refresh data periodically
    const intervalId = setInterval(fetchMetrics, 5 * 60 * 1000); // Refresh every 5 minutes
    
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
  if (loading && !metrics.volume24h) {
    return (
      <div style={{ 
        color: 'white', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        fontSize: '1.5rem'
      }}>
        Loading metrics...
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
      className="volume-metrics-container"
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
        className="volume-metrics-title"
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
      
      {/* 24H Volume - Most prominent */}
      <motion.div variants={itemVariants} className="volume-primary">
        <div className="time-period">24 HOUR</div>
        <div className="mega-value-container">
          <div className="mega-value-base">{metrics.volume24h}</div>
          <div className="mega-value-shine">{metrics.volume24h}</div>
        </div>
      </motion.div>
      
      {/* Secondary metrics */}
      <motion.div 
        variants={itemVariants}
        className="volume-secondary-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(2rem, 5vw, 5rem)',
          marginTop: '3rem'
        }}
      >
        {/* 7D Volume */}
        <div className="secondary-metric">
          <div className="time-period small">7 DAY</div>
          <div className="secondary-value">{metrics.volume7d}</div>
        </div>
        
        {/* 30D Volume */}
        <div className="secondary-metric">
          <div className="time-period small">30 DAY</div>
          <div className="secondary-value">{metrics.volume30d}</div>
        </div>
      </motion.div>
      
      {/* Animations and styles */}
      <style jsx global>{`
        .volume-metrics-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .volume-metrics-title {
          text-wrap: balance;
          max-width: 90%;
          hyphens: auto;
        }
        
        /* Specific fullscreen adjustments for this component */
        body.is-fullscreen .volume-metrics-title {
          font-size: clamp(2rem, 4.5vw, 4rem) !important;
        }
        
        body.is-large-screen .volume-metrics-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem) !important;
        }
        
        .volume-primary {
          margin: 1rem 0;
        }
        
        /* Prevent value from being too large */
        body.is-fullscreen .volume-metrics-container .mega-value-container {
          font-size: clamp(5rem, 14vw, 15rem) !important;
        }
        
        body.is-large-screen .volume-metrics-container .mega-value-container {
          font-size: clamp(7rem, 16vw, 18rem) !important;
        }
        
        .time-period {
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #60a5fa;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        
        .time-period.small {
          font-size: clamp(0.9rem, 2vw, 1.5rem);
          margin-bottom: 0.3rem;
          color: #93c5fd;
        }
        
        .secondary-metric {
          text-align: center;
        }
        
        .secondary-value {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 800;
          background: linear-gradient(90deg, #60a5fa, #c7d2fe);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
        }
        
        /* Better secondary metrics scaling in fullscreen */
        body.is-fullscreen .secondary-value {
          font-size: clamp(2.5rem, 7vw, 5rem) !important;
        }
        
        body.is-large-screen .secondary-value {
          font-size: clamp(3rem, 8vw, 6rem) !important;
        }
        
        body.is-fullscreen .time-period {
          font-size: clamp(1.2rem, 3vw, 2.5rem) !important;
        }
        
        body.is-large-screen .time-period {
          font-size: clamp(1.5rem, 3.5vw, 3rem) !important;
        }
        
        body.is-fullscreen .time-period.small {
          font-size: clamp(1rem, 2.5vw, 2rem) !important;
        }
        
        body.is-large-screen .time-period.small {
          font-size: clamp(1.2rem, 3vw, 2.5rem) !important;
        }
        
        /* Control spacing in fullscreen */
        body.is-fullscreen .volume-secondary-container {
          margin-top: 5rem;
          gap: clamp(3rem, 8vw, 8rem);
        }
        
        body.is-large-screen .volume-secondary-container {
          margin-top: 6rem;
          gap: clamp(4rem, 10vw, 10rem);
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