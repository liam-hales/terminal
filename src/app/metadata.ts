import { Metadata, Viewport } from 'next';

/**
 * Describes the app viewport metadata that is
 * rendered within the page `<head/>` element
 */
export const viewport: Viewport = {
  width: 'device-width',
  viewportFit: 'cover',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

/**
 * Used to generate the app metadata that is
 * rendered within the `<head/>` element
 *
 * @returns The app metadata
 */
export const generateMetadata = (): Metadata => {
  const siteUrl = process.env.SITE_URL;

  // Make sure the `SITE_URL` environment
  // variable has been set
  if (siteUrl == null) {
    throw new Error('The "SITE_URL" environment variable is required');
  }

  const title = 'Terminal - Liam Hales';
  const description = 'Web-based developer tools with a dev-friendly terminal interface.';

  return {
    metadataBase: new URL(siteUrl),
    title: title,
    description: description,
    icons: {
      icon: [
        {
          rel: 'icon',
          url: '/favicon.ico',
          type: 'image/x-icon',
        },
        {
          rel: 'icon',
          url: '/icon.webp',
          type: 'image/webp',
        },
        {
          rel: 'apple-touch-icon',
          url: '/apple-touch-icon.webp',
          type: 'image/webp',
        },
      ],
    },
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      siteName: 'Terminal',
      images: [
        {
          url: '/cover.webp',
          type: 'image/webp',
          alt: 'Terminal Cover',
        },
      ],
    },
  };
};
