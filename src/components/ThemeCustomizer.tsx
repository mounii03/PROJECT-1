import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders, Check, RotateCcw, X, HelpCircle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PresetTheme {
  id: string;
  name: string;
  description: string;
  glassBg: string;
  darkGlassBg: string;
  blur: string;
  border: string;
  darkBorder: string;
  radius: string;
  accentGold: string;
  accentCaramel: string;
  accentPink: string;
  bgDark: string;
}

const PRESETS: PresetTheme[] = [
  {
    id: 'classic',
    name: 'Classic Aurora Ice',
    description: 'Crisp crystal glaze, wide-spectrum light blur, organic gold accents.',
    glassBg: 'rgba(255, 255, 255, 0.6)',
    darkGlassBg: 'rgba(43, 24, 20, 0.6)',
    blur: '12px',
    border: 'rgba(255, 255, 255, 0.3)',
    darkBorder: 'rgba(255, 255, 255, 0.1)',
    radius: '24px',
    accentGold: '#D4AF37',
    accentCaramel: '#C68E52',
    accentPink: '#F8D7DA',
    bgDark: '#1F100D'
  },
  {
    id: 'amber',
    name: 'Choc & Honey Amber',
    description: 'Luxurious glazed warm honey with toasted gold hues and buttered borders.',
    glassBg: 'rgba(255, 248, 231, 0.65)',
    darkGlassBg: 'rgba(62, 39, 35, 0.68)',
    blur: '18px',
    border: 'rgba(212, 175, 55, 0.35)',
    darkBorder: 'rgba(212, 175, 55, 0.2)',
    radius: '16px',
    accentGold: '#F5C242',
    accentCaramel: '#D99441',
    accentPink: '#FFECC7',
    bgDark: '#26120E'
  },
  {
    id: 'midnight',
    name: 'Velvet Obsidian Noir',
    description: 'Immersive deep twilight, high contrast highlights, soft lunar glow.',
    glassBg: 'rgba(240, 240, 245, 0.45)',
    darkGlassBg: 'rgba(18, 9, 7, 0.75)',
    blur: '24px',
    border: 'rgba(255, 255, 255, 0.15)',
    darkBorder: 'rgba(255, 255, 255, 0.08)',
    radius: '32px',
    accentGold: '#E5C158',
    accentCaramel: '#A86C32',
    accentPink: '#EAD5D6',
    bgDark: '#0D0504'
  },
  {
    id: 'royal-mint',
    name: 'Royal Mint & Cream',
    description: 'Refreshing botanical sophistication, high-end pistachio-gold palette lines.',
    glassBg: 'rgba(245, 252, 247, 0.68)',
    darkGlassBg: 'rgba(22, 38, 33, 0.65)',
    blur: '14px',
    border: 'rgba(82, 183, 136, 0.3)',
    darkBorder: 'rgba(82, 183, 136, 0.15)',
    radius: '20px',
    accentGold: '#52B788',
    accentCaramel: '#74C69D',
    accentPink: '#D8F3DC',
    bgDark: '#11221B'
  },
  {
    id: 'rose',
    name: 'Orchid Rose Velvet',
    description: 'Charming romantic raspberry and silk sugar glaze with whimsical glow flares.',
    glassBg: 'rgba(255, 242, 244, 0.65)',
    darkGlassBg: 'rgba(56, 23, 28, 0.7)',
    blur: '15px',
    border: 'rgba(240, 173, 181, 0.4)',
    darkBorder: 'rgba(240, 173, 181, 0.18)',
    radius: '24px',
    accentGold: '#E07A5F',
    accentCaramel: '#F4A261',
    accentPink: '#FFCAD4',
    bgDark: '#2B0F13'
  }
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState('classic');
  
  // Customizable sliding attributes
  const [blur, setBlur] = useState(12);
  const [glassOpacity, setGlassOpacity] = useState(60); // percent representation
  const [radius, setRadius] = useState(24);
  const [accentHue, setAccentHue] = useState('golden'); // 'golden', 'amber', 'mint', 'rose'

  // Apply properties to CSS Variables
  const applyParams = (
    bgLight: string,
    bgDark: string,
    blurVal: string,
    borderLight: string,
    borderDark: string,
    radiusVal: string,
    gold: string,
    caramel: string,
    pink: string,
    bgBodyDark: string
  ) => {
    const root = document.documentElement;
    root.style.setProperty('--glass-bg', bgLight);
    root.style.setProperty('--dark-glass-bg', bgDark);
    root.style.setProperty('--glass-blur', blurVal);
    root.style.setProperty('--glass-border', borderLight);
    root.style.setProperty('--dark-glass-border', borderDark);
    root.style.setProperty('--glass-radius', radiusVal + 'px');
    
    // Theme accent lines
    root.style.setProperty('--color-accent-gold', gold);
    root.style.setProperty('--color-accent-caramel', caramel);
    root.style.setProperty('--color-accent-pink', pink);
    
    if (bgBodyDark) {
      root.style.setProperty('--color-warm-dark', bgBodyDark);
    }
  };

  // Restore cache or initialize setting
  useEffect(() => {
    const cachedConfig = localStorage.getItem('glass_studio_config');
    if (cachedConfig) {
      try {
        const parsed = JSON.parse(cachedConfig);
        setActivePreset(parsed.activePreset);
        setBlur(parsed.blur);
        setGlassOpacity(parsed.glassOpacity);
        setRadius(parsed.radius);
        setAccentHue(parsed.accentHue);

        if (parsed.activePreset === 'custom') {
          // Custom composition
          const opacityFrac = parsed.glassOpacity / 100;
          const bgLight = `rgba(255, 255, 255, ${opacityFrac})`;
          const bgDark = `rgba(43, 24, 20, ${opacityFrac + 0.1})`;
          const bLight = `rgba(255, 255, 255, ${Math.min(0.5, (100 - parsed.glassOpacity) / 100)})`;
          const bDark = `rgba(255, 255, 255, 0.1)`;
          
          let gold = '#D4AF37';
          let caramel = '#C68E52';
          let pink = '#F8D7DA';

          if (parsed.accentHue === 'mint') {
            gold = '#52B788'; caramel = '#74C69D'; pink = '#D8F3DC';
          } else if (parsed.accentHue === 'rose') {
            gold = '#E07A5F'; caramel = '#F4A261'; pink = '#FFCAD4';
          } else if (parsed.accentHue === 'amber') {
            gold = '#F5C242'; caramel = '#D99441'; pink = '#FFF5E1';
          }

          applyParams(bgLight, bgDark, `${parsed.blur}px`, bLight, bDark, parsed.radius.toString(), gold, caramel, pink, '#1F100D');
        } else {
          const match = PRESETS.find(p => p.id === parsed.activePreset);
          if (match) {
            applyParams(match.glassBg, match.darkGlassBg, match.blur, match.border, match.darkBorder, match.radius.replace('px',''), match.accentGold, match.accentCaramel, match.accentPink, match.bgDark);
          }
        }
      } catch (err) {
        console.warn("Failed retrieving cached glass themes", err);
      }
    }
  }, []);

  const handleSelectPreset = (preset: PresetTheme) => {
    setActivePreset(preset.id);
    setBlur(parseInt(preset.blur.replace('px', '')));
    setRadius(parseInt(preset.radius.replace('px', '')));
    
    // Extract opacity value from rgba string roughly
    const matchOpacity = preset.glassBg.match(/[\d.]+\)/);
    if (matchOpacity) {
      const parsedOpacity = parseFloat(matchOpacity[0]);
      setGlassOpacity(Math.round(parsedOpacity * 100));
    }

    if (preset.id === 'classic') setAccentHue('golden');
    if (preset.id === 'amber') setAccentHue('amber');
    if (preset.id === 'midnight') setAccentHue('golden');
    if (preset.id === 'royal-mint') setAccentHue('mint');
    if (preset.id === 'rose') setAccentHue('rose');

    applyParams(
      preset.glassBg,
      preset.darkGlassBg,
      preset.blur,
      preset.border,
      preset.darkBorder,
      preset.radius.replace('px',''),
      preset.accentGold,
      preset.accentCaramel,
      preset.accentPink,
      preset.bgDark
    );

    // Cache setting
    localStorage.setItem('glass_studio_config', JSON.stringify({
      activePreset: preset.id,
      blur: parseInt(preset.blur.replace('px', '')),
      glassOpacity: matchOpacity ? Math.round(parseFloat(matchOpacity[0]) * 100) : 60,
      radius: parseInt(preset.radius.replace('px', '')),
      accentHue: preset.id === 'royal-mint' ? 'mint' : preset.id === 'rose' ? 'rose' : preset.id === 'amber' ? 'amber' : 'golden'
    }));
  };

  const handleCustomParamChange = (type: 'blur' | 'opacity' | 'radius' | 'accent', value: any) => {
    setActivePreset('custom');
    
    let currentBlur = blur;
    let currentOpacity = glassOpacity;
    let currentRadius = radius;
    let currentAccent = accentHue;

    if (type === 'blur') {
      currentBlur = value;
      setBlur(value);
    } else if (type === 'opacity') {
      currentOpacity = value;
      setGlassOpacity(value);
    } else if (type === 'radius') {
      currentRadius = value;
      setRadius(value);
    } else if (type === 'accent') {
      currentAccent = value;
      setAccentHue(value);
    }

    // Compose custom params
    const opacityFrac = currentOpacity / 100;
    const bgLight = `rgba(255, 255, 255, ${opacityFrac})`;
    const bgDark = `rgba(43, 24, 20, ${opacityFrac + 0.1})`;
    // Dynamic border translucency based on backing opacity
    const borderTransparency = Math.max(0.1, (100 - currentOpacity) / 100 * 0.5);
    const bLight = `rgba(255, 255, 255, ${borderTransparency})`;
    const bDark = `rgba(255, 255, 255, 0.08)`;

    let gold = '#D4AF37';
    let caramel = '#C68E52';
    let pink = '#F8D7DA';

    if (currentAccent === 'mint') {
      gold = '#52B788'; caramel = '#74C69D'; pink = '#D8F3DC';
    } else if (currentAccent === 'rose') {
      gold = '#E07A5F'; caramel = '#F4A261'; pink = '#FFCAD4';
    } else if (currentAccent === 'amber') {
      gold = '#F5C242'; caramel = '#D99441'; pink = '#FFF5E1';
    }

    applyParams(bgLight, bgDark, `${currentBlur}px`, bLight, bDark, currentRadius.toString(), gold, caramel, pink, '#1F100D');

    // Save custom cache
    localStorage.setItem('glass_studio_config', JSON.stringify({
      activePreset: 'custom',
      blur: currentBlur,
      glassOpacity: currentOpacity,
      radius: currentRadius,
      accentHue: currentAccent
    }));
  };

  const handleReset = () => {
    const classic = PRESETS[0];
    handleSelectPreset(classic);
  };

  return (
    <>
      {/* Floating launcher badge with soft halo */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <motion.button
          id="glass-customizer-launcher"
          onClick={() => setIsOpen(true)}
          className="relative group p-3.5 rounded-full bg-primary dark:bg-cream text-cream dark:text-primary-dark shadow-2xl flex items-center justify-center cursor-pointer border border-accent-gold/20 hover:scale-105 transition-transform"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing halo */}
          <span className="absolute inset-0 bg-accent-gold/20 dark:bg-accent-gold/10 rounded-full animate-ping scale-110 pointer-events-none" />
          
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-gold dark:text-accent-gold-dark animate-spin" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[130px] whitespace-nowrap text-[10px] uppercase font-bold tracking-widest transition-all duration-300">
              Glass Studio
            </span>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Panel container */}
            <div className="absolute inset-y-0 left-0 max-w-lg w-full flex">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full bg-warm-beige/95 dark:bg-warm-dark/95 backdrop-blur-2xl border-r border-accent-gold/20 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
              >
                <div>
                  {/* Header */}
                  <div className="flex justify-between items-center pb-5 border-b border-primary/10 dark:border-white/10 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center text-accent-gold">
                        <Sliders className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-primary dark:text-cream leading-tight">
                          Frosted Glass Studio
                        </h3>
                        <p className="text-[10px] text-primary/55 dark:text-cream/50 uppercase tracking-widest font-mono">
                          Adaptive Cafe Aesthetics
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        id="reset-glass-studio"
                        onClick={handleReset}
                        title="Reset classic aesthetics"
                        className="p-1.5 rounded-full hover:bg-primary/5 dark:hover:bg-white/5 text-primary/50 dark:text-cream/40 hover:text-accent-gold cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      
                      <button
                        id="close-glass-studio"
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 rounded-full hover:bg-auto text-primary/50 dark:text-cream/40 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Informational Hero Card */}
                  <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/[0.03] border border-accent-gold/10 flex gap-3 mb-6 items-start">
                    <Eye className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                    <p className="text-xs text-primary/75 dark:text-cream/70 leading-relaxed font-light">
                      Customize the translucency, gloss, physical borders, and base palette highlights of the Parisian frosted glass panels below in real-time.
                    </p>
                  </div>

                  {/* Themes / Presets List */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-serif text-sm font-bold text-primary dark:text-cream flex items-center gap-2">
                      <span>Select Curated Master Presets</span>
                      <span className="h-px bg-primary/15 dark:bg-white/10 flex-1" />
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5">
                      {PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset)}
                          className={`w-full p-4 rounded-2xl text-left border flex justify-between items-center transition-all cursor-pointer relative overflow-hidden ${
                            activePreset === preset.id
                              ? 'bg-accent-gold/15 dark:bg-accent-gold/5 border-accent-gold ring-1 ring-accent-gold shadow-md'
                              : 'bg-white/50 dark:bg-white/[0.02] border-primary/5 hover:bg-white/80 dark:hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-xs font-bold text-primary dark:text-cream">
                                {preset.name}
                              </span>
                              {activePreset === preset.id && (
                                <span className="bg-accent-gold text-primary-dark font-sans text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">
                                  Live
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-primary/60 dark:text-cream/60 leading-tight max-w-[280px]">
                              {preset.description}
                            </p>
                          </div>
                          
                          {/* Visual Swatch Circle */}
                          <div className="flex gap-1 shrink-0 ml-3">
                            <span 
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                              style={{ backgroundColor: preset.accentGold }}
                            />
                            <span 
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm opacity-80"
                              style={{ backgroundColor: preset.accentCaramel }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Controls Sliders */}
                  <div className="space-y-6">
                    <h4 className="font-serif text-sm font-bold text-primary dark:text-cream flex items-center gap-2">
                      <span>Manual Aesthetic Sliders</span>
                      <span className="h-px bg-primary/15 dark:bg-white/10 flex-1" />
                    </h4>

                    {/* Slider 1: Blur */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-primary/70 dark:text-cream/70 font-medium">
                          Backing Blur Intensity
                        </span>
                        <span className="text-[10px] font-mono bg-primary/5 dark:bg-white/5 px-2 py-0.5 rounded font-bold text-accent-caramel dark:text-accent-gold">
                          {blur}px
                        </span>
                      </div>
                      <input
                        id="customizer-slider-blur"
                        type="range"
                        min="4"
                        max="40"
                        value={blur}
                        onChange={(e) => handleCustomParamChange('blur', parseInt(e.target.value))}
                        className="w-full accent-accent-gold cursor-ew-resize bg-primary/10 dark:bg-white/10 h-1.5 rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-[9px] text-primary/35 dark:text-cream/35">
                        <span>4px (Ultra Sharp)</span>
                        <span>40px (Heavy Fog)</span>
                      </div>
                    </div>

                    {/* Slider 2: Opacity */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-primary/70 dark:text-cream/70 font-medium">
                          Glass Sheen / Tracing Opacity
                        </span>
                        <span className="text-[10px] font-mono bg-primary/5 dark:bg-white/5 px-2 py-0.5 rounded font-bold text-accent-caramel dark:text-accent-gold">
                          {glassOpacity}%
                        </span>
                      </div>
                      <input
                        id="customizer-slider-opacity"
                        type="range"
                        min="15"
                        max="95"
                        value={glassOpacity}
                        onChange={(e) => handleCustomParamChange('opacity', parseInt(e.target.value))}
                        className="w-full accent-accent-gold cursor-ew-resize bg-primary/10 dark:bg-white/10 h-1.5 rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-[9px] text-primary/35 dark:text-cream/35">
                        <span>15% (Hyper Translucent)</span>
                        <span>95% (Frosted Solid)</span>
                      </div>
                    </div>

                    {/* Slider 3: Radius Corner */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-primary/70 dark:text-cream/70 font-medium">
                          Aura Corner Curved-Radius
                        </span>
                        <span className="text-[10px] font-mono bg-primary/5 dark:bg-white/5 px-2 py-0.5 rounded font-bold text-accent-caramel dark:text-accent-gold">
                          {radius}px
                        </span>
                      </div>
                      <input
                        id="customizer-slider-radius"
                        type="range"
                        min="4"
                        max="48"
                        value={radius}
                        onChange={(e) => handleCustomParamChange('radius', parseInt(e.target.value))}
                        className="w-full accent-accent-gold cursor-ew-resize bg-primary/10 dark:bg-white/10 h-1.5 rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-[9px] text-primary/35 dark:text-cream/35">
                        <span>4px (Modern Sharp)</span>
                        <span>48px (Vessel Round)</span>
                      </div>
                    </div>

                    {/* Selector 4: Custom Accent Aura Hues */}
                    <div className="space-y-2.5">
                      <span className="block text-xs text-primary/70 dark:text-cream/70 font-medium">
                        Accent Aura Color Hue
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { id: 'golden', label: 'Classic Gold', color: '#D4AF37' },
                          { id: 'amber', label: 'Choc Amber', color: '#D99441' },
                          { id: 'mint', label: 'Royal Mint', color: '#52B788' },
                          { id: 'rose', label: 'Orchid Rose', color: '#E07A5F' }
                        ].map((hue) => (
                          <button
                            key={hue.id}
                            onClick={() => handleCustomParamChange('accent', hue.id)}
                            className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                              accentHue === hue.id && activePreset === 'custom'
                                ? 'bg-primary/5 dark:bg-white/5 border-accent-gold'
                                : 'bg-transparent border-primary/10 dark:border-white/10'
                            }`}
                          >
                            <span 
                              className="w-4 h-4 rounded-full border border-white/10 shadow-sm"
                              style={{ backgroundColor: hue.color }}
                            />
                            <span className="text-[8px] font-bold uppercase tracking-wider text-primary/80 dark:text-cream/80">
                              {hue.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer status message */}
                <div className="pt-6 border-t border-primary/10 dark:border-white/10 text-center space-y-2 mt-8">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/15 py-1 px-3 rounded-full text-emerald-600 dark:text-emerald-400 text-[10px] font-medium uppercase tracking-wider">
                    <Check className="w-3.5 h-3.5" />
                    Applied Instantly & Cached Locally
                  </span>
                  <p className="text-[9px] text-primary/45 dark:text-cream/40 uppercase tracking-widest font-mono">
                    Dessert Café Architectural Studio
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
