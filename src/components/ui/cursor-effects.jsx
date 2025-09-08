import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new trail point
      const newTrail = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };
      
      setTrails(prev => [...prev.slice(-8), newTrail]);
    };

    window.addEventListener('mousemove', updateMousePosition);

    // Clean up old trails
    const interval = setInterval(() => {
      setTrails(prev => prev.filter(trail => Date.now() - trail.timestamp < 1000));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor glow */}
      <motion.div
        className="absolute w-6 h-6 bg-blue-400 rounded-full opacity-30 blur-sm"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />
      
      {/* Fume trails */}
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"
            initial={{
              x: trail.x - 6,
              y: trail.y - 6,
              opacity: 0.6,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 0.3,
              y: trail.y - 20,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}