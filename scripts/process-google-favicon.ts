import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const SRC = '/home/z/my-project/upload/AlArab_Twitter_X_1600x900  2026.png'
const OUT_DIR = '/home/z/my-project/public'

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const srcBuf = await fs.readFile(SRC)
  const meta = await sharp(srcBuf).metadata()
  console.log('Source:', meta.width, 'x', meta.height)

  // The coin is in the center of 1600x900. Extract a tight square on the coin.
  // The coin takes ~700-750px wide in the center of the 1600x900 image.
  // To get a tighter crop on just the coin (excludes empty black bg):
  // Center 800x800 starting at left=400, top=50
  const TIGHT_EXTRACT = { left: 400, top: 50, width: 800, height: 800 }

  // === GOOGLE SEARCH-OPTIMIZED FAVICONS ===
  // Google uses 16x16 in search results (and sometimes 32x32).
  // The key is: clear, high-contrast, recognizable at 16x16.
  // We'll use the tight crop on the coin to maximize visible detail.

  // 1. favicon-16x16.png — Google search primary size
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(16, 16, { fit: 'cover', position: 'center' })
    .png({ quality: 100, compressionLevel: 9, palette: false })
    .toFile(path.join(OUT_DIR, 'favicon-16x16.png'))
  console.log('✓ favicon-16x16.png (Google search primary)')

  // 2. favicon-32x32.png — Google search high-DPI
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(32, 32, { fit: 'cover', position: 'center' })
    .png({ quality: 100, compressionLevel: 9, palette: false })
    .toFile(path.join(OUT_DIR, 'favicon-32x32.png'))
  console.log('✓ favicon-32x32.png (Google search high-DPI)')

  // 3. favicon-48x48.png — Google search extra size (legacy support)
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(48, 48, { fit: 'cover', position: 'center' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'favicon-48x48.png'))
  console.log('✓ favicon-48x48.png (legacy)')

  // 4. favicon-96x96.png — Browser tab high-res
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(96, 96, { fit: 'cover', position: 'center' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'favicon-96x96.png'))
  console.log('✓ favicon-96x96.png (browser tab high-res)')

  // 5. favicon.png — overwrite the legacy 96x96
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(96, 96, { fit: 'cover', position: 'center' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'favicon.png'))
  console.log('✓ favicon.png (legacy 96x96)')

  // 6. apple-touch-icon.png — 180x180 for iOS home screen
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(180, 180, { fit: 'cover', position: 'center' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'apple-touch-icon.png'))
  console.log('✓ apple-touch-icon.png (iOS home screen)')

  // 7. android-chrome-192x192.png — Android home screen
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(192, 192, { fit: 'cover', position: 'center' })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'android-chrome-192x192.png'))
  console.log('✓ android-chrome-192x192.png (Android home screen)')

  // 8. android-chrome-512x512.png — Android PWA splash
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(512, 512, { fit: 'cover', position: 'center' })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'android-chrome-512x512.png'))
  console.log('✓ android-chrome-512x512.png (PWA splash)')

  // 9. icon-512.png — high-res generic
  await sharp(srcBuf)
    .extract(TIGHT_EXTRACT)
    .resize(512, 512, { fit: 'cover', position: 'center' })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'icon-512.png'))
  console.log('✓ icon-512.png (high-res)')

  // 10. favicon.ico — multi-size ICO (16, 32, 48) — Google's recommended ICO sizes
  //    ICO with just 3 sizes is more efficient than 7 sizes for Google search
  const icoSizes = [16, 32, 48]
  const pngBuffers: Buffer[] = []
  for (const size of icoSizes) {
    const buf = await sharp(srcBuf)
      .extract(TIGHT_EXTRACT)
      .resize(size, size, { fit: 'cover', position: 'center' })
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer()
    pngBuffers.push(buf)
  }

  const headerSize = 6
  const dirEntrySize = 16
  const dirSize = dirEntrySize * icoSizes.length
  const dataOffset = headerSize + dirSize
  const totalSize = pngBuffers.reduce((acc, buf) => acc + buf.length, 0) + dataOffset
  const ico = Buffer.alloc(totalSize)
  let pos = 0

  // ICO header
  ico.writeUInt16LE(0, pos); pos += 2 // reserved
  ico.writeUInt16LE(1, pos); pos += 2 // type (1 = icon)
  ico.writeUInt16LE(icoSizes.length, pos); pos += 2 // image count

  // Directory entries + image data
  let currentOffset = dataOffset
  for (let i = 0; i < icoSizes.length; i++) {
    const size = icoSizes[i]
    const buf = pngBuffers[i]
    ico.writeUInt8(size >= 256 ? 0 : size, pos); pos += 1 // width
    ico.writeUInt8(size >= 256 ? 0 : size, pos); pos += 1 // height
    ico.writeUInt8(0, pos); pos += 1 // colors
    ico.writeUInt8(0, pos); pos += 1 // reserved
    ico.writeUInt16LE(1, pos); pos += 2 // color planes
    ico.writeUInt16LE(32, pos); pos += 2 // bits per pixel
    ico.writeUInt32LE(buf.length, pos); pos += 4 // image size
    ico.writeUInt32LE(currentOffset, pos); pos += 4 // offset
    buf.copy(ico, currentOffset)
    currentOffset += buf.length
  }

  await fs.writeFile(path.join(OUT_DIR, 'favicon.ico'), ico)
  console.log(`✓ favicon.ico (3 sizes: 16, 32, 48 — Google's recommended ICO sizes)`)

  // Final summary
  const files = [
    'favicon-16x16.png', 'favicon-32x32.png', 'favicon-48x48.png',
    'favicon-96x96.png', 'favicon.png', 'apple-touch-icon.png',
    'android-chrome-192x192.png', 'android-chrome-512x512.png',
    'icon-512.png', 'favicon.ico'
  ]
  console.log('\nFinal files:')
  for (const f of files) {
    const p = path.join(OUT_DIR, f)
    const stat = await fs.stat(p)
    if (f.endsWith('.ico')) {
      console.log(`  ${f}: ${(stat.size/1024).toFixed(1)} KB (multi-size ICO)`)
    } else {
      const m = await sharp(p).metadata()
      console.log(`  ${f}: ${m.width}x${m.height} | ${(stat.size/1024).toFixed(1)} KB`)
    }
  }
}

main().catch(e => { console.error(e); process.exit(1) })
