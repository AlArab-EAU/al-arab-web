/**
 * Process partners group photo:
 * - Convert to JPEG for smaller size
 * - Add subtle cinematic treatment (slight desaturation + blue tint to match site)
 * - Generate rounded corner version
 */
import sharp from 'sharp'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const SOURCE = path.join(PUBLIC_DIR, 'partners-photo.jpg')
const OUTPUT_JPG = path.join(PUBLIC_DIR, 'partners-photo-optimized.jpg')
const OUTPUT_ROUNDED = path.join(PUBLIC_DIR, 'partners-photo-rounded.png')

async function main() {
  // 1. Optimized JPEG (smaller, with slight blue tint to match site palette)
  await sharp(SOURCE)
    .resize(1280, 720, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.92, saturation: 0.85 })
    .tint({ r: 200, g: 220, b: 255 }) // subtle blue tint
    .jpeg({ quality: 82, progressive: true })
    .toFile(OUTPUT_JPG)
  console.log('Generated partners-photo-optimized.jpg')

  // 2. Rounded corners version (PNG with alpha)
  const width = 1280
  const height = 720
  const radius = 24

  // Create rounded rectangle mask
  const roundedMask = Buffer.from(
    `<svg width="${width}" height="${height}">
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`
  )

  await sharp(SOURCE)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.92, saturation: 0.85 })
    .tint({ r: 200, g: 220, b: 255 })
    .composite([{ input: roundedMask, blend: 'dest-in' }])
    .png()
    .toFile(OUTPUT_ROUNDED)
  console.log('Generated partners-photo-rounded.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
