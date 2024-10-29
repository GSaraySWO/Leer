import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [
  { name: 'pwa-64x64.png', size: 64 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'maskable-icon-512x512.png', size: 512, maskable: true }
];

async function generateIcon(svg, outputPath, size, maskable = false) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Convert SVG to data URL
  const svgString = svg
    .replace('$SIZE', size.toString())
    .replace('$MASKABLE', maskable.toString());
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
  
  // Load and draw image
  const img = await loadImage(dataUrl);
  ctx.drawImage(img, 0, 0, size, size);
  
  // Save PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

// Read the SVG template
const svgTemplate = fs.readFileSync(
  join(__dirname, '../public/mask-icon.svg'),
  'utf-8'
);

// Generate all icon sizes
for (const { name, size, maskable } of sizes) {
  const outputPath = join(__dirname, '../public', name);
  await generateIcon(svgTemplate, outputPath, size, maskable);
}

console.log('PWA icons generated successfully!');