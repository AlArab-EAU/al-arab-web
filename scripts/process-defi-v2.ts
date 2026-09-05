/**
 * Process Defi.png — DEFI coin with Saudi Arabia calligraphy.
 * Source has solid white background. Use flood-fill from edges approach
 * to ensure complete background removal.
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const SOURCE_UPLOAD = '/home/z/my-project/upload/Defi.png'
const OUTPUT = path.join(process.cwd(), 'public', 'alarab-coin-defi-clean.png')

async function main() {
  const { data, info } = await sharp(SOURCE_UPLOAD)
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

    // White-ish background: very bright + low saturation
    const isWhite = max > 180 && sat < 50

    // Gold/yellow pixels: keep (R > G > B, with good saturation)
    const isGold = r > 100 && r > g && g >= b - 10 && sat > 25

    // Bright highlights on coin (white-gold): keep
    const isBrightHighlight = max > 220 && r > 200 && g > 180 && b > 100

    // Keep only gold and bright highlights
    const keep = !isWhite && (isGold || isBrightHighlight)

    if (keep) {
      out[i * channels] = r
      out[i * channels + 1] = g
      out[i * channels + 2] = b
      out[i * channels + 3] = 255
    } else {
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

  // Verify corners
  const verify = await sharp(OUTPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const vInfo = verify.info
  const cornerCheck = []
  for (const [x, y] of [[0,0], [vInfo.width-1, 0], [0, vInfo.height-1], [vInfo.width-1, vInfo.height-1]]) {
    const idx = (y * vInfo.width + x) * vInfo.channels
    cornerCheck.push(`rgba(${verify.data[idx]},${verify.data[idx+1]},${verify.data[idx+2]},${verify.data[idx+3]})`)
  }
  console.log('Corner check:', JSON.stringify(cornerCheck))

  // Count opaque pixels (should be ~78% for a circle)
  let opaque = 0
  for (let i = 0; i < vInfo.width * vInfo.height; i++) {
    if (verify.data[i * vInfo.channels + 3] > 128) opaque++
  }
  console.log(`Opaque: ${opaque}/${vInfo.width * vInfo.height} (${(opaque/(vInfo.width*vInfo.height)*100).toFixed(1)}%)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
