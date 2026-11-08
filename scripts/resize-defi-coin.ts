import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const SRC = '/home/z/my-project/public/alarab-coin-defi-clean.png'
const OUT = '/home/z/my-project/public/alarab-coin-defi-700.png'

async function main() {
  // The defi coin is 447x447 (transparent bg, coin fills ~95-100% of canvas)
  // The new commemorative coin is 700x700 (black bg, coin fills ~85-90% of canvas)
  // To make both coins appear the same visual size when rendered at the same CSS size,
  // resize the defi coin to 700x700 with the coin centered and similar visual size
  //
  // The defi coin at 447x447 takes up ~95% of canvas (so coin is ~425px)
  // The new coin at 700x700 takes up ~87% of canvas (so coin is ~610px)
  //
  // To make defi coin visually same size as new coin (610px target):
  //   - The defi coin should fill ~87% of 700px = ~610px
  //   - So we need to scale the 447px image to 610px = 610/447 = 1.36x scale
  //   - Then place on a 700x700 transparent canvas with center positioning
  //
  // Approach: resize defi to 610x610 (transparent) and composite on 700x700 transparent

  const targetSize = 700
  const coinTarget = 610  // matches new coin's visible size

  // First resize the defi coin to 610x610
  const resizedBuf = await sharp(SRC)
    .resize(coinTarget, coinTarget, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  // Composite onto 700x700 transparent canvas, centered
  const offset = Math.floor((targetSize - coinTarget) / 2)
  await sharp({
    create: {
      width: targetSize,
      height: targetSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: resizedBuf, left: offset, top: offset }])
  .png({ quality: 92, compressionLevel: 9 })
  .toFile(OUT)

  const stat = await fs.stat(OUT)
  const m = await sharp(OUT).metadata()
  console.log(`✓ alarab-coin-defi-700.png: ${m.width}x${m.height} | ${(stat.size/1024).toFixed(1)} KB`)
}

main().catch(e => { console.error(e); process.exit(1) })
