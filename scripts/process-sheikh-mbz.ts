/**
 * Process Sheikh Zayed MBZ portrait (high quality 1514x1766):
 * - Remove light gray/off-white background
 * - Keep figure with feather edges
 * - Resize to reasonable web size (600x700)
 * - Output transparent PNG
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const SOURCE_UPLOAD = '/home/z/my-project/upload/Sheikh Zayed MBZ.png'
const OUTPUT = path.join(process.cwd(), 'public', 'sheikh-zayed-clean.png')

async function main() {
  fs.copyFileSync(SOURCE_UPLOAD, path.join(process.cwd(), 'public', 'sheikh-zayed-mbz-original.png'))

  // Resize first for faster processing
  const resized = await sharp(SOURCE_UPLOAD)
    .resize(600, 700, { fit: 'cover', position: 'center' })
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
    const a = data[i * channels + 3]

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min

    // Background detection: light gray/off-white (the studio backdrop)
    const isLightBg = max > 170 && sat < 50 && min > 130

    // Very transparent pixels (alpha < 50) = background
    const isTransparentBg = a < 50

    // Keep conditions (the Sheikh figure)
    const isSkin = r > 80 && r > g && g > b - 30 && sat > 10 && r < 230
    const isWhite = max > 180 && sat < 45 && min > 120 // white kandura + ghutra
    const isGold = r > 120 && g > 80 && b < 110 && r > g && g > b - 20 // gold embroidery
    const isBlack = max < 80 && min < 50 // black bisht + agal
    const isDarkHair = max < 60 // dark hair/beard

    const isBackground = isLightBg || isTransparentBg

    const keep = !isBackground && (isSkin || isWhite || isGold || isBlack || isDarkHair || (sat > 15 && !isLightBg && a > 50))

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

  // Feather edges for professional blending
  const edgeRadius = 4
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      if (out[i + 3] === 255) {
        // Check if near transparent edge
        let transparentNeighbors = 0
        for (let dy = -edgeRadius; dy <= edgeRadius; dy++) {
          for (let dx = -edgeRadius; dx <= edgeRadius; dx++) {
            const ny = y + dy
            const nx = x + dx
            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              const ni = (ny * width + nx) * channels
              if (out[ni + 3] === 0) transparentNeighbors++
            }
          }
        }
        if (transparentNeighbors > 3) {
          const factor = Math.max(0, 1 - (transparentNeighbors / (edgeRadius * edgeRadius * 4)))
          out[i + 3] = Math.round(255 * factor)
        }
      }
    }
  }

  // Edge fade for smooth blending
  const fadeWidth = 30
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      if (out[i + 3] > 0) {
        if (x < fadeWidth) out[i + 3] = Math.min(out[i + 3], Math.round(255 * (x / fadeWidth)))
        if (x > width - fadeWidth) out[i + 3] = Math.min(out[i + 3], Math.round(255 * ((width - x) / fadeWidth)))
        if (y > height - fadeWidth) out[i + 3] = Math.min(out[i + 3], Math.round(255 * ((height - y) / fadeWidth)))
        if (y < 10) out[i + 3] = Math.min(out[i + 3], Math.round(255 * (y / 10)))
      }
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .toFile(OUTPUT)

  const meta = await sharp(OUTPUT).metadata()
  console.log(`Generated sheikh-zayed-clean.png: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)

  const verify = await sharp(OUTPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let opaque = 0
  let semi = 0
  for (let i = 0; i < verify.info.width * verify.info.height; i++) {
    const a = verify.data[i * verify.info.channels + 3]
    if (a > 200) opaque++
    else if (a > 0) semi++
  }
  console.log(`Opaque: ${opaque}, Semi: ${semi}, Total: ${verify.info.width * verify.info.height} (${(opaque / (verify.info.width * verify.info.height) * 100).toFixed(1)}%)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
