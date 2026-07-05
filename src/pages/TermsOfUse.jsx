import React from 'react';
import SectionReveal from '../components/SectionReveal';
import SEO from '../components/SEO';

const EFFECTIVE_DATE = 'July 5, 2026';

const SECTIONS = [
  {
    num: '01',
    title: 'Acceptance of Terms',
    content: [
      'By accessing or using the Youth of Peel website (youthofpeel.ca), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, you must discontinue use of the website immediately.',
      'These terms apply to all visitors, users, and others who access or interact with the website, including individuals who submit information through our contact forms, membership applications, or event registrations.',
    ],
  },
  {
    num: '02',
    title: 'Acceptable Use',
    content: [
      'You agree to use the Youth of Peel website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, this website by any third party. Specifically, you agree not to:',
    ],
    list: [
      'Use the website for any unlawful, fraudulent, or harmful purpose.',
      'Transmit or upload any material that is defamatory, offensive, obscene, or otherwise objectionable.',
      'Attempt to gain unauthorized access to any part of the website, its servers, or any connected systems.',
      'Introduce viruses, trojans, worms, or other malicious software or harmful data.',
      'Scrape, harvest, or collect personal information of other users without their consent.',
      'Impersonate any person or entity, or misrepresent your affiliation with any person or entity.',
      'Interfere with or disrupt the website or the servers and networks connected to it.',
    ],
    footer: 'Youth of Peel reserves the right to restrict or terminate access for any user who violates these terms.',
  },
  {
    num: '03',
    title: 'Intellectual Property',
    content: [
      'All content on the Youth of Peel website — including but not limited to text, graphics, logos, the "Youth of Peel" name and branding, images, audio, video, software, and design elements — is the property of Youth of Peel or its content suppliers and is protected by Canadian and international intellectual property laws.',
    ],
    list: [
      'You may not reproduce, distribute, modify, create derivative works from, publicly display, or otherwise exploit any content from this website without prior written permission from Youth of Peel.',
      'The Youth of Peel name, logo, and associated branding are trademarks of Youth of Peel. Unauthorized use of these marks is strictly prohibited.',
      'Limited use of content for personal, non-commercial purposes (such as sharing a link to our website) is permitted, provided that proper attribution is given.',
    ],
  },
  {
    num: '04',
    title: 'User-Generated Content',
    content: [
      'When you submit information through our website — including but not limited to contact form messages, membership applications, volunteer applications, and event registrations — you grant Youth of Peel a non-exclusive, royalty-free, perpetual licence to use, store, and process that information for the purposes described in our Privacy Policy.',
    ],
    list: [
      'You represent that any content you submit is accurate, does not violate any applicable law, and does not infringe the rights of any third party.',
      'Youth of Peel is not responsible for the content of any submissions and reserves the right to remove or decline to process any submission at its sole discretion.',
      'You retain ownership of any original content you submit, subject to the licence granted above.',
    ],
  },
  {
    num: '05',
    title: 'Disclaimer',
    content: [
      'The Youth of Peel website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, Youth of Peel disclaims all warranties, including but not limited to:',
    ],
    list: [
      'Implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      'Any warranty that the website will be uninterrupted, timely, secure, or error-free.',
      'Any warranty regarding the accuracy, reliability, or completeness of any content on the website.',
    ],
    footer: 'Youth of Peel does not warrant that any defects or errors on the website will be corrected. Your use of the website is at your sole risk.',
  },
  {
    num: '06',
    title: 'Limitation of Liability',
    content: [
      'To the maximum extent permitted by applicable law, Youth of Peel, its directors, officers, team members, volunteers, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to:',
    ],
    list: [
      'Your use of, or inability to use, the website.',
      'Any content obtained from or submitted through the website.',
      'Unauthorized access to or alteration of your data or transmissions.',
      'Any other matter relating to the website.',
    ],
    footer: 'This limitation of liability applies regardless of the legal theory on which the claim is based, including negligence, and even if Youth of Peel has been advised of the possibility of such damages.',
  },
  {
    num: '07',
    title: 'External Links',
    content: [
      'Our website may contain links to third-party websites or resources. These links are provided for your convenience only. Youth of Peel does not endorse and is not responsible for the content, accuracy, or practices of any third-party websites.',
      'Accessing third-party websites is at your own risk, and you should review the terms of use and privacy policies of those websites before using them.',
    ],
  },
  {
    num: '08',
    title: 'Modifications to Terms',
    content: [
      'Youth of Peel reserves the right to modify these Terms of Use at any time without prior notice. Changes will take effect immediately upon posting on this page. The "Effective Date" at the top of this page will be updated to reflect the date of the most recent revision.',
      'Your continued use of the website following the posting of revised terms constitutes your acceptance of those changes. We encourage you to review these terms periodically.',
    ],
  },
  {
    num: '09',
    title: 'Governing Law',
    content: [
      'These Terms of Use shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.',
      'Any disputes arising out of or in connection with these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts of the Province of Ontario, Canada.',
    ],
  },
  {
    num: '10',
    title: 'Contact',
    content: [
      'If you have any questions or concerns about these Terms of Use, please contact us:',
    ],
    contactInfo: true,
  },
];

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO
        title="Terms of Use"
        description="Review the Terms of Use for the Youth of Peel website. These terms govern your access to and use of youthofpeel.ca, including acceptable use, intellectual property, and governing law."
        url="/terms-of-use"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-ink overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Legal</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              TERMS OF USE
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              The terms and conditions governing your use of the Youth of Peel website.
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

      {/* Terms Sections */}
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
                          <span className="text-crimson font-heading font-bold text-xs uppercase tracking-widest">Web</span>
                          <a href="https://youthofpeel.ca" className={`font-body text-sm ${isDark ? 'text-white/70 hover:text-white' : 'text-ink/70 hover:text-ink'} transition-colors underline underline-offset-2`}>
                            youthofpeel.ca
                          </a>
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
              These Terms of Use were last updated on {EFFECTIVE_DATE}. For questions, contact{' '}
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
