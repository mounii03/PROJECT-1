import React from 'react';
import { Sparkles, Award, Camera, Coffee, Moon, ShieldCheck, Zap, Gem } from 'lucide-react';
import { REASONS_TO_CHOOSE } from '../data';

export default function WhyChooseUs() {
  const iconsList = [
    <Sparkles className="w-6 h-6 text-accent-gold" />,
    <Award className="w-6 h-6 text-accent-caramel" />,
    <Camera className="w-6 h-6 text-accent-gold" />,
    <Coffee className="w-6 h-6 text-accent-caramel" />,
    <Moon className="w-6 h-6 text-accent-gold" />,
    <ShieldCheck className="w-6 h-6 text-accent-caramel" />,
    <Zap className="w-6 h-6 text-accent-gold" />,
    <Gem className="w-6 h-6 text-accent-caramel" />
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-warm-beige dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            The Golden Standard
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Why Choose Us
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
          <p className="text-sm text-primary-light/75 dark:text-cream/60 mt-4 font-light">
            Crafting memorable late twilight atmospheres via visual elegance, absolute safety, and unmatched flavor profiles.
          </p>
        </div>

        {/* Reasons Grid */}
        <div id="why-choose-us-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS_TO_CHOOSE.map((reason, idx) => (
            <div
              key={idx}
              className="frosted-glass p-6 shadow-md flex flex-col justify-between group hover:shadow-xl hover:border-accent-gold/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Floating Icon Header */}
                <div className="w-12 h-12 rounded-xl bg-primary/5 dark:bg-cream/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-accent-gold/10 transition-all duration-300">
                  {iconsList[idx] || <Sparkles className="w-6 h-6" />}
                </div>

                {/* Heading */}
                <h3 className="font-serif text-lg font-bold text-primary dark:text-cream leading-tight mb-2 group-hover:text-accent-gold transition-colors">
                  {reason.title}
                </h3>

                {/* Subtext description */}
                <p className="text-xs text-primary/70 dark:text-cream/60 leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>

              {/* Decorative subtle gold bottom line */}
              <div className="w-8 h-0.5 bg-accent-gold/30 group-hover:w-full group-hover:bg-accent-gold transition-all duration-500 mt-6 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
