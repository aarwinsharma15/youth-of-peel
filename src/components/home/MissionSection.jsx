import React from 'react';
import SectionReveal from '../SectionReveal';

export default function MissionSection() {
  return (
    <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
      {/* Decorative diagonal lines */}
      <div className="absolute top-0 right-0 w-96 h-96 border border-kinetic/10 rotate-12 translate-x-48 -translate-y-24 rounded-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-kinetic/10 -rotate-12 -translate-x-32 translate-y-16 rounded-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionReveal>
          <p className="text-kinetic font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 text-center">
            Our Mission
          </p>
          <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed text-center">
            "Youth of Peel is a youth-led nonprofit organization dedicated to unifying young people across the Region of Peel and closing the opportunity gap that they all face. We aim to build a future where every young person has the resources and network to shape their own lives by empowering individuals through placements, mentorship, and networking while driving regional reform through advocacy."
          </blockquote>
        </SectionReveal>
      </div>
    </section>
  );
}
