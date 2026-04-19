import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail } from 'lucide-react';

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
            <h2 className="font-heading text-3xl font-bold tracking-tight mb-4">
              YOUTH<br />OF PEEL
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              A youth-led nonprofit organization dedicated to unifying young people across the Region of Peel.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-kinetic transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-kinetic transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:info.youthofpeel@gmail.com" className="text-white/60 hover:text-kinetic transition-colors">
                <Mail size={20} />
              </a>
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
              <p>info.youthofpeel@gmail.com</p>
              <p>Region of Peel, Ontario</p>
            </div>
            <Link
              to="/membership"
              className="inline-block mt-6 px-6 py-3 bg-kinetic text-white text-sm font-semibold rounded-full hover:bg-kinetic/90 transition-colors"
            >
              Become a Member
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Youth of Peel. All rights reserved.
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
