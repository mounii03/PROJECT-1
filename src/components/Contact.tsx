import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [personName, setPersonName] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [personMessage, setPersonMessage] = useState('');
  const [showEnquirySuccess, setShowEnquirySuccess] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim() || !personEmail.trim() || !personMessage.trim()) return;

    // Simulate enquiry registration API
    setTimeout(() => {
      setShowEnquirySuccess(true);
      setPersonName('');
      setPersonEmail('');
      setPersonMessage('');
      setTimeout(() => setShowEnquirySuccess(false), 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            Hospitality Desk
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Contact & Location
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Info Coordinates & Hours */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-primary dark:text-cream mb-4">
              Get in Touch
            </h3>
            
            {/* Address */}
            <div className="flex gap-4 p-4 rounded-xl border border-primary/5 frosted-glass">
              <div className="w-10 h-10 rounded-lg bg-accent-gold/15 flex items-center justify-center text-accent-gold shrink-0 border border-accent-gold/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-primary/50 dark:text-cream/50">Lobby Location</span>
                <p className="text-xs text-primary dark:text-cream font-medium mt-1 leading-relaxed">
                  Luxe Arcade, 7B, Galleria Boulevard, High Street, Mumbai, MH - 400001
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 p-4 rounded-xl border border-primary/5 frosted-glass">
              <div className="w-10 h-10 rounded-lg bg-accent-caramel/15 flex items-center justify-center text-accent-caramel shrink-0 border border-accent-caramel/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-primary/50 dark:text-cream/50">VIP Support Hotline</span>
                <p className="text-xs text-primary dark:text-cream font-medium mt-1">
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 p-4 rounded-xl border border-primary/5 frosted-glass">
              <div className="w-10 h-10 rounded-lg bg-accent-gold/15 flex items-center justify-center text-accent-gold shrink-0 border border-accent-gold/20">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-primary/50 dark:text-cream/50">Inbox Support</span>
                <p className="text-xs text-primary dark:text-cream font-medium mt-1 select-all">
                  hello@dessertsonly.com
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 p-4 rounded-xl border border-primary/5 frosted-glass">
              <div className="w-10 h-10 rounded-lg bg-accent-caramel/15 flex items-center justify-center text-accent-caramel shrink-0 border border-accent-caramel/20">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-primary/50 dark:text-cream/50">Twilight Schedule</span>
                <p className="text-xs text-primary dark:text-cream font-medium mt-1 leading-tight">
                  Monday – Sunday: 5:00 PM – 12:00 AM <br />
                  <span className="text-[10px] text-accent-caramel font-light">Late Night Seating Closes at 11:30 PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Center panel: Contact Enquiry form */}
          <div className="lg:col-span-4 p-8 shadow-md frosted-glass">
            <h3 className="font-serif text-xl font-bold text-primary dark:text-cream mb-4">
              Franchise & Custom Orders Enquiry
            </h3>

            <form id="contact-enquiry-form" onSubmit={handleEnquirySubmit} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  id="contact-form-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  id="contact-form-email"
                  type="email"
                  required
                  placeholder="Your Email"
                  value={personEmail}
                  onChange={(e) => setPersonEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="contact-form-message"
                  required
                  rows={4}
                  placeholder="Enquiry details: Franchise request, large catering party specifications..."
                  value={personMessage}
                  onChange={(e) => setPersonMessage(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg resize-none"
                />
              </div>

              <button
                id="submit-enquiry-btn"
                type="submit"
                className="w-full py-3 bg-primary dark:bg-cream text-cream dark:text-primary-dark font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-accent-gold hover:text-primary-dark transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Enquiry
              </button>

              <AnimatePresence>
                {showEnquirySuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs text-center justify-center font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Enquiry message routed to general coordinators.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Right panel: Scenic Custom Map View Vector Illustration */}
          <div className="lg:col-span-4 p-6 shadow-md flex flex-col justify-between h-full min-h-[380px] frosted-glass">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent-caramel dark:text-accent-gold block mb-1">
                Visual High Street Map
              </span>
              <h4 className="font-serif text-base font-bold text-primary dark:text-cream">
                Galleria High Street Lane
              </h4>
            </div>

            {/* Custom vector architectural high-contrast street map illustration */}
            <div className="relative flex-1 bg-primary-dark/10 dark:bg-white/5 rounded-2xl overflow-hidden my-4 border border-accent-gold/25 flex items-center justify-center p-4 select-none">
              <svg className="w-full h-full opacity-35 dark:opacity-40" viewBox="0 0 100 100">
                {/* Visual streets grid */}
                <line x1="0" y1="30" x2="100" y2="30" stroke="#C68E52" strokeWidth="2" />
                <line x1="0" y1="75" x2="100" y2="75" stroke="#C68E52" strokeWidth="2" />
                <line x1="45" y1="0" x2="45" y2="100" stroke="#C68E52" strokeWidth="2" />
                <line x1="85" y1="0" x2="85" y2="100" stroke="#C68E52" strokeWidth="1" />
                
                {/* Visual block contours */}
                <rect x="5" y="5" width="30" height="20" rx="3" fill="#3E2723" />
                <rect x="55" y="5" width="25" height="20" rx="3" fill="#3E2723" />
                <rect x="5" y="40" width="30" height="30" rx="3" fill="#3D2924" />
                <rect x="55" y="40" width="25" height="30" rx="3" fill="#D4AF37" fillOpacity="0.2" />
                <rect x="5" y="85" width="35" height="10" rx="2" fill="#3E2723" />
                
                {/* Text Labels */}
                <text x="10" y="15" fill="#3E2723" fontSize="5" fontWeight="bold" opacity="0.8">HOSPITAL</text>
                <text x="60" y="15" fill="#3E2723" fontSize="5" fontWeight="bold" opacity="0.8">ARCADE</text>
                <text x="10" y="55" fill="#3E2723" fontSize="5" fontWeight="bold" opacity="0.8">GALLERIA</text>
                <text x="60" y="55" fill="#C68E52" fontSize="5" fontWeight="bold" opacity="0.9">LOUNGE ZONE</text>
              </svg>

              {/* Pin indicator */}
              <div className="absolute top-[52%] left-[68%] flex flex-col items-center">
                <div className="relative w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center text-primary-dark shadow-lg border border-white animate-bounce">
                  <MapPin className="w-5 h-5 fill-primary-dark" />
                </div>
                <span className="bg-primary text-cream dark:bg-cream dark:text-primary-dark text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow mt-1">
                  We are here
                </span>
              </div>
            </div>

            {/* Social Grid */}
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-primary/55 dark:text-cream/50 mb-2">
                Follow Twilight Stories
              </span>
              <div className="flex gap-3">
                <a
                  id="social-instagram"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/5 dark:bg-white/5 hover:bg-accent-gold hover:text-primary-dark text-primary dark:text-cream transition-colors flex items-center justify-center border border-primary/5 dark:border-white/5"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  id="social-facebook"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/5 dark:bg-white/5 hover:bg-accent-gold hover:text-primary-dark text-primary dark:text-cream transition-colors flex items-center justify-center border border-primary/5 dark:border-white/5"
                  aria-label="Facebook Profile"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  id="social-youtube"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/5 dark:bg-white/5 hover:bg-accent-gold hover:text-primary-dark text-primary dark:text-cream transition-colors flex items-center justify-center border border-primary/5 dark:border-white/5"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
