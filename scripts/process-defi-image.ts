/**
 * Process DeFi ecosystem image — remove white background, make transparent
 */
import sharp from 'sharp'

const SOURCE = '/home/z/my-project/public/defi-ecosystem.png'
const OUTPUT = '/home/z/my-project/public/defi-ecosystem-clean.png'

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

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min

    // White/near-white background: remove
    const isWhite = max > 220 && sat < 30

    // Very light gray (watermark hexagons): remove
    const isLightGray = max > 200 && sat < 25 && min > 180

    if (isWhite || isLightGray) {
      out[i * channels] = 0
      out[i * channels + 1] = 0
      out[i * channels + 2] = 0
      out[i * channels + 3] = 0
    } else {
      out[i * channels] = r
      out[i * channels + 1] = g
      out[i * channels + 2] = b
      out[i * channels + 3] = 255
    }
  }

  // Feather edges
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * channels
        if (out[i + 3] === 255) {
          let transparentCount = 0
          for (let dy = -3; dy <= 3; dy++) {
            for (let dx = -3; dx <= 3; dx++) {
              const nx = x + dx, ny = y + dy
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                if (out[(ny * width + nx) * channels + 3] === 0) transparentCount++
              }
            }
          }
          if (transparentCount > 2) {
            out[i + 3] = Math.max(0, 255 - transparentCount * 30)
          }
        }
      }
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .resize(800, 664, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(OUTPUT)

  const meta = await sharp(OUTPUT).metadata()
  console.log(`Generated: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)
}

main().catch(console.error)
