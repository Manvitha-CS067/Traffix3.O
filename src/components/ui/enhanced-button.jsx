import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

export default function EnhancedButton({ 
  children, 
  onClick, 
  className = "", 
  variant = "default",
  size = "default",
  disabled = false,
  ...props 
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    if (onClick) onClick(e);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Button
        onClick={handleClick}
        className={`relative overflow-hidden ${className}`}
        variant={variant}
        size={size}
        disabled={disabled}
        {...props}
      >
        {/* Ripple effect */}
        {isClicked && (
          <motion.div
            className="absolute inset-0 bg-white rounded-lg"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          whileHover={{ 
            opacity: 0.1,
            x: ['-100%', '100%'],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        />
        
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  );
}