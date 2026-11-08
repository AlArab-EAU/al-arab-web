import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'

const SRC = '/home/z/my-project/upload/AlArab_Twitter_X_1600x900  2026.png'
const OUT_DIR = '/home/z/my-project/public'

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  const srcBuf = await fs.readFile(SRC)
  const meta = await sharp(srcBuf).metadata()
  console.log('Source:', meta.width, 'x', meta.height, meta.hasAlpha ? 'alpha' : 'no-alpha')

  // The coin is centered in 1600x900. Extract central square (900x900) then resize.
  // Source: extract left=350, top=0, width=900, height=900 (center square)
  const EXTRACT = { left: 350, top: 0, width: 900, height: 900 }

  // Generate standard favicon sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'favicon.png', size: 96 },           // overwrite existing
    { name: 'apple-touch-icon.png', size: 180 }, // iOS
    { name: 'android-chrome-192x192.png', size: 192 }, // Android
    { name: 'android-chrome-512x512.png', size: 512 },  // Android hi-res
    { name: 'icon-512.png', size: 512 },
  ]

  for (const { name, size } of sizes) {
    await sharp(srcBuf)
      .extract(EXTRACT)
      .resize(size, size, { fit: 'cover', position: 'center' })
      .png({ quality: 92, compressionLevel: 9 })
      .toFile(path.join(OUT_DIR, name))
    console.log(`✓ ${name} (${size}x${size})`)
  }

  // Generate .ico file with multiple sizes for legacy browser support
  // .ico format: header + multiple PNG entries
  const icoSizes = [16, 32, 48, 64, 96, 128, 256]
  const pngBuffers: Buffer[] = []
  for (const size of icoSizes) {
    const buf = await sharp(srcBuf)
      .extract(EXTRACT)
      .resize(size, size, { fit: 'cover', position: 'center' })
      .png({ quality: 92, compressionLevel: 9 })
      .toBuffer()
    pngBuffers.push(buf)
  }

  // ICO file structure:
  // - 6-byte header
  // - 16-byte directory entry per image
  // - PNG image data
  const headerSize = 6
  const dirEntrySize = 16
  const dirSize = dirEntrySize * icoSizes.length
  const dataOffset = headerSize + dirSize

  const totalSize = pngBuffers.reduce((acc, buf) => acc + buf.length, 0) + dataOffset
  const ico = Buffer.alloc(totalSize)
  let pos = 0

  // Header (ICONDIR)
  ico.writeUInt16LE(0, pos); pos += 2 // reserved
  ico.writeUInt16LE(1, pos); pos += 2 // type (1 = icon)
  ico.writeUInt16LE(icoSizes.length, pos); pos += 2 // image count

  // Directory entries + data
  let currentOffset = dataOffset
  for (let i = 0; i < icoSizes.length; i++) {
    const size = icoSizes[i]
    const buf = pngBuffers[i]
    // ICONDIRENTRY
    ico.writeUInt8(size >= 256 ? 0 : size, pos); pos += 1 // width
    ico.writeUInt8(size >= 256 ? 0 : size, pos); pos += 1 // height
    ico.writeUInt8(0, pos); pos += 1 // colors (0 for PNG)
    ico.writeUInt8(0, pos); pos += 1 // reserved
    ico.writeUInt16LE(1, pos); pos += 2 // color planes
    ico.writeUInt16LE(32, pos); pos += 2 // bits per pixel
    ico.writeUInt32LE(buf.length, pos); pos += 4 // image size
    ico.writeUInt32LE(currentOffset, pos); pos += 4 // offset to image data
    buf.copy(ico, currentOffset)
    currentOffset += buf.length
  }

  await fs.writeFile(path.join(OUT_DIR, 'favicon.ico'), ico)
  console.log(`✓ favicon.ico (${icoSizes.length} sizes embedded)`)

  // Final output summary
  const allFiles = [...sizes.map(s => s.name), 'favicon.ico']
  console.log('\nFinal files:')
  for (const f of allFiles) {
    const p = path.join(OUT_DIR, f)
    const stat = await fs.stat(p)
    if (f.endsWith('.ico')) {
      console.log(`  ${f}: ${(stat.size/1024).toFixed(1)} KB (multi-size)`)
    } else {
      const m = await sharp(p).metadata()
      console.log(`  ${f}: ${m.width}x${m.height} | ${(stat.size/1024).toFixed(1)} KB`)
    }
  }
}

main().catch(e => { console.error(e); process.exit(1) })
