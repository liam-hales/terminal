import localFont from 'next/font/local';

/**
 * The HP 100LX font loaded from a local
 * file and self-hosted by `next/font`
 */
export const hp100lx = localFont({
  src: './hp_100lx.woff',
  variable: '--mono-font',
  style: 'normal',
  weight: '400',
});
