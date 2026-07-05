import React from 'react';
import SectionReveal from '../components/SectionReveal';
import SEO from '../components/SEO';

const EFFECTIVE_DATE = 'July 5, 2026';

const SECTIONS = [
  {
    num: '01',
    title: 'Information We Collect',
    content: [
      'Youth of Peel collects personal information only when you voluntarily provide it through our website. This includes:',
    ],
    list: [
      'Contact form submissions — your name, email address, and the content of your message, stored securely via Supabase.',
      'Membership and volunteer applications — name, email, phone number, and any additional information you choose to provide.',
      'Event registration details — name, email, and any accommodations or dietary requirements you disclose.',
    ],
    footer: 'We do not collect personal information passively, and we do not purchase or acquire personal data from third parties.',
  },
  {
    num: '02',
    title: 'How We Use Your Information',
    content: [
      'We use the personal information you provide solely for the following purposes:',
    ],
    list: [
      'To respond to your inquiries submitted through our contact form.',
      'To process membership, volunteer, and event registration requests.',
      'To communicate updates about programs, events, and initiatives you have expressed interest in.',
      'To improve the functionality and content of our website.',
    ],
    footer: 'We will never sell, rent, or trade your personal information to third parties for marketing purposes.',
  },
  {
    num: '03',
    title: 'Cookies & Tracking',
    content: [
      'Youth of Peel uses only essential cookies required for the basic functionality of our website. We do not use advertising cookies, analytics tracking pixels, or social media tracking cookies.',
    ],
    list: [
      'Essential cookies — required for site navigation and security. These cannot be disabled.',
      'No third-party advertising or remarketing cookies are used.',
      'No cross-site tracking technologies are employed.',
    ],
    footer: 'You can configure your browser to block cookies, though this may affect certain website features.',
  },
  {
    num: '04',
    title: 'Third-Party Services',
    content: [
      'Our website relies on a limited number of third-party services to operate:',
    ],
    list: [
      'Supabase — used to securely store contact form submissions and application data. Supabase processes data in accordance with its own privacy policy and employs encryption at rest and in transit.',
      'Vercel — used to host and deliver our website. Vercel may collect minimal server logs (IP addresses, request timestamps) as part of standard web hosting operations.',
    ],
    footer: 'We carefully select third-party providers that maintain robust data protection practices. We encourage you to review their respective privacy policies.',
  },
  {
    num: '05',
    title: 'Data Retention',
    content: [
      'We retain personal information only for as long as necessary to fulfill the purposes for which it was collected:',
    ],
    list: [
      'Contact form submissions are retained for up to 24 months and then permanently deleted.',
      'Membership and volunteer records are retained for the duration of your involvement with Youth of Peel, plus 12 months after your last activity.',
      'You may request deletion of your data at any time by contacting us (see Section 07).',
    ],
  },
  {
    num: '06',
    title: 'Your Rights Under PIPEDA',
    content: [
      'As a Canadian organization, Youth of Peel operates in compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA). Under PIPEDA, you have the following rights:',
    ],
    list: [
      'Access — You have the right to request access to the personal information we hold about you.',
      'Correction — You may request corrections to any inaccurate or incomplete personal information.',
      'Withdrawal of Consent — You may withdraw your consent for us to use your personal information at any time, subject to legal or contractual restrictions.',
      'Deletion — You may request the deletion of your personal information from our systems.',
      'Complaint — If you believe your privacy rights have been violated, you have the right to file a complaint with the Office of the Privacy Commissioner of Canada.',
    ],
    footer: 'We will respond to all access and correction requests within 30 days.',
  },
  {
    num: '07',
    title: 'Contact Us About Privacy',
    content: [
      'If you have questions, concerns, or requests related to this Privacy Policy or your personal information, please contact us:',
    ],
    contactInfo: true,
  },
  {
    num: '08',
    title: 'Changes to This Policy',
    content: [
      'Youth of Peel reserves the right to update this Privacy Policy at any time. When we make material changes, we will update the "Effective Date" at the top of this page and, where appropriate, notify you via email or a prominent notice on our website.',
      'Your continued use of our website following the posting of changes constitutes your acceptance of those changes.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO
        title="Privacy Policy"
        description="Learn how Youth of Peel collects, uses, and protects your personal information. Our privacy practices comply with PIPEDA and Canadian privacy law."
        url="/privacy-policy"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-ink overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Legal</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              PRIVACY POLICY
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Your privacy matters to us. This policy explains how Youth of Peel collects, uses, and safeguards your personal information.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Effective Date Bar */}
      <section className="bg-ink border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-4 flex items-center gap-3">
          <div className="w-2 h-2 bg-crimson rounded-full" />
          <p className="font-body text-white/40 text-sm">Effective Date: <span className="text-white/70 font-heading font-bold">{EFFECTIVE_DATE}</span></p>
        </div>
      </section>

      {/* Policy Sections */}
      {SECTIONS.map((section, idx) => {
        const isDark = idx % 2 === 1;
        return (
          <section key={section.num} className={`py-16 md:py-20 ${isDark ? 'bg-ink' : 'bg-parchment'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
              <SectionReveal>
                <div className={`${isDark ? 'border-white/10' : 'border-ink/10'} border-l-2 border-l-crimson pl-6 md:pl-10`}>
                  {/* Section Number + Title */}
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className={`font-display text-5xl ${isDark ? 'text-crimson/30' : 'text-crimson/20'}`}>{section.num}</span>
                    <h2 className={`font-display text-2xl md:text-3xl tracking-wide ${isDark ? 'text-white' : 'text-ink'}`}>
                      {section.title.toUpperCase()}
                    </h2>
                  </div>

                  {/* Content Paragraphs */}
                  {section.content.map((para, i) => (
                    <p key={i} className={`font-body text-base leading-relaxed mb-4 ${isDark ? 'text-white/60' : 'text-ink/60'}`}>
                      {para}
                    </p>
                  ))}

                  {/* List Items */}
                  {section.list && (
                    <ul className="space-y-3 my-6">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-crimson mt-1.5 shrink-0">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><rect width="8" height="8" /></svg>
                          </span>
                          <span className={`font-body text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-ink/50'}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Footer */}
                  {section.footer && (
                    <p className={`font-body text-sm leading-relaxed mt-4 ${isDark ? 'text-white/40 border-t border-white/10' : 'text-ink/40 border-t border-ink/10'} pt-4`}>
                      {section.footer}
                    </p>
                  )}

                  {/* Contact Info */}
                  {section.contactInfo && (
                    <div className={`mt-6 p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-ink/5 border border-ink/10'}`}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-crimson font-heading font-bold text-xs uppercase tracking-widest">Email</span>
                          <a href="mailto:youthofpeel@youthofpeel.ca" className={`font-body text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-ink/70 hover:text-ink'} transition-colors underline underline-offset-2`}>
                            youthofpeel@youthofpeel.ca
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-crimson font-heading font-bold text-xs uppercase tracking-widest">Phone</span>
                          <a href="tel:289-536-1250" className={`font-body text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-ink/70 hover:text-ink'} transition-colors underline underline-offset-2`}>
                            289-536-1250
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-crimson font-heading font-bold text-xs uppercase tracking-widest">Mail</span>
                          <span className={`font-body text-sm ${isDark ? 'text-white/60' : 'text-ink/60'}`}>
                            Youth of Peel — Region of Peel, Ontario, Canada
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SectionReveal>
            </div>
          </section>
        );
      })}

      {/* Bottom Bar */}
      <section className="bg-crimson py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <SectionReveal>
            <p className="font-body text-white/80 text-sm leading-relaxed">
              This Privacy Policy was last updated on {EFFECTIVE_DATE}. If you have any questions, please reach out to us at{' '}
              <a href="mailto:youthofpeel@youthofpeel.ca" className="text-white font-heading font-bold underline underline-offset-2 hover:text-white/80 transition-colors">
                youthofpeel@youthofpeel.ca
              </a>.
            </p>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
