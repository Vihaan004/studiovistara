'use client';

import './styles/page.css';
import Stripes from './components/stripes'
import Poster from './components/poster'
import Gallery from './components/gallery'
import Home from './components/home';
import { useTransition } from './contexts/TransitionContext';

export default function Page() {
  const { isTransitioning } = useTransition();

  return (
    <div className='wrapper'>
      <Poster isTransitioning={isTransitioning} />
      {/* <Stripes /> */}
      <Home isTransitioning={isTransitioning} />
    </div>
  );
}
