import React, { useState, useMemo } from 'react';
import { Search, Heart, ShoppingCart, Sparkles, Star, CheckCircle } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
  onAddToWishlist: (item: MenuItem) => void;
  wishlistIds: Set<string>;
}

export default function Menu({ onAddToCart, onAddToWishlist, wishlistIds }: MenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedPopups, setAddedPopups] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', name: 'All Sweets' },
    { id: 'cakes', name: 'Cakes & Pastries' },
    { id: 'cheesecakes', name: 'Cheesecakes' },
    { id: 'brownies', name: 'Brownies' },
    { id: 'desserts', name: 'Premium Desserts' },
    { id: 'ice-cream', name: 'Ice Cream & Gelato' },
    { id: 'waffles', name: 'Gourmet Waffles' },
    { id: 'coffee', name: 'Artisan Coffee' },
    { id: 'mocktails', name: 'Mocktails' },
    { id: 'platters', name: 'Dessert Platters' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCartClick = (item: MenuItem) => {
    onAddToCart(item);
    setAddedPopups(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedPopups(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-24 bg-white dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            The Golden Selection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Signature Menu
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
          <p className="text-sm text-primary-light/75 dark:text-cream/60 mt-4 font-light">
            Each recipe integrates pure gold coatings, premium import cacao, and locally sourced fruits to ensure supreme table experiences.
          </p>
        </div>

        {/* Filter Controls (Search + Category scrolling) */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-primary/30 dark:text-cream/30">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search for cheesecake, lava, latte..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-warm-beige dark:bg-warm-card border border-primary/10 dark:border-white/10 rounded-full text-sm text-primary dark:text-cream outline-none focus:border-accent-gold dark:focus:border-accent-gold focus:ring-1 focus:ring-accent-gold transition-all"
            />
          </div>

          {/* Category Horizontal Scroll Pills */}
          <div className="flex flex-wrap justify-center gap-2 items-center overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                id={`menu-cat-btn-${cat.id}`}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark shadow-md'
                    : 'bg-warm-beige dark:bg-warm-card text-primary-light dark:text-cream/80 hover:bg-primary/5 dark:hover:bg-cream/10 border border-primary/5 dark:border-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Menu Grid layout */}
        <motion.div
          layout
          id="menu-items-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isWishlisted = wishlistIds.has(item.id);
              const isAdded = !!addedPopups[item.id];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="frosted-glass overflow-hidden shadow-md flex flex-col group hover:shadow-xl hover:border-accent-gold/20 transition-all duration-300"
                >
                  {/* Item Image Container with signature tag */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-primary/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent pointer-events-none" />

                    {/* Signature Badge */}
                    {item.isSignature && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark text-[10px] font-bold tracking-widest uppercase py-1 px-2.5 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 animate-pulse" />
                        Signature
                      </div>
                    )}

                    {/* Wishlist Heart Top Right */}
                    <button
                      id={`menu-wishlist-btn-${item.id}`}
                      onClick={() => onAddToWishlist(item)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                        isWishlisted
                          ? 'bg-red-500 text-white hover:bg-red-600 scale-110'
                          : 'bg-white/20 hover:bg-white/40 text-cream/90 hover:text-white'
                      }`}
                      aria-label="Wishlist Item"
                    >
                      <Heart className="w-4 h-4" fill={isWishlisted ? 'white' : 'none'} />
                    </button>
                  </div>

                  {/* Item Details Panel */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Category header info */}
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-accent-caramel dark:text-accent-gold font-semibold uppercase tracking-wider">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-bold">{item.rating}</span>
                        </div>
                      </div>

                      {/* Item Name */}
                      <h3 className="font-serif text-lg font-bold text-primary dark:text-cream leading-snug tracking-tight mb-2 group-hover:text-accent-gold transition-colors">
                        {item.name}
                      </h3>

                      {/* Premium Recipe description */}
                      <p className="text-xs text-primary/70 dark:text-cream/65 line-clamp-2 md:line-clamp-3 font-light mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Pricing & Add triggers */}
                    <div className="flex items-center justify-between pt-4 border-t border-primary-light/10 dark:border-white/10 mt-auto">
                      <span className="font-serif text-lg font-extrabold text-primary dark:text-cream">
                        ₹{item.price}
                      </span>

                      {/* Add Button */}
                      <button
                        id={`menu-add-cart-btn-${item.id}`}
                        onClick={() => handleCartClick(item)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-primary dark:bg-cream text-cream dark:text-primary-dark hover:bg-accent-caramel dark:hover:bg-accent-gold dark:hover:text-primary-dark'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Add to Bag
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-base text-primary/60 dark:text-cream/60">
                No luxurious sweet items match "{searchQuery}". Try exploring our other categories!
              </p>
              <button
                id="reset-filter-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-6 py-2 bg-accent-gold text-primary-dark text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90"
              >
                Reset Selection
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
