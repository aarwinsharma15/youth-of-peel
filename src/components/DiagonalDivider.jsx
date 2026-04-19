import React from 'react';

// Replaced diagonal dividers with clean horizontal borders — fits the raw/bold aesthetic better
export default function DiagonalDivider({ color = 'parchment', flip = false }) {
  const colors = {
    parchment: '#F5F0E8',
    ink: '#0F0A07',
    crimson: '#C0271A',
    white: '#FFFFFF',
    // legacy aliases
    cream: '#F5F0E8',
    navy: '#0F0A07',
  };
  const bg = colors[color] || color;

  return (
    <div style={{ height: '2px', background: bg, opacity: 0.12 }} />
  );
}
