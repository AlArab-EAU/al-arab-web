/**
 * Final fix: zero out RGB values for transparent pixels.
 * This prevents any residual color from showing through.
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

const FILES = [
  'alarab-coin-aramco-clean.png',
  'alarab-coin-defi-clean.png',
  'alarab-coin-alamal-clean.png',
]

async function fixFile(filename: string): Promise<void> {
  const filepath = path.join(PUBLIC_DIR, filename)
  const { data, info } = await sharp(filepath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * channels)

  let fixed = 0
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]
    const a = data[i * channels + 3]

    if (a < 128) {
      // Transparent pixel — zero out RGB to prevent any residual color
      out[i * channels] = 0
      out[i * channels + 1] = 0
      out[i * channels + 2] = 0
      out[i * channels + 3] = 0
      if (r !== 0 || g !== 0 || b !== 0) fixed++
    } else {
      out[i * channels] = r
      out[i * channels + 1] = g
      out[i * channels + 2] = b
      out[i * channels + 3] = a
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .toFile(filepath)

  console.log(`${filename}: fixed ${fixed} transparent pixels with residual RGB`)
}

async function main() {
  for (const f of FILES) {
    await fixFile(f)
  }
  console.log('\nAll coins cleaned.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
