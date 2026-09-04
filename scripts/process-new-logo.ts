/**
 * Process the new AlArab logo (AlArab Oficial.jpeg):
 * - The source has a grey/white checkerboard representing transparency
 * - We need to detect checkerboard pixels and make them actually transparent
 * - Then trim to content
 * - Generate favicon + OG image with new logo
 *
 * Checkerboard detection: a pixel is on the checkerboard if it's near-pure-grey
 * (R ≈ G ≈ B) AND it's not the gold logo (which has high R, lower B).
 * Gold pixels have R > 180, G in 130-220, B < 100. We keep those.
 * Everything else that's grey-ish (low saturation) becomes transparent.
 */
import sharp from 'sharp'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const SOURCE = path.join(PUBLIC_DIR, 'alarab-logo-new.jpg')

async function main() {
  const { data, info } = await sharp(SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * channels)

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]

    // Saturation: max-min of RGB channels
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min

    // Gold/colored pixel (high saturation = logo) → keep
    // Grey/near-grey pixel (low saturation = checkerboard) → transparent
    const isColored = sat > 35

    // Also keep very dark pixels (could be shadow)
    const isDark = max < 60

    // Also keep very bright non-grey (gold highlight)
    const isBrightGold = r > 200 && g > 160 && b < 130

    const keep = isColored || isDark || isBrightGold

    out[i * channels] = r
    out[i * channels + 1] = g
    out[i * channels + 2] = b
    out[i * channels + 3] = keep ? 255 : 0
  }

  // Save transparent PNG
  const cleanPath = path.join(PUBLIC_DIR, 'alarab-logo-new-clean.png')
  await sharp(out, { raw: { width, height, channels } })
    .trim({ threshold: 30, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(cleanPath)
  console.log(`Generated ${cleanPath.split('/').pop()}`)

  // Generate favicon 64x64
  const faviconPath = path.join(PUBLIC_DIR, 'favicon.png')
  await sharp(cleanPath)
    .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(faviconPath)
  console.log(`Generated ${faviconPath.split('/').pop()}`)

  // Generate OG image 1200x630 — blue background + logo + coin
  const bg = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 11, g: 64, b: 101, alpha: 1 },
    },
  }).png().toBuffer()

  const logoForOG = await sharp(cleanPath)
    .resize(720, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const coinForOG = await sharp(path.join(PUBLIC_DIR, 'alarab-coin-3-clean.png'))
    .resize(280, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  await sharp(bg)
    .composite([
      { input: logoForOG, gravity: 'west', blend: 'over' },
      { input: coinForOG, gravity: 'east', blend: 'over' },
    ])
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'))
  console.log('Generated og-image.jpg')

  console.log('\nAll assets generated.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
