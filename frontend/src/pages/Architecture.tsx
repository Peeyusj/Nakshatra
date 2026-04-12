// src/pages/Architecture.tsx
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ArrowLeft, BrainCircuit, Network, Zap, GitCommit, Database } from "lucide-react";

// A reusable animated data packet that travels through our "pipes"
const DataPacket = ({ delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, 80, 80, 160],
      x: [0, 0, 0, 0],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_15px_rgba(200,150,50,0.8)]"
  />
);

export default function Architecture() {
  const navigate = useNavigate();

  return (
    <PageWrapper className="flex flex-col items-center pt-8 pb-24">
      
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
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-[0.1em] text-foreground uppercase mb-6">
            The Neural Engine
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Nakshatra is powered by a custom <span className="text-primary font-semibold">WaveNet</span> architecture trained entirely from scratch. It predicts the next character of a name by looking at the specific sequence of characters that came before it, using dilated causal convolutions.
          </p>
        </motion.div>

        {/* The Animated Pipeline Diagram */}
        <div className="relative mx-auto w-full max-w-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-sm rounded-xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,150,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,150,50,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            
            {/* Input Node */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex w-64 items-center gap-4 border border-border/50 bg-secondary/80 p-4 shadow-lg backdrop-blur-md"
            >
              <Database className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Step 1</p>
                <p className="font-mono text-sm font-bold text-foreground">Character Input</p>
              </div>
            </motion.div>

            {/* Connecting Pipe */}
            <div className="relative h-12 w-px bg-border/50">
              <DataPacket delay={0} />
              <DataPacket delay={1} />
              <DataPacket delay={2} />
            </div>

            {/* Embedding Node */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex w-64 items-center gap-4 border border-primary/30 bg-primary/5 p-4 shadow-[0_0_20px_rgba(200,150,50,0.05)] backdrop-blur-md"
            >
              <Network className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary/70">Step 2</p>
                <p className="font-mono text-sm font-bold text-foreground">Vector Embedding</p>
              </div>
            </motion.div>

            {/* Connecting Pipe */}
            <div className="relative h-12 w-px bg-border/50">
              <DataPacket delay={0.5} />
              <DataPacket delay={1.5} />
              <DataPacket delay={2.5} />
            </div>

            {/* Hierarchical Blocks */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex w-full max-w-md flex-col items-center gap-3 border border-border/50 bg-secondary/40 p-6 backdrop-blur-md"
            >
              <p className="mb-2 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                3 Hierarchical Blocks
              </p>
              
              {/* Dilation Rows */}
              {[1, 2, 4].map((dilation, i) => (
                <div key={dilation} className="flex w-full items-center justify-between border border-border/30 bg-background/50 px-4 py-3">
                  <span className="font-mono text-xs text-muted-foreground">Block {i + 1}</span>
                  <div className="flex gap-2">
                    {/* Visual representation of dilated nodes */}
                    {[...Array(6)].map((_, j) => (
                      <div 
                        key={j} 
                        className={`h-2 w-2 rounded-full ${j % dilation === 0 ? 'bg-primary shadow-[0_0_5px_rgba(200,150,50,0.5)]' : 'bg-border'}`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-primary">Dilation: {dilation}</span>
                </div>
              ))}
              
              <p className="mt-2 text-center text-[10px] text-muted-foreground leading-relaxed">
                Dilated Causal Convolutions allow the network to look back at previous characters without breaking the space-time sequence.
              </p>
            </motion.div>

            {/* Connecting Pipe */}
            <div className="relative h-12 w-px bg-border/50">
              <DataPacket delay={0.2} />
              <DataPacket delay={1.2} />
              <DataPacket delay={2.2} />
            </div>

            {/* Output Node */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex w-64 items-center gap-4 border border-primary bg-primary/10 p-4 shadow-[0_0_30px_rgba(200,150,50,0.15)] backdrop-blur-md"
            >
              <Zap className="h-6 w-6 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary">Step 4</p>
                <p className="font-mono text-sm font-bold text-foreground">Softmax Output</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Written Explanation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-border/40 bg-card/20 p-6 backdrop-blur-sm"
          >
            <GitCommit className="mb-4 h-8 w-8 text-primary" />
            <h3 className="mb-3 font-mono text-lg font-bold tracking-widest text-foreground uppercase">
              Causal Convolutions
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Standard neural networks look at the whole picture at once. WaveNet is <em>causal</em>, meaning the prediction for the current character cannot depend on any future characters. It strictly looks backward in time, ensuring perfectly valid autoregressive generation.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-border/40 bg-card/20 p-6 backdrop-blur-sm"
          >
            <Network className="mb-4 h-8 w-8 text-primary" />
            <h3 className="mb-3 font-mono text-lg font-bold tracking-widest text-foreground uppercase">
              The Dilation Trick
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To look far back in a sequence without requiring millions of parameters, we use dilation. Layer 1 skips 1 step. Layer 2 skips 2 steps. Layer 3 skips 4 steps. This creates an exponential receptive field, allowing the network to understand long-term phonetic structures.
            </p>
          </motion.div>
        </div>

      </div>
    </PageWrapper>
  );
}