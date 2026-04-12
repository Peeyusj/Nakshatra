// src/components/ui/RashiCard.tsx
import { motion, type Variants } from "motion/react";
import type { Rashi } from "@/types";
import { MoonStar } from "lucide-react"; // Swapping Sparkles for a more astrological icon
import { RashiIcon } from "./RashiIcon";

interface RashiCardProps {
  rashi: Rashi;
  onClick: (id: string) => void;
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

export function RashiCard({ rashi, onClick }: RashiCardProps) {
  return (
<motion.button
      variants={cardVariant}
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(rashi.id)}
      className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-border/40 bg-card/60 p-6 text-center backdrop-blur-md transition-colors hover:bg-card/90"
    >
      <motion.div variants={{ hover: { width: "100%", opacity: 1 } }} initial={{ width: "20%", opacity: 0.5 }} className="absolute top-0 h-[2px] bg-primary" />
      
      {/* Use the new custom SVG here */}
      <div className="mb-1 text-primary/70 transition-colors group-hover:text-primary">
        <RashiIcon id={rashi.id} className="h-10 w-10 drop-shadow-[0_0_8px_rgba(200,150,50,0.4)]" />
      </div>
      
      <div>
        <h3 className="text-xl font-medium tracking-widest text-foreground uppercase">{rashi.name}</h3>
        <p className="mt-1 text-xs font-semibold tracking-wider text-primary/60 uppercase">{rashi.englishName}</p>
      </div>
      
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {rashi.syllables.slice(0, 3).map((syllable) => (
          <span 
            key={syllable} 
            className="border border-border/50 bg-secondary/50 px-2 py-1 text-[10px] font-mono text-muted-foreground uppercase tracking-widest transition-colors group-hover:border-primary/30 group-hover:text-foreground"
          >
            {syllable}
          </span>
        ))}
      </div>
    </motion.button>
  );
}