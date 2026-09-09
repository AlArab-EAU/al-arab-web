/**
 * Improved Sheikh Zayed portrait processing:
 * - Better background removal (gray + flag colors)
 * - Feather edges for professional blending
 * - Add subtle purple rim light for cinematic effect
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

    // Background detection
    const isLightBg = max > 165 && sat < 45
    const isFlagRed = r > 130 && g < 90 && b < 90
    const isFlagGreen = g > 90 && r < 100 && b < 100
    const isFlagWhite = max > 210 && sat < 25

    // Keep conditions
    const isSkin = r > 90 && r > g && g > b - 25 && sat > 12 && r < 225
    const isWhite = max > 195 && sat < 35 && min > 145
    const isGold = r > 140 && g > 100 && b < 110 && r > g && g > b
    const isBlack = max < 75 && min < 45
    const isDarkHair = max < 55
    const isGhutraWhite = max > 175 && sat < 40 && min > 120

    const isBackground = isLightBg || isFlagRed || isFlagGreen || isFlagWhite

    const keep = !isBackground && (isSkin || isWhite || isGold || isBlack || isDarkHair || isGhutraWhite || (sat > 20 && !isLightBg && !isFlagRed && !isFlagGreen && !isFlagWhite))

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

  // Feather edges — blur alpha channel for smooth professional blending
  const edgeBlur = 60
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      if (out[i + 3] > 0 && out[i + 3] < 255) {
        // Already semi-transparent from edge — smooth it
      } else if (out[i + 3] === 255) {
        // Check if near transparent edge
        let nearTransparent = false
        for (let dy = -3; dy <= 3 && !nearTransparent; dy++) {
          for (let dx = -3; dx <= 3 && !nearTransparent; dx++) {
            const ny = y + dy
            const nx = x + dx
            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              const ni = (ny * width + nx) * channels
              if (out[ni + 3] === 0) {
                nearTransparent = true
              }
            }
          }
        }
        if (nearTransparent) {
          out[i + 3] = 200 // Feather edge
        }
      }
    }
  }

  // Edge fade for smooth blending
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      if (out[i + 3] > 0) {
        if (x < edgeBlur) {
          out[i + 3] = Math.min(out[i + 3], Math.round(255 * (x / edgeBlur)))
        }
        if (x > width - edgeBlur) {
          out[i + 3] = Math.min(out[i + 3], Math.round(255 * ((width - x) / edgeBlur)))
        }
        if (y > height - edgeBlur) {
          out[i + 3] = Math.min(out[i + 3], Math.round(255 * ((height - y) / edgeBlur)))
        }
        if (y < 15) {
          out[i + 3] = Math.min(out[i + 3], Math.round(255 * (y / 15)))
        }
      }
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .toFile(OUTPUT)

  const meta = await sharp(OUTPUT).metadata()
  console.log(`Generated sheikh-zayed-clean.png: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)

  // Count opaque
  const verify = await sharp(OUTPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let opaque = 0
  let semi = 0
  for (let i = 0; i < verify.info.width * verify.info.height; i++) {
    const a = verify.data[i * verify.info.channels + 3]
    if (a > 200) opaque++
    else if (a > 0) semi++
  }
  console.log(`Opaque: ${opaque}, Semi: ${semi}, Total: ${verify.info.width * verify.info.height}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
