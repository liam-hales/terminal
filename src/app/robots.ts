import { MetadataRoute } from 'next';
import getConfig from 'next/config';

/**
 * Used to build the `robots.txt` file to tell search engine
 * crawlers which URLs they can access on your site
 *
 * @returns The `robots.txt` file
 */
const buildRobots = (): MetadataRoute.Robots => {

  const { serverRuntimeConfig } = getConfig();
  const { siteUrl } = serverRuntimeConfig;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl as string}/sitemap.xml`,
  };
};

export default buildRobots;
