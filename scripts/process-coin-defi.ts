/**
 * Process "Al-arab Oficial 2.png" — DEFI coin with Saudi Arabia calligraphy.
 * Source has solid white background. Make it transparent.
 */
import sharp from 'sharp'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const SOURCE = path.join(PUBLIC_DIR, 'alarab-coin.png') // original already copied here
const OUTPUT = path.join(PUBLIC_DIR, 'alarab-coin-defi-clean.png')

async function main() {
  // Re-copy from upload to ensure latest version
  const fs = await import('fs')
  fs.copyFileSync('/home/z/my-project/upload/Al-arab Oficial 2.png', SOURCE)

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

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min

    // White-ish background: high brightness, low saturation
    const isWhite = max > 200 && sat < 40

    // Gold pixels: keep
    const isGold = r > 130 && g > 100 && b < 130

    // Dark pixels (coin shadow, sword): keep
    const isDark = max < 90

    const keep = isGold || isDark || (sat > 35 && !isWhite)

    out[i * channels] = r
    out[i * channels + 1] = g
    out[i * channels + 2] = b
    out[i * channels + 3] = keep ? 255 : 0
  }

  await sharp(out, { raw: { width, height, channels } })
    .trim({ threshold: 25, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(OUTPUT)
  console.log(`Generated ${OUTPUT.split('/').pop()}`)

  const meta = await sharp(OUTPUT).metadata()
  console.log(`Final: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
