/**
 * AnimatedBackground.tsx
 * 
 * A component that renders a slowly moving gradient background
 * for the conference display.
 */

'use client';

import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    console.log('AnimatedBackground mounting and setting up canvas');
    // Get canvas element
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas reference is null');
      return;
    }
    
    // Get rendering context
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }
    
    // Now that we've verified canvas and ctx exist, we can use non-null assertions
    // to tell TypeScript that these won't be null in the functions below
    
    // Set canvas to fill the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Define colors - darker variants for a more subtle effect
    const colors = [
      { r: 15, g: 25, b: 70 },   // Darker blue
      { r: 50, g: 20, b: 90 },   // Darker purple
      { r: 10, g: 15, b: 60 },   // Very dark blue
      { r: 40, g: 15, b: 80 }    // Dark purple
    ];
    
    let time = 0;
    
    // Animation loop
    function animate() {
      time += 0.002; // Faster speed for noticeable movement
      
      // Clear the canvas
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      // Fill with very dark background first for better contrast
      ctx!.fillStyle = 'rgb(2, 2, 15)'; // Much darker base
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      
      // Create two moving gradient centers
      const gradientCenters = [
        {
          x: Math.sin(time * 0.5) * canvas!.width * 0.3 + canvas!.width * 0.5,
          y: Math.cos(time * 0.4) * canvas!.height * 0.3 + canvas!.height * 0.5,
          radius: canvas!.width * 0.8,
          colorIndex: 0
        },
        {
          x: Math.cos(time * 0.3) * canvas!.width * 0.4 + canvas!.width * 0.5,
          y: Math.sin(time * 0.5) * canvas!.height * 0.4 + canvas!.height * 0.5,
          radius: canvas!.width * 0.7,
          colorIndex: 2
        }
      ];
      
      // Draw each gradient with lower opacity for a more subtle effect
      for (const center of gradientCenters) {
        const gradient = ctx!.createRadialGradient(
          center.x, center.y, 0, 
          center.x, center.y, center.radius
        );
        
        const color1 = colors[center.colorIndex];
        const color2 = colors[(center.colorIndex + 1) % colors.length];
        
        // Lower opacity for more subtle gradients
        gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.6)`);
        gradient.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, 0)`);
        
        ctx!.fillStyle = gradient;
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      }
      
      // Add some larger stars for extra visual interest
      drawStars(ctx!, canvas!.width, canvas!.height, time);
      
      requestAnimationFrame(animate);
    }
    
    // Function to draw stars/particles
    function drawStars(
      ctx: CanvasRenderingContext2D, 
      width: number, 
      height: number, 
      time: number
    ) {
      const numStars = 100; // More stars
      
      for (let i = 0; i < numStars; i++) {
        const x = (Math.sin(i * 347.3) * 0.5 + 0.5) * width;
        const y = (Math.cos(i * 541.7) * 0.5 + 0.5) * height;
        
        // Make stars twinkle with lower opacity
        const opacity = 0.3 + Math.sin(time * 2 + i * 0.7) * 0.2;
        
        // Some stars are larger
        const size = i % 10 === 0 ? 
          1.5 + Math.sin(time + i) * 0.8 : 
          0.6 + Math.sin(time + i) * 0.3;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Start the animation
    console.log('Starting animation loop');
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      backgroundColor: 'rgb(2, 2, 15)', // Much darker background
      overflow: 'hidden'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          display: 'block'
        }} 
      />
    </div>
  );
}; 