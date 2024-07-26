import { MetadataRoute } from 'next';
import getConfig from 'next/config';

/**
 * Used to build the `sitemap.xml` file to help search
 * engine crawlers crawl your site more efficiently
 *
 * @returns The `sitemap.xml` file
 */
const buildSitemap = (): MetadataRoute.Sitemap => {

  const { serverRuntimeConfig } = getConfig();
  const { siteUrl } = serverRuntimeConfig;

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
  ];
};

export default buildSitemap;
