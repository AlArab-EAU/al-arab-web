/**
 * Process the new AlArab coin (AlArab Oficial 1.jpeg):
 * - Remove the white/gray checkerboard background
 * - Keep only the gold/colored coin pixels
 * - Trim to content
 * - Resize to reasonable web size (preserve aspect ratio, max 1024px)
 */
import sharp from 'sharp'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const SOURCE = path.join(PUBLIC_DIR, 'alarab-coin-4.jpg')
const OUTPUT = path.join(PUBLIC_DIR, 'alarab-coin-4-clean.png')

async function main() {
  // First resize to reasonable size while processing
  const resized = await sharp(SOURCE)
    .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { data, info } = resized
  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * channels)

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min

    // Coin pixels: colored (high saturation = gold/yellow/dark)
    // Checkerboard: grey/white (low saturation)
    const isColored = sat > 30

    // Also keep dark pixels (could be coin shadows)
    const isDark = max < 80

    // Bright gold pixels
    const isBrightGold = r > 180 && g > 130 && b < 130

    const keep = isColored || isDark || isBrightGold

    out[i * channels] = r
    out[i * channels + 1] = g
    out[i * channels + 2] = b
    out[i * channels + 3] = keep ? 255 : 0
  }

  await sharp(out, { raw: { width, height, channels } })
    .trim({ threshold: 25, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(OUTPUT)
  console.log(`Generated ${OUTPUT.split('/').pop()}`)

  // Verify
  const meta = await sharp(OUTPUT).metadata()
  console.log(`Final: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
