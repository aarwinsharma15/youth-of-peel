import React from 'react';
import HeroSection from '../components/home/HeroSection';
import MissionSection from '../components/home/MissionSection';
import InActionSection from '../components/home/InActionSection';
import CTASection from '../components/home/CTASection';
import MetricsSection from '../components/MetricsSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MetricsSection />
      <InActionSection />
      <MissionSection />
      <CTASection />
    </div>
  );
}
