import React from 'react';
import SectionReveal from '../SectionReveal';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';

export default function MissionSection() {
  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await supabase
        .from('testimonial')
        .select('*')
        .order('order', { ascending: true })
        .limit(6);
      return data || [];
    },
    initialData: [],
  });
  return (
    <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
      {/* Decorative diagonal lines */}
      <div className="absolute top-0 right-0 w-96 h-96 border border-kinetic/10 rotate-12 translate-x-48 -translate-y-24 rounded-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-kinetic/10 -rotate-12 -translate-x-32 translate-y-16 rounded-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-20">
        <SectionReveal>
          <p className="text-kinetic font-heading font-semibold text-sm uppercase tracking-[0.2em] mb-6 text-center">
            Our Mission
          </p>
          <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed text-center">
            "Youth of Peel Region is a youth-led nonprofit organization dedicated to unifying young people across the Region of Peel and closing the opportunity gap that they all face. We aim to build a future where every young person has the resources and network to shape their own lives by empowering individuals through placements, mentorship, and networking while driving regional reform through advocacy."
          </blockquote>
        </SectionReveal>
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionReveal delay={0.2}>
            <div className="pt-12 border-t border-white/10">
              <p className="font-heading font-bold text-white/30 text-[10px] uppercase tracking-[0.3em] text-center mb-12">
                From our members
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {testimonials.slice(0, 3).map((t) => {
                  const mediaUrl = t.media_url || t.thumbnail_url || null;

                  return (
                    <div key={t.id} className="text-center flex flex-col items-center gap-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                        {mediaUrl ? (
                          <img
                            src={mediaUrl}
                            alt={t.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-display text-3xl md:text-4xl text-white/20">
                            {t.name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <p className="font-heading font-bold text-white text-base md:text-lg">{t.name}</p>
                      {t.quote && (
                        <p className="text-white/60 font-body text-sm md:text-base leading-relaxed italic max-w-sm">
                          "{t.quote}"
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </SectionReveal>
        </div>
      )}
    </section>
  );
}
