import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';

// Real stock photos — diverse youth, community action, city hall
const PLACEHOLDER_IMAGES = [
  {
    image_url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80',
    caption: 'Community Planning Session',
    badge: 'Advocacy',
  },
  {
    image_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80',
    caption: 'Youth Council Address',
    badge: 'Leadership',
  },
  {
    image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80',
    caption: 'Community Outreach Event',
    badge: 'Outreach',
  },
  {
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    caption: 'Mentorship Program',
    badge: 'Mentorship',
  },
];

export default function InActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { data: siteImages } = useQuery({
    queryKey: ['siteImages', 'in_action'],
    queryFn: async () => {
      const { data } = await supabase.from('siteimage').select('*').eq('section', 'in_action').order('order', { ascending: true }).limit(20);
      return data || [];
    },
    initialData: [],
  });

  const images = siteImages.length > 0 ? siteImages : PLACEHOLDER_IMAGES;

  return (
    <section className="py-20 md:py-28 bg-parchment overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-2">See the impact</p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] text-ink leading-none tracking-wide">
              IN ACTION
            </h2>
          </div>
          <div className="hidden md:block w-16 h-0.5 bg-crimson mb-4" />
        </motion.div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        className="flex gap-4 overflow-x-auto pb-6 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex-shrink-0 snap-center"
          >
            <div className="relative w-72 md:w-[420px] aspect-[4/3] overflow-hidden group">
              <img
                src={img.image_url}
                alt={img.caption || 'Youth of Peel Region in action'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

              {/* Red stripe accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson" />

              {img.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-crimson text-white text-xs font-heading font-bold uppercase tracking-wider">
                  {img.badge}
                </span>
              )}
              {img.caption && (
                <p className="absolute bottom-4 left-4 right-4 text-white font-heading font-semibold text-sm">
                  {img.caption}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
