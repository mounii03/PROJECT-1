import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Calendar, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onNavigate,
  activeSection
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Story', id: 'about' },
    { name: 'Signature Menu', id: 'menu' },
    { name: 'Why Us', id: 'why-choose-us' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Special Offers', id: 'offers' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
    { name: 'Reservations', id: 'reservations' },
    { name: 'Order Online', id: 'order' },
    { name: 'Blog', id: 'blog' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-panel shadow-lg py-3'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="logo-button"
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 text-left group"
        >
          <div className="relative w-10 h-10 rounded-full bg-accent-gold flex items-center justify-center text-primary-dark shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-caramel rounded-full animate-ping" />
          </div>
          <div>
            <span className="block font-serif text-lg md:text-xl font-bold tracking-tight text-primary dark:text-cream group-hover:text-accent-gold dark:group-hover:text-accent-gold transition-colors">
              Desserts-Only
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-medium">
              Evening Café
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              id={`nav-link-${link.id}`}
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-sm tracking-wide font-medium relative py-1 transition-colors hover:text-accent-gold cursor-pointer ${
                activeSection === link.id
                  ? 'text-accent-gold font-semibold'
                  : 'text-primary-light dark:text-cream/80'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-gold rounded"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls (Theme, Wishlist, Cart, Quick Book, Mobile Menu) */}
        <div id="nav-actions" className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-cream/10 text-primary dark:text-cream transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-accent-gold" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Wishlist Button */}
          <button
            id="wishlist-toggle-btn"
            onClick={onOpenWishlist}
            className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-cream/10 text-primary dark:text-cream relative transition-colors"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5 text-red-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-caramel text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Business Button */}
          <button
            id="cart-toggle-btn"
            onClick={onOpenCart}
            className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-cream/10 text-primary dark:text-cream relative transition-colors"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-accent-gold" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-gold text-primary-dark text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Fast Table Booking CTA Button */}
          <button
            id="quick-reservation-btn"
            onClick={() => handleLinkClick('reservations')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark uppercase text-xs font-semibold tracking-wider rounded-full hover:opacity-90 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book Table
          </button>

          {/* Burger Menu Button (Mobile) */}
          <button
            id="mobile-burger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-primary/5 dark:hover:bg-cream/10 text-primary dark:text-cream transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full glass-panel dark:bg-warm-dark/95 border-b border-accent-gold/20 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  id={`mobile-nav-link-${link.id}`}
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left py-2 px-3 text-base font-medium rounded-lg transition-all ${
                    activeSection === link.id
                      ? 'bg-accent-gold/25 text-accent-gold font-bold border-l-4 border-accent-gold'
                      : 'text-primary dark:text-cream/90 hover:bg-primary/5 dark:hover:bg-cream/5'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                id="mobile-book-table-btn"
                onClick={() => handleLinkClick('reservations')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark uppercase text-sm font-semibold tracking-wider rounded-lg mt-2"
              >
                <Calendar className="w-5 h-5" />
                Book Table / Reserve
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
