/**
 * MegaMetric.tsx
 * 
 * A component for displaying very large metric values
 * optimized for conference displays with eye-catching effects.
 */

'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MetricScreen } from '../data/mockData';

interface MegaMetricProps {
  data: MetricScreen;
}

export const MegaMetric: React.FC<MegaMetricProps> = ({ data }) => {
  const { title, value, subtitle } = data;
  
  useEffect(() => {
    console.log('MegaMetric rendering with data:', { title, value, subtitle });
  }, [title, value, subtitle]);
  
  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
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
      <h2 style={{ 
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '2rem',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
      }}>
        {title}
      </h2>
      
      {/* Value with enhanced flashy effects */}
      <div className="mega-value-container">
        <div className="mega-value-base">{value}</div>
        <div className="mega-value-shine">{value}</div>
      </div>
      
      {/* CSS Animations with more pronounced effects */}
      <style jsx global>{`
        .mega-value-container {
          position: relative;
          font-size: clamp(6rem, 20vw, 18rem);
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
      
      {/* Subtitle */}
      {subtitle && (
        <div style={{ 
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: 'rgb(209, 213, 219)',
          marginTop: '2rem'
        }}>
          {subtitle}
        </div>
      )}
    </motion.div>
  );
}; 