import React from 'react';

export default function MarqueeBanner() {
  const items = [
    '✦ JOIN TODAY',
    '✦ BECOME A MEMBER',
    '✦ LEAD THE CHANGE',
    '✦ EMPOWER YOUTH',
    '✦ SHAPE YOUR FUTURE',
    '🇨🇦 REGION OF PEEL',
  ];
  const text = items.join('   ');
 
  return (
    <div className="bg-kinetic overflow-hidden py-3 -rotate-1 scale-105 relative z-10">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-white font-heading font-bold text-sm tracking-widest mx-4">{text}</span>
        <span className="text-white font-heading font-bold text-sm tracking-widest mx-4">{text}</span>
        <span className="text-white font-heading font-bold text-sm tracking-widest mx-4">{text}</span>
        <span className="text-white font-heading font-bold text-sm tracking-widest mx-4">{text}</span>
      </div>
    </div>
  );
}
