import React, { useState } from 'react';
import { Mail, Sparkles, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigateSection: (id: string) => void;
}

export default function Footer({ onNavigateSection }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setTimeout(() => {
      setNewsSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <footer id="main-footer" className="bg-primary-dark text-cream pt-16 pb-8 border-t border-accent-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Core Column matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand pitch info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center text-primary-dark">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-extrabold tracking-tight">
                Desserts-Only Café
              </span>
            </div>
            
            <p className="text-xs text-cream/70 font-light leading-relaxed max-w-sm">
              We bring together premium ingredients, artisan baking techniques, and a luxurious Parisian-inspired ambiance to create unforgettable evenings filled with flavor, aroma, and comfort.
            </p>
            
            <p className="text-xs text-accent-gold italic">
              "Where Every Evening Ends Sweetly"
            </p>
          </div>

          {/* Column 2: Company Directory links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-accent-gold">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-cream/80 font-light">
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-accent-gold transition-colors text-left font-light block cursor-pointer">
                  About Our Story
                </button>
              </li>
              <li>
                <span className="opacity-45">Culinary Careers (Soon)</span>
              </li>
              <li>
                <button onClick={() => onNavigateSection('contact')} className="hover:text-accent-gold transition-colors text-left font-light block cursor-pointer">
                  Franchise Registry
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-accent-gold">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-cream/80 font-light">
              <li>
                <button onClick={() => onNavigateSection('contact')} className="hover:text-accent-gold transition-colors text-left font-light block cursor-pointer">
                  Contact Coordinates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('reservations')} className="hover:text-accent-gold transition-colors text-left font-light block cursor-pointer">
                  Reservations desk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('menu')} className="hover:text-accent-gold transition-colors text-left font-light block cursor-pointer">
                  Menu Selection Book
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-accent-gold">
              Newsletter
            </h4>
            <p className="text-xs text-cream/70 font-light leading-relaxed">
              Subscribe to secure private recipes, twilight event menus, and exclusive promo discounts.
            </p>

            <form id="newsletter-subscription-form" onSubmit={handleNewsSubmit} className="relative flex max-w-sm mt-3">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Secure Inbox Email Address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs text-cream outline-none focus:border-accent-gold"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark font-bold text-xs uppercase rounded-md hover:opacity-90 flex items-center justify-center cursor-pointer"
                aria-label="Subscribe"
              >
                {newsSuccess ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>

            <AnimatePresence>
              {newsSuccess && (
                <motion.span
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="block text-[10px] text-emerald-400 font-bold tracking-wide"
                >
                  ✓ Subscribed! Check your inbox for twilight coupons.
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Ending block bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-cream/50 uppercase tracking-widest font-mono">
          <div>
            &copy; {new Date().getFullYear()} Desserts-Only Evening Café. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <span className="hover:text-accent-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-accent-gold transition-colors cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
