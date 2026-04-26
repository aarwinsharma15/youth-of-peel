import SEO from '../components/SEO';
import HeroSection from '../components/home/HeroSection';
import MissionSection from '../components/home/MissionSection';
import InActionSection from '../components/home/InActionSection';
import CTASection from '../components/home/CTASection';
import MetricsSection from '../components/MetricsSection';

export default function Home() {
  return (
    <div className="bg-parchment">
      <SEO 
        title="Home" 
        description="Youth of Peel Region (YPR) is a youth-led nonprofit organization dedicated to unifying young people across Brampton, Mississauga, and Caledon. We aim to close the opportunity gap through advocacy, community reform, placements, and mentorship. Join us in reshaping the Region of Peel." 
        url="/" 
      />
      <HeroSection />
      <MetricsSection />
      <InActionSection />
      <MissionSection />
      <CTASection />
    </div>
  );
}
