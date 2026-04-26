import React from 'react';
import { CheckCircle, Users, Briefcase, Globe, Mic, Clock, Star, Video, Image } from 'lucide-react';
import SectionReveal from '../components/SectionReveal';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import SEO from '../components/SEO';

/** Extract a YouTube video ID from any common URL format */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1).split('?')[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.pathname.startsWith('/shorts/')) {
      const id = u.pathname.split('/shorts/')[1]?.split('?')[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    const v = u.searchParams.get('v');
    return v ? `https://www.youtube.com/embed/${v}` : null;
  } catch {
    return null;
  }
}

const BENEFITS = [
  { icon: Clock, title: 'Volunteer Hours', desc: 'Earn OSSD-credited volunteer hours through our programs and events.' },
  { icon: Briefcase, title: 'Resume Building', desc: 'Gain real leadership experience and professional skills that employers value.' },
  { icon: Users, title: 'Community Network', desc: 'Connect with like-minded youth leaders, mentors, and community changemakers.' },
  { icon: Globe, title: 'Civic Access', desc: 'Get access to city hall, regional council events, and policymakers.' },
  { icon: Mic, title: 'Mentorship', desc: 'Be paired with experienced community leaders and industry professionals.' },
  { icon: Star, title: 'Leadership Roles', desc: 'Step into executive, coordinator, and team lead positions within our org.' },
];

export default function Membership() {
  const { data: heroImage } = useQuery({
    queryKey: ['siteImages', 'membership_hero'],
    queryFn: async () => {
      const { data } = await supabase.from('siteimage').select('image_url').eq('section', 'hero').order('order', { ascending: true }).limit(1);
      return data?.[0]?.image_url;
    },
    initialData: null,
  });

  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await supabase.from('testimonial').select('*').order('order', { ascending: true }).limit(20);
      return data || [];
    },
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-parchment">
      <SEO 
        title="Become a Member" 
        description="Join the Youth of Peel Region (YPR). Membership is your entry point into civic life, leadership development, and the community that's actively reshaping Brampton, Mississauga, and Caledon. Earn volunteer hours, build your resume, and connect with mentors." 
        url="/membership" 
      />
      {/* Hero */}
      <section className="bg-ink pt-32 pb-20 relative overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <img src={heroImage} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
          </div>
        )}
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
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed mb-8">
              Membership: your way to get involved in the community that's actively reshaping the Region of Peel.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdVgO7owVS8wreW0hUycVucNB8WpM2WEDb6Lk6Q78Hc24EGLw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-crimson text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-ember transition-colors"
            >
              Apply Now — It's Free
            </a>
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

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28 bg-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
            <SectionReveal>
              <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-ink leading-none tracking-wide text-center mb-16 italic">WHAT OUR MEMBERS SAY</h2>
            </SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => {
                const mediaUrl = t.media_url || t.thumbnail_url || null;
                const mediaType = t.media_type || 'image';

                return (
                  <SectionReveal key={t.id} delay={i * 0.1}>
                    <div className="bg-white p-6 shadow-sm border border-ink/5 relative group h-full flex flex-col">
                      <div className="aspect-video bg-ink mb-6 relative overflow-hidden">
                        {mediaType === 'video' && getYouTubeEmbedUrl(mediaUrl) ? (
                          <iframe
                            src={getYouTubeEmbedUrl(mediaUrl)}
                            title={t.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        ) : mediaUrl ? (
                          <img
                            src={mediaUrl}
                            alt={t.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10">
                            {mediaType === 'video' ? <Video size={32} strokeWidth={1.5} /> : <Image size={32} strokeWidth={1.5} />}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-ink/60 font-body text-sm italic mb-6 leading-relaxed">"{t.quote}"</p>
                      </div>
                      <div className="mt-auto pt-6 border-t border-ink/5">
                        <h4 className="font-heading font-bold text-ink text-sm">{t.name}</h4>
                        <p className="text-crimson font-heading font-semibold text-[10px] uppercase tracking-wider">{t.role}</p>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdVgO7owVS8wreW0hUycVucNB8WpM2WEDb6Lk6Q78Hc24EGLw/viewform?usp=dialog"
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
