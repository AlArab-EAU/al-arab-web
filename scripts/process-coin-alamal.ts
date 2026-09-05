/**
 * Re-process AlArab Oficial 1.jpeg (Al Amal coin) with higher output quality.
 * Source has checkerboard background representing transparency.
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const SOURCE_UPLOAD = '/home/z/my-project/upload/AlArab Oficial 1.jpeg'
const SOURCE = path.join(PUBLIC_DIR, 'alarab-coin-alamal.jpg')
const OUTPUT = path.join(PUBLIC_DIR, 'alarab-coin-alamal-clean.png')

async function main() {
  fs.copyFileSync(SOURCE_UPLOAD, SOURCE)

  // Resize to reasonable web size while processing
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

    // Checkerboard pixels: low saturation + mid-to-high brightness grey
    const isChecker = sat < 30 && max > 80 && max < 230

    // Pure white/near-white: also transparent
    const isWhite = max > 230 && sat < 30

    // Gold pixels: keep
    const isGold = r > 150 && g > 110 && b < 130

    // Dark pixels (skyline silhouette, engravings): keep
    const isDark = max < 90

    const keep = isGold || isDark || (sat > 35 && !isChecker && !isWhite)

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
