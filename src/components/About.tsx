import React from 'react';
import { Eye, Target, Award, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const narrativeIcons = [
    {
      icon: <Award className="w-5 h-5 text-accent-gold" />,
      title: 'Our Mission',
      desc: 'To offer dessert lovers a sweet ending to their evenings by preparing fresh, premium, and aesthetically stunning sweet delicacies.'
    },
    {
      icon: <Eye className="w-5 h-5 text-accent-caramel" />,
      title: 'Our Vision',
      desc: 'To become the premier evening sanctuary, combining French baking discipline, comfortable spaces, and high-quality specialty coffee pairings.'
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Chef/Founder Goal',
      desc: 'To elevate standard classic recipes into edible works of art that spark laughter and inspire memorable evening storytelling.'
    }
  ];

  const galleryCollage = [
    {
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop',
      title: 'Signature Patisseries'
    },
    {
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop',
      title: 'Enchanted Lounge'
    },
    {
      url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=400&auto=format&fit=crop',
      title: 'Artisan Culinary Prep'
    },
    {
      url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=400&auto=format&fit=crop',
      title: 'Locally Roasted Arabicas'
    }
  ];

  return (
    <section id="about" className="py-24 bg-warm-beige dark:bg-warm-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-accent-caramel dark:text-accent-gold font-bold">
            The Luxurious Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-primary dark:text-cream mt-2">
            Our Sweet Story
          </h2>
          <div className="w-16 h-1 bg-accent-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Story Intro Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Narrative */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-light dark:text-cream/90 leading-snug">
              "Every single evening deserves an incredibly sweet and rewarding ending."
            </h3>
            
            <p className="text-base text-primary/85 dark:text-cream/70 font-light leading-relaxed">
              Desserts-Only Evening Café was created for those who believe premium sweetness is not just calories, but a complete evening ritual. Established in 2024, our lounge is curated specifically to open at twilight, bringing a signature candle-lit elegance modeled after premium Parisian dessert boutiques.
            </p>

            <div className="p-5 rounded-xl bg-primary/5 dark:bg-cream/5 border border-accent-gold/20">
              <span className="block font-serif text-lg font-bold text-accent-caramel dark:text-accent-gold mb-1">
                The Founder's Handcraft Philosophy
              </span>
              <p className="text-sm text-primary/80 dark:text-cream/75 italic">
                "We grew tired of high-end desserts being treated as a hurried afterthought at the end of heavy dinner menus. So we thought: why not build a warm, stunning lounge where the dessert is the absolute hero of the table? Fresh ingredients, complex techniques, and beautiful jazz soundtracks are what define us."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent-caramel/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent-caramel" />
                </div>
                <span className="text-xs font-bold text-primary dark:text-cream">Chef Monique & Team, Master Chocolatier</span>
              </div>
            </div>

            {/* Strategic Mission Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {narrativeIcons.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg frosted-glass shadow-sm">
                  <div className="mb-2">{item.icon}</div>
                  <h4 className="text-xs font-bold text-primary dark:text-cream uppercase tracking-wider mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-primary/75 dark:text-cream/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Gallery Showcase Frame */}
          <div className="grid grid-cols-2 gap-4">
            {galleryCollage.map((pic, index) => (
              <div
                key={index}
                className={`group relative rounded-xl overflow-hidden aspect-square border-2 border-accent-gold/10 hover:border-accent-gold/45 shadow-md transition-all ${
                  index % 2 === 1 ? 'translate-y-4' : ''
                }`}
              >
                <img
                  src={pic.url}
                  alt={pic.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Overlay Text hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-semibold tracking-wider text-cream uppercase">
                    {pic.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
