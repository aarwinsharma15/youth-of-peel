import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, FileText, Youtube, X } from 'lucide-react';
import SectionReveal from '../components/SectionReveal';
import MetricsSection from '../components/MetricsSection';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

/** Extract a YouTube video ID from any common URL format */
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    // youtu.be/ID
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1).split('?')[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    // youtube.com/shorts/ID
    if (u.pathname.startsWith('/shorts/')) {
      const id = u.pathname.split('/shorts/')[1]?.split('?')[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    // youtube.com/watch?v=ID
    const v = u.searchParams.get('v');
    return v ? `https://www.youtube.com/embed/${v}` : null;
  } catch {
    return null;
  }
}

export default function OurWork() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

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
      <SEO 
        title="Our Work & Campaigns" 
        description="Explore the impact and initiatives of Youth of Peel Region (YPR). From grassroots advocacy and community reform to formal policy briefs and youth programming in Brampton, Mississauga, and Caledon." 
        url="/our-work" 
      />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((c, i) => (
                <SectionReveal key={c.id} delay={i * 0.07}>
                  <div className="bg-white border border-ink/5 hover:border-crimson/20 transition-all duration-300 group flex flex-col h-full">
                    <div className="aspect-video bg-ink/5 relative overflow-hidden">
                      {c.image_url ? (
                        <img src={c.image_url} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-2xl text-ink/20 bg-parchment">
                          YPR
                        </div>
                      )}
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-crimson" />
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading font-bold text-xl text-ink mb-2 group-hover:text-crimson transition-colors line-clamp-2">{c.title}</h3>
                      {c.description && <p className="text-ink/60 font-body text-sm leading-relaxed mb-6 line-clamp-3">{c.description}</p>}

                      <div className="mt-auto pt-4 border-t border-ink/5 flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCampaign(c)}
                          className="px-4 py-2 bg-crimson text-white text-[10px] font-heading font-bold uppercase tracking-wider hover:bg-ember transition-colors"
                        >
                          View Campaign
                        </button>
                        {c.youtube_url && (
                          <a href={c.youtube_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-ink/20 text-ink text-[10px] font-heading font-bold uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-colors flex items-center gap-1">
                            YouTube
                          </a>
                        )}
                        {c.pdf_url && (
                          <a href={c.pdf_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-ink/20 text-ink text-[10px] font-heading font-bold uppercase tracking-wider hover:border-crimson hover:text-crimson transition-colors flex items-center gap-1">
                            Document
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

      {/* Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm" onClick={() => setSelectedCampaign(null)} />
          <div className="relative bg-parchment w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white text-ink hover:text-crimson transition-colors shadow-sm"
            >
              <X size={16} />
            </button>

            <div className="md:w-1/2 bg-ink relative">
              {getYouTubeEmbedUrl(selectedCampaign.youtube_url) ? (
                <div className="aspect-video md:aspect-auto md:h-full w-full">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedCampaign.youtube_url)}
                    title={selectedCampaign.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : selectedCampaign.image_url ? (
                <img src={selectedCampaign.image_url} alt={selectedCampaign.title} className="w-full h-64 md:h-full object-cover" />
              ) : (
                <div className="w-full h-64 md:h-full bg-ink flex items-center justify-center text-white/10 font-display text-4xl">
                  YPR
                </div>
              )}
            </div>

            <div className="p-8 md:w-1/2 flex flex-col">
              <h3 className="font-display text-3xl md:text-4xl text-ink leading-[1.1] mb-4">{selectedCampaign.title}</h3>
              {selectedCampaign.long_description ? (
                <div className="text-ink/60 font-body text-sm leading-relaxed mb-8 whitespace-pre-wrap">
                  {selectedCampaign.long_description}
                </div>
              ) : selectedCampaign.description ? (
                <div className="text-ink/60 font-body text-sm leading-relaxed mb-8">
                  {selectedCampaign.description}
                </div>
              ) : null}

              <div className="mt-auto space-y-3">
                {selectedCampaign.link && (
                  <a href={selectedCampaign.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-crimson text-white text-xs font-heading font-bold uppercase tracking-widest hover:bg-ember transition-colors">
                    Visit Campaign Website <ExternalLink size={14} />
                  </a>
                )}
                {selectedCampaign.pdf_url && (
                  <a href={selectedCampaign.pdf_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 border-2 border-ink text-ink text-xs font-heading font-bold uppercase tracking-widest hover:bg-ink hover:text-white transition-colors">
                    Read Document <FileText size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-crimson py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white leading-none tracking-wide mb-4">FOLLOW THE MOVEMENT</h2>
            <p className="text-white/60 font-body mb-8">Stay up to date with our latest campaigns, events, and announcements.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://www.instagram.com/youthofpeelregion/" target="_blank" rel="noopener noreferrer" className="px-7 py-3 bg-white text-crimson font-heading font-bold text-sm uppercase tracking-widest hover:bg-parchment transition-colors">
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
