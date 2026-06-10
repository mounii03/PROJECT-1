import React, { useState } from 'react';
import { Calendar, Users, Clock, Send, CheckCircle2, AlertCircle, MessageCircle, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReservationData } from '../types';

interface ReservationProps {
  onAddReservation: (res: ReservationData) => void;
}

export default function Reservation({ onAddReservation }: ReservationProps) {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedZone, setSelectedZone] = useState('VIP Lounge Cozy');
  const [specialRequests, setSpecialRequests] = useState('');

  // UI state
  const [isChecking, setIsChecking] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const tableZones = [
    { id: 'vip', name: 'VIP Lounge Cozy', desc: 'Slightly isolated velvety booths accompanied by private candle holders.' },
    { id: 'window', name: 'Window City View', desc: 'Glass-panel view targeting the evening high street lights and dusk sky.' },
    { id: 'piano', name: 'Grand Piano Center', desc: 'Direct acoustics vicinity near the organic instrumental jazz performance.' },
    { id: 'alfresco', name: 'Alfresco Starlight Terrace', desc: 'Outdoor garden seating under soft warm micro-bulbs on the rooftop balcony.' }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !phone || !date || !time) {
      setErrorMessage('Please fill in all mandatory booking fields.');
      return;
    }

    setIsChecking(true);

    // Simulate database lookup/reservation confirmation timers
    setTimeout(() => {
      setIsChecking(false);

      const reservationId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
      const completedBooking: ReservationData = {
        id: reservationId,
        name,
        email,
        phone,
        date,
        time,
        guests,
        specialRequests: `${selectedZone}. Requests: ${specialRequests}`
      };

      onAddReservation(completedBooking);
      setConfirmedBooking(completedBooking);

      // Clear standard form inputs
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setTime('');
      setGuests(2);
      setSpecialRequests('');
    }, 1500);
  };

  const getWhatsAppLink = (booking: ReservationData) => {
    const formattedText = encodeURIComponent(
      `*DESSERTS-ONLY EVENING CAFÉ RESERVATION*\n` +
      `----------------------------------------\n` +
      `• *Booking ID:* ${booking.id}\n` +
      `• *Name:* ${booking.name}\n` +
      `• *Date:* ${booking.date}\n` +
      `• *Time:* ${booking.time}\n` +
      `• *Guests:* ${booking.guests} Pax\n` +
      `• *Preferred Zone:* ${selectedZone}\n` +
      `• *Special Request:* ${booking.specialRequests || 'None'}\n\n` +
      `Please confirm my evening seating schedule. Thank you!`
    );
    return `https://api.whatsapp.com/send?phone=919876543210&text=${formattedText}`;
  };

  return (
    <section id="reservations" className="py-24 bg-warm-beige dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            Table Arrangement
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Reserve a Table
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
          <p className="text-sm text-primary-light/75 dark:text-cream/60 mt-4 font-light">
            Due to intensive culinary crafting timers, we strongly advise securing table coordinates in advance, especially on weekend twilight sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left panel: Info & Interactive Seating Map Selection */}
          <div className="lg:col-span-6 space-y-8">
            <div className="frosted-glass p-6 shadow-md">
              <h3 className="font-serif text-xl font-bold text-primary dark:text-cream mb-4 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-accent-gold" />
                Select Seating Aura Zone
              </h3>
              
              {/* Seating Cards Selector */}
              <div className="grid grid-cols-1 gap-3">
                {tableZones.map((zone) => {
                  const isSelected = selectedZone === zone.name;
                  return (
                    <button
                      id={`zone-selector-card-${zone.id}`}
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZone(zone.name)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-accent-gold/10 to-accent-caramel/10 border-accent-gold'
                          : 'bg-warm-beige dark:bg-warm-dark border-primary/5 dark:border-white/5 hover:bg-primary/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-sm font-bold text-primary dark:text-cream">
                          {zone.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] uppercase font-bold tracking-widest text-accent-gold mr-1">
                            Chosen
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-primary/70 dark:text-cream/65 leading-relaxed">
                        {zone.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Live Table Occupancy Indicators */}
            <div className="p-6 frosted-glass shadow-md grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-2xl font-bold text-primary dark:text-cream font-serif">14</span>
                <span className="text-[10px] uppercase tracking-wider text-primary/55 dark:text-cream/50">Total Tables</span>
              </div>
              <div className="border-x border-primary/10">
                <span className="block text-2xl font-bold text-amber-500 font-serif">11</span>
                <span className="text-[10px] uppercase tracking-wider text-primary/55 dark:text-cream/50">Booked Tonight</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-emerald-500 font-serif">3</span>
                <span className="text-[10px] uppercase tracking-wider text-primary/55 dark:text-cream/50">Available Booths</span>
              </div>
            </div>
          </div>

          {/* Right panel: Standard Reservation Form or Success Screen */}
          <div className="lg:col-span-6 frosted-glass p-8 md:p-10 shadow-xl">
            <AnimatePresence mode="wait">
              {!confirmedBooking ? (
                // Reservation intake form panel
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBookingSubmit}
                  className="space-y-4"
                >
                  <h3 className="font-serif text-2xl font-bold text-primary dark:text-cream mb-4">
                    Table Seating Inquiry
                  </h3>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-200 text-red-700 text-xs rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                      {errorMessage}
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="reserve-name"
                      type="text"
                      required
                      placeholder="e.g. Aarav Mehta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 bg-warm-beige dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                    />
                  </div>

                  {/* Mail & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="reserve-email"
                        type="email"
                        required
                        placeholder="e.g. aarav@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-warm-beige dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                        Phone Number *
                      </label>
                      <input
                        id="reserve-phone"
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 bg-warm-beige dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Date, Time, Guests row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                        Date *
                      </label>
                      <input
                        id="reserve-date"
                        type="date"
                        required
                        value={date}
                        className="w-full px-3 py-2 bg-warm-beige dark:bg-warm-dark text-xs text-primary dark:text-cream border border-id border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                        Time Slot *
                      </label>
                      <select
                        id="reserve-time"
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 bg-warm-beige dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg cursor-pointer"
                      >
                        <option value="">Select Time</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                        <option value="22:00">10:00 PM</option>
                        <option value="23:00">11:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                        Guests *
                      </label>
                      <select
                        id="reserve-guests"
                        required
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-warm-beige dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg cursor-pointer"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5 People</option>
                        <option value="6">6 People</option>
                        <option value="8">8+ People</option>
                      </select>
                    </div>
                  </div>

                  {/* Special notes */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-primary/70 dark:text-cream/70 mb-1">
                      Diet / Anniversary Notes (Optional)
                    </label>
                    <textarea
                      id="reserve-special-requests"
                      rows={2}
                      placeholder="e.g. Celebrating our anniversary; vegan cream requested."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full px-4 py-2 bg-warm-beige dark:bg-warm-dark text-xs text-primary dark:text-cream border border-primary/10 dark:border-white/10 outline-none focus:border-accent-gold rounded-lg resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-booking-btn"
                    type="submit"
                    disabled={isChecking}
                    className="w-full py-4 bg-gradient-to-r from-accent-gold to-accent-caramel text-primary-dark font-bold uppercase text-xs tracking-wider rounded-lg shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isChecking ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-dark border-t-transparent rounded-full animate-spin" />
                        Verifying Seating Inventory...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request VIP Confirmation
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                // Booking Success / WhatsApp template print screen
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                      Seating Confirmed
                    </span>
                    <h3 className="font-serif text-3xl font-extrabold text-primary dark:text-cream mt-3">
                      Table Reserved!
                    </h3>
                    <p className="text-xs text-primary-light/80 dark:text-cream/70 mt-2">
                      An official VIP booking slip has been compiled. Code credentials have been registered in local browser tables.
                    </p>
                  </div>

                  {/* Summary slip */}
                  <div className="p-5 bg-warm-beige dark:bg-warm-dark rounded-2xl text-left border border-accent-gold/20 space-y-2">
                    <div className="flex justify-between text-xs font-semibold border-b border-primary/5 pb-2">
                      <span className="text-primary-light/50 dark:text-cream/50">BOOKING ID</span>
                      <span className="text-primary dark:text-cream font-mono font-bold text-accent-gold">{confirmedBooking.id}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div>
                        <span className="block text-[10px] text-primary/50 dark:text-cream/50 uppercase">GUEST</span>
                        <span className="font-bold text-primary dark:text-cream">{confirmedBooking.name}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-primary/50 dark:text-cream/50 uppercase">PARTY SIZE</span>
                        <span className="font-bold text-primary dark:text-cream">{confirmedBooking.guests} People</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-primary/50 dark:text-cream/50 uppercase">DATE</span>
                        <span className="font-bold text-primary dark:text-cream">{confirmedBooking.date}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-primary/50 dark:text-cream/50 uppercase">TIME</span>
                        <span className="font-bold text-primary dark:text-cream">{confirmedBooking.time}</span>
                      </div>
                    </div>
                    <div className="text-xs border-t border-primary/5 pt-2">
                      <span className="block text-[10px] text-primary/50 dark:text-cream/50 uppercase">ZONE Aura selection</span>
                      <span className="font-medium text-accent-caramel dark:text-accent-gold font-serif">{selectedZone}</span>
                    </div>
                  </div>

                  {/* WhatsApp Launcher Trigger button */}
                  <div className="space-y-3">
                    <a
                      id="whatsapp-booking-integration-link"
                      href={getWhatsAppLink(confirmedBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-all"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      Instantly Sync to WhatsApp
                    </a>

                    <button
                      id="book-another-btn"
                      type="button"
                      onClick={() => setConfirmedBooking(null)}
                      className="text-xs font-semibold text-accent-caramel dark:text-accent-gold underline underline-offset-4 cursor-pointer"
                    >
                      Book Another Seating
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
