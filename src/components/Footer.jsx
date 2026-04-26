import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/youthofpeelregion/',
    label: 'Instagram',
    icon: <Instagram size={20} />,
  },
  {
    href: 'https://www.linkedin.com/company/youthofpeel/',
    label: 'LinkedIn',
    icon: <Linkedin size={20} />,
  },
  {
    href: 'https://www.tiktok.com/@youthofpeel',
    label: 'TikTok',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.19 8.19 0 004.79 1.53V6.84a4.85 4.85 0 01-1.02-.15z" />
      </svg>
    ),
  },
  {
    href: 'https://x.com/YouthofPeel',
    label: 'X (Twitter)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: 'mailto:info.peelyouth@gmail.com',
    label: 'Email',
    icon: <Mail size={20} />,
  },
];

import logoFull from '../assets/logo-full.png';

const FOOTER_NAV = [
  { label: 'Programs', path: '/programs' },
  { label: 'Membership', path: '/membership' },
  { label: 'Our Work', path: '/our-work' },
  { label: 'Hiring', path: '/hiring' },
  { label: 'Sponsorship', path: '/sponsorship' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img 
              src={logoFull} 
              alt="Youth of Peel Region" 
              className="h-16 w-auto mb-6 opacity-90 hover:opacity-100 transition-opacity"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              A youth-led nonprofit organization dedicated to unifying young people across the Region of Peel.
            </p>
            <div className="flex gap-4 mt-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={s.label}
                  className="text-white/60 hover:text-kinetic transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">Navigation</h3>
            <ul className="space-y-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm text-white/70">
              <a href="mailto:info.peelyouth@gmail.com" className="hover:text-white transition-colors">info.peelyouth@gmail.com</a>
              <p>Region of Peel, Ontario</p>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdVgO7owVS8wreW0hUycVucNB8WpM2WEDb6Lk6Q78Hc24EGLw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-3 bg-kinetic text-white text-sm font-semibold rounded-full hover:bg-kinetic/90 transition-colors"
            >
              Become a Member
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Youth of Peel Region. All rights reserved.
          </p>
          <Link
            to="/admin"
            className="text-white/20 text-xs font-mono hover:text-white/40 transition-colors"
          >
            [SYS_LOGIN]
          </Link>
        </div>
      </div>
    </footer>
  );
}
