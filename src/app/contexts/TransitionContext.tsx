'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isHomePage as isHomePageUtil } from '../utils/paths';

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
    if (isHomePageUtil(pathname)) {
      setIsTransitioning(false);
    }
  }, [pathname]);

  const navigateWithTransition = (path: string) => {
    setIsTransitioning(true);
    
    // Wait for transition to complete, then navigate
    setTimeout(() => {
      // Use router.push which handles the basePath automatically
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
