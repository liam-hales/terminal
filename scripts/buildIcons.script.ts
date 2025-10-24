import { join } from 'path';
import { readFileSync } from 'fs';
import { parseStringPromise, Builder } from 'xml2js';
import sharp from 'sharp';

/**
 * Used to convert an SVG `string`
 * into a `Buffer`
 *
 * @param value The SVG string
 * @returns The SVG buffer
 */
const toBuffer = (value: unknown): Buffer => {
  return Buffer.from(
    new Builder()
      .buildObject(value),
  );
};

/**
 * Used to build the `favicon.ico` and `.webp`
 * icons from the `icon.svg` file
 */
void (async () => {
  const publicPath = join(process.cwd(), '/public');
  const iconPath = join(publicPath, '/icon.svg');

  // Read the SVG icon data and parse it
  // using `xml2js` so it can be modified
  const svgData = readFileSync(iconPath, 'utf-8');
  const iconSvg = await parseStringPromise(svgData);

  // Modify the icon SVG attributes
  // to remove its corner radius
  iconSvg.svg.defs[0].clipPath[0].rect[0].$.rx = 0;

  // Convert the modified icon SVG into
  // a buffer to be used with `sharp`
  const withoutRxBuffer = toBuffer(iconSvg);

  // Use sharp to load the SVG data, resize and export
  // to icon files to the public directory

  await sharp(iconPath)
    .webp()
    .resize(64, 64)
    .toFile(`${publicPath}/favicon.ico`);

  await sharp(iconPath)
    .webp()
    .resize(1024, 1024)
    .toFile(`${publicPath}/icon.webp`);

  await sharp(iconPath)
    .webp()
    .resize(192, 192)
    .toFile(`${publicPath}/icon-192x192.webp`);

  await sharp(iconPath)
    .webp()
    .resize(512, 512)
    .toFile(`${publicPath}/icon-512x512.webp`);

  await sharp(withoutRxBuffer)
    .webp()
    .resize(180, 180)
    .toFile(`${publicPath}/apple-touch-icon.webp`);
})();
