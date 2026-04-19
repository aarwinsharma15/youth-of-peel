import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { Image, FolderOpen, FileText, Users, Briefcase, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { label: 'Site Images', path: '/admin/images', icon: Image, entity: 'SiteImage', color: 'from-blue-500/20 to-blue-600/10' },
  { label: 'Programs', path: '/admin/programs', icon: FolderOpen, entity: 'Program', color: 'from-purple-500/20 to-purple-600/10' },
  { label: 'Campaigns', path: '/admin/campaigns', icon: FileText, entity: 'Campaign', color: 'from-emerald-500/20 to-emerald-600/10' },
  { label: 'Team Members', path: '/admin/team', icon: Users, entity: 'TeamMember', color: 'from-orange-500/20 to-orange-600/10' },
  { label: 'Hiring', path: '/admin/hiring', icon: Briefcase, entity: 'HiringPosition', color: 'from-yellow-500/20 to-yellow-600/10' },
  { label: 'Messages', path: '/admin/messages', icon: MessageSquare, entity: 'ContactSubmission', color: 'from-kinetic/20 to-kinetic/10' },
];

function StatCard({ section }) {
  const { data } = useQuery({
    queryKey: ['count', section.entity],
    queryFn: async () => {
      const { data } = await supabase.from(section.entity.toLowerCase()).select('id').limit(200);
      return data || [];
    },
    initialData: [],
  });

  const Icon = section.icon;

  return (
    <Link to={section.path}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ duration: 0.2 }}
        className={`bg-gradient-to-br ${section.color} rounded-2xl p-6 border border-white/10 hover:border-kinetic/40 transition-all cursor-pointer group`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Icon size={18} className="text-white" />
          </div>
          <ArrowRight size={16} className="text-white/20 group-hover:text-kinetic group-hover:translate-x-1 transition-all" />
        </div>
        <div className="font-heading text-3xl font-bold text-white mb-1">{data.length}</div>
        <div className="text-white/50 text-sm font-body">{section.label}</div>
      </motion.div>
    </Link>
  );
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-heading text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/40 font-body text-sm">Welcome back. Here's an overview of your content.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {SECTIONS.map((s, i) => (
          <motion.div
            key={s.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <StatCard section={s} />
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h2 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-widest">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.path} to={s.path} className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group">
                <Icon size={15} className="text-kinetic" />
                <span className="text-white/70 group-hover:text-white text-sm font-body transition-colors">Manage {s.label}</span>
                <ArrowRight size={12} className="ml-auto text-white/20 group-hover:text-kinetic transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
