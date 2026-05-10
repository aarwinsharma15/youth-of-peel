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
        description="Youth of Peel is a youth-led organization empowering young people across Brampton, Mississauga, and Caledon through advocacy, mentorship, and community action in the Peel Region." 
        keywords="Youth of Peel, youth organization Peel Region, youth programs Brampton, youth services Mississauga, youth organization Caledon, youth advocacy Ontario, volunteer hours Peel"
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
