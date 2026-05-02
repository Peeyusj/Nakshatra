// src/pages/Architecture.tsx
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ArrowLeft, BrainCircuit, Network, Zap, GitCommit, Database } from "lucide-react";

// NEW: A highly attractive, glowing animated data pipe
const AnimatedPipe = () => (
  <div className="relative flex h-16 w-full flex-col items-center justify-center">
    {/* The physical glass pipe */}
    <div className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-border/10 via-border/40 to-border/10" />
    
    {/* First glowing data pulse */}
    <motion.div
      className="absolute top-0 w-[4px] rounded-full bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(200,150,50,0.8)]"
      animate={{ 
        height: ["0%", "40%", "0%"], 
        top: ["0%", "40%", "100%"], 
        opacity: [0, 1, 0] 
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Second glowing data pulse (offset) */}
    <motion.div
      className="absolute top-0 w-[4px] rounded-full bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(200,150,50,0.8)]"
      animate={{ 
        height: ["0%", "40%", "0%"], 
        top: ["0%", "40%", "100%"], 
        opacity: [0, 1, 0] 
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
    />
  </div>
);

// A subtle breathing wrapper for the main nodes
const BreathingNode = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    animate={{ boxShadow: ["0px 0px 0px rgba(200,150,50,0)", "0px 0px 20px rgba(200,150,50,0.15)", "0px 0px 0px rgba(200,150,50,0)"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={`z-10 ${className}`}
  >
    {children}
  </motion.div>
);

export default function Architecture() {
  const navigate = useNavigate();

  return (
    <PageWrapper className="flex flex-col items-center pt-8 pb-24 overflow-hidden">
      
      {/* Top Navigation */}
      <div className="mb-12 flex w-full max-w-4xl items-center justify-between border-b border-border/50 pb-6 relative z-10">
        <button 
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Constellations
        </button>

        <div className="flex items-center gap-3">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            System Architecture
          </span>
        </div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center relative"
        >
          {/* Subtle background glow behind the title */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-32 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-[0.1em] text-foreground uppercase mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            The Neural Engine
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Nakshatra is powered by a <span className="text-primary font-semibold drop-shadow-[0_0_8px_rgba(200,150,50,0.5)]">WaveNet-inspired hierarchical model</span> trained entirely from scratch on 114,000 Indian names. Instead of reading all 8 context characters at once, it builds understanding gradually — processing pairs of characters first, then combining pairs, then combining everything — before predicting the next character.
          </p>
        </motion.div>

        {/* The Animated Pipeline Diagram */}
        <div className="relative mx-auto w-full max-w-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl rounded-xl overflow-hidden mb-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Enhanced Background Grid & Glowing Orbs */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,150,50,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,150,50,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-primary/10 blur-[80px]" 
          />
          <motion.div 
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.5, 1] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute right-[10%] bottom-[20%] h-64 w-64 rounded-full bg-primary/10 blur-[80px]" 
          />
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Input Node */}
            <BreathingNode className="flex w-64 items-center gap-4 border border-border/50 bg-secondary/80 p-4 shadow-lg backdrop-blur-md rounded-lg hover:border-primary/50 transition-colors">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Step 1</p>
                <p className="font-mono text-sm font-bold text-foreground">Character Input (8)</p>
              </div>
            </BreathingNode>

            <AnimatedPipe />

            {/* Embedding Node */}
            <BreathingNode className="flex w-64 items-center gap-4 border border-primary/40 bg-primary/10 p-4 shadow-[0_0_30px_rgba(200,150,50,0.1)] backdrop-blur-md rounded-lg">
              <Network className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary/80">Step 2</p>
                <p className="font-mono text-sm font-bold text-foreground">Vector Embedding</p>
              </div>
            </BreathingNode>

            <AnimatedPipe />

            {/* Hierarchical Blocks */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex w-full max-w-lg flex-col items-center gap-3 border border-primary/20 bg-secondary/60 p-6 backdrop-blur-md rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              {/* Subtle tech pattern inside the block */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,150,50,0.05)_1px,transparent_1px)] bg-[size:10px_10px] opacity-50" />
              
              <p className="mb-2 text-xs font-bold tracking-[0.2em] text-primary uppercase relative z-10 drop-shadow-[0_0_5px_rgba(200,150,50,0.5)]">
                3 Hierarchical Blocks
              </p>
              
              {/* FlattenConsecutive Rows */}
              <div className="w-full flex flex-col gap-2 relative z-10">
                {[
                  { step: "Block 1", action: "Pairs adjacent characters", result: "8 chars → 4 pairs" },
                  { step: "Block 2", action: "Combines pairs", result: "4 pairs → 2 groups" },
                  { step: "Block 3", action: "Final merge", result: "2 groups → 1 vector" }
                ].map((block, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(200,150,50,0.05)" }}
                    className="flex w-full items-center justify-between border border-border/40 bg-background/80 px-4 py-3 rounded-md transition-all cursor-default"
                  >
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground shrink-0 w-14 sm:w-16">{block.step}</span>
                    <span className="font-mono text-[10px] sm:text-xs text-foreground text-center truncate px-2">{block.action}</span>
                    <span className="font-mono text-[10px] sm:text-xs text-primary shrink-0 text-right w-24 sm:w-32 drop-shadow-[0_0_2px_rgba(200,150,50,0.3)]">{block.result}</span>
                  </motion.div>
                ))}
              </div>
              
              <p className="mt-3 text-center text-[10px] text-muted-foreground/80 leading-relaxed max-w-sm relative z-10">
                The FlattenConsecutive layers structurally funnel the inputs, cutting the sequence length in half at each step while doubling the conceptual understanding.
              </p>
            </motion.div>

            <AnimatedPipe />

            {/* Output Node */}
            <BreathingNode className="flex w-64 items-center gap-4 border border-primary bg-primary/20 p-4 shadow-[0_0_40px_rgba(200,150,50,0.25)] backdrop-blur-md rounded-lg">
              <Zap className="h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(200,150,50,0.8)] animate-pulse" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary drop-shadow-[0_0_5px_rgba(200,150,50,0.5)]">Step 4</p>
                <p className="font-mono text-sm font-bold text-foreground">Linear Prediction</p>
              </div>
            </BreathingNode>

          </div>
        </div>

        {/* Written Explanation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="border border-border/40 bg-card/20 p-8 backdrop-blur-sm rounded-xl transition-all hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(200,150,50,0.05)]"
          >
            <GitCommit className="mb-5 h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(200,150,50,0.5)]" />
            <h3 className="mb-3 font-mono text-lg font-bold tracking-widest text-foreground uppercase">
              Hierarchical Processing
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Instead of smashing all context characters into one vector at once, the model processes them 2 at a time, building understanding layer by layer. Each layer only handles 2 things — making its job simpler and learning much more efficient.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="border border-border/40 bg-card/20 p-8 backdrop-blur-sm rounded-xl transition-all hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(200,150,50,0.05)]"
          >
            <Network className="mb-5 h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(200,150,50,0.5)]" />
            <h3 className="mb-3 font-mono text-lg font-bold tracking-widest text-foreground uppercase">
              The Pairing Trick
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Each block uses a custom <span className="font-mono text-primary/80">FlattenConsecutive</span> layer — it takes adjacent character embeddings and merges them side by side. Block 1 creates pairs. Block 2 combines pairs into 4-char groups. Block 3 creates one full context vector from all 8 characters.
            </p>
          </motion.div>
        </div>

      </div>
    </PageWrapper>
  );
}