'use client';

import React from 'react';
import '../styles/stripes.css';

interface StripesProps {
  stripeCount?: number;
  stripeWidth?: number;
  children?: React.ReactNode;
}

export default function Stripes({ 
  stripeCount = 6, 
  stripeWidth = 240,
  children
}: StripesProps) {
  // Generate array of stripe elements
  const stripes = Array.from({ length: stripeCount }, (_, index) => (
    <div
      key={index}
      className="stripe"
      style={{
        width: `${stripeWidth}px`,
        minWidth: `${stripeWidth}px`,
        maxWidth: `${stripeWidth}px`,
      }}
    />
  ));

  return (
    <>
      {/* Fixed background stripes */}
      <div className="stripes-background">
        {stripes}
      </div>
      
      {/* Content */}
      <div className="stripes-content">
        {children}
      </div>
    </>
  );
}
