// src/components/ui/PageLoader.tsx
import { motion } from 'motion/react';

export function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#050505]">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Outer glowing ring */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute h-24 w-24 rounded-full bg-indigo-500/30 blur-xl"
        />
        
        {/* Inner solid core */}
        <motion.div
          animate={{ 
            scale: [1, 0.8, 1] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="h-8 w-8 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        />
      </motion.div>
    </div>
  );
}