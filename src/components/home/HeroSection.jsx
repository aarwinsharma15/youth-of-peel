import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MarqueeBanner from '../MarqueeBanner';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&auto=format&fit=crop&q=80';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col bg-ink overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Youth leaders"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        {/* Red stripe on left */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
      </div>

      {/* Content — left-aligned, bottom of screen */}
      <div className="relative flex-1 flex flex-col justify-end pb-20 px-4 sm:px-8 lg:px-16 pt-28 max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading font-bold text-ember text-xs sm:text-sm uppercase tracking-[0.3em] mb-4"
        >
          Brampton · Mississauga · Caledon
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-[clamp(3.5rem,12vw,9rem)] text-white leading-[0.88] tracking-wide mb-6"
        >
          EMPOWERING<br />
          <span className="text-crimson">YOUTH</span><br />
          TO LEAD.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 font-body text-base sm:text-lg max-w-xl mb-10 leading-relaxed"
        >
          Youth of Peel is a youth-led nonprofit unifying young people across the Region of Peel and closing the opportunity gap they all face.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/membership"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-crimson text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-ember transition-colors"
          >
            Become a Member <ArrowRight size={16} />
          </Link>
          <Link
            to="/our-work"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-heading font-bold text-sm uppercase tracking-widest hover:border-white/60 transition-colors"
          >
            Our Work
          </Link>
        </motion.div>
      </div>

      {/* Marquee Banner */}
      <div className="relative z-10">
        <MarqueeBanner />
      </div>
    </section>
  );
}
