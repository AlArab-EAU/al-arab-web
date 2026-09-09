/**
 * Process Sheikh Zayed portrait:
 * - Remove the light gray background (right side)
 * - Remove the flag background (left side)
 * - Keep only the Sheikh figure
 * - Add gradient alpha edges for smooth blending into dark background
 */
import sharp from 'sharp'
import path from 'path'

const SOURCE = path.join(process.cwd(), 'public', 'sheikh-zayed.png')
const OUTPUT = path.join(process.cwd(), 'public', 'sheikh-zayed-clean.png')

async function main() {
  const { data, info } = await sharp(SOURCE)
    .resize(513, 598, { fit: 'fill' })
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

    // Background detection:
    // 1. Light gray/white background (right side): high brightness, low saturation
    const isLightBg = max > 160 && sat < 40

    // 2. Flag colors: red (high R, low G/B), green (high G, low R/B), black (all < 50)
    const isFlagRed = r > 140 && g < 80 && b < 80
    const isFlagGreen = g > 100 && r < 100 && b < 100
    const isFlagBlack = max < 50
    const isFlagWhite = max > 200 && sat < 25 && max > 220

    // 3. Dark shadow areas near bottom — keep if they're part of clothing
    const isDarkClothing = max < 60 && min < 30

    // Keep: skin tones, white clothing (kandura), gold trim (bisht), black bisht, dark hair/beard
    const isSkin = r > 100 && r > g && g > b - 20 && sat > 15 && sat < 80 && r < 220
    const isWhite = max > 200 && sat < 30 && min > 150 // white kandura
    const isGold = r > 150 && g > 110 && b < 100 && r > g && g > b // gold trim
    const isBlack = max < 70 && min < 40 // black bisht
    const isDarkHair = max < 50 // dark hair/beard
    const isGhutraWhite = max > 180 && sat < 35 && min > 130 // white ghutra

    const isBackground = isLightBg || isFlagRed || isFlagGreen || isFlagWhite

    const keep = !isBackground && (isSkin || isWhite || isGold || isBlack || isDarkHair || isGhutraWhite || isDarkClothing || (sat > 25 && !isLightBg && !isFlagRed && !isFlagGreen && !isFlagWhite))

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

  // Add gradient alpha at edges for smooth blending
  const edgeFade = 40
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      if (out[i + 3] > 0) {
        // Fade left edge
        if (x < edgeFade) {
          const factor = x / edgeFade
          out[i + 3] = Math.min(out[i + 3], Math.round(255 * factor))
        }
        // Fade right edge
        if (x > width - edgeFade) {
          const factor = (width - x) / edgeFade
          out[i + 3] = Math.min(out[i + 3], Math.round(255 * factor))
        }
        // Fade bottom edge
        if (y > height - edgeFade) {
          const factor = (height - y) / edgeFade
          out[i + 3] = Math.min(out[i + 3], Math.round(255 * factor))
        }
      }
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .toFile(OUTPUT)

  const meta = await sharp(OUTPUT).metadata()
  console.log(`Generated sheikh-zayed-clean.png: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)

  // Count opaque pixels
  const verify = await sharp(OUTPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let opaque = 0
  for (let i = 0; i < verify.info.width * verify.info.height; i++) {
    if (verify.data[i * verify.info.channels + 3] > 128) opaque++
  }
  console.log(`Opaque pixels: ${opaque}/${verify.info.width * verify.info.height} (${(opaque / (verify.info.width * verify.info.height) * 100).toFixed(1)}%)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
