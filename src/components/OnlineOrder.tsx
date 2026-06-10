import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Trash2, Heart, Plus, Minus, CreditCard, Send, CheckCircle, Clock, MapPin, Sparkles, Receipt } from 'lucide-react';
import { MenuItem, CartItem, OrderData, Offer } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface OnlineOrderProps {
  cart: CartItem[];
  wishlist: MenuItem[];
  activeOffer: Offer | null;
  onModifyCartQty: (itemId: string, delta: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onMoveToCart: (item: MenuItem) => void;
  onRemoveFromWishlist: (item: MenuItem) => void;
  onOpenCart: () => void;
  wishlistIds: Set<string>;
}

export default function OnlineOrder({
  cart,
  wishlist,
  activeOffer,
  onModifyCartQty,
  onRemoveFromCart,
  onClearCart,
  onMoveToCart,
  onRemoveFromWishlist,
  onOpenCart,
  wishlistIds
}: OnlineOrderProps) {
  // Navigation / State tabs
  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist' | 'track'>('cart');
  
  // Checkout coordinates
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState<'UPI' | 'Card'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  // active tracker
  const [processingOrder, setProcessingOrder] = useState<OrderData | null>(null);
  const [trackerStep, setTrackerStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto trigger delivery stages progress bar
  useEffect(() => {
    if (!processingOrder) return;
    if (trackerStep >= 3) return;

    const timer = setInterval(() => {
      setTrackerStep((prev) => {
        const next = prev + 1;
        if (next === 3) {
          // Update status in local tracker
          setProcessingOrder(current => {
            if (!current) return null;
            return { ...current, status: 'delivered' };
          });
          clearInterval(timer);
        } else if (next === 2) {
          setProcessingOrder(current => {
            if (!current) return null;
            return { ...current, status: 'dispatched' };
          });
        } else if (next === 1) {
          setProcessingOrder(current => {
            if (!current) return null;
            return { ...current, status: 'preparing' };
          });
        }
        return next;
      });
    }, 15000); // 15 seconds per delivery stage

    return () => clearInterval(timer);
  }, [processingOrder, trackerStep]);

  // Calculations
  const subtotal = cart.reduce((accum, item) => accum + item.menuItem.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18); // 18% GST (Standard luxury pastry tax in India)
  const deliveryCharge = subtotal > 499 ? 0 : subtotal === 0 ? 0 : 49; // Free above 499

  // Calculate promotional discount
  let discount = 0;
  if (activeOffer && subtotal > 0) {
    if (activeOffer.id === 'offer-happy-hour') {
      // 20% discount on coffee if a cake exists
      const hasCake = cart.some(it => it.menuItem.category === 'cakes' || it.menuItem.category === 'cheesecakes');
      if (hasCake) {
        const coffees = cart.filter(it => it.menuItem.category === 'coffee');
        const coffeeSum = coffees.reduce((s, it) => s + it.menuItem.price * it.quantity, 0);
        discount = Math.round(coffeeSum * 0.20);
      }
    } else if (activeOffer.id === 'offer-weekend' && subtotal >= 1000) {
      discount = Math.round(subtotal * 0.15);
    } else if (activeOffer.id === 'offer-couple') {
      // flat discount matching combo setup
      discount = Math.round(subtotal > 800 ? 120 : 50);
    }
  }

  const grandTotal = Math.max(0, subtotal + gst + deliveryCharge - discount);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!checkoutName || !checkoutPhone || !checkoutAddress) return;

    setIsSubmitting(true);

    // Simulate payment merchant authentication delay
    setTimeout(() => {
      setIsSubmitting(false);

      const trackingId = `SWEET-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder: OrderData = {
        id: trackingId,
        items: [...cart],
        subtotal,
        gst,
        deliveryCharge,
        discount,
        total: grandTotal,
        customerName: checkoutName,
        customerPhone: checkoutPhone,
        customerAddress: checkoutAddress,
        paymentMethod: paymentOption,
        status: 'pending',
        timestamp: new Date().toLocaleTimeString()
      };

      setProcessingOrder(completedOrder);
      setTrackerStep(0);
      setActiveTab('track');
      
      // Reset checkout text
      setCheckoutName('');
      setCheckoutPhone('');
      setCheckoutAddress('');
      setUpiId('');
      setCardNumber('');
      onClearCart(); // Empty standard shopping bag
    }, 2000);
  };

  const trackingStepsDescriptive = [
    { title: 'Kitchen Preparing your Soufflè', desc: 'Our master pastry chef is lining the baking pans and blending cream layers.', status: 'pending' },
    { title: 'Gourmet Gift Boxing', desc: 'Decorators are adding gold foil flakes and placing desserts in premium dark custom packaging.', status: 'preparing' },
    { title: 'Deluxe Rider Dispatch', desc: 'Rider is driving carefully with temperature-controlled pastry compartments to your location.', status: 'dispatched' },
    { title: 'Gourmet Delicacies Arrived!', desc: 'Order hand-delivered safely. Prepare your spoons and enjoy a sweet evening.', status: 'delivered' }
  ];

  return (
    <section id="order" className="py-24 bg-white dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            Gourmet Room Service
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Online Ordering
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center border-b border-primary/10 dark:border-white/10 mb-12">
          <button
            id="order-tab-cart"
            onClick={() => setActiveTab('cart')}
            className={`px-6 py-3 font-serif text-base font-bold relative transition-colors cursor-pointer ${
              activeTab === 'cart' ? 'text-accent-gold' : 'text-primary/65 dark:text-cream/60'
            }`}
          >
            Shopping Bag ({cart.reduce((s, c) => s + c.quantity, 0)})
            {activeTab === 'cart' && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-gold rounded-full" />
            )}
          </button>

          <button
            id="order-tab-wishlist"
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 font-serif text-base font-bold relative transition-colors cursor-pointer ${
              activeTab === 'wishlist' ? 'text-accent-gold' : 'text-primary/65 dark:text-cream/60'
            }`}
          >
            My Sweet Wishlist ({wishlist.length})
            {activeTab === 'wishlist' && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-gold rounded-full" />
            )}
          </button>

          <button
            id="order-tab-track"
            onClick={() => setActiveTab('track')}
            className={`px-6 py-3 font-serif text-base font-bold relative transition-colors cursor-pointer ${
              activeTab === 'track' ? 'text-accent-gold' : 'text-primary/65 dark:text-cream/60'
            }`}
          >
            Live Order Tracking
            {processingOrder && (
              <span className="inline-block w-2.5 h-2.5 bg-accent-gold rounded-full ml-1.5 animate-ping" />
            )}
            {activeTab === 'track' && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-gold rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content Panels */}
        <div>
          {activeTab === 'cart' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Cart Items list */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-serif text-xl font-bold text-primary dark:text-cream">
                  My Selection List
                </h3>

                {cart.length === 0 ? (
                  <div className="p-12 text-center bg-warm-beige dark:bg-warm-card border border-dashed border-primary/20 rounded-3xl">
                    <ShoppingBag className="w-12 h-12 text-primary/30 dark:text-cream/20 mx-auto mb-4" />
                    <p className="text-sm text-primary/60 dark:text-cream/60">
                      Your premium shopping bag is currently empty.
                    </p>
                    <p className="text-xs text-primary/45 dark:text-cream/40 mt-1">
                      Pick custom delicacies from our Signature Menu to initiate ordering.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        id={`cart-item-row-${item.menuItem.id}`}
                        key={item.menuItem.id}
                        className="flex items-center gap-4 border border-primary/5 dark:border-white/5 p-4 rounded-2xl shadow-sm frosted-glass"
                      >
                        {/* Miniature thumbnail */}
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-16 h-16 object-cover rounded-xl border border-accent-gold/10"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Title and details */}
                        <div className="flex-1">
                          <h4 className="font-serif text-sm font-bold text-primary dark:text-cream leading-tight">
                            {item.menuItem.name}
                          </h4>
                          <span className="text-xs text-primary/60 dark:text-cream/60 block mt-0.5">
                            ₹{item.menuItem.price} ea
                          </span>
                        </div>

                        {/* Adjust weights quantity */}
                        <div className="flex items-center gap-2 border border-primary/10 dark:border-white/10 rounded-full px-3 py-1 bg-white dark:bg-warm-dark">
                          <button
                            id={`qty-minus-${item.menuItem.id}`}
                            onClick={() => onModifyCartQty(item.menuItem.id, -1)}
                            className="text-primary dark:text-cream hover:text-accent-gold cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-extrabold text-primary dark:text-cream min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            id={`qty-plus-${item.menuItem.id}`}
                            onClick={() => onModifyCartQty(item.menuItem.id, 1)}
                            className="text-primary dark:text-cream hover:text-accent-gold cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Delete Row button */}
                        <button
                          id={`qty-delete-${item.menuItem.id}`}
                          onClick={() => onRemoveFromCart(item.menuItem.id)}
                          className="p-2 text-primary/40 dark:text-cream/30 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Checkout forms & Invoice panel */}
              <div className="lg:col-span-5 p-6 md:p-8 shadow-xl frosted-glass">
                <div className="flex items-center gap-2 mb-6 border-b border-primary/5 pb-3">
                  <Receipt className="w-5 h-5 text-accent-gold" />
                  <h3 className="font-serif text-lg font-bold text-primary dark:text-cream">
                    Billing Summary
                  </h3>
                </div>

                {/* Sub-charges lists */}
                <div className="space-y-3 text-xs border-b border-primary/10 dark:border-white/10 pb-4">
                  <div className="flex justify-between">
                    <span className="text-primary/65 dark:text-cream/65">Subtotal</span>
                    <span className="font-semibold text-primary dark:text-cream">₹{subtotal}</span>
                  </div>

                  {/* Dynamic Active offer label */}
                  {activeOffer && subtotal > 0 && (
                    <div className="flex justify-between text-accent-caramel dark:text-accent-gold font-medium">
                      <span>Promo Applied ({activeOffer.title})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-primary/65 dark:text-cream/65">Luxury GST tax (18%)</span>
                    <span className="font-semibold text-primary dark:text-cream">₹{gst}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-primary/65 dark:text-cream/65">Home Delivery Charge</span>
                    <span className="font-semibold text-primary dark:text-cream">
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                </div>

                {/* Over-total grand number */}
                <div className="flex justify-between py-4 text-sm font-bold border-b border-primary/10 dark:border-white/10 mb-6 font-serif">
                  <span className="text-primary dark:text-cream">Grand Total Payment</span>
                  <span className="text-lg text-accent-caramel dark:text-accent-gold">₹{grandTotal}</span>
                </div>

                {/* Invoice shipping dispatch form */}
                {cart.length > 0 && (
                  <form id="checkout-submission-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <h4 className="font-serif text-sm font-bold text-primary dark:text-cream mb-2">
                      Secure Home Dispatch Coordinates
                    </h4>

                    {/* Name input */}
                    <div>
                      <input
                        id="checkout-form-name"
                        type="text"
                        required
                        placeholder="Dilip Kumar"
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                      />
                    </div>

                    {/* Phone input */}
                    <div>
                      <input
                        id="checkout-form-phone"
                        type="tel"
                        required
                        placeholder="Phone: +91 XXXXX XXXXX"
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                      />
                    </div>

                    {/* Address textarea */}
                    <div>
                      <textarea
                        id="checkout-form-address"
                        required
                        rows={2}
                        placeholder="Complete Home Delivery Address with landmark..."
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg resize-none"
                      />
                    </div>

                    {/* Payment strategy */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary/55 dark:text-cream/50 block">
                        Payment Selection
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          id="pay-choice-upi"
                          type="button"
                          onClick={() => setPaymentOption('UPI')}
                          className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                            paymentOption === 'UPI'
                              ? 'border-accent-gold bg-accent-gold/5 text-accent-gold'
                              : 'border-primary/5 bg-white dark:bg-warm-dark text-primary/65 dark:text-cream/60'
                          }`}
                        >
                          UPI (GPay / PhonePe)
                        </button>
                        <button
                          id="pay-choice-card"
                          type="button"
                          onClick={() => setPaymentOption('Card')}
                          className={`py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                            paymentOption === 'Card'
                              ? 'border-accent-gold bg-accent-gold/5 text-accent-gold'
                              : 'border-primary/5 bg-white dark:bg-warm-dark text-primary/65 dark:text-cream/60'
                          }`}
                        >
                          Credit / Debit Card
                        </button>
                      </div>
                    </div>

                    {/* UPI Code dynamic fields */}
                    {paymentOption === 'UPI' ? (
                      <div>
                        <input
                          id="upi-payment-id"
                          type="text"
                          required
                          placeholder="Enter your UPI ID (e.g. name@okhdfcbank)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-4 py-2 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          id="card-payment-no"
                          type="text"
                          required
                          maxLength={19}
                          placeholder="Enter 16-Digit Card Number (XXXX XXXX XXXX XXXX)"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-2 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                        />
                      </div>
                    )}

                    {/* Submit checkout buttons */}
                    <button
                      id="submit-payment-checkout-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark font-extrabold uppercase text-xs tracking-wider rounded-lg shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-dark border-t-transparent rounded-full animate-spin" />
                          Securing Payment authorization...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Pay & Dispatch Order
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-primary dark:text-cream">
                My Liked Treats
              </h3>

              {wishlist.length === 0 ? (
                <div className="p-12 text-center bg-warm-beige dark:bg-warm-card border border-primary/10 border-dashed rounded-3xl">
                  <Heart className="w-12 h-12 text-red-300 dark:text-red-500/20 mx-auto mb-4" />
                  <p className="text-sm text-primary/60 dark:text-cream/60">
                    Your luxury sweet wishlist is currently vacant.
                  </p>
                  <p className="text-xs text-primary/45 dark:text-cream/40 mt-1">
                    Click the cute hearts in our Signature Menu to fill this board.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {wishlist.map((item) => (
                    <div
                      id={`wishlist-item-card-${item.id}`}
                      key={item.id}
                      className="rounded-2xl overflow-hidden p-4 flex flex-col justify-between frosted-glass"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-primary/10 mb-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Title & price */}
                        <h4 className="font-serif text-sm font-bold text-primary dark:text-cream leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-xs text-accent-caramel dark:text-accent-gold font-bold block mt-1">
                          ₹{item.price}
                        </span>
                      </div>

                      {/* Controls transfer to card/delete */}
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-primary/5 dark:border-white/10">
                        <button
                          id={`move-cart-btn-${item.id}`}
                          onClick={() => onMoveToCart(item)}
                          className="py-1.5 bg-primary dark:bg-cream text-cream dark:text-primary-dark font-bold text-[10px] uppercase rounded-full hover:bg-accent-gold cursor-pointer"
                        >
                          Move To Bag
                        </button>
                        <button
                          id={`delete-liked-btn-${item.id}`}
                          onClick={() => onRemoveFromWishlist(item)}
                          className="py-1.5 bg-primary/5 dark:bg-white/5 text-primary/60 dark:text-cream/70 font-semibold text-[10px] uppercase rounded-full hover:bg-red-500/10 hover:text-red-500 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'track' && (
            <div className="max-w-3xl mx-auto p-8 shadow-xl frosted-glass">
              {!processingOrder ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-primary/30 dark:text-cream/20 mx-auto mb-4" />
                  <p className="text-sm text-primary/60 dark:text-cream/60">
                    No active dessert packages on transit currently.
                  </p>
                  <p className="text-xs text-primary/45 dark:text-cream/40 mt-1">
                    Complete is the checkout billing inside your Shopping Bag to launch a live-tracking dashboard.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Order credentials header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/10 dark:border-white/10 pb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-accent-caramel dark:text-accent-gold font-bold">
                        Live Room Dispatch Monitor
                      </span>
                      <h3 className="font-serif text-2xl font-extrabold text-primary dark:text-cream">
                        Order #{processingOrder.id}
                      </h3>
                      <p className="text-[11px] text-primary/60 dark:text-cream/60 mt-1">
                        Est. Delivery: 25 - 35 mins • Verified checkout at {processingOrder.timestamp}
                      </p>
                    </div>

                    {/* Direct order stage summary badge */}
                    <div className="bg-gradient-to-r from-accent-gold/20 to-accent-caramel/20 text-accent-caramel dark:text-accent-gold font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-mono">
                      {processingOrder.status}
                    </div>
                  </div>

                  {/* Visual Stepper diagram */}
                  <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/10 dark:before:bg-white/10">
                    {trackingStepsDescriptive.map((step, idx) => {
                      const isCompleted = trackerStep >= idx;
                      const isActive = trackerStep === idx;

                      return (
                        <div key={idx} className="relative">
                          {/* Stepper node circle */}
                          <div
                            className={`absolute -left-[28px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                              isCompleted
                                ? 'bg-accent-gold border-accent-gold text-primary-dark shadow-md shadow-accent-gold/40'
                                : 'bg-white dark:bg-warm-dark border-primary/20 text-primary/40'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-3.5 h-3.5" />
                            ) : (
                              <span className="text-[9px] font-bold">{idx + 1}</span>
                            )}
                          </div>

                          {/* Stepper details */}
                          <div className={isActive ? 'opacity-100' : 'opacity-55'}>
                            <h4
                              className={`font-serif text-sm font-bold ${
                                isActive ? 'text-accent-caramel dark:text-accent-gold' : 'text-primary dark:text-cream'
                              }`}
                            >
                              {step.title}
                            </h4>
                            <p className="text-[11px] text-primary/75 dark:text-cream/65 mt-0.5 leading-relaxed font-light">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Active delivery details client card */}
                  <div className="border-t border-primary/10 dark:border-white/10 pt-6 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-primary/75 dark:text-cream/70">
                    <div className="p-4 bg-primary/5 dark:bg-white/5 rounded-xl border border-primary/5">
                      <span className="block text-[10px] text-primary/50 dark:text-cream/45 uppercase font-bold tracking-widest mb-1">
                        Dispatch Destination
                      </span>
                      <p className="font-semibold text-primary dark:text-cream">{processingOrder.customerName}</p>
                      <p className="mt-0.5 font-light">{processingOrder.customerAddress}</p>
                    </div>

                    <div className="p-4 bg-primary/5 dark:bg-white/5 rounded-xl border border-primary/5">
                      <span className="block text-[10px] text-primary/50 dark:text-cream/45 uppercase font-bold tracking-widest mb-1">
                        Invoice Total Charges
                      </span>
                      <p className="font-bold text-accent-caramel dark:text-accent-gold text-sm font-serif">
                        ₹{processingOrder.total}
                      </p>
                      <p className="mt-0.5 font-light">Payment Secured: {processingOrder.paymentMethod} Authorization Successful</p>
                    </div>
                  </div>

                  {/* Timer alert for testing */}
                  <div className="p-4 bg-accent-gold/10 text-accent-caramel dark:text-accent-gold border border-accent-gold/25 rounded-xl text-center text-[10px] uppercase font-bold tracking-widest">
                    🍰 Culinary Kitchen Simulator Speed is boosted: Dispatch status updates automatically every 15s.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
