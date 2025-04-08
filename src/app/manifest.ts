/* eslint-disable @typescript-eslint/naming-convention */

import { MetadataRoute } from 'next';

/**
 * Used to build the `manifest.webmanifest` file for PWA
 * configuration and to specify how the app is launched
 *
 * @returns The `manifest.webmanifest` file
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
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  };
};

export default buildManifest;
