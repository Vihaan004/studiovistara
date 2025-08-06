const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export const assetPrefix = isProd && isGitHubPages ? '/studiovistara' : '';

export function getAssetPath(path: string): string {
  // For client-side, also check if we're on GitHub Pages domain
  if (typeof window !== 'undefined') {
    const isOnGitHubPages = window.location.hostname === 'vihaan004.github.io';
    if (isOnGitHubPages && !path.startsWith('/studiovistara')) {
      return `/studiovistara${path}`;
    }
  }
  
  return `${assetPrefix}${path}`;
}

export function isHomePage(pathname: string): boolean {
  // Handle both local development and GitHub Pages paths
  return pathname === '/' || pathname === '/studiovistara' || pathname === '/studiovistara/';
}
