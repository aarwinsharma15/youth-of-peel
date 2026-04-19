import React from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, FileText, ArrowRight } from 'lucide-react';
import SectionReveal from '../components/SectionReveal';
import MetricsSection from '../components/MetricsSection';
import { Link } from 'react-router-dom';

export default function OurWork() {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data } = await supabase.from('campaign').select('*').order('order', { ascending: true }).limit(50);
      return data || [];
    },
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero */}
      <section className="bg-ink pt-32 pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Impact & Initiatives</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              OUR WORK
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              From grassroots advocacy to formal policy briefs — here's what we've been building, fighting for, and delivering to the Region of Peel.
            </p>
          </SectionReveal>
        </div>
      </section>

      <MetricsSection />

      {/* Campaigns */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <div className="w-12 h-1 bg-crimson mb-6" />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-ink leading-none tracking-wide mb-2">CAMPAIGNS & INITIATIVES</h2>
            <p className="text-ink/40 font-body text-sm mb-12">A track record of showing up, speaking up, and following through.</p>
          </SectionReveal>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="bg-white h-40 animate-pulse" />)}
            </div>
          ) : campaigns.length === 0 ? (
            <div className="py-24 text-center border border-ink/10">
              <p className="font-display text-4xl text-ink/20 tracking-wide">COMING SOON</p>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((c, i) => (
                <SectionReveal key={c.id} delay={i * 0.07}>
                  <div className="bg-white border border-ink/5 hover:border-crimson/20 transition-all duration-300 group flex flex-col md:flex-row">
                    <div className="absolute-left-strip relative">
                      {c.image_url && (
                        <div className="md:w-56 h-44 md:h-auto overflow-hidden flex-shrink-0">
                          <img src={c.image_url} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:p-8 flex-1 border-l-2 border-crimson">
                      <h3 className="font-heading font-bold text-xl md:text-2xl text-ink mb-2 group-hover:text-crimson transition-colors">{c.title}</h3>
                      {c.description && <p className="text-ink/60 font-body text-sm leading-relaxed mb-3">{c.description}</p>}
                      {c.long_description && <p className="text-ink/35 font-body text-xs leading-relaxed mb-4 line-clamp-2">{c.long_description}</p>}
                      <div className="flex flex-wrap gap-3">
                        {c.link && (
                          <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 bg-crimson text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-ember transition-colors">
                            View Campaign <ExternalLink size={12} />
                          </a>
                        )}
                        {c.pdf_url && (
                          <a href={c.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 border border-ink/20 text-ink text-xs font-heading font-bold uppercase tracking-wider hover:border-crimson hover:text-crimson transition-colors">
                            Document <FileText size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-crimson py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white leading-none tracking-wide mb-4">FOLLOW THE MOVEMENT</h2>
            <p className="text-white/60 font-body mb-8">Stay up to date with our latest campaigns, events, and announcements.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-white text-crimson font-heading font-bold text-sm uppercase tracking-widest hover:bg-parchment transition-colors">
                Follow on Instagram
              </a>
              <Link to="/contact" className="px-7 py-3 border border-white/30 text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors">
                Get in Touch
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
