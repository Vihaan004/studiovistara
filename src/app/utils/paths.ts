const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export const assetPrefix = isProd && isGitHubPages ? '/studiovistara' : '';

export function getAssetPath(path: string): string {
  return `${assetPrefix}${path}`;
}
