import React from 'react';
import { Sparkles, Gift, Heart, Clock, Check } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data';
import { Offer } from '../types';

interface OffersProps {
  activeOfferId: string | null;
  onSelectOffer: (offer: Offer) => void;
  onGoToOrder: () => void;
}

export default function Offers({ activeOfferId, onSelectOffer, onGoToOrder }: OffersProps) {
  const offerIcons = [
    <Clock className="w-8 h-8 text-accent-gold" />,
    <Heart className="w-8 h-8 text-red-400" />,
    <Gift className="w-8 h-8 text-accent-caramel" />
  ];

  const handleApplyPromo = (offer: Offer) => {
    onSelectOffer(offer);
    // Auto scroll or redirect to online store tab
    setTimeout(() => {
      onGoToOrder();
    }, 800);
  };

  return (
    <section id="offers" className="py-24 bg-warm-beige dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            Twilight Specials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Special Offers
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
          <p className="text-sm text-primary-light/75 dark:text-cream/60 mt-4 font-light">
            Complement your magical dark sunset stories with limited-period sweet deals and sharing boards.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div id="offers-card-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIAL_OFFERS.map((offer, idx) => {
            const isApplied = activeOfferId === offer.id;

            return (
              <div
                key={offer.id}
                className={`relative p-8 hover:shadow-2xl transition-all duration-350 flex flex-col justify-between group ${
                  isApplied
                    ? 'border-accent-gold bg-accent-gold/10 dark:bg-accent-gold/5 ring-2 ring-accent-gold rounded-3xl'
                    : 'frosted-glass shadow-lg'
                }`}
              >
                {/* Decorative Glitter Corner */}
                {idx === 1 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark text-[9px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    Best Value
                  </div>
                )}

                <div>
                  {/* Promo Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 dark:bg-cream/5 flex items-center justify-center mb-6 border border-accent-gold/20">
                    {offerIcons[idx] || <Gift className="w-8 h-8" />}
                  </div>

                  {/* Promo Title & details */}
                  <h3 className="font-serif text-2xl font-bold text-primary dark:text-cream leading-tight mb-2 group-hover:text-accent-gold transition-colors">
                    {offer.title}
                  </h3>

                  <span className="inline-block text-xs font-bold text-accent-caramel dark:text-accent-gold uppercase tracking-wider mb-4">
                    {offer.subtitle}
                  </span>

                  <p className="text-xs text-primary/80 dark:text-cream/70 leading-relaxed font-light mb-6">
                    {offer.description}
                  </p>
                </div>

                {/* Apply button and indicators */}
                <div className="pt-6 border-t border-primary/5 dark:border-white/10 mt-auto flex flex-col gap-4">
                  {offer.price ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] text-primary/50 dark:text-cream/50">Combo Price:</span>
                      <span className="font-serif text-2xl font-extrabold text-primary dark:text-cream">
                        ₹{offer.price}
                      </span>
                    </div>
                  ) : offer.discount ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] text-primary/50 dark:text-cream/50">Deal:</span>
                      <span className="font-serif text-2xl font-extrabold text-accent-caramel dark:text-accent-gold">
                        {offer.discount}
                      </span>
                    </div>
                  ) : null}

                  <button
                    id={`apply-promo-btn-${offer.id}`}
                    onClick={() => handleApplyPromo(offer)}
                    className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-500 text-white flex items-center justify-center gap-1'
                        : 'bg-primary dark:bg-cream text-cream dark:text-primary-dark hover:bg-accent-gold hover:text-primary-dark'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Promo Activated!
                      </>
                    ) : (
                      'Apply to Shop Order'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
