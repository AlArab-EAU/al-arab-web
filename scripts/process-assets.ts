/**
 * Processes the official AL ARAB assets:
 * - Removes near-white background (transparent PNG)
 * - Trims to content
 * - Generates favicon + OG image
 */
import sharp from 'sharp'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')
const SOURCE = path.join(PUBLIC_DIR, 'alarab-logo.png')
const COIN = path.join(PUBLIC_DIR, 'alarab-coin.png')
const COIN_AMIN = path.join(PUBLIC_DIR, 'alarab-coin-al-amin.png')

/** Remove white-ish background, return transparent PNG buffer */
async function removeWhiteBg(src: string): Promise<Buffer> {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * channels)
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]
    const isWhite = r > 235 && g > 235 && b > 235
    out[i * channels] = r
    out[i * channels + 1] = g
    out[i * channels + 2] = b
    out[i * channels + 3] = isWhite ? 0 : 255
  }
  return sharp(out, { raw: { width, height, channels } }).png().toBuffer()
}

async function main() {
  // 1. Logo clean
  const logoBuf = await removeWhiteBg(SOURCE)
  await sharp(logoBuf)
    .trim({ threshold: 25, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'alarab-logo-clean.png'))
  console.log('Generated alarab-logo-clean.png')

  // 2. Favicon
  await sharp(logoBuf)
    .trim({ threshold: 25, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.png'))
  console.log('Generated favicon.png')

  // 3. OG image 1200x630
  const bg = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 5, g: 8, b: 16, alpha: 1 },
    },
  }).png().toBuffer()

  const logoForOG = await sharp(logoBuf)
    .trim({ threshold: 25, background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .resize(560, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const coinBuf = await removeWhiteBg(COIN)
  const coinForOG = await sharp(coinBuf)
    .resize(380, 380, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  await sharp(bg)
    .composite([
      { input: logoForOG, gravity: 'west', blend: 'over' },
      { input: coinForOG, gravity: 'east', blend: 'over' },
    ])
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-image.jpg'))
  console.log('Generated og-image.jpg')

  // 4. Coins transparent
  for (const [src, dst] of [
    [COIN, 'alarab-coin-clean.png'],
    [COIN_AMIN, 'alarab-coin-al-amin-clean.png'],
  ] as const) {
    const buf = await removeWhiteBg(src)
    await sharp(buf)
      .trim({ threshold: 20, background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(PUBLIC_DIR, dst))
    console.log(`Generated ${dst}`)
  }

  console.log('\nAll assets generated.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
