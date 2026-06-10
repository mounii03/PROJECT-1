import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'cheesecakes', name: 'Cheesecakes' },
    { id: 'waffles', name: 'Waffles' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'interior', name: 'Interior Ambiance' },
    { id: 'customers', name: 'Happy Customers' }
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const handleOpenLightbox = (itemId: string) => {
    const originalIndex = GALLERY_ITEMS.findIndex((it) => it.id === itemId);
    if (originalIndex !== -1) {
      setLightboxIndex(originalIndex);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            The Visual Showcase
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Café Gallery
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
          <p className="text-sm text-primary-light/75 dark:text-cream/60 mt-4 font-light">
            Take a visual tour around our warm candle-lit booths, gourmet plating styles, and beautiful smiling patrons.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              id={`gallery-cat-btn-${cat.id}`}
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-primary dark:bg-cream text-cream dark:text-primary-dark shadow-sm'
                  : 'bg-warm-beige dark:bg-warm-card text-primary-light dark:text-cream/80 hover:bg-primary/5 dark:hover:bg-cream/10 border border-primary/5 dark:border-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          id="gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => handleOpenLightbox(item.id)}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-md border border-primary/5 dark:border-white/5 cursor-pointer bg-primary/5"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                {/* Cover Overlay details */}
                <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-cream">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-accent-gold font-bold mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-cream">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal Carousel */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            id="gallery-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary-dark/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button top-right */}
            <button
              id="lightbox-close-btn"
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-cream/10 text-cream hover:bg-cream/20 hover:scale-105 transition-all text-white z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Button */}
            <button
              id="lightbox-prev-btn"
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-cream/10 text-cream hover:bg-cream/20 hover:scale-105 transition-all text-white z-50 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Holder with animation */}
            <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex flex-col items-center"
                >
                  <img
                    src={GALLERY_ITEMS[lightboxIndex].image}
                    alt={GALLERY_ITEMS[lightboxIndex].title}
                    className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center mt-4">
                    <span className="text-xs uppercase tracking-widest text-accent-gold font-bold">
                      {GALLERY_ITEMS[lightboxIndex].category}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-cream">
                      {GALLERY_ITEMS[lightboxIndex].title}
                    </h3>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Button */}
            <button
              id="lightbox-next-btn"
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-cream/10 text-cream hover:bg-cream/20 hover:scale-105 transition-all text-white z-50 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
