/**
 * LiveMetrics.tsx
 * 
 * A component for displaying live metrics scraped from the external dashboard
 * with automatic refresh and eye-catching animations.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchDashboardMetrics, DashboardMetricsResponse } from '../utils/api';

interface LiveMetricsProps {
  title?: string;
}

export const LiveMetrics: React.FC<LiveMetricsProps> = ({
  title = "Live Dashboard Metrics"
}) => {
  // State for metrics data
  const [metricsData, setMetricsData] = useState<DashboardMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch metrics on component mount and refresh every 60 seconds
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardMetrics();
        
        if (isMounted) {
          setMetricsData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load metrics');
          console.error('Error loading metrics:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    // Initial fetch
    fetchData();
    
    // Set up refresh interval (60 seconds)
    const intervalId = setInterval(fetchData, 60 * 1000);
    
    // Cleanup on unmount
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
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

  // Function to format a date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
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
        style={{ 
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '2rem',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
        }}
      >
        {title}
      </motion.h2>
      
      {/* Live data display */}
      {loading && !metricsData ? (
        <motion.div 
          variants={itemVariants}
          style={{ fontSize: '2rem' }}
        >
          Loading metrics...
        </motion.div>
      ) : error ? (
        <motion.div 
          variants={itemVariants}
          style={{ fontSize: '1.5rem', color: '#ef4444' }}
        >
          {error}
        </motion.div>
      ) : metricsData && (
        <div className="metrics-grid">
          {/* VRSC in Baskets */}
          <motion.div 
            className="metric-card" 
            variants={itemVariants}
          >
            <div className="metric-title">VRSC in Baskets</div>
            <div className="metric-value-wrapper">
              <div className="metric-value-base">{metricsData.metrics['vrsc-in-baskets']}</div>
              <div className="metric-value-shine">{metricsData.metrics['vrsc-in-baskets']}</div>
            </div>
          </motion.div>
          
          {/* Total Basket Reserve */}
          <motion.div 
            className="metric-card" 
            variants={itemVariants}
          >
            <div className="metric-title">Total Basket Reserve</div>
            <div className="metric-value-wrapper">
              <div className="metric-value-base">{metricsData.metrics['total-basket-reserve']}</div>
              <div className="metric-value-shine">{metricsData.metrics['total-basket-reserve']}</div>
            </div>
          </motion.div>
          
          {/* Volume 24h */}
          <motion.div 
            className="metric-card" 
            variants={itemVariants}
          >
            <div className="metric-title">24 Hour Volume</div>
            <div className="metric-value-wrapper">
              <div className="metric-value-base">{metricsData.metrics['total-volume-24h']}</div>
              <div className="metric-value-shine">{metricsData.metrics['total-volume-24h']}</div>
            </div>
          </motion.div>
          
          {/* Volume 7d */}
          <motion.div 
            className="metric-card" 
            variants={itemVariants}
          >
            <div className="metric-title">7 Day Volume</div>
            <div className="metric-value-wrapper">
              <div className="metric-value-base">{metricsData.metrics['total-volume-7d']}</div>
              <div className="metric-value-shine">{metricsData.metrics['total-volume-7d']}</div>
            </div>
          </motion.div>
          
          {/* Volume 30d */}
          <motion.div 
            className="metric-card" 
            variants={itemVariants}
          >
            <div className="metric-title">30 Day Volume</div>
            <div className="metric-value-wrapper">
              <div className="metric-value-base">{metricsData.metrics['total-volume-30d']}</div>
              <div className="metric-value-shine">{metricsData.metrics['total-volume-30d']}</div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Last updated timestamp */}
      {metricsData && (
        <motion.div 
          variants={itemVariants}
          className="timestamp"
        >
          Last Updated: {formatDate(metricsData.scraped_at)}
        </motion.div>
      )}
      
      {/* Styles */}
      <style jsx global>{`
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: auto;
          gap: clamp(1rem, 3vw, 2rem);
          width: 100%;
          max-width: 1200px;
        }
        
        /* Make the 30-day volume metric span the full width at the bottom */
        .metrics-grid .metric-card:nth-child(5) {
          grid-column: 1 / -1;
        }
        
        .metric-card {
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          border: 1px solid rgba(55, 65, 81, 0.5);
          padding: clamp(1rem, 3vh, 2rem);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }
        
        .metric-card:hover {
          transform: translateY(-5px);
          border-color: rgba(96, 165, 250, 0.7);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
        
        .metric-title {
          font-size: clamp(0.9rem, 2vw, 1.2rem);
          font-weight: 700;
          color: #60a5fa;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .metric-value-wrapper {
          position: relative;
          font-size: clamp(1.5rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1.2;
          display: inline-block;
        }
        
        .metric-value-base {
          background: linear-gradient(90deg, #3b82f6, #ffffff, #10b981);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          animation: gradientMove 5s ease-in-out infinite;
          filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.5));
          position: relative;
          z-index: 1;
        }
        
        .metric-value-shine {
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
        
        .timestamp {
          margin-top: 2rem;
          font-size: 1rem;
          color: #94a3b8;
          font-style: italic;
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
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        /* Responsive adjustments for small screens */
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
          
          .metrics-grid .metric-card:nth-child(5) {
            grid-column: auto;
          }
        }
      `}</style>
    </motion.div>
  );
}; 