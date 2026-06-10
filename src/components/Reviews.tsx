import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Submit Form States
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Auto Slider every 8s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
    }, 8500);
    return () => clearInterval(timer);
  }, [reviewsList.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) return;

    // Create a new mock customer avatar or generic premium placeholder
    const colors = ['f8d7da', 'fff8e7', 'ffeeba', 'd1ecf1'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${chosenColor}&color=3E2723&bold=true`;

    const newReview: Review = {
      id: `custom-rev-${Date.now()}`,
      name: username,
      rating: rating,
      comment: comment,
      date: new Date().toISOString().split('T')[0],
      avatar: newAvatar
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    setActiveIndex(0); // View the newly posted review on slide 1
    
    // Reset Form
    setUsername('');
    setRating(5);
    setComment('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  return (
    <section id="reviews" className="py-24 bg-white dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title Info */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Customer Reviews
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Reviews Testimonial Slider Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Testimonial Panel */}
          <div className="lg:col-span-7 frosted-glass p-8 md:p-12 shadow-xl relative min-h-[350px] flex flex-col justify-between">
            {/* Quote watermark background */}
            <Quote className="absolute top-6 right-6 w-24 h-24 text-primary/[0.04] dark:text-cream/[0.02] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between gap-6"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-5 h-5 ${
                          starIdx < reviewsList[activeIndex].rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="font-serif text-base md:text-lg text-primary-light dark:text-cream/90 leading-relaxed font-light italic">
                    "{reviewsList[activeIndex].comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={reviewsList[activeIndex].avatar}
                    alt={reviewsList[activeIndex].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-accent-gold shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-base font-bold text-primary dark:text-cream">
                      {reviewsList[activeIndex].name}
                    </h4>
                    <span className="text-xs text-accent-caramel dark:text-accent-gold font-medium">
                      Verified Guest • {reviewsList[activeIndex].date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Manual navigation controls */}
            <div className="flex items-center gap-3 justify-end mt-8">
              <button
                id="review-prev-slide-btn"
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-primary/5 dark:bg-white/5 hover:bg-accent-gold text-primary dark:text-cream dark:hover:text-primary-dark transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-primary/60 dark:text-cream/60 select-none">
                {activeIndex + 1} / {reviewsList.length}
              </span>
              <button
                id="review-next-slide-btn"
                onClick={handleNext}
                className="p-2.5 rounded-full bg-primary/5 dark:bg-white/5 hover:bg-accent-gold text-primary dark:text-cream dark:hover:text-primary-dark transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form to leave a review */}
          <div className="lg:col-span-5 frosted-glass p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-gold" />
              <h3 className="font-serif text-xl font-bold text-primary dark:text-cream">
                Share Your Seating Experience
              </h3>
            </div>
            
            <form id="review-submission-form" onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                  Your Full Name
                </label>
                <input
                  id="review-form-name"
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold"
                />
              </div>

              {/* Rating Star selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                  Seating / Flavor Rating ({rating} Stars)
                </label>
                <div role="radiogroup" aria-label="Rating Stars" className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      id={`rating-star-selector-${num}`}
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className="p-1 rounded transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          num <= rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment TextBox */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                  Review Comment
                </label>
                <textarea
                  id="review-form-comment"
                  required
                  rows={3}
                  placeholder="Tell us about the desserts, coffees, lighting, and hospitality..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg resize-none"
                />
              </div>

              <button
                id="submit-review-btn"
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark font-bold uppercase text-xs tracking-wider rounded-lg hover:opacity-90 transition-all cursor-pointer"
              >
                Post Review
              </button>

              <AnimatePresence>
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs text-center justify-center font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Review published! Visible on the slider panels.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
