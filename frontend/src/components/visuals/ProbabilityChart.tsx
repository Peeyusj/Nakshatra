// src/components/visuals/ProbabilityChart.tsx
import { motion, AnimatePresence } from "motion/react";
import type { TopChar } from "@/types";

interface ProbabilityChartProps {
  top5: TopChar[];
  chosenChar: string;
}

export function ProbabilityChart({ top5, chosenChar }: ProbabilityChartProps) {
  if (!top5 || top5.length === 0) return null;

  // Ensure the data is sorted highest to lowest probability
  const sortedStats = [...top5].sort((a, b) => b.prob - a.prob);

  return (
    <div className="w-full max-w-sm mx-auto mt-8 flex flex-col gap-3">
      <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-2 mb-2">
        <span>Token</span>
        <span>Probability Vector</span>
      </div>

      <AnimatePresence mode="popLayout">
        {sortedStats.map((stat) => {
          const isChosen = stat.char === chosenChar;
          const percentage = (stat.prob * 100).toFixed(1);

          return (
            <motion.div
              // The 'layout' prop is magic here. If the array re-sorts, 
              // the bars will slide into their new Y-positions automatically!
              layout 
              key={stat.char}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-4 w-full"
            >
              {/* The Character Label */}
              <div className={`w-6 text-center font-mono text-sm font-bold uppercase ${isChosen ? 'text-primary' : 'text-foreground'}`}>
                {stat.char === '.' ? 'END' : stat.char}
              </div>

              {/* The Bar Graph */}
              <div className="flex-1 h-2 bg-secondary/50 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`absolute left-0 top-0 bottom-0 ${isChosen ? 'bg-primary shadow-[0_0_10px_rgba(200,150,50,0.5)]' : 'bg-muted-foreground'}`}
                />
              </div>

              {/* The Percentage Text */}
              <div className={`w-10 text-right font-mono text-[10px] ${isChosen ? 'text-primary' : 'text-muted-foreground'}`}>
                {percentage}%
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}