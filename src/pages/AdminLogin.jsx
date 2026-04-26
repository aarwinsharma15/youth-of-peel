import React, { useState, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import SEO from '../components/SEO';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        window.location.href = '/admin';
      } else {
        setChecking(false);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChecking(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setChecking(false);
    } else {
      window.location.href = '/admin';
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-white/10 border-t-crimson rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/30 font-heading text-xs tracking-widest uppercase">Authenticating</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <SEO title="Admin Login" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-crimson flex items-center justify-center">
            <span className="font-display text-white text-[10px] tracking-wider">YPR</span>
          </div>
          <span className="font-display text-white tracking-widest text-lg">YOUTH OF PEEL REGION</span>
        </div>

        <h1 className="font-display text-5xl text-white tracking-wide mb-1">ADMIN</h1>
        <p className="text-white/30 font-body text-sm mb-10">Enter your credentials to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Mail size={15} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Email"
              autoFocus
              className="w-full bg-white/5 border border-white/10 text-white font-body pl-10 pr-4 py-4 focus:outline-none focus:border-crimson transition-colors placeholder:text-white/20"
            />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
              <Lock size={15} />
            </div>
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              className="w-full bg-white/5 border border-white/10 text-white font-body pl-10 pr-12 py-4 focus:outline-none focus:border-crimson transition-colors placeholder:text-white/20"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {error && (
            <p className="text-crimson font-body text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-crimson text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-ember transition-colors"
          >
            Enter Admin
          </button>
        </form>

        <div className="mt-8 border-t border-white/5 pt-6">
          <a href="/" className="text-white/20 font-body text-xs hover:text-white/40 transition-colors">
            ← Back to site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
