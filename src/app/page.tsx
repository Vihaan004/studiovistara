'use client';

import './styles/page.css';
import Poster from './components/poster'
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
