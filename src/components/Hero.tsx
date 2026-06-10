import React from 'react';
import { ChevronDown, Sparkles, Calendar, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onViewMenu: () => void;
  onBookTable: () => void;
}

export default function Hero({ onViewMenu, onBookTable }: HeroProps) {
  const [selectedStyle, setSelectedStyle] = React.useState<'editorial' | 'minimalist' | 'couture'>('editorial');

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Graphic Zoom & Fade */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/75 to-warm-dark/95 z-10" />
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1620&auto=format&fit=crop"
          alt="Luxury Evening Cafe Scene"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Floating Sparkle Elements */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Floating Sparkle 1 */}
        <motion.div
          className="absolute top-1/4 left-10 md:left-20 text-accent-gold/40"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-10 h-10" />
        </motion.div>

        {/* Floating Sparkle 2 */}
        <motion.div
          className="absolute bottom-1/4 right-10 md:right-32 text-accent-caramel/40"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>

        {/* Floating Accent Circle Warm */}
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-accent-gold/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-accent-caramel/5 blur-3xl" />
      </div>

      {/* Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-4 h-4 text-accent-gold" />
          <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">
            Premium Parisian Lounge Vibe
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center gap-2 mb-8 bg-black/20 backdrop-blur-md p-1.5 rounded-full max-w-sm mx-auto border border-white/5"
        >
          <button
            onClick={() => setSelectedStyle('editorial')}
            className={`px-3.5 py-1 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all cursor-pointer ${
              selectedStyle === 'editorial'
                ? 'bg-accent-gold text-primary-dark shadow-md'
                : 'text-cream/70 hover:text-cream hover:bg-white/5'
            }`}
          >
            Editorial
          </button>
          <button
            onClick={() => setSelectedStyle('minimalist')}
            className={`px-3.5 py-1 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all cursor-pointer ${
              selectedStyle === 'minimalist'
                ? 'bg-accent-gold text-primary-dark shadow-md'
                : 'text-cream/70 hover:text-cream hover:bg-white/5'
            }`}
          >
            Avant-Garde
          </button>
          <button
            onClick={() => setSelectedStyle('couture')}
            className={`px-3.5 py-1 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all cursor-pointer ${
              selectedStyle === 'couture'
                ? 'bg-accent-gold text-primary-dark shadow-md'
                : 'text-cream/70 hover:text-cream hover:bg-white/5'
            }`}
          >
            Couture
          </button>
        </motion.div>

        <motion.h1
          id="hero-heading"
          key={selectedStyle}
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-6 tracking-tight leading-tight transition-all duration-300 ${
            selectedStyle === 'editorial'
              ? 'font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-light'
              : selectedStyle === 'minimalist'
              ? 'font-sans text-4xl md:text-6xl lg:text-7xl text-cream font-bold uppercase tracking-widest'
              : 'font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-extrabold tracking-normal'
          }`}
        >
          {selectedStyle === 'editorial' && (
            <>
              Desserts <span className="font-extrabold italic text-accent-gold">Crafted</span> for <br />
              <span className="gold-gradient-text italic font-medium">
                Memorable Evenings
              </span>
            </>
          )}
          {selectedStyle === 'minimalist' && (
            <>
              Desserts <span className="text-accent-gold font-light">Crafted</span> <br />
              <span className="text-white/90">for Evenings</span>
            </>
          )}
          {selectedStyle === 'couture' && (
            <>
              Desserts <span className="underline decoration-accent-gold decoration-wavy underline-offset-8">Crafted</span> for <br />
              <span className="gold-gradient-text italic">
                Memorable Evenings
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-xl text-cream/80 max-w-2xl mx-auto font-sans font-light leading-relaxed mb-10"
        >
          Indulge in handcrafted luxury desserts, masterly pairing espresso sips, signature golden-flaked cakes, and intimate late-night Parisian stories.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="hero-view-menu-btn"
            onClick={onViewMenu}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark rounded-full font-bold uppercase text-xs tracking-widest shadow-lg hover:opacity-95 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            View Menu
          </button>
          
          <button
            id="hero-reserve-btn"
            onClick={onBookTable}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-cream/10 text-cream border-2 border-accent-gold rounded-full font-bold uppercase text-xs tracking-widest transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-accent-gold" />
            Reserve a Table
          </button>
        </motion.div>
      </div>

      {/* Down-Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-cream/50">
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="cursor-pointer"
          onClick={onViewMenu}
        >
          <ChevronDown className="w-6 h-6 text-accent-gold" />
        </motion.div>
      </div>
    </section>
  );
}
