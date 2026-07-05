import React from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import SectionReveal from '../components/SectionReveal';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import founderImg from '../assets/founder-aarwin-sharma.png';

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

  const heroImage = aboutImages?.[0]?.image_url || ABOUT_IMAGE;
  const storyImage = aboutImages?.[1]?.image_url;

  return (
    <div className="min-h-screen bg-parchment">
      <SEO 
        title="About Us — Aarwin Sharma, Executive Director & Founder" 
        description="Meet Aarwin Sharma, Executive Director and Founder of Youth of Peel. Learn about the youth-led organization closing the opportunity gap across Brampton, Mississauga, and Caledon in the Peel Region. Founded by Aarwin Sharma in 2024." 
        url="/about"
        keywords="Aarwin Sharma, Aarwin Sharma Youth of Peel, Aarwin Sharma Executive Director, Aarwin Sharma Founder, Youth of Peel founder, Youth of Peel about, youth organization Peel Region, youth leadership Brampton, Aarwin Sharma Brampton, Aarwin Sharma Peel Region, Aarwin Sharma Ontario"
      />
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-ink overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Youth of Peel community group" className="w-full h-full object-cover opacity-25 object-top" />
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
              <strong className="text-white/80">Run by youth, for youth.</strong>
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 md:py-28 bg-parchment" id="founder">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Founder Image */}
            <SectionReveal>
              <div className="relative">
                <div className="absolute -left-3 top-0 bottom-0 w-1.5 bg-crimson" />
                <div className="aspect-[3/4] overflow-hidden bg-ink/5 shadow-2xl">
                  <img 
                    src={founderImg} 
                    alt="Aarwin Sharma — Executive Director and Founder of Youth of Peel" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-crimson px-6 py-3">
                  <p className="font-heading font-bold text-white text-xs uppercase tracking-widest">Founder</p>
                </div>
              </div>
            </SectionReveal>

            {/* Founder Info */}
            <SectionReveal delay={0.15}>
              <div className="space-y-6">
                <div>
                  <div className="w-12 h-1 bg-crimson mb-6" />
                  <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-3">Meet the Founder</p>
                  <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ink leading-none tracking-wide mb-2">
                    AARWIN SHARMA
                  </h2>
                  <p className="font-heading font-bold text-crimson text-sm uppercase tracking-widest">
                    Executive Director & Founder
                  </p>
                </div>

                <div className="space-y-4 text-ink/60 font-body text-base leading-relaxed">
                  <p>
                    Aarwin Sharma founded Youth of Peel in 2024 with a clear mission: close the opportunity gap for young people in the Region of Peel. What began as a passionate vision quickly became one of the most active youth civic networks in Ontario.
                  </p>
                  <p>
                    As Executive Director, Aarwin has led Youth of Peel to build a team of over 20 staff members, engage 100+ youth across Brampton, Mississauga, and Caledon, and establish a presence that spans every municipality in the region.
                  </p>
                  <p>
                    Under Aarwin Sharma's leadership, Youth of Peel has appeared before the regional council, developed policy briefs, launched mentorship programs, and built real infrastructure for youth civic engagement — proving that when young people are given the space and structure to lead, they deliver.
                  </p>
                  <p className="font-heading font-bold text-ink text-lg">
                    "We are the bridge between youth passion and civic action. And we're just getting started."
                  </p>
                  <p className="text-ink/40 font-heading text-sm">— Aarwin Sharma, Founder</p>
                </div>

                {/* Contact */}
                <div className="border-t border-ink/10 pt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-crimson flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-white" />
                    </div>
                    <a href="mailto:aarwin.sharma@youthofpeel.ca" className="text-ink/60 font-body text-sm hover:text-crimson transition-colors">
                      aarwin.sharma@youthofpeel.ca
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-crimson flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-white" />
                    </div>
                    <a href="tel:+12895361250" className="text-ink/60 font-body text-sm hover:text-crimson transition-colors">
                      289-536-1250
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
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
                    <img src={storyImage} alt="Youth of Peel — our story" className="w-full h-full object-cover" />
                  </div>
                </SectionReveal>
              )}
            </div>
            <SectionReveal delay={0.15}>
              <div className="space-y-5 text-ink/60 font-body text-base leading-relaxed">
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Quotation",
                    "text": "We are the bridge between youth passion and civic action. And we're just getting started.",
                    "creator": {
                      "@type": "Person",
                      "name": "Aarwin Sharma",
                      "jobTitle": "Executive Director and Founder",
                      "worksFor": {
                        "@type": "Organization",
                        "name": "Youth of Peel"
                      }
                    }
                  })}
                </script>
                <p>Youth of Peel was born out of frustration. When Aarwin Sharma and a small group of local youth started this organization in 2024, they faced immediate hardships: lack of funding, closed doors from established institutions, and the constant struggle of not being taken seriously because of their age. There was no real infrastructure to support young people who wanted to drive civic change.</p>
                <p>But instead of backing down, they built their own table. What started as an informal conversation turned into a relentless push for change. They navigated the complex bureaucracy of local government, fighting for every inch of recognition, and slowly built a team that now boasts over 20 staff members and 100 actively engaged youth across every municipality in the Region of Peel.</p>
                <p>Today, Youth of Peel has completely changed the lives of many youth in our community. Under the leadership of Executive Director Aarwin Sharma, we've delivered critical policy briefs to Queen's Park and local councillors, actively shaping the decisions that affect our future. We've provided countless youth with hands-on internship opportunities, equipped them with the real-world skills needed to secure meaningful employment, and helped our members successfully gain admission into top universities.</p>
                <p>In just a short time, we've proven that when young people are given the space and structure to lead, they overcome any obstacle — and they deliver.</p>
                <figure className="border-l-4 border-crimson pl-6 py-4 my-8 bg-white shadow-sm">
                  <blockquote className="font-heading text-ink text-lg md:text-xl font-bold italic mb-3 leading-snug">
                    "We are the bridge between youth passion and civic action. And we're just getting started."
                  </blockquote>
                  <figcaption className="text-crimson font-heading text-sm uppercase tracking-widest font-bold">
                    — Aarwin Sharma
                    <span className="block text-ink/50 text-xs tracking-normal mt-1 capitalize">Executive Director & Founder</span>
                  </figcaption>
                </figure>
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
                    {(m.email || m.phone) && (
                      <div className="mt-1 space-y-0.5">
                        {m.email && <p className="text-ink/40 text-xs font-body truncate">{m.email}</p>}
                        {m.phone && <p className="text-ink/40 text-xs font-body">{m.phone}</p>}
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
