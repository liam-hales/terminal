import { Metadata, Viewport } from 'next';
import getConfig from 'next/config';

/**
 * Describes the app viewport metadata that is
 * rendered within the page `<head/>` element
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

/**
 * Used to generate the app metadata that is
 * rendered within the `<head/>` element
 *
 * @returns The app metadata
 */
export const generateMetadata = async (): Promise<Metadata> => {

  const { serverRuntimeConfig } = getConfig();
  const { siteUrl } = serverRuntimeConfig;

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
        },
        {
          rel: 'icon',
          url: '/icon.svg',
          type: 'image/svg+xml',
        },
        {
          rel: 'apple-touch-icon',
          url: '/apple-touch-icon.webp',
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
          type: 'image/webp',
          url: '/cover.webp',
          alt: 'Terminal Cover',
        },
      ],
    },
  };
};
