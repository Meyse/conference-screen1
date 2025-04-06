/**
 * ChainsMetric.tsx
 * 
 * A component for displaying the number of chains in the ecosystem
 * with eye-catching animations for conference display.
 * Updated to show additional metrics like currencies, liquidity pools and tokens.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChainsMetricProps {
  title: string;
  count: string;
  additionalText?: string;
}

export const ChainsMetric: React.FC<ChainsMetricProps> = ({
  title = "Chains & currencies",
  count = "4",
  additionalText
}) => {
  // Extract the numeric part from the additionalText if it exists
  const currencyCount = additionalText ? additionalText.split(' ')[0] : "";
  const remainingText = additionalText ? additionalText.split(' ').slice(1).join(' ') : "";
  
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
      
      {/* Metric Display Container */}
      <motion.div
        variants={itemVariants}
        className="metrics-container"
      >
        {/* Chains Count */}
        <div className="metric-item">
          <div className="mega-value-container">
            <div className="mega-value-base">{count}</div>
            <div className="mega-value-shine">{count}</div>
          </div>
          <div className="metric-label">Chains</div>
        </div>
        
        {/* Currency Count - Only show if additionalText exists */}
        {additionalText && (
          <div className="metric-item">
            <div className="mega-value-container">
              <div className="mega-value-base currency-value">{currencyCount}</div>
              <div className="mega-value-shine">{currencyCount}</div>
            </div>
            <div className="metric-label">{remainingText}</div>
          </div>
        )}
      </motion.div>
      
      {/* Connected chains visual indicator */}
      <motion.div
        variants={itemVariants}
        className="chains-visual"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="chain-node main"></div>
        <div className="chain-connections">
          <div className="chain-connection"></div>
          <div className="chain-connection"></div>
          <div className="chain-connection"></div>
          <div className="chain-connection"></div>
        </div>
      </motion.div>
      
      {/* Styles */}
      <style jsx global>{`
        .metrics-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(8rem, 20vw, 16rem);
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .metric-label {
          font-size: clamp(1.2rem, 3vw, 2.2rem);
          font-weight: bold;
          margin-top: 1rem;
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        .mega-value-container {
          position: relative;
          font-size: clamp(5rem, 15vw, 15rem);
          font-weight: 900;
          line-height: 1;
          display: inline-block;
        }
        
        .mega-value-base {
          background: linear-gradient(90deg, #3b82f6, #ffffff, #10b981);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 5s ease-in-out infinite;
          filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.5));
          position: relative;
          z-index: 1;
        }
        
        .mega-value-base.currency-value {
          background: linear-gradient(90deg, #3b82f6, #ffffff, #10b981);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 5s ease-in-out infinite;
          filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.5));
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
        
        .chains-visual {
          position: relative;
          margin-top: 2rem;
          height: 15vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .chain-node {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
          position: relative;
          z-index: 2;
        }
        
        .chain-node.main {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #4f46e5, #06b6d4);
          animation: pulse 4s ease-in-out infinite;
        }
        
        .chain-connections {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          max-width: 500px;
        }
        
        .chain-connection {
          position: absolute;
          bottom: 50%;
          left: 50%;
          height: 2px;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(16, 185, 129, 0.4));
          transform-origin: bottom left;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
          animation: connectionPulse 3s ease-in-out infinite;
        }
        
        .chain-connection:nth-child(1) {
          transform: rotate(20deg);
          width: 160px;
          animation-delay: 0.2s;
        }
        
        .chain-connection:nth-child(2) {
          transform: rotate(100deg);
          width: 120px;
          animation-delay: 0.7s;
        }
        
        .chain-connection:nth-child(3) {
          transform: rotate(210deg);
          width: 140px;
          animation-delay: 0.4s;
        }
        
        .chain-connection:nth-child(4) {
          transform: rotate(300deg);
          width: 130px;
          animation-delay: 0.9s;
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
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 20px rgba(79, 70, 229, 0.6);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 40px rgba(79, 70, 229, 0.8);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 20px rgba(79, 70, 229, 0.6);
            transform: scale(1);
          }
        }
        
        @keyframes connectionPulse {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            opacity: 0.5;
          }
        }
      `}</style>
    </motion.div>
  );
}; 