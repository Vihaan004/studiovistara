'use client';

import './styles/page.css';
import Stripes from './components/stripes'
import Poster from './components/poster'
import Gallery from './components/gallery'
import Home from './components/home';
import { useTransition } from './contexts/TransitionContext';
import { useEffect } from 'react';

export default function Page() {
  const { isTransitioning, setTransitioning } = useTransition();

  // Ensure transition state is reset when home page mounts
  useEffect(() => {
    setTransitioning(false);
  }, [setTransitioning]);

  return (
    <div className='wrapper'>
      <Poster isTransitioning={isTransitioning} />
      {/* <Stripes /> */}
      <Home isTransitioning={isTransitioning} />
    </div>
  );
}
