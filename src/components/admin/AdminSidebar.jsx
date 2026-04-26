import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Image, FolderOpen, Briefcase, Users, FileText, MessageSquare, LogOut, Play } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Site Images', path: '/admin/images', icon: Image },
  { label: 'Programs', path: '/admin/programs', icon: FolderOpen },
  { label: 'Campaigns', path: '/admin/campaigns', icon: FileText },
  { label: 'Team Members', path: '/admin/team', icon: Users },
  { label: 'Hiring', path: '/admin/hiring', icon: Briefcase },
  { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { label: 'Testimonials', path: '/admin/testimonials', icon: Play },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="font-heading text-white font-bold text-lg">YPR Admin</Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-kinetic/20 text-kinetic'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-colors w-full"
        >
          <LogOut size={18} />
          Logout
        </button>
        <Link
          to="/"
          className="block text-center mt-2 text-white/30 text-xs hover:text-white/50 transition-colors"
        >
          ← Back to Website
        </Link>
      </div>
    </aside>
  );
}
