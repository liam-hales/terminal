import { join } from 'path';
import { readFileSync } from 'fs';
import { parseStringPromise, Builder } from 'xml2js';
import sharp from 'sharp';

/**
 * Used to build the `favicon.ico` and `.webp`
 * icons from the `icon.svg` file
 */
(async () => {
  const publicPath = join(process.cwd(), '/public');
  const iconPath = join(publicPath, '/icon.svg');

  // Read the SVG icon data and parse it
  // using `xml2js` so it can be modified
  const svgData = readFileSync(iconPath, 'utf-8');
  const iconSvg = await parseStringPromise(svgData);

  // Modify the icon SVG attributes to resize the
  // background rect and remove its corner radius
  iconSvg.svg.$.viewBox = '-86 -86 1196 1196';
  iconSvg.svg.rect[0].$ = {
    x: -86,
    y: -86,
    width: 1196,
    height: 1196,
    rx: 0,
  };

  const svgString = new Builder().buildObject(iconSvg);
  const svgBuffer = Buffer.from(svgString);

  // Use sharp to load the SVG data, resize and export
  // to `.webp` icon files to the public directory

  await sharp(iconPath)
    .webp()
    .resize(64, 64)
    .toFile(`${publicPath}/favicon.ico`);

  await sharp(svgBuffer)
    .webp()
    .resize(180, 180)
    .toFile(`${publicPath}/apple-touch-icon.webp`);

  await sharp(svgBuffer)
    .webp()
    .resize(192, 192)
    .toFile(`${publicPath}/icon-192x192.webp`);

  await sharp(svgBuffer)
    .webp()
    .resize(512, 512)
    .toFile(`${publicPath}/icon-512x512.webp`);
})();
