'use client';

import '../styles/poster.css';
import { useState, useEffect } from 'react';
import { useTransition } from '../contexts/TransitionContext';
import { usePathname } from 'next/navigation';
import { getAssetPath } from '../utils/paths';

interface PosterProps {
  isTransitioning?: boolean;
}

export default function Poster({ isTransitioning = false }: PosterProps) {
  const [shouldTransition, setShouldTransition] = useState(false);
  const { navigateWithTransition } = useTransition();
  const pathname = usePathname();
  
  // Check if we're on the home page
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (isTransitioning) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShouldTransition(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShouldTransition(false);
    }
  }, [isTransitioning]);

  useEffect(() => {
    // Reset transition state when navigating to home page via browser back/forward
    if (isHomePage) {
      setShouldTransition(false);
    }
  }, [pathname, isHomePage]);

  // If not on home page, show in shrunk state immediately
  // If on home page, only show shrunk if transitioning
  const shouldShowShrunk = !isHomePage || shouldTransition;

  const handleNavigation = (path: string) => {
    // Don't trigger transition if we're already on the target page
    if (pathname === path) return;
    
    // If we're on home page, use transition; otherwise navigate directly
    if (isHomePage) {
      navigateWithTransition(path);
    } else {
      // Direct navigation for non-home pages
      window.location.href = path;
    }
  };

  return (
    <div className={`poster-main ${shouldShowShrunk ? 'transitioning' : ''}`}>
        <div 
          className={`poster-container poster-bg ${shouldShowShrunk ? 'shrunk' : ''}`}
          style={{
            backgroundImage: `url('${getAssetPath('/images/titlecard.jpeg')}')`
          }}
        >
        {/* <video className="background-video" autoPlay muted loop playsInline>
            <source src="/videos/Poster-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video> */}
        
        <div className={`title ${shouldShowShrunk ? 'shrunk' : ''}`} onClick={() => handleNavigation('/')}>
            studiovistara
        </div>
        {/* <div className='subtitle'>
            <div>
                <p>TEJAS PATEL</p>
                <p>MONA PATEL</p>
            </div>
        </div> */}
        <div className={`about ${shouldShowShrunk ? 'hidden' : ''}`}>
            ABOUT US
        </div>
        <div className={`info ${shouldShowShrunk ? 'compact' : ''}`}>
            {/* <p>SITE & CONTEXT EVALUATION • SPACE PROGRAMMING • DESIGN DEVELOPMENT • WORKING DRAWINGS & SPECIFICATIONS • DIGITAL 3D MODELING & SIMULATIONS • LANDSCAPE DESIGN • PROCESS ASSESSMENT • WORK SCHEDULING • COST ESTIMATION • PROJECT DELIVERY & COORDINATION • CONSTRUCTION • SITE SUPERVISION • DRAWINGS & SPECIFICATIONS • SERVICE STRUCTURE & MAINTENANCE GUIDELINES</p> */}
            {/* <p>SB-20, 'PRODUCTIVITY HOUSE' PRODUCTIVITY ROAD, ALKAPURI, BARODA 390007</p>
            <p>+91 0265 2359293 • +91 972979136</p>
            <p>info@studiovistara.com</p> */}
            <div className={`architecture ${shouldShowShrunk ? 'hidden' : ''}`}>ARCHITECTURE</div>
            <div className={`tags ${shouldShowShrunk ? 'hidden' : ''}`}>
                <p>BUILDING</p>
                <p>INTERIOR</p>
                <p>LANDSCAPE</p>
            </div>
            <div className="social-links">
                <a href="https://www.facebook.com/people/Studiovistara/100054393212997/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                </a>
                <a href="https://www.instagram.com/studiovistara" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.584.012 4.849.07 1.17.054 1.805.249 2.227.413.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.058 1.265.07 1.649.07 4.849s-.012 3.584-.07 4.849c-.054 1.17-.249 1.805-.413 2.227-.217.56-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.265.058-1.649.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.054-1.805-.249-2.227-.413-.56-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227C2.172 15.584 2.16 15.2 2.16 12s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.227.217-.56.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.416 2.172 8.8 2.16 12 2.16M12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.903.333 4.14.63c-.789.306-1.459.717-2.126 1.384C1.347 2.681.936 3.35.63 4.14.333 4.903.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.149.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.149-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.764.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C19.481 1.347 18.812.936 18.021.63 17.257.333 16.385.131 15.108.072 13.828.014 13.419 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                </a>
                <a href="https://maps.app.goo.gl/FtcVmdCYBzroByg49" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/tejas-patel-a9245310/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"></svg>
                </a>
            </div>
        </div>
    </div>
    
    <div className='navbar'>
        <p onClick={() => handleNavigation('/team')}>TEAM</p>
        <p onClick={() => handleNavigation('/projects')}>PROJECTS</p>
        <p onClick={() => handleNavigation('/blog')}>BLOG</p>
        <p onClick={() => handleNavigation('/testimonials')}>TESTIMONIALS</p>
        <p onClick={() => handleNavigation('/contact')}>CONTACT</p>
    </div>
    </div>
  );
}
