/**
 * BridgedAssets.tsx
 * 
 * A component for displaying metrics about assets bridged onto the network,
 * featuring Bitcoin and Ethereum with eye-catching animations and real-time data.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BridgedAssetsProps {
  title: string;
}

interface BridgedAssetsData {
  btc: string;
  eth: string;
  updated_at: string;
}

export const BridgedAssets: React.FC<BridgedAssetsProps> = ({
  title = "Assets Bridged to Network"
}) => {
  const [data, setData] = useState<BridgedAssetsData>({
    btc: "0",
    eth: "0",
    updated_at: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null);

  // Fetch data from our API
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching bridged assets data...');
        setLoading(true);
        const response = await fetch('/api/bridged-assets');
        
        const responseText = await response.text();
        console.log('Raw API response:', responseText);
        
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (e) {
          throw new Error(`Failed to parse response: ${(e as Error).message}`);
        }
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        console.log('Parsed API response:', result);
        setDebugInfo(result);
        
        if (result.btc && result.eth) {
          setData(result);
        } else if (result.error) {
          throw new Error(`API error: ${result.error}`);
        } else {
          throw new Error('API response missing expected data structure');
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching bridged assets data:', err);
        setError(`Failed to load assets data: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up polling to refresh data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        staggerChildren: 0.3
      }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Show loading state
  if (loading && data.btc === "0" && data.eth === "0") {
    return (
      <div style={{ 
        color: 'white', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        fontSize: '1.5rem'
      }}>
        <div>Loading assets data...</div>
        {debugInfo && (
          <pre style={{ fontSize: '0.8rem', marginTop: '1rem', maxWidth: '80%', overflow: 'auto' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ 
        color: 'white', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', color: '#EF4444', marginBottom: '1rem' }}>
          {error}
        </div>
        {debugInfo && (
          <pre style={{ fontSize: '0.8rem', maxWidth: '80%', overflow: 'auto' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}
      </div>
    );
  }
  
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
      
      {/* Asset metrics */}
      <div className="assets-container">
        {/* Bitcoin */}
        <motion.div 
          className="asset-metric" 
          variants={itemVariants}
        >
          <div className="asset-icon">
            <Image 
              src="/logos/tbtc.svg" 
              alt="Bitcoin" 
              width={90} 
              height={90} 
              className="icon-image"
            />
          </div>
          <div className="asset-wrapper">
            <div className="asset-value-base">{data.btc}</div>
            <div className="asset-value-shine">{data.btc}</div>
          </div>
          <div className="asset-name">Bitcoin (tBTC)</div>
        </motion.div>
        
        {/* Ethereum */}
        <motion.div 
          className="asset-metric" 
          variants={itemVariants}
        >
          <div className="asset-icon">
            <Image 
              src="/logos/eth.svg" 
              alt="Ethereum" 
              width={90} 
              height={90} 
              className="icon-image"
            />
          </div>
          <div className="asset-wrapper">
            <div className="asset-value-base">{data.eth}</div>
            <div className="asset-value-shine">{data.eth}</div>
          </div>
          <div className="asset-name">Ethereum</div>
        </motion.div>
      </div>
      
      {/* Styles */}
      <style jsx global>{`
        .assets-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: clamp(3rem, 10vw, 8rem);
          margin-top: 1rem;
          width: 100%;
        }
        
        .asset-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .asset-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          width: 100px;
          height: 100px;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
        }
        
        .icon-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .asset-wrapper {
          position: relative;
          font-size: clamp(4rem, 14vw, 12rem);
          font-weight: 900;
          line-height: 1;
          display: inline-block;
        }
        
        .asset-value-base {
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
        
        .asset-value-shine {
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
        
        .asset-name {
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-weight: 700;
          margin-top: 0.5rem;
          color: #d1d5db;
          text-transform: uppercase;
          letter-spacing: 0.05em;
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