const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export const assetPrefix = isProd && isGitHubPages ? '/studiovistara' : '';

export function getAssetPath(path: string): string {
  // For client-side, check multiple conditions for GitHub Pages
  if (typeof window !== 'undefined') {
    const isOnGitHubPages = window.location.hostname === 'vihaan004.github.io' ||
                           window.location.href.includes('vihaan004.github.io') ||
                           window.location.pathname.startsWith('/studiovistara');
    
    if (isOnGitHubPages && !path.startsWith('/studiovistara')) {
      return `/studiovistara${path}`;
    }
  }
  
  // Server-side fallback
  return `${assetPrefix}${path}`;
}

export function isHomePage(pathname: string): boolean {
  // Handle both local development and GitHub Pages paths
  return pathname === '/' || pathname === '/studiovistara' || pathname === '/studiovistara/';
}
