const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export const assetPrefix = isProd && isGitHubPages ? '/studiovistara' : '';

export function getAssetPath(path: string): string {
  // For production GitHub Pages, always use the studiovistara prefix
  // For development, use the path as-is
  const isProd = process.env.NODE_ENV === 'production';
  const prefix = isProd ? '/studiovistara' : '';
  return `${prefix}${path}`;
}

export function isHomePage(pathname: string): boolean {
  // Handle both local development and GitHub Pages paths
  return pathname === '/' || pathname === '/studiovistara' || pathname === '/studiovistara/';
}
