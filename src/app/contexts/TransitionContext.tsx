'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface TransitionContextType {
  isTransitioning: boolean;
  navigateWithTransition: (path: string) => void;
  setTransitioning: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Reset transition state when navigating to home page
  useEffect(() => {
    if (pathname === '/') {
      // Force reset with a small delay to ensure it takes effect
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/') {
        setIsTransitioning(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Also reset on component mount if we're on home page
  useEffect(() => {
    if (pathname === '/') {
      setIsTransitioning(false);
    }
  }, []); // Run only on mount

  const navigateWithTransition = (path: string) => {
    setIsTransitioning(true);
    
    // Wait for transition to complete, then navigate
    setTimeout(() => {
      router.push(path);
    }, 800); // Match the CSS transition duration
  };

  const setTransitioning = (value: boolean) => {
    setIsTransitioning(value);
  };

  return (
    <TransitionContext.Provider value={{ 
      isTransitioning, 
      navigateWithTransition, 
      setTransitioning 
    }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within TransitionProvider');
  }
  return context;
}
