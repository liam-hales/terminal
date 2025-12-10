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
  rewrites: () => {
    return [
      {
        source: '/files/:path*',
        destination: `https://${process.env.FILE_STORE_ID ?? ''}.public.blob.vercel-storage.com/:path*`,
      },
    ];
  },
};

export default withAnalyser(nextConfig);
