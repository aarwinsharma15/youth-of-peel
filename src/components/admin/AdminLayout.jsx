import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, X, Lock } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-crimson rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-4">
        <div className="text-center">
          <Lock size={32} className="text-crimson mx-auto mb-4" />
          <p className="text-white font-display text-3xl tracking-wide mb-2">ACCESS DENIED</p>
          <p className="text-white/30 font-body text-sm mb-6">You must enter your credentials first.</p>
          <a href="/admin-login" className="px-6 py-3 bg-crimson text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-ember transition-colors">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080e20] flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/10 bg-navy">
          <span className="font-heading text-white font-bold">YPR Admin</span>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/60 hover:text-white p-1">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
