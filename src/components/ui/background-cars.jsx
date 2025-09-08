import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from 'lucide-react';

export default function BackgroundCars({ trigger = false }) {
  const [showCars, setShowCars] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowCars(true);
      const timer = setTimeout(() => setShowCars(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {showCars && (
          <>
            {/* Car moving left to right */}
            <motion.div
              initial={{ x: -100, y: '60%' }}
              animate={{ x: '100vw' }}
              exit={{ x: '100vw' }}
              transition={{ duration: 3, ease: "linear" }}
              className="absolute opacity-10"
            >
              <Car className="w-16 h-16 text-blue-600 transform rotate-90" />
            </motion.div>
            
            {/* Car moving right to left */}
            <motion.div
              initial={{ x: '100vw', y: '40%' }}
              animate={{ x: -100 }}
              exit={{ x: -100 }}
              transition={{ duration: 3, ease: "linear" }}
              className="absolute opacity-10"
            >
              <Car className="w-16 h-16 text-green-600 transform -rotate-90" />
            </motion.div>
            
            {/* Additional cars for more dynamic effect */}
            <motion.div
              initial={{ x: -80, y: '70%' }}
              animate={{ x: '100vw' }}
              exit={{ x: '100vw' }}
              transition={{ duration: 2.5, ease: "linear", delay: 0.5 }}
              className="absolute opacity-8"
            >
              <Car className="w-12 h-12 text-purple-600 transform rotate-90" />
            </motion.div>
            
            <motion.div
              initial={{ x: '100vw', y: '30%' }}
              animate={{ x: -80 }}
              exit={{ x: -80 }}
              transition={{ duration: 2.5, ease: "linear", delay: 0.8 }}
              className="absolute opacity-8"
            >
              <Car className="w-12 h-12 text-orange-600 transform -rotate-90" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}