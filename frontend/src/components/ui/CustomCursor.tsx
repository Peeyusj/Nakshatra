// src/components/ui/CustomCursor.tsx
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics-based trailing effect
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Detect if we are hovering over anything interactive
      const target = e.target as HTMLElement;
      const clickable = target.closest('button, a, input, [role="button"]');
      setIsHovered(!!clickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        animate={{
          width: isHovered ? 48 : 12,
          height: isHovered ? 48 : 12,
          rotate: isHovered ? 0 : 45,
          borderWidth: isHovered ? "1px" : "2px",
          backgroundColor: isHovered ? "transparent" : "hsl(var(--primary))",
          opacity: isHovered ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all"
      >
        {/* Adds inner crosshairs when expanded over a button */}
        {isHovered && (
          <>
            <div className="absolute left-1/2 top-0 h-1 w-px -translate-x-1/2 bg-primary" />
            <div className="absolute bottom-0 left-1/2 h-1 w-px -translate-x-1/2 bg-primary" />
            <div className="absolute left-0 top-1/2 h-px w-1 -translate-y-1/2 bg-primary" />
            <div className="absolute right-0 top-1/2 h-px w-1 -translate-y-1/2 bg-primary" />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}