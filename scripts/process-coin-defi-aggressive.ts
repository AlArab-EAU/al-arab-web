/**
 * Aggressive background removal for DEFI coin.
 * The coin has a black background that was partially removed but some
 * dark pixels remain, creating a visible "box" effect.
 *
 * Strategy: flood-fill from edges, removing all connected dark pixels.
 * Keep only gold/colored pixels that form the actual coin design.
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const SOURCE_UPLOAD = '/home/z/my-project/upload/Al-arab Oficial 2.png'
const OUTPUT = path.join(process.cwd(), 'public', 'alarab-coin-defi-clean.png')

async function main() {
  const { data, info } = await sharp(SOURCE_UPLOAD)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * channels)

  // For each pixel, determine if it's part of the coin (gold) or background
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min

    // Gold/yellow pixels: R > G > B, with R > 100
    const isGold = r > 100 && r > g && g >= b && sat > 30

    // White/bright pixels (highlights on the coin): max > 200, low sat
    const isBright = max > 200 && sat < 60

    // Very dark pixels that are NOT part of the gold design
    // (the coin's dark engravings are still gold-ish, not pure black)
    const isDark = max < 60

    // Keep only gold and bright pixels, remove everything else
    const keep = isGold || isBright

    if (keep) {
      out[i * channels] = r
      out[i * channels + 1] = g
      out[i * channels + 2] = b
      out[i * channels + 3] = 255
    } else {
      // Fully transparent with zeroed RGB
      out[i * channels] = 0
      out[i * channels + 1] = 0
      out[i * channels + 2] = 0
      out[i * channels + 3] = 0
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .trim({ threshold: 20, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(OUTPUT)

  const meta = await sharp(OUTPUT).metadata()
  console.log(`Generated ${OUTPUT.split('/').pop()}: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)

  // Verify corners are truly transparent with zeroed RGB
  const verify = await sharp(OUTPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const vInfo = verify.info
  const cornerCheck = []
  for (const [x, y] of [[0,0], [vInfo.width-1, 0], [0, vInfo.height-1], [vInfo.width-1, vInfo.height-1]]) {
    const idx = (y * vInfo.width + x) * vInfo.channels
    cornerCheck.push({
      rgb: `${verify.data[idx]},${verify.data[idx+1]},${verify.data[idx+2]}`,
      a: verify.data[idx+3]
    })
  }
  console.log('Corner check:', JSON.stringify(cornerCheck))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
