import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Public pages
import Home from './pages/Home';
import Programs from './pages/Programs';
import Membership from './pages/Membership';
import OurWork from './pages/OurWork';
import Hiring from './pages/Hiring';
import Sponsorship from './pages/Sponsorship';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';

// Admin pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminImages from './pages/admin/AdminImages';
import AdminPrograms from './pages/admin/AdminPrograms';
import AdminCampaigns from './pages/admin/AdminCampaigns';
import AdminTeam from './pages/admin/AdminTeam';
import AdminHiring from './pages/admin/AdminHiring';
import AdminMessages from './pages/admin/AdminMessages';
import AdminTestimonials from './pages/admin/AdminTestimonials';

// Layout
import PublicLayout from './components/PublicLayout';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-navy">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-white/10 border-t-kinetic rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/30 font-heading text-xs tracking-widest">LOADING</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/hiring" element={<Hiring />} />
        <Route path="/sponsorship" element={<Sponsorship />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin login redirect */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin panel */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="images" element={<AdminImages />} />
        <Route path="programs" element={<AdminPrograms />} />
        <Route path="campaigns" element={<AdminCampaigns />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="hiring" element={<AdminHiring />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
