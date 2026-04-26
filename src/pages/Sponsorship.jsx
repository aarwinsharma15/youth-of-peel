import React from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import SectionReveal from '../components/SectionReveal';
import SEO from '../components/SEO';

const TIERS = [
  {
    name: 'Founding Partner',
    tagline: 'Premier community impact',
    accent: 'border-l-4 border-ember',
    badge: 'bg-ember/10 text-ember',
    benefits: [
      'Premier logo placement on all materials',
      'Featured at all major events',
      'Dedicated social media spotlight',
      'Named recognition in press releases',
      'Invitation to exclusive stakeholder sessions',
      'Custom partnership activation',
    ],
  },
  {
    name: 'Community Partner',
    tagline: 'Meaningful regional presence',
    accent: 'border-l-4 border-crimson',
    badge: 'bg-crimson/10 text-crimson',
    benefits: [
      'Logo on event materials and digital assets',
      'Social media recognition',
      'Invited to YPR community events',
      'Mentioned in newsletters and reports',
      'Access to our youth volunteer network',
    ],
  },
  {
    name: 'In-Kind Supporter',
    tagline: 'Support through goods & services',
    accent: 'border-l-4 border-ink/20',
    badge: 'bg-ink/5 text-ink/50',
    benefits: [
      'Acknowledgment on social media',
      'Logo on relevant event materials',
      'Recognition in annual report',
    ],
  },
];

export default function Sponsorship() {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO 
        title="Sponsorship & Partnership" 
        description="Align your brand or business with Peel's most dynamic youth-led organization. Your support directly enables youth programming and community development." 
        url="/sponsorship" 
      />
      {/* Hero */}
      <section className="bg-ink pt-32 pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none overflow-hidden select-none">
          <p className="font-display text-[clamp(5rem,16vw,14rem)] text-white/[0.03] leading-none tracking-widest translate-x-1/4">PARTNER</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Partner With Us</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              SPONSORSHIP
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Align your brand or business with Peel's most dynamic youth-led organization. Your support directly enables youth programming, advocacy, and community development across the region.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <div className="w-12 h-1 bg-crimson mb-6" />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-ink leading-none tracking-wide mb-14">PARTNERSHIP TIERS</h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className={`bg-white p-8 ${tier.accent} h-full flex flex-col`}>
                  <span className={`inline-block px-3 py-1 text-xs font-heading font-bold uppercase tracking-wider mb-4 ${tier.badge}`}>
                    {tier.name}
                  </span>
                  <p className="text-ink/40 font-body text-sm mb-6">{tier.tagline}</p>
                  <ul className="space-y-3 flex-1">
                    {tier.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle size={14} className="text-crimson flex-shrink-0 mt-0.5" />
                        <span className="text-ink/70 font-body text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-crimson py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white leading-none tracking-wide mb-4">READY TO PARTNER WITH US?</h2>
            <p className="text-white/60 font-body text-sm mb-8">Reach out and let's build something meaningful together for the Region of Peel.</p>
            <a href="mailto:info.youthofpeel@gmail.com?subject=Sponsorship Inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-crimson font-heading font-bold text-sm uppercase tracking-widest hover:bg-parchment transition-colors">
              <Mail size={16} /> Contact Us About Sponsorship
            </a>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
