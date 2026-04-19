import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionReveal from '../SectionReveal';

export default function CTASection() {
  return (
    <section className="py-24 md:py-36 bg-parchment relative overflow-hidden">
      {/* Ghosted display text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p className="font-display text-[clamp(4rem,16vw,14rem)] text-ink/[0.04] leading-none tracking-widest whitespace-nowrap">
          JOIN US
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 relative">
        <SectionReveal>
          {/* Red horizontal rule */}
          <div className="w-12 h-1 bg-crimson mb-8" />

          <h2 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] text-ink leading-[0.9] tracking-wide mb-8">
            READY TO BREAK INTO POLITICS OR YOUR COMMUNITY?
          </h2>

          <p className="text-ink/50 font-body text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
            If you're passionate about your community, want your voice heard, and are looking to gain volunteer hours, resume-building experience, and real leadership skills — Youth of Peel is your entry point.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/membership"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-crimson text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-ember transition-colors"
            >
              Become a Member <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-ink text-ink font-heading font-bold text-sm uppercase tracking-widest hover:bg-ink hover:text-white transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
