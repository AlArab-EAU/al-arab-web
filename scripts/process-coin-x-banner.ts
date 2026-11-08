import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const SRC = '/home/z/my-project/upload/AlArab_Twitter_X_1600x900  2026.png'
const OUT_DIR = '/home/z/my-project/public'

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  const srcBuf = await fs.readFile(SRC)
  const meta = await sharp(srcBuf).metadata()
  console.log('Source:', meta.width, 'x', meta.height, meta.format, meta.hasAlpha ? 'alpha' : 'no-alpha')

  // Detect the coin (non-black region) and use it as a centered crop reference.
  // We will produce the following outputs:
  //  1. alarab-x-banner-1500x500.png  — X official banner (3:1) — center-crop
  //  2. alarab-coin-profile-400x400.png — square profile pic (1:1) — center-crop, tight on coin
  //  3. alarab-coin-display-1600x900.png — web display (16:9), keep as-is, optimize
  //  4. alarab-coin-icon-256x256.png    — favicon-style square icon
  //  5. alarab-coin-circle-512x512.png — circular PNG with transparent bg (for profile display)

  // 1) X official banner: 1500x500 (3:1) — center-crop from 1600x900
  // Source aspect 1600/900 = 1.778, target 1500/500 = 3.0
  // We need to crop horizontally — take a 1500-wide center slice.
  // 1500/1600 of 900 height = 843.75 → resize to 1500x843 then crop center to 1500x500.
  await sharp(srcBuf)
    .resize(1500, 844, { fit: 'cover', position: 'center' })
    .extract({ left: 0, top: 172, width: 1500, height: 500 })  // center 500 of 844
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'alarab-x-banner-1500x500.png'))
  console.log('✓ alarab-x-banner-1500x500.png (X banner 3:1)')

  // 2) Profile picture: 400x400 square — center-crop the coin
  // Source 1600x900, target 1:1 — extract central 900x900 square then resize.
  await sharp(srcBuf)
    .extract({ left: 350, top: 0, width: 900, height: 900 })  // center 900x900 square
    .resize(400, 400, { fit: 'cover', position: 'center' })
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'alarab-coin-profile-400x400.png'))
  console.log('✓ alarab-coin-profile-400x400.png (profile pic 1:1)')

  // 3) Web display: 1600x900 optimized (keep original aspect, reduce size)
  await sharp(srcBuf)
    .resize(1600, 900, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'alarab-coin-display-1600x900.png'))
  console.log('✓ alarab-coin-display-1600x900.png (web display 16:9)')

  // 4) Favicon-style icon: 256x256
  await sharp(srcBuf)
    .extract({ left: 350, top: 0, width: 900, height: 900 })
    .resize(256, 256, { fit: 'cover', position: 'center' })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'alarab-coin-icon-256x256.png'))
  console.log('✓ alarab-coin-icon-256x256.png (favicon 1:1)')

  // 5) Circular coin with transparent background (512x512) for floating display
  // Extract center square, make a circle mask.
  const circleSvg = `<svg width="512" height="512"><circle cx="256" cy="256" r="256" fill="white"/></svg>`
  const circleBuffer = Buffer.from(circleSvg)
  await sharp(srcBuf)
    .extract({ left: 350, top: 0, width: 900, height: 900 })
    .resize(512, 512, { fit: 'cover', position: 'center' })
    .composite([{ input: circleBuffer, blend: 'dest-in' }])
    .png({ quality: 92, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'alarab-coin-circle-512x512.png'))
  console.log('✓ alarab-coin-circle-512x512.png (circular transparent)')

  // List output files with sizes
  const files = [
    'alarab-x-banner-1500x500.png',
    'alarab-coin-profile-400x400.png',
    'alarab-coin-display-1600x900.png',
    'alarab-coin-icon-256x256.png',
    'alarab-coin-circle-512x512.png',
  ]
  console.log('\nFinal dimensions:')
  for (const f of files) {
    const p = path.join(OUT_DIR, f)
    const stat = await fs.stat(p)
    const m = await sharp(p).metadata()
    console.log(`  ${f}: ${m.width}x${m.height} | ${(stat.size/1024).toFixed(1)} KB`)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
