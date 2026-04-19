import React from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Mail } from 'lucide-react';
import SectionReveal from '../components/SectionReveal';

export default function Hiring() {
  const { data: positions, isLoading } = useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const { data } = await supabase.from('hiringposition').select('*').eq('is_open', true).order('order', { ascending: true }).limit(50);
      return data || [];
    },
    initialData: [],
  });

  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data } = await supabase.from('teammember').select('*').order('order', { ascending: true }).limit(50);
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
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Join Our Team</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              WORK WITH US
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              We're always looking for passionate, driven youth to join our growing team. No experience required — just grit, curiosity, and a desire to make a difference.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Positions */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <div className="w-12 h-1 bg-crimson mb-6" />
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-ink leading-none tracking-wide mb-2">OPEN POSITIONS</h2>
            <p className="text-ink/40 font-body text-sm mb-12">All roles are volunteer-based and offer real-world leadership experience.</p>
          </SectionReveal>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="bg-white h-24 animate-pulse" />)}
            </div>
          ) : positions.length === 0 ? (
            <div className="border border-ink/10 p-10 text-center">
              <p className="font-display text-4xl text-ink/20 tracking-wide">NO OPEN ROLES</p>
              <p className="text-ink/30 font-body text-sm mt-2">Reach out directly and we'll keep you in mind.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {positions.map((p, i) => (
                <SectionReveal key={p.id} delay={i * 0.07}>
                  <div className="bg-white border-l-2 border-crimson p-6 md:p-8 hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-2 h-2 bg-green-500 inline-block" />
                          <span className="text-green-600 font-heading font-bold text-xs uppercase tracking-widest">Open</span>
                        </div>
                        <h3 className="font-heading font-bold text-xl text-ink mb-2 group-hover:text-crimson transition-colors">{p.title}</h3>
                        {p.description && <p className="text-ink/60 font-body text-sm leading-relaxed mb-3">{p.description}</p>}
                        {p.requirements && (
                          <div className="bg-ink/5 px-4 py-3 mb-4">
                            <p className="text-xs font-heading font-bold text-ink/30 uppercase tracking-widest mb-1">Requirements</p>
                            <p className="text-ink/60 font-body text-sm leading-relaxed">{p.requirements}</p>
                          </div>
                        )}
                        {p.application_link && (
                          <a href={p.application_link} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-crimson text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-ember transition-colors">
                            Apply Now <ExternalLink size={12} />
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

      {/* Team */}
      {team.length > 0 && (
        <section className="bg-ink py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <SectionReveal>
              <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-white leading-none tracking-wide mb-16">MEET THE TEAM</h2>
            </SectionReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {team.map((m, i) => (
                <SectionReveal key={m.id} delay={i * 0.05}>
                  <div className="group">
                    <div className="aspect-square overflow-hidden mb-3 bg-white/5">
                      {m.image_url ? (
                        <img src={m.image_url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-5xl text-white/10">
                          {m.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="text-white font-heading font-bold text-sm">{m.name}</p>
                    <p className="text-ember text-xs font-body">{m.role}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-20 bg-parchment border-t border-ink/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-none tracking-wide mb-4">DON'T SEE THE RIGHT ROLE?</h2>
            <p className="text-ink/40 font-body text-sm mb-6">Reach out — we're always open to motivated youth who want to contribute.</p>
            <a href="mailto:info.youthofpeel@gmail.com" className="inline-flex items-center gap-2 px-7 py-3 bg-ink text-white font-heading font-bold text-sm uppercase tracking-wider hover:bg-ash transition-colors">
              <Mail size={15} /> Email Us Directly
            </a>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
