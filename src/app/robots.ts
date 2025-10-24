import { MetadataRoute } from 'next';

/**
 * Used to build the `robots.txt` file to tell search engine
 * crawlers which URLs they can access on your site
 *
 * @returns The `robots.txt` file
 */
const buildRobots = (): MetadataRoute.Robots => {
  const siteUrl = process.env.SITE_URL;

  // Make sure the `SITE_URL` environment
  // variable has been set
  if (siteUrl == null) {
    throw new Error('The "SITE_URL" environment variable is required');
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
};

export default buildRobots;
