// src/components/layout/PageWrapper.tsx
import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <motion.div
      // 1. Initial: How the component looks before it mounts
      initial={{ opacity: 0, y: 20 }}
      // 2. Animate: The state it animates to when it mounts
      animate={{ opacity: 1, y: 0 }}
      // 3. Exit: The state it animates to when it is unmounted
      exit={{ opacity: 0, y: -20 }}
      // 4. Transition: How long and what kind of easing to use
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`min-h-screen w-full pt-20 px-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.div>
  );
}