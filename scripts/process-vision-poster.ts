import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const SRC = '/home/z/my-project/upload/pasted_image_1794169024159.png'
const OUT_DIR = '/home/z/my-project/public'

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const srcBuf = await fs.readFile(SRC)
  const meta = await sharp(srcBuf).metadata()
  console.log('Source:', meta.width, 'x', meta.height, meta.hasAlpha ? 'alpha' : 'no-alpha')

  // Original aspect: 1672x941 ≈ 1.777 (16:9)
  // 1. Display version (1600x900, optimized PNG)
  await sharp(srcBuf)
    .resize(1600, 900, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'alarab-vision-poster-1600x900.png'))
  console.log('✓ alarab-vision-poster-1600x900.png (web display)')

  // 2. WebP version (much smaller, modern format)
  await sharp(srcBuf)
    .resize(1600, 900, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(OUT_DIR, 'alarab-vision-poster-1600x900.webp'))
  console.log('✓ alarab-vision-poster-1600x900.webp (modern format)')

  // 3. Mobile thumbnail (800x450, for mobile loading)
  await sharp(srcBuf)
    .resize(800, 450, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT_DIR, 'alarab-vision-poster-800x450.webp'))
  console.log('✓ alarab-vision-poster-800x450.webp (mobile)')

  // Summary
  for (const f of ['alarab-vision-poster-1600x900.png', 'alarab-vision-poster-1600x900.webp', 'alarab-vision-poster-800x450.webp']) {
    const p = path.join(OUT_DIR, f)
    const stat = await fs.stat(p)
    const m = await sharp(p).metadata()
    console.log(`  ${f}: ${m.width}x${m.height} | ${(stat.size/1024).toFixed(1)} KB`)
  }
}
main().catch(e => { console.error(e); process.exit(1) })
