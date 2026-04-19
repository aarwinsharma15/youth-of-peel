import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import SectionReveal from './SectionReveal';

function AnimatedNumber({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const METRICS = [
  { value: 200000, suffix: '+', label: 'Youth reached through impressions' },
  { value: 100, suffix: '+', label: 'Youth actively engaged' },
  { value: 20, suffix: '', label: 'Staff members' },
  { value: 1, suffix: '', label: "Peel's largest youth-led civic org", prefix: '#' },
];

export default function MetricsSection() {
  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {METRICS.map((metric, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-kinetic mb-2">
                  {metric.prefix || ''}
                  <AnimatedNumber target={metric.value} suffix={metric.suffix} />
                </div>
                <p className="text-white/60 text-sm md:text-base font-body">{metric.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
