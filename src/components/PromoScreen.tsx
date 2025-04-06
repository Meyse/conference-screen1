/**
 * PromoScreen.tsx
 * 
 * A promotional screen component for conference display
 * highlighting special booth events and giveaways.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PromoScreenProps {
  title?: string;
  day?: string;
  time?: string;
  description?: string;
}

export const PromoScreen: React.FC<PromoScreenProps> = ({
  title = "SPECIAL EVENT",
  day = "Wednesday",
  time = "15:00h",
  description = "Come to our booth and spin the wheel to win limited edition Verus goodies!"
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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="promo-container"
    >
      {/* Title */}
      <motion.h2 
        variants={itemVariants}
        className="promo-title"
      >
        {title}
      </motion.h2>
      
      {/* Main Promo Content */}
      <motion.div
        variants={itemVariants} 
        className="promo-content"
      >
        {/* Visual Prize Wheel */}
        <div className="wheel-outer-container">
          <motion.div 
            className="wheel-wrapper"
            animate={{
              boxShadow: [
                "0 0 30px 5px rgba(59, 130, 246, 0.4)",
                "0 0 50px 10px rgba(59, 130, 246, 0.7)",
                "0 0 30px 5px rgba(59, 130, 246, 0.4)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="prize-wheel-container"
              animate={{ 
                rotate: 360
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear"
              }}
            >
              <div className="prize-wheel"></div>
              <div className="wheel-center"></div>
            </motion.div>
            <div className="wheel-pointer"></div>
          </motion.div>
        </div>
        
        {/* Event Details */}
        <motion.div className="event-details">
          <motion.div 
            className="event-day-time"
            variants={pulseVariants}
            animate="pulse"
          >
            <span className="event-day">{day}</span>
            <span className="event-time">{time}</span>
          </motion.div>
          
          <motion.p 
            className="event-description"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="booth-indicator"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 15px rgba(16, 185, 129, 0.4)",
                "0 0 35px rgba(16, 185, 129, 0.7)",
                "0 0 15px rgba(16, 185, 129, 0.4)"
              ]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            VISIT OUR BOOTH
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Styles */}
      <style jsx global>{`
        .promo-container {
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          text-align: center;
          padding: 2rem;
          position: relative;
        }
        
        .promo-title {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: bold;
          color: white;
          margin-bottom: 3rem;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          background: linear-gradient(90deg, #3b82f6, #10b981, #3b82f6);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleGradient 5s ease-in-out infinite;
        }
        
        .promo-content {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: clamp(2rem, 6vw, 5rem);
          margin-bottom: 2rem;
        }
        
        .wheel-outer-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(250px, 38vw, 440px);
          height: clamp(250px, 38vw, 440px);
          border-radius: 50%;
          overflow: visible;
        }
        
        .wheel-wrapper {
          position: relative;
          width: clamp(220px, 35vw, 400px);
          height: clamp(220px, 35vw, 400px);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: visible;
        }
        
        .prize-wheel-container {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: visible;
        }
        
        .prize-wheel {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(
            #ff3b6f 0deg 45deg,
            #3b9dff 45deg 90deg,
            #12e997 90deg 135deg,
            #ffc234 135deg 180deg,
            #ff3b6f 180deg 225deg,
            #3b9dff 225deg 270deg,
            #12e997 270deg 315deg,
            #ffc234 315deg 360deg
          );
        }
        
        .wheel-center {
          position: absolute;
          width: 15%;
          height: 15%;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.9);
          z-index: 2;
        }
        
        .wheel-pointer {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          width: 35px;
          height: 35px;
          background-color: white;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
          z-index: 3;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
        }
        
        .event-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: clamp(300px, 50vw, 500px);
        }
        
        .event-day-time {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
          position: relative;
        }
        
        .event-day {
          font-size: clamp(3rem, 7vw, 5rem);
          font-weight: 900;
          color: #f8fafc;
          text-shadow: 0 0 25px rgba(248, 250, 252, 0.6);
          letter-spacing: -0.02em;
        }
        
        .event-time {
          font-size: clamp(4rem, 9vw, 7rem);
          font-weight: 900;
          color: #3b82f6;
          text-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4);
          letter-spacing: -0.03em;
        }
        
        .event-description {
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          margin-bottom: 2.5rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .booth-indicator {
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          font-weight: 700;
          padding: 1rem 2.5rem;
          border: 2px solid #10b981;
          background-color: rgba(16, 185, 129, 0.25);
          border-radius: 9999px;
          color: #ffffff;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
        }
        
        .booth-indicator::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        
        @keyframes titleGradient {
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
      `}</style>
    </motion.div>
  );
}; 