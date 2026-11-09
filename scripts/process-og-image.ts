import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const SRC_POSTER = '/home/z/my-project/public/alarab-vision-poster-1600x900.png'
const SRC_COIN = '/home/z/my-project/public/alarab-coin-new-clean.png'
const OUT_DIR = '/home/z/my-project/public'

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  // 1. OG Image: 1200x630 — based on vision poster (already 16:9 ratio)
  await sharp(SRC_POSTER)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile(path.join(OUT_DIR, 'og-image.jpg'))
  console.log('✓ og-image.jpg (1200x630 — for Open Graph / Facebook)')

  // 2. Twitter Card: 1200x600 (Twitter's preferred aspect ratio)
  await sharp(SRC_POSTER)
    .resize(1200, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile(path.join(OUT_DIR, 'twitter-card.jpg'))
  console.log('✓ twitter-card.jpg (1200x600 — for Twitter Cards)')

  // 3. Apple Touch Icon Precomposed variant (square 180x180 from coin)
  await sharp(SRC_COIN)
    .resize(180, 180, { fit: 'cover', position: 'center' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'apple-touch-icon-precomposed.png'))
  console.log('✓ apple-touch-icon-precomposed.png (180x180 — legacy iOS)')

  // 4. LinkedIn share image (1200x627 — LinkedIn's preferred size)
  await sharp(SRC_POSTER)
    .resize(1200, 627, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90, progressive: true })
    .toFile(path.join(OUT_DIR, 'linkedin-share.jpg'))
  console.log('✓ linkedin-share.jpg (1200x627 — for LinkedIn)')

  // Final stats
  const files = ['og-image.jpg', 'twitter-card.jpg', 'apple-touch-icon-precomposed.png', 'linkedin-share.jpg']
  console.log('\nFinal files:')
  for (const f of files) {
    const p = path.join(OUT_DIR, f)
    const stat = await fs.stat(p)
    const m = await sharp(p).metadata()
    console.log(`  ${f}: ${m.width}x${m.height} | ${(stat.size/1024).toFixed(1)} KB`)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
