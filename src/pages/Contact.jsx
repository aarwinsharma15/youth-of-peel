// @ts-nocheck
import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SectionReveal from '../components/SectionReveal';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from('contactsubmission').insert(form);
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-parchment">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Youth of Peel Region (YPR). Whether you have questions, want to partner, or just want to connect, our team is here to listen. Reach out from Brampton, Mississauga, or Caledon." 
        url="/contact" 
      />
      {/* Hero */}
      <section className="bg-ink pt-32 pb-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Reach Out</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              CONTACT US
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Whether you have a question, want to partner, or just want to connect — we'd love to hear from you.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <SectionReveal>
              <div className="space-y-8">
                <div>
                  <div className="w-12 h-1 bg-crimson mb-6" />
                  <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ink leading-none tracking-wide mb-4">LET'S CONNECT.</h2>
                  <p className="text-ink/50 font-body text-base leading-relaxed">
                    We respond to all inquiries within 3–5 business days. For urgent matters, reach us directly at our email below.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-crimson flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-ink text-sm mb-0.5">Email</p>
                      <a href="mailto:info.youthofpeel@gmail.com" className="text-ink/50 font-body text-sm hover:text-crimson transition-colors">
                        info.youthofpeel@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-crimson flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-ink text-sm mb-0.5">Location</p>
                      <p className="text-ink/50 font-body text-sm">Region of Peel, Ontario, Canada</p>
                    </div>
                  </div>
                </div>
                <div className="border-l-2 border-crimson pl-6 py-2">
                  <h3 className="font-heading font-bold text-ink text-sm mb-1">Want to join?</h3>
                  <p className="text-ink/40 font-body text-xs mb-4">Applications for membership are open. Fill out a quick form and we'll be in touch.</p>
                  <a href="https://forms.gle/yourformlink" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2.5 bg-crimson text-white text-xs font-heading font-bold uppercase tracking-wider hover:bg-ember transition-colors">
                    Apply for Membership
                  </a>
                </div>
              </div>
            </SectionReveal>

            {/* Form */}
            <SectionReveal delay={0.15}>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-10 border-l-4 border-crimson text-center"
                  >
                    <CheckCircle size={44} className="text-crimson mx-auto mb-4" />
                    <h3 className="font-display text-3xl text-ink tracking-wide mb-2">MESSAGE RECEIVED</h3>
                    <p className="text-ink/40 font-body text-sm mb-6">Thank you for reaching out. We'll get back to you within 3–5 business days.</p>
                    <button onClick={() => setSent(false)} className="text-crimson font-heading font-bold text-sm uppercase tracking-wider hover:text-ember transition-colors">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-8 border-l-4 border-crimson space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-ink/40 text-xs font-heading font-bold uppercase tracking-wider block mb-1.5">Name *</label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="border-ink/10 focus:border-crimson rounded-none" placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="text-ink/40 text-xs font-heading font-bold uppercase tracking-wider block mb-1.5">Email *</label>
                        <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="border-ink/10 focus:border-crimson rounded-none" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-ink/40 text-xs font-heading font-bold uppercase tracking-wider block mb-1.5">Subject</label>
                      <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="border-ink/10 focus:border-crimson rounded-none" placeholder="What's this about?" />
                    </div>
                    <div>
                      <label className="text-ink/40 text-xs font-heading font-bold uppercase tracking-wider block mb-1.5">Message *</label>
                      <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="border-ink/10 focus:border-crimson resize-none rounded-none" placeholder="Tell us what's on your mind..." />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-crimson hover:bg-ember text-white font-heading font-bold text-sm uppercase tracking-widest py-3 rounded-none h-auto transition-colors">
                      {loading ? (
                        <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                      ) : (
                        <span className="flex items-center gap-2"><Send size={15} /> Send Message</span>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
