// src/pages/Generate.tsx
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ProbabilityChart } from "@/components/visuals/ProbabilityChart";
import { rashiData } from "@/data/rashi";
import { useNakshatra } from "@/hooks/useNakshatra";
import { RashiIcon } from "@/components/ui/RashiIcon";
import { ArrowLeft, Cpu, AlertTriangle, Volume2, Network } from "lucide-react";

export default function Generate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const rashiId = searchParams.get("rashi");
  const selectedRashi = rashiData.find((r) => r.id === rashiId);
  const [selectedSyllable, setSelectedSyllable] = useState<string>("any");
  
  const { generateName, isFetching, error, generationData } = useNakshatra();

  const [displayedText, setDisplayedText] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll the trace history
  const traceEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    traceEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStepIndex]);

  // Native Text-to-Speech
  const speakName = (nameToSpeak: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(nameToSpeak.toLowerCase());
      utterance.lang = 'hi-IN'; // Force Hindi pronunciation engine
      utterance.rate = 0.85; 
      utterance.pitch = 1.1; 
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (generationData && generationData.steps.length > 0) {
      const totalLength = generationData.name.length;
      const stepsLength = generationData.steps.length;
      const actualPrefix = generationData.name.substring(0, totalLength - stepsLength).toUpperCase();
      
      setDisplayedText(actualPrefix); 
      setCurrentStepIndex(0); 
      setIsTyping(true);
    }
  }, [generationData]);

  useEffect(() => {
    if (!isTyping || !generationData) return;

    if (currentStepIndex < generationData.steps.length) {
      const timer = setTimeout(() => {
        const step = generationData.steps[currentStepIndex];
        
        if (step.chosen === '.') {
          setIsTyping(false);
          return;
        }

        setDisplayedText((prev) => prev + step.chosen.toUpperCase());
        setCurrentStepIndex((prev) => prev + 1);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentStepIndex, isTyping, generationData]);

  const handleGenerateClick = () => {
    const startParam = selectedRashi && selectedSyllable !== "any" ? selectedSyllable : undefined;
    generateName(startParam);
  };

  const activeStepData = generationData && currentStepIndex >= 0 && currentStepIndex < generationData.steps.length
    ? generationData.steps[currentStepIndex]
    : null;

  // Derive the history of the CURRENT name formation
  const inferenceTrace = generationData ? generationData.steps.slice(0, currentStepIndex) : [];

  return (
    <PageWrapper className="flex flex-col items-center pt-8">
      
      <div className="mb-8 flex w-full max-w-6xl items-center justify-between border-b border-border/50 pb-6 relative z-10">
        <button onClick={() => navigate("/")} className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Constellations
        </button>
        <div className="flex items-center gap-3">
          <Cpu className={`h-5 w-5 ${isFetching || isTyping ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
          <span className={`font-mono text-sm tracking-widest uppercase ${isFetching || isTyping ? 'text-primary' : 'text-muted-foreground'}`}>
            {isFetching ? 'Fetching Tensor...' : isTyping ? 'WaveNet Active' : 'System Ready'}
          </span>
        </div>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 relative z-10">
        
        {/* LEFT COLUMN: Controls & INFERENCE TRACE */}
        <div className="flex flex-col gap-6 lg:col-span-4">
          
          <div className="border border-border/40 bg-card/60 p-6 backdrop-blur-md">
            <h2 className="mb-4 border-b border-border/50 pb-2 text-lg font-medium tracking-widest text-foreground uppercase">
              Parameters
            </h2>
            
            {selectedRashi ? (
              <div className="mb-6 flex items-center gap-4">
                <RashiIcon id={selectedRashi.id} className="h-10 w-10 text-primary drop-shadow-[0_0_8px_rgba(200,150,50,0.5)]" />
                <div>
                  <p className="mb-1 text-xs tracking-wider text-muted-foreground uppercase">Target Rashi</p>
                  <div className="text-xl font-bold text-primary uppercase tracking-widest">{selectedRashi.name}</div>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <p className="mb-2 text-xs tracking-wider text-muted-foreground uppercase">Target Rashi</p>
                <div className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Unconstrained</div>
              </div>
            )}

            {selectedRashi && (
              <div>
                <p className="mb-3 text-xs tracking-wider text-muted-foreground uppercase">Seed Syllable</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setSelectedSyllable("any")} disabled={isFetching || isTyping} className={`border px-3 py-1 text-xs font-mono uppercase tracking-widest transition-colors ${selectedSyllable === "any" ? "border-primary bg-primary/20 text-foreground" : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/50"} disabled:opacity-50`}>
                    Any
                  </button>
                  {selectedRashi.syllables.map((syllable) => (
                    <button key={syllable} onClick={() => setSelectedSyllable(syllable)} disabled={isFetching || isTyping} className={`border px-3 py-1 text-xs font-mono uppercase tracking-widest transition-colors ${selectedSyllable === syllable ? "border-primary bg-primary/20 text-foreground" : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/50"} disabled:opacity-50`}>
                      {syllable}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button onClick={handleGenerateClick} disabled={isFetching || isTyping} className="mt-8 w-full border border-primary bg-primary/10 py-4 font-mono text-sm tracking-widest text-primary uppercase transition-all hover:bg-primary/20 active:scale-95 disabled:pointer-events-none disabled:opacity-50">
              {isFetching ? 'Connecting...' : 'Initialize Sequence'}
            </button>
            {error && <div className="mt-4 flex items-start gap-2 text-red-400 text-xs font-mono bg-red-900/20 p-3 border border-red-900/50"><AlertTriangle className="h-4 w-4 shrink-0" /><p>{error}</p></div>}
          </div>

          {/* INFERENCE TRACE: Shows the live history of the CURRENT generation */}
          <div className="border border-border/40 bg-card/40 p-6 backdrop-blur-md flex-1 flex flex-col min-h-[300px]">
            <div className="mb-4 flex items-center gap-2 border-b border-border/50 pb-2 shrink-0">
              <Network className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-medium tracking-widest text-foreground uppercase">Inference Trace</h2>
            </div>
            
            <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {inferenceTrace.length === 0 ? (
                 <p className="text-xs font-mono text-muted-foreground/50 italic mt-4 text-center uppercase tracking-widest">Awaiting forward pass...</p>
              ) : (
                inferenceTrace.map((step, idx) => {
                  const chosenChar = step.chosen.toUpperCase();
                  const chosenProb = step.top5.find(t => t.char === step.chosen)?.prob || 0;
                  // Find the next best alternative
                  const sorted = [...step.top5].sort((a, b) => b.prob - a.prob);
                  const runnerUp = sorted[0].char === step.chosen ? sorted[1] : sorted[0];

                  return (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col border border-border/30 bg-background/50 p-2"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-mono">Step {idx + 1}</span>
                        <span className="text-primary font-bold text-sm uppercase">{chosenChar === '.' ? 'END' : chosenChar} <span className="text-[10px] font-normal text-muted-foreground ml-1">({(chosenProb * 100).toFixed(1)}%)</span></span>
                      </div>
                      {runnerUp && runnerUp.char !== '.' && (
                        <div className="flex justify-between items-center opacity-50">
                          <span className="text-[9px] text-muted-foreground uppercase font-mono">Alt</span>
                          <span className="text-[9px] text-muted-foreground uppercase font-mono">{runnerUp.char.toUpperCase()} ({(runnerUp.prob * 100).toFixed(1)}%)</span>
                        </div>
                      )}
                    </motion.div>
                  )
                })
              )}
              <div ref={traceEndRef} />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Generation Output */}
        <div className="flex min-h-[500px] flex-col items-center justify-center overflow-hidden border border-border/40 bg-card/40 p-8 backdrop-blur-md lg:col-span-8 relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
          
          {displayedText || isFetching ? (
            <div className="relative z-10 w-full flex flex-col items-center">
              <AnimatePresence mode="wait">
                {isFetching ? (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 mt-20">
                    <div className="h-16 w-16 rounded-full border-t-2 border-primary animate-spin" />
                    <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">Computing Forward Pass...</p>
                  </motion.div>
                ) : (
                  <motion.div key="typing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full flex flex-col items-center justify-center min-h-[400px]">
                    
                    <AnimatePresence>
                      {!isTyping && generationData && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-primary uppercase">
                          <Cpu className="h-4 w-4" /> <span>Sequence Complete</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* The Main Text + Speak Button */}
                    <div className="relative flex items-center justify-center group">
                      <motion.h1 
                        animate={{ scale: isTyping ? 1 : 1.05, color: isTyping ? "hsl(var(--foreground))" : "hsl(var(--primary))" }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        className={`text-5xl md:text-7xl font-bold tracking-[0.15em] uppercase whitespace-nowrap px-4 transition-shadow ${isTyping ? '' : 'drop-shadow-[0_0_40px_rgba(200,150,50,0.3)]'}`}
                      >
                        {displayedText}
                        <span className={`inline-block w-1 md:w-2 h-10 md:h-14 bg-primary ml-3 align-middle transition-opacity ${isTyping ? 'animate-pulse opacity-100' : 'opacity-0 hidden'}`} />
                      </motion.h1>
                      
                      {/* VOICE BUTTON (Only appears when done) */}
                      {!isTyping && generationData && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => speakName(generationData.name)}
                          className="absolute -right-16 top-1/2 -translate-y-1/2 text-primary/70 hover:text-primary transition-colors p-2"
                          title="Pronounce Name"
                        >
                          <Volume2 className="h-8 w-8 drop-shadow-[0_0_10px_rgba(200,150,50,0.5)]" />
                        </motion.button>
                      )}
                    </div>
                    
                    <div className="mt-12 w-full max-w-md h-[150px]">
                      <AnimatePresence>
                        {isTyping && activeStepData && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 10 }}>
                            <ProbabilityChart top5={activeStepData.top5} chosenChar={activeStepData.chosen} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="relative z-10 text-center opacity-30">
              <Cpu className="mx-auto mb-4 h-16 w-16" />
              <p className="font-mono text-sm tracking-widest uppercase">Awaiting Input</p>
            </div>
          )}
        </div>

      </div>
    </PageWrapper>
  );
}