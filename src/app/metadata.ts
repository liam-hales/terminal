import { Metadata, Viewport } from 'next';
import getConfig from 'next/config';

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

  const { serverRuntimeConfig } = getConfig();
  const { siteUrl } = serverRuntimeConfig;

  const title = 'Terminal - Liam Hales';
  const description = 'Web-based developer tools with a dev-friendly terminal interface.';

  return {
    metadataBase: new URL(siteUrl as string),
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
