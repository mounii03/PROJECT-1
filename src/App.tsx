import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Offers from './components/Offers';
import Reviews from './components/Reviews';
import Reservation from './components/Reservation';
import OnlineOrder from './components/OnlineOrder';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeCustomizer from './components/ThemeCustomizer';

import { MenuItem, CartItem, ReservationData, Offer } from './types';
import { ShoppingBag, Eye, Heart, Trash2, X, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Core Data States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  // UI States
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Sync state values to LocalStorage for premium session persistence
  useEffect(() => {
    const cachedCart = localStorage.getItem('luxury_cart');
    const cachedWish = localStorage.getItem('luxury_wishlist');
    const cachedRes = localStorage.getItem('luxury_res');
    
    if (cachedCart) setCart(JSON.parse(cachedCart));
    if (cachedWish) setWishlist(JSON.parse(cachedWish));
    if (cachedRes) setReservations(JSON.parse(cachedRes));
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('luxury_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWish: MenuItem[]) => {
    setWishlist(newWish);
    localStorage.setItem('luxury_wishlist', JSON.stringify(newWish));
  };

  const saveRes = (newRes: ReservationData[]) => {
    setReservations(newRes);
    localStorage.setItem('luxury_res', JSON.stringify(newRes));
  };

  // Dark mode trigger
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Section Tracking for Navbar
  useEffect(() => {
    const handleScrollTracking = () => {
      const sections = [
        'home', 'about', 'menu', 'why-choose-us', 'gallery', 'offers', 'reviews', 'contact', 'reservations', 'order', 'blog'
      ];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollTracking);
    return () => window.removeEventListener('scroll', handleScrollTracking);
  }, []);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    const existing = cart.find((i) => i.menuItem.id === item.id);
    if (existing) {
      const updated = cart.map((i) =>
        i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { menuItem: item, quantity: 1 }]);
    }
  };

  const handleModifyCartQty = (itemId: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.menuItem.id === itemId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const handleRemoveFromCart = (itemId: string) => {
    const updated = cart.filter((i) => i.menuItem.id !== itemId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Wishlist operations
  const handleAddToWishlist = (item: MenuItem) => {
    const exists = wishlist.some((i) => i.id === item.id);
    if (exists) {
      // Remove if already wishlisted (toggling behavior)
      const updated = wishlist.filter((i) => i.id !== item.id);
      saveWishlist(updated);
    } else {
      saveWishlist([...wishlist, item]);
    }
  };

  const handleMoveToCart = (item: MenuItem) => {
    handleAddToCart(item);
    // Remove from wishlist
    setWishlist(wishlist.filter((i) => i.id !== item.id));
  };

  const handleRemoveFromWishlist = (item: MenuItem) => {
    saveWishlist(wishlist.filter((i) => i.id !== item.id));
  };

  // Reservations desk
  const handleAddReservation = (booking: ReservationData) => {
    const updated = [booking, ...reservations];
    saveRes(updated);
  };

  // Scrolling router helper
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Open Checkout and scroll
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    navigateToSection('order');
  };

  // Selected promo helper
  const handleSelectPromo = (promo: Offer) => {
    setActiveOffer(promo);
  };

  // Count metrics for visual badges
  const cartQtyCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const wishlistIds = new Set<string>(wishlist.map((item) => item.id));

  // Cart financial summaries
  const subtotalSum = cart.reduce((accum, item) => accum + item.menuItem.price * item.quantity, 0);

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark bg-warm-dark text-cream' : 'bg-warm-beige text-primary-dark'}`}>
      
      {/* Visual Navigation Block */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={cartQtyCount}
        wishlistCount={wishlistCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={navigateToSection}
        activeSection={activeSection}
      />

      {/* Main Single Page structural blocks */}
      <main className="relative">
        <Hero
          onViewMenu={() => navigateToSection('menu')}
          onBookTable={() => navigateToSection('reservations')}
        />
        
        <About />
        
        <Menu
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          wishlistIds={wishlistIds}
        />
        
        <WhyChooseUs />
        
        <Gallery />
        
        <Offers
          activeOfferId={activeOffer?.id || null}
          onSelectOffer={handleSelectPromo}
          onGoToOrder={() => navigateToSection('order')}
        />
        
        <Reviews />
        
        <Reservation onAddReservation={handleAddReservation} />
        
        <OnlineOrder
          cart={cart}
          wishlist={wishlist}
          activeOffer={activeOffer}
          onModifyCartQty={handleModifyCartQty}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onMoveToCart={handleMoveToCart}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onOpenCart={() => setIsCartOpen(true)}
          wishlistIds={wishlistIds}
        />
        
        <Blog />
        
        <Contact />
      </main>

      {/* Universal Footer */}
      <Footer onNavigateSection={navigateToSection} />

      {/* Floating Side Drawer - Cart Shopping Bag */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Dark glass backdrop click callback */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-primary-dark cursor-pointer"
            />

            {/* Sliding Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full bg-warm-beige/60 dark:bg-warm-card/60 backdrop-blur-xl border-l border-accent-gold/25 shadow-2xl flex flex-col justify-between p-6"
              >
                <div>
                  {/* Drawer Header */}
                  <div className="flex justify-between items-center pb-5 border-b border-primary/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-accent-gold" />
                      <h3 className="font-serif text-lg font-bold text-primary dark:text-cream">
                        Shopping Bag ({cartQtyCount})
                      </h3>
                    </div>
                    <button
                      id="cart-drawer-close-btn"
                      onClick={() => setIsCartOpen(false)}
                      className="p-1 rounded-full text-primary/60 dark:text-cream/50 hover:bg-primary/5 dark:hover:bg-cream/10 cursor-pointer"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Drawer List content */}
                  <div className="max-h-[50vh] overflow-y-auto py-6 space-y-4 pr-1">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="w-10 h-10 text-primary/25 dark:text-cream/20 mx-auto mb-3" />
                        <p className="text-xs text-primary/60 dark:text-cream/60">
                          Your premium shopping bag is currently vacant.
                        </p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          id={`drawer-cart-row-${item.menuItem.id}`}
                          key={item.menuItem.id}
                          className="flex items-center gap-3 p-3 bg-white dark:bg-warm-dark rounded-xl border border-primary/5 shadow-sm"
                        >
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-12 h-12 object-cover rounded-lg border border-accent-gold/10"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <h4 className="font-serif text-xs font-bold text-primary dark:text-cream leading-snug line-clamp-1">
                              {item.menuItem.name}
                            </h4>
                            <span className="text-[10px] text-accent-caramel dark:text-accent-gold font-bold">
                              ₹{item.menuItem.price} &times; {item.quantity}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 bg-primary/5 dark:bg-white/5 rounded-full px-2 py-0.5 border border-primary/10">
                            <button
                              id={`drawer-minus-${item.menuItem.id}`}
                              onClick={() => handleModifyCartQty(item.menuItem.id, -1)}
                              className="text-primary dark:text-cream hover:text-accent-gold cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold min-w-3 text-center text-primary dark:text-cream">{item.quantity}</span>
                            <button
                              id={`drawer-plus-${item.menuItem.id}`}
                              onClick={() => handleModifyCartQty(item.menuItem.id, 1)}
                              className="text-primary dark:text-cream hover:text-accent-gold cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            id={`drawer-row-delete-${item.menuItem.id}`}
                            onClick={() => handleRemoveFromCart(item.menuItem.id)}
                            className="text-primary/30 hover:text-red-500 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Drawer Footer total and cta link */}
                <div className="pt-6 border-t border-primary/10 dark:border-white/10 space-y-4">
                  <div className="flex justify-between items-baseline font-serif text-base font-extrabold text-primary dark:text-cream">
                    <span>Subtotal Charges:</span>
                    <span className="text-accent-caramel dark:text-accent-gold">₹{subtotalSum}</span>
                  </div>

                  {activeOffer && subtotalSum > 0 && (
                    <div className="flex justify-between items-center text-xs font-bold text-emerald-500 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/15">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Promo Active: {activeOffer.title}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest">(Deducted at checkout)</span>
                    </div>
                  )}

                  <button
                    id="drawer-checkout-cta"
                    onClick={handleProceedToCheckout}
                    disabled={cart.length === 0}
                    className="w-full py-3.5 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark font-extrabold uppercase text-xs tracking-wider rounded-xl shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    Proceed to Ordering Desk
                  </button>
                  <p className="text-[10px] text-primary/45 dark:text-cream/40 text-center uppercase tracking-widest leading-loose">
                    📦 Free delivery on orders above ₹499
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Side Drawer - Wishlist Liked Items */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="absolute inset-0 bg-primary-dark cursor-pointer"
            />

            {/* sliding panel */}
            <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full bg-warm-beige/60 dark:bg-warm-card/60 backdrop-blur-xl border-l border-accent-gold/25 shadow-2xl flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex justify-between items-center pb-5 border-b border-primary/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      <h3 className="font-serif text-lg font-bold text-primary dark:text-cream">
                        Liked Sweet Treats ({wishlistCount})
                      </h3>
                    </div>
                    <button
                      id="wishlist-drawer-close-btn"
                      onClick={() => setIsWishlistOpen(false)}
                      className="p-1 rounded-full text-primary/60 dark:text-cream/50 hover:bg-primary/5 dark:hover:bg-cream/10 cursor-pointer"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto py-6 space-y-4 pr-1">
                    {wishlist.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="w-10 h-10 text-red-500/20 mx-auto mb-3" />
                        <p className="text-xs text-primary/60 dark:text-cream/60">
                          Your wishlist is currently vacant.
                        </p>
                      </div>
                    ) : (
                      wishlist.map((item) => (
                        <div
                          id={`drawer-wishlist-row-${item.id}`}
                          key={item.id}
                          className="flex items-center gap-3 p-3 bg-white dark:bg-warm-dark rounded-xl border border-primary/5 shadow-sm"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg border border-accent-gold/10"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <h4 className="font-serif text-xs font-bold text-primary dark:text-cream leading-snug line-clamp-1">
                              {item.name}
                            </h4>
                            <span className="text-[10px] text-accent-caramel dark:text-accent-gold font-bold">
                              ₹{item.price}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              id={`drawer-wish-to-cart-${item.id}`}
                              onClick={() => handleMoveToCart(item)}
                              className="px-2.5 py-1.5 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark font-bold text-[9px] uppercase rounded-full cursor-pointer shadow-sm"
                            >
                              Add
                            </button>
                            <button
                              id={`drawer-wish-delete-${item.id}`}
                              onClick={() => handleRemoveFromWishlist(item)}
                              className="p-1.5 text-primary/35 hover:text-red-500 cursor-pointer"
                              aria-label="Remove Item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-primary/10 dark:border-white/10 space-y-3">
                  <button
                    id="drawer-wishlist-view-all-btn"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateToSection('order');
                    }}
                    className="w-full py-3 bg-primary dark:bg-cream text-cream dark:text-primary-dark text-xs uppercase font-bold tracking-widest rounded-xl hover:bg-accent-gold hover:text-primary-dark transition-colors cursor-pointer"
                  >
                    Review Liked Board List
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Glass Studio Customizer Widget */}
      <ThemeCustomizer />

    </div>
  );
}

// Simple Helper Counter elements mini definitions
const Minus = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
