import React from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import SectionReveal from '../components/SectionReveal';
import SEO from '../components/SEO';

export default function Programs() {
  const { data: programs, isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data } = await supabase.from('program').select('*').order('order', { ascending: true }).limit(50);
      return data || [];
    },
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-parchment">
      <SEO 
        title="Our Programs" 
        description="Explore the hands-on programs offered by Youth of Peel Region (YPR). Designed to give youth in Brampton, Mississauga, and Caledon real skills, connections, and impact through leadership and community development." 
        url="/programs" 
      />
      {/* Hero */}
      <section className="bg-ink pt-32 pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">What We Offer</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              OUR PROGRAMS
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Hands-on opportunities designed to give youth real skills, real connections, and real impact in the Region of Peel.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="bg-white h-80 animate-pulse" />)}
            </div>
          ) : programs.length === 0 ? (
            <div className="py-24 text-center border border-ink/10">
              <p className="font-display text-4xl text-ink/20 tracking-wide">COMING SOON</p>
              <p className="text-ink/30 font-body text-sm mt-2">Check back shortly for exciting new opportunities.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, i) => (
                <SectionReveal key={program.id} delay={i * 0.08}>
                  <div className="bg-white group border border-ink/5 hover:border-crimson/30 transition-all duration-300 flex flex-col h-full">
                    <div className="relative">
                      {program.image_url ? (
                        <div className="aspect-[16/9] overflow-hidden">
                          <img src={program.image_url} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      ) : (
                        <div className="aspect-[16/9] bg-ink" />
                      )}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading font-bold text-xl text-ink mb-3 group-hover:text-crimson transition-colors">{program.title}</h3>
                      {program.description && (
                        <p className="text-ink/50 font-body text-sm leading-relaxed flex-1">{program.description}</p>
                      )}
                      {program.link && (
                        <a href={program.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 text-crimson font-heading font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all">
                          Learn More <ExternalLink size={13} />
                        </a>
                      )}
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
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2rem,6vw,4rem)] text-white leading-none tracking-wide mb-4">READY TO GET INVOLVED?</h2>
            <p className="text-white/60 font-body text-sm mb-8">Become a member and unlock access to all of our programs.</p>
            <Link to="/membership" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-crimson font-heading font-bold text-sm uppercase tracking-widest hover:bg-parchment transition-colors">
              Become a Member <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
