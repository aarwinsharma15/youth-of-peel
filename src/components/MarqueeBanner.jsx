import React from 'react';
import logoIcon from '../assets/logo-icon.png';

const items = [
  'JOIN TODAY',
  'BECOME A MEMBER',
  'LEAD THE CHANGE',
  'EMPOWER YOURSELF',
  'SHAPE YOUR FUTURE',
  'REGION OF PEEL',
];

const MarqueeSegment = () => (
  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        <span style={{
          color: 'white',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.12em',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          padding: '0 28px',
        }}>
          {item}
        </span>
        <img
          src={logoIcon}
          alt=""
          style={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0 }}
        />
      </React.Fragment>
    ))}
  </div>
);

export default function MarqueeBanner() {
  return (
    <>
      <style>{`
        @keyframes scroll-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div className="bg-kinetic overflow-hidden py-3 -rotate-1 scale-105 relative z-10">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: 'scroll-marquee 22s linear infinite',
        }}>
          {Array.from({ length: 8 }, (_, i) => <MarqueeSegment key={i} />)}
        </div>
      </div>
    </>
  );
}