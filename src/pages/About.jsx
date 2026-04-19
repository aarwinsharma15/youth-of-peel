import React from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import SectionReveal from '../components/SectionReveal';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Real stock photo — diverse youth group
const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&auto=format&fit=crop&q=80';

const VALUES = [
  { num: '01', title: 'Youth-Led', desc: 'Every decision, every campaign, every initiative is driven by young people — not adults speaking on their behalf.' },
  { num: '02', title: 'Community-First', desc: 'We are rooted in the Region of Peel and measure our success by the impact we create locally.' },
  { num: '03', title: 'Action-Oriented', desc: 'We do not just discuss problems. We build solutions, show up, and follow through.' },
];

export default function About() {
  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data } = await supabase.from('teammember').select('*').order('order', { ascending: true }).limit(50);
      return data || [];
    },
    initialData: [],
  });

  const { data: aboutImages } = useQuery({
    queryKey: ['siteImages', 'about'],
    queryFn: async () => {
      const { data } = await supabase.from('siteimage').select('*').eq('section', 'about').order('order', { ascending: true });
      return data || [];
    },
    initialData: [],
  });

  const { data: generalImages } = useQuery({
    queryKey: ['siteImages', 'general'],
    queryFn: async () => {
      const { data } = await supabase.from('siteimage').select('*').eq('section', 'general').order('order', { ascending: true });
      return data || [];
    },
    initialData: [],
  });

  const heroImage = aboutImages?.[0]?.image_url || ABOUT_IMAGE;
  const storyImage = aboutImages?.[1]?.image_url;

  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Youth group" className="w-full h-full object-cover opacity-25 object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Who We Are</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              ABOUT US
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Founded by youth, for youth — we exist because young people in Peel deserve more than a seat at the table. They deserve to build the table.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <SectionReveal>
                <div className="w-12 h-1 bg-crimson mb-6" />
                <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Our Story</p>
                <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-ink leading-none tracking-wide">
                  BORN FROM A GAP.<br />BUILT TO CLOSE IT.
                </h2>
              </SectionReveal>

              {storyImage && (
                <SectionReveal delay={0.1}>
                  <div className="aspect-[4/5] overflow-hidden bg-ink/5">
                    <img src={storyImage} alt="About our story" className="w-full h-full object-cover" />
                  </div>
                </SectionReveal>
              )}
            </div>
            <SectionReveal delay={0.15}>
              <div className="space-y-5 text-ink/60 font-body text-base leading-relaxed">
                <p>Youth of Peel was founded when a group of young people in the region realized that despite their passion for civic engagement, there was no real infrastructure to support them. They saw a gap between youth desire to lead and the opportunities available to make it happen.</p>
                <p>What started as informal conversations turned into a structured organization — one that now boasts over 20 staff members, 100+ actively engaged youth, and a presence across every major municipality in the Region of Peel.</p>
                <p>We've appeared before regional council, developed policy briefs, launched mentorship programs, and built one of the most active youth civic networks in Ontario.</p>
                <p className="font-heading font-bold text-ink text-lg">We are the bridge between youth passion and civic action. And we're just getting started.</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-none tracking-wide text-center mb-16">CORE VALUES</h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {VALUES.map((v, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-ink p-8 md:p-10 hover:bg-white/[0.03] transition-colors border-l-2 border-crimson group">
                  <div className="font-display text-6xl text-crimson/20 mb-4 group-hover:text-crimson/40 transition-colors">{v.num}</div>
                  <h3 className="font-heading font-bold text-white text-xl mb-3">{v.title}</h3>
                  <p className="text-white/40 font-body text-sm leading-relaxed">{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-20 md:py-28 bg-parchment">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <SectionReveal>
              <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-ink leading-none tracking-wide mb-16">THE TEAM</h2>
            </SectionReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {team.map((m, i) => (
                <SectionReveal key={m.id} delay={i * 0.04}>
                  <div className="group text-center">
                    <div className="aspect-square overflow-hidden mb-3 bg-ink/10">
                      {m.image_url ? (
                        <img src={m.image_url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-4xl text-ink/20">
                          {m.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="text-ink font-heading font-bold text-sm">{m.name}</p>
                    <p className="text-crimson text-xs font-body">{m.role}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Community Gallery */}
      {generalImages.length > 0 && (
        <section className="py-20 md:py-28 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <SectionReveal>
              <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-ink leading-none tracking-wide mb-16 italic">COMMUNITY HIGHLIGHTS</h2>
            </SectionReveal>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {generalImages.map((img, i) => (
                <SectionReveal key={img.id} delay={i * 0.05}>
                  <div className="relative group overflow-hidden">
                    <img src={img.image_url} alt={img.caption || 'Community'} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                    {img.caption && (
                      <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <p className="text-white font-heading font-bold text-xs uppercase tracking-widest">{img.caption}</p>
                      </div>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-crimson py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white leading-none tracking-wide mb-4">BE PART OF THE STORY.</h2>
            <p className="text-white/60 font-body text-sm mb-8">Join a growing movement of youth driving real change in the Region of Peel.</p>
            <Link to="/membership" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-crimson font-heading font-bold text-sm uppercase tracking-widest hover:bg-parchment transition-colors">
              Get Involved <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
