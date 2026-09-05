/**
 * Process the third AlArab coin image — remove white background,
 * trim to content, generate transparent PNG.
 */
import sharp from 'sharp'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const SOURCE = path.join(PUBLIC_DIR, 'alarab-coin-3.png')
const OUTPUT = path.join(PUBLIC_DIR, 'alarab-coin-3-clean.png')

async function main() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * channels)
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]
    const isWhite = r > 240 && g > 240 && b > 240
    out[i * channels] = r
    out[i * channels + 1] = g
    out[i * channels + 2] = b
    out[i * channels + 3] = isWhite ? 0 : 255
  }
  await sharp(out, { raw: { width, height, channels } })
    .trim({ threshold: 20, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(OUTPUT)
  console.log(`Generated ${OUTPUT.split('/').pop()}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
