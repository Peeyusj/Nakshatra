// src/components/visuals/CosmicWheel.tsx
import { motion } from "motion/react";

export function CosmicWheel() {
  return (
   <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden z-0 opacity-45">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="relative flex items-center justify-center text-primary drop-shadow-[0_0_15px_rgba(255,200,100,0.15)]"
      >
<svg
          width="1000"
          height="1000"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer astronomical dials */}
          <circle cx="500" cy="500" r="480" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" />
          <circle cx="500" cy="500" r="450" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          
          {/* Inner geometry (representing 12 Rashis) */}
          <path d="M500 100 L550 450 L900 500 L550 550 L500 900 L450 550 L100 500 L450 450 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M217 217 L420 420 L783 217 L580 420 L783 783 L580 580 L217 783 L420 580 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
          
          <circle cx="500" cy="500" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="1 6" />
          <circle cx="500" cy="500" r="80" stroke="currentColor" strokeWidth="2" opacity="0.8" />

          {/* New Scattered Constellation Stars */}
          <g opacity="0.7">
            <circle cx="250" cy="300" r="3" fill="currentColor" />
            <circle cx="320" cy="210" r="4" fill="currentColor" />
            <circle cx="400" cy="150" r="2" fill="currentColor" />
            <circle cx="750" cy="280" r="3.5" fill="currentColor" />
            <circle cx="820" cy="400" r="2.5" fill="currentColor" />
            <circle cx="850" cy="650" r="4" fill="currentColor" />
            <circle cx="700" cy="820" r="2" fill="currentColor" />
            <circle cx="450" cy="850" r="3" fill="currentColor" />
            <circle cx="280" cy="750" r="3.5" fill="currentColor" />
            <circle cx="180" cy="550" r="2.5" fill="currentColor" />
          </g>

          {/* Subtle connecting lines for the stars */}
          <path d="M250 300 L320 210 L400 150 M750 280 L820 400 L850 650 M700 820 L450 850 M280 750 L180 550 L250 300" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" strokeDasharray="2 4" />
        </svg>
      </motion.div>
      
      {/* Heavy vignette to blend the edges perfectly into the deep blue background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,hsl(var(--background))_70%)]" />
    </div>
  );
}