import bundleAnalyser from '@next/bundle-analyzer';

/**
 * The initialised bundle analyser
 * from `@next/bundle-analyzer`
 */
const withAnalyser = bundleAnalyser({
  enabled: process.env.ANALYSE_BUNDLE === 'true',
  openAnalyzer: true,
});

/**
 * The Next.js config used to configure
 * the Next.js framework for the app
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  serverRuntimeConfig: {
    siteUrl: process.env.SITE_URL,
  },
};

export default withAnalyser(nextConfig);
