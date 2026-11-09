import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const SRC = '/home/z/my-project/upload/AlArab_Twitter_X_1600x900  2026.png'
const OUT_DIR = '/home/z/my-project/public'

async function main() {
  const srcBuf = await fs.readFile(SRC)
  const meta = await sharp(srcBuf).metadata()
  console.log('Source:', meta.width, 'x', meta.height)

  // The coin is centered in 1600x900. Extract the central square (900x900) which contains the coin
  const EXTRACT = { left: 350, top: 0, width: 900, height: 900 }

  // 1. Square version with original background (for spinning showcase)
  //    The original coin image has a black background — when spinning, the dark bg
  //    blends naturally with the showcase section background. Match existing coin size (~700px)
  await sharp(srcBuf)
    .extract(EXTRACT)
    .resize(700, 700, { fit: 'cover', position: 'center' })
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'alarab-coin-new-clean.png'))
  console.log('✓ alarab-coin-new-clean.png (square, 700x700)')

  // Final stats
  const p = path.join(OUT_DIR, 'alarab-coin-new-clean.png')
  const stat = await fs.stat(p)
  const m = await sharp(p).metadata()
  console.log(`Final: ${m.width}x${m.height} | ${(stat.size/1024).toFixed(1)} KB`)
}

main().catch(e => { console.error(e); process.exit(1) })
