import React from 'react';
import { CheckCircle, Users, Briefcase, Globe, Mic, Clock, Star } from 'lucide-react';
import SectionReveal from '../components/SectionReveal';

const BENEFITS = [
  { icon: Clock, title: 'Volunteer Hours', desc: 'Earn OSSD-credited volunteer hours through our programs and events.' },
  { icon: Briefcase, title: 'Resume Building', desc: 'Gain real leadership experience and professional skills that employers value.' },
  { icon: Users, title: 'Community Network', desc: 'Connect with like-minded youth leaders, mentors, and community changemakers.' },
  { icon: Globe, title: 'Civic Access', desc: 'Get access to city hall, regional council events, and policymakers.' },
  { icon: Mic, title: 'Mentorship', desc: 'Be paired with experienced community leaders and industry professionals.' },
  { icon: Star, title: 'Leadership Roles', desc: 'Step into executive, coordinator, and team lead positions within our org.' },
];

export default function Membership() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero */}
      <section className="bg-ink pt-32 pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none overflow-hidden select-none">
          <p className="font-display text-[clamp(6rem,18vw,16rem)] text-white/[0.03] leading-none tracking-widest translate-x-1/4">JOIN</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Join the Movement</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              BECOME A<br />MEMBER
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Membership is your entry point into civic life, leadership development, and a community that's actively reshaping the Region of Peel.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <div className="w-12 h-1 bg-crimson mb-6" />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-ink leading-none tracking-wide mb-2">WHAT YOU GET</h2>
            <p className="text-ink/40 font-body text-sm mb-14">Membership is free. Your investment is your time, your voice, and your drive to create change.</p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <SectionReveal key={i} delay={i * 0.07}>
                  <div className="bg-parchment p-8 hover:bg-white transition-colors group border-l-2 border-transparent hover:border-crimson">
                    <div className="w-10 h-10 bg-crimson/10 flex items-center justify-center mb-4 group-hover:bg-crimson group-hover:text-white transition-all">
                      <Icon size={18} className="text-crimson group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-heading font-bold text-ink text-lg mb-2">{b.title}</h3>
                    <p className="text-ink/50 font-body text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Who We're Looking For</p>
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-none tracking-wide mb-8">
                PASSIONATE YOUTH WHO WANT THEIR VOICE HEARD.
              </h2>
              <div className="space-y-4">
                {[
                  'You care deeply about your community',
                  'You want to develop real leadership skills',
                  'You are between the ages of 14–25',
                  'You live, work, or study in the Region of Peel',
                  'You are ready to show up and take action',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-crimson mt-0.5 flex-shrink-0" />
                    <span className="text-white/60 font-body text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="border border-white/10 p-8 md:p-10">
                <h3 className="font-display text-3xl text-white tracking-wide mb-2">APPLY NOW</h3>
                <p className="text-white/40 font-body text-sm mb-8">Registration takes less than 5 minutes. Membership is completely free.</p>
                <a
                  href="https://forms.gle/yourformlink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-8 py-4 bg-crimson text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-ember transition-colors mb-4"
                >
                  Complete the Application Form
                </a>
                <p className="text-white/20 font-body text-xs text-center">We'll be in touch within 3–5 business days.</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
