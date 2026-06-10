import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowLeft, ArrowRight, Share2, MessageSquare } from 'lucide-react';
import { BLOG_ARTICLES } from '../data';
import { BlogArticle } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = (title: string) => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="blog" className="py-24 bg-warm-beige dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            // Grid Article Directory
            <motion.div
              key="blog-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Title Header */}
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
                  Dessert Epilogue
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
                  The Sweet Blog
                </h2>
                <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
                <p className="text-sm text-primary-light/75 dark:text-cream/60 mt-4 font-light">
                  Follow culinary chronicles, ingredient source traces, and custom gourmet histories written by our executive patissiers.
                </p>
              </div>

              {/* Grid Column */}
              <div id="blog-posts-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_ARTICLES.map((article) => (
                  <article
                    id={`blog-card-${article.id}`}
                    key={article.id}
                    className="frosted-glass overflow-hidden shadow-md flex flex-col justify-between group hover:shadow-xl hover:border-accent-gold/20 transition-all duration-300"
                  >
                    <div>
                      {/* Cover Photo */}
                      <div className="relative aspect-video overflow-hidden bg-primary/10">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-primary/85 dark:bg-warm-dark/85 backdrop-blur-md text-accent-gold text-[10px] uppercase tracking-widest font-bold py-1 px-3 rounded-full">
                          Featured
                        </div>
                      </div>

                      {/* Header metrics */}
                      <div className="p-6 pb-0 space-y-2">
                        <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider text-primary/50 dark:text-cream/50">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {article.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Title click */}
                        <h3 className="font-serif text-lg font-bold text-primary dark:text-cream leading-snug group-hover:text-accent-gold transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs text-primary/75 dark:text-cream/65 line-clamp-3 leading-relaxed font-light">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="p-6 pt-4 border-t border-primary/5 mt-6">
                      <button
                        id={`read-article-btn-${article.id}`}
                        onClick={() => setSelectedArticle(article)}
                        className="text-xs font-bold text-accent-caramel dark:text-accent-gold uppercase tracking-wider flex items-center gap-1.5 hover:gap-2.5 transition-all cursor-pointer"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ) : (
            // Full Detailed Immersive reading panel
            <motion.div
              key="blog-reader"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto frosted-glass p-6 md:p-12 shadow-xl"
            >
              {/* Back button */}
              <button
                id="blog-back-dir-btn"
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary/60 dark:text-cream/60 hover:text-accent-gold transition-colors mb-6 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sweet Blog directories
              </button>

              {/* Title & metrics */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs uppercase font-bold tracking-wider text-accent-caramel dark:text-accent-gold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedArticle.readTime}
                  </span>
                </div>

                <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-primary dark:text-cream tracking-tight leading-tight">
                  {selectedArticle.title}
                </h1>

                {/* Subtext editor sign */}
                <div className="flex items-center justify-between border-y border-primary/5 dark:border-white/10 py-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/15 flex items-center justify-center font-serif font-extrabold text-accent-gold text-sm border border-accent-gold/20">
                      EP
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-primary dark:text-cream">Executive Patissier Team</span>
                      <span className="block text-[10px] text-primary/50 dark:text-cream/45 uppercase tracking-wider font-semibold">
                        Gourmet Chronicle Editors
                      </span>
                    </div>
                  </div>

                  {/* Share button */}
                  <button
                    id="blog-share-copy-btn"
                    onClick={() => handleShare(selectedArticle.title)}
                    className="p-2.5 rounded-full bg-primary/5 dark:bg-white/5 text-primary/65 dark:text-cream/65 hover:bg-accent-gold hover:text-primary-dark transition-all flex items-center gap-1 cursor-pointer"
                    aria-label="Share article link"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1">
                      {copiedLink ? 'Copied Links!' : 'Share'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Wide article frame cover */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md my-8">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Editorial contents */}
              <div className="prose dark:prose-invert max-w-none text-sm md:text-base text-primary/85 dark:text-cream/80 font-light leading-relaxed space-y-6">
                <p className="font-medium text-base text-primary dark:text-cream font-serif italic">
                  "{selectedArticle.excerpt}"
                </p>
                <div className="w-16 h-0.5 bg-accent-gold/35" />
                <p>{selectedArticle.content}</p>
                <p>
                  To explore these flavors firsthand, join us inside our warm seating lounge this evening. Our master chefs are preparing these exact delicacies on order. Direct table coordinates can be requested inside our online reservations desk.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
