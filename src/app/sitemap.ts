import { MetadataRoute } from 'next';

/**
 * Used to build the `sitemap.xml` file to help search
 * engine crawlers crawl your site more efficiently
 *
 * @returns The `sitemap.xml` file
 */
const buildSitemap = (): MetadataRoute.Sitemap => {
  const siteUrl = process.env.SITE_URL;

  // Make sure the `SITE_URL` environment
  // variable has been set
  if (siteUrl == null) {
    throw new Error('The "SITE_URL" environment variable is required');
  }

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
  ];
};

export default buildSitemap;
