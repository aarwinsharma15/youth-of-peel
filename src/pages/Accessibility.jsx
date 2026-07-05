import React from 'react';
import SectionReveal from '../components/SectionReveal';
import SEO from '../components/SEO';

const COMMITMENTS = [
  {
    num: '01',
    title: 'WCAG 2.1 AA Compliance',
    desc: 'We strive to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards across all pages of our website, ensuring an inclusive digital experience for everyone.',
  },
  {
    num: '02',
    title: 'Keyboard Navigation',
    desc: 'Our website is designed to be fully navigable using a keyboard alone. All interactive elements — links, buttons, forms, and menus — can be accessed and operated without a mouse.',
  },
  {
    num: '03',
    title: 'Screen Reader Support',
    desc: 'We use semantic HTML, ARIA landmarks, descriptive alt text for images, and logical heading structures to ensure compatibility with assistive technologies such as screen readers.',
  },
  {
    num: '04',
    title: 'Text Alternatives',
    desc: 'All non-text content on our site, including images and icons, is accompanied by descriptive text alternatives so that information is accessible regardless of how you experience our content.',
  },
  {
    num: '05',
    title: 'Color Contrast',
    desc: 'We maintain sufficient color contrast ratios throughout our design to ensure text and interactive elements are readable for users with low vision or color vision deficiencies.',
  },
  {
    num: '06',
    title: 'Responsive Design',
    desc: 'Our site is built to work across devices and screen sizes. Content reflows without loss of information, and users can zoom up to 200% without horizontal scrolling.',
  },
];

const ACCOMMODATION_STEPS = [
  {
    step: 'Reach Out',
    desc: 'Contact us by email or phone with details of the accommodation you need. We recommend reaching out at least two weeks before an event to ensure we can make arrangements.',
  },
  {
    step: 'We Collaborate',
    desc: 'A member of our team will follow up with you within 2 business days to discuss your needs and confirm the accommodations we can provide.',
  },
  {
    step: 'We Deliver',
    desc: 'We will implement the agreed-upon accommodations and confirm everything is in place before the event or program begins.',
  },
];

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-parchment">
      <SEO
        title="Accessibility & Accommodations"
        description="Youth of Peel is committed to digital accessibility and providing accommodations for all events and programs. Learn about our WCAG 2.1 AA commitment and how to request accommodations."
        url="/accessibility"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-ink overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-crimson" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative">
          <SectionReveal>
            <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Inclusion</p>
            <h1 className="font-display text-[clamp(3rem,10vw,8rem)] text-white leading-none tracking-wide mb-6">
              ACCESSIBILITY
            </h1>
            <p className="text-white/50 font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Everyone deserves equal access. We are committed to making our digital presence and in-person programs accessible to all.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Our Commitment Statement */}
      <section className="py-16 md:py-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <div className="border-l-2 border-crimson pl-6 md:pl-10">
              <div className="w-12 h-1 bg-crimson mb-6" />
              <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Our Commitment</p>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-ink leading-none tracking-wide mb-6">
                ACCESSIBLE BY DESIGN.
              </h2>
              <div className="space-y-4 text-ink/60 font-body text-base leading-relaxed">
                <p>
                  Youth of Peel believes that accessibility is not an afterthought — it is a fundamental part of how we serve our community. We are committed to ensuring that our website, events, and programs are inclusive and accessible to all individuals, including those with disabilities.
                </p>
                <p>
                  We align our digital accessibility practices with the <span className="text-ink font-heading font-bold">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</span> and are guided by the principles of the <span className="text-ink font-heading font-bold">Accessibility for Ontarians with Disabilities Act (AODA)</span>.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Digital Accessibility Standards */}
      <section className="bg-ink py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-white leading-none tracking-wide text-center mb-4">
              DIGITAL ACCESSIBILITY
            </h2>
            <p className="text-white/40 font-body text-sm text-center max-w-2xl mx-auto mb-16">
              How we ensure our website is accessible to everyone.
            </p>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {COMMITMENTS.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.07}>
                <div className="bg-ink p-8 md:p-10 hover:bg-white/[0.03] transition-colors border-l-2 border-crimson group h-full">
                  <div className="font-display text-5xl text-crimson/20 mb-4 group-hover:text-crimson/40 transition-colors">{item.num}</div>
                  <h3 className="font-heading font-bold text-white text-lg mb-3">{item.title}</h3>
                  <p className="text-white/40 font-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Request Accommodations */}
      <section className="py-20 md:py-28 bg-parchment">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <div className="text-center mb-16">
              <div className="w-12 h-1 bg-crimson mx-auto mb-6" />
              <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Events & Programs</p>
              <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] text-ink leading-none tracking-wide mb-4">
                REQUEST ACCOMMODATIONS
              </h2>
              <p className="text-ink/50 font-body text-base max-w-2xl mx-auto leading-relaxed">
                We want every participant to be able to fully engage with our events and programs. If you require accommodations, we are here to help.
              </p>
            </div>
          </SectionReveal>

          {/* Accommodation Types */}
          <SectionReveal delay={0.1}>
            <div className="bg-ink/5 border border-ink/10 p-8 md:p-10 mb-12">
              <h3 className="font-heading font-bold text-ink text-lg mb-6 uppercase tracking-widest text-sm">Accommodations We Provide</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Sign language interpretation',
                  'Captioning and transcription services',
                  'Wheelchair-accessible venues',
                  'Materials in alternative formats (large print, digital)',
                  'Dietary accommodations at events',
                  'Quiet or sensory-friendly spaces',
                  'Virtual or hybrid attendance options',
                  'Other accommodations upon request',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-crimson mt-1 shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><rect width="8" height="8" /></svg>
                    </span>
                    <span className="font-body text-ink/60 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACCOMMODATION_STEPS.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-crimson flex items-center justify-center text-white font-display text-lg shrink-0">
                      {i + 1}
                    </div>
                    <h3 className="font-heading font-bold text-ink text-lg">{item.step}</h3>
                  </div>
                  <p className="text-ink/50 font-body text-sm leading-relaxed pl-14">{item.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Accessibility */}
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <div className="border-l-2 border-crimson pl-6 md:pl-10">
              <p className="font-heading font-bold text-ember text-xs uppercase tracking-[0.3em] mb-4">Get In Touch</p>
              <h2 className="font-display text-2xl md:text-3xl text-white tracking-wide mb-6">
                ACCESSIBILITY CONTACTS
              </h2>
              <p className="text-white/50 font-body text-base leading-relaxed mb-8">
                If you encounter an accessibility barrier on our website, need accommodations for an event or program, or have suggestions for how we can improve, please do not hesitate to contact us. We welcome your feedback.
              </p>

              <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-crimson font-heading font-bold text-xs uppercase tracking-widest w-16 shrink-0">Email</span>
                    <a href="mailto:youthofpeel@youthofpeel.ca" className="font-body text-sm text-white/70 hover:text-white transition-colors underline underline-offset-2">
                      youthofpeel@youthofpeel.ca
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-crimson font-heading font-bold text-xs uppercase tracking-widest w-16 shrink-0">Phone</span>
                    <a href="tel:289-536-1250" className="font-body text-sm text-white/70 hover:text-white transition-colors underline underline-offset-2">
                      289-536-1250
                    </a>
                  </div>
                </div>
                <div className="border-t border-white/10 mt-6 pt-4">
                  <p className="text-white/30 font-body text-xs leading-relaxed">
                    We aim to respond to all accessibility-related inquiries within 2 business days. For urgent accommodation requests related to an upcoming event, please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Continuous Improvement */}
      <section className="py-16 md:py-20 bg-parchment">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-16">
          <SectionReveal>
            <div className="border-l-2 border-crimson pl-6 md:pl-10">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-5xl text-crimson/20">∞</span>
                <h2 className="font-display text-2xl md:text-3xl text-ink tracking-wide">
                  CONTINUOUS IMPROVEMENT
                </h2>
              </div>
              <div className="space-y-4 text-ink/60 font-body text-base leading-relaxed">
                <p>
                  Accessibility is an ongoing effort. We regularly review and test our website and programs to identify and address barriers. We are committed to evolving our practices as standards and technologies advance.
                </p>
                <p>
                  Your feedback is essential to this process. If you experience any difficulty accessing our content or participating in our programs, please let us know so we can work to resolve it.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="bg-crimson py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] text-white leading-none tracking-wide mb-4">
              EVERYONE BELONGS HERE.
            </h2>
            <p className="font-body text-white/70 text-sm leading-relaxed">
              Youth of Peel is dedicated to building a community where every young person in the Region of Peel can participate, contribute, and thrive — without barriers.
            </p>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
