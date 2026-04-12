// src/pages/Home.tsx
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { RashiCard } from "@/components/ui/RashiCard";
import { rashiData } from "@/data/rashi";
import { Sparkles, ArrowRight, Network } from "lucide-react";

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // This makes the cards cascade in one by one!
      delayChildren: 0.2,
    }
  }
};

export default function Home() {
  const navigate = useNavigate();

  const handleGenerate = (rashiId?: string) => {
    const url = rashiId ? `/generate?rashi=${rashiId}` : "/generate";
    navigate(url);
  };

  return (
    <PageWrapper className="flex flex-col items-center justify-center pb-20 pt-10">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 flex flex-col items-center text-center relative z-10"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]">
          <Sparkles className="h-4 w-4" />
          <span>Powered by WaveNet Architecture</span>
        </div>
        
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
          Nakshatra
        </h1>
        
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          An AI-powered Indian name generator. Select a Rashi to align with cosmic syllables, or let the neural network dream freely.
        </p>

{/* Generate without Rashi button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleGenerate()}
          className="mt-8 group flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25"
        >
          Generate Random Name
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.button>

        {/* NEW: The Link to the Architecture Page */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/architecture")}
          className="mt-6 flex items-center gap-2 text-sm font-mono tracking-widest text-muted-foreground transition-colors hover:text-primary uppercase"
        >
          <Network className="h-4 w-4" />
          View System Architecture
        </motion.button>
      </motion.div>

      {/* Rashi Grid */}
      <motion.div 
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {rashiData.map((rashi) => (
          <RashiCard 
            key={rashi.id} 
            rashi={rashi} 
            onClick={handleGenerate} 
          />
        ))}
      </motion.div>
      
    </PageWrapper>
  );
}