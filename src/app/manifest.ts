/* eslint-disable @typescript-eslint/naming-convention */

import { MetadataRoute } from 'next';

/**
 * Used to build the `manifest.json` file for PWA
 * configuration and to specify how the app is launched
 *
 * @returns The `manifest.json` file
 */
const buildManifest = (): MetadataRoute.Manifest => {
  return {
    name: 'Terminal - Liam Hales',
    short_name: 'Terminal',
    description: 'Web-based developer tools with a dev-friendly terminal interface.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.webp',
        type: 'image/webp',
      },
    ],
  };
};

export default buildManifest;
