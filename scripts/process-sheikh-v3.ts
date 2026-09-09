/**
 * Final Sheikh Zayed processing v3:
 * - Use chromakey approach: sample background from corners
 * - Remove ALL background (gray, dark shadows, flag colors)
 * - Keep ONLY: skin, white clothing, gold trim, black bisht (but NOT dark background)
 * - Heavy feathering for seamless blending
 * - The key issue: distinguish dark bisht (keep) from dark background (remove)
 *   Solution: dark bisht is surrounded by gold trim and skin, while dark background
 *   is surrounded by transparent/light areas. Use proximity-based keep.
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const SOURCE = '/home/z/my-project/upload/Sheikh Zayed MBZ.png'
const OUTPUT = path.join(process.cwd(), 'public', 'sheikh-zayed-clean.png')

async function main() {
  // Resize for web
  const { data, info } = await sharp(SOURCE)
    .resize(600, 700, { fit: 'cover', position: 'top' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const out = Buffer.alloc(width * height * channels)

  // First pass: identify background vs foreground
  const isBackground = new Uint8Array(width * height)

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]
    const a = data[i * channels + 3]

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min

    // Light gray background (studio backdrop)
    const isLightBg = max > 160 && sat < 50 && min > 130

    // Transparent (original alpha)
    const isTransparent = a < 50

    // Flag colors
    const isFlagRed = r > 120 && g < 90 && b < 90 && sat > 40
    const isFlagGreen = g > 90 && r < 100 && b < 100 && sat > 30
    const isFlagWhite = max > 200 && sat < 25

    // Very dark background (shadows on backdrop)
    const isDarkBg = max < 50 && min < 30 && sat < 15

    isBackground[i] = (isLightBg || isTransparent || isFlagRed || isFlagGreen || isFlagWhite || isDarkBg) ? 1 : 0
  }

  // Second pass: flood fill from edges to find connected background regions
  // Mark ALL background-connected dark pixels as background too
  const visited = new Uint8Array(width * height)
  const queue: number[] = []

  // Start from all edge pixels
  for (let x = 0; x < width; x++) {
    if (isBackground[x]) { queue.push(x); visited[x] = 1; }
    const bottomIdx = (height - 1) * width + x
    if (isBackground[bottomIdx]) { queue.push(bottomIdx); visited[bottomIdx] = 1; }
  }
  for (let y = 0; y < height; y++) {
    const leftIdx = y * width
    if (isBackground[leftIdx]) { queue.push(leftIdx); visited[leftIdx] = 1; }
    const rightIdx = y * width + width - 1
    if (isBackground[rightIdx]) { queue.push(rightIdx); visited[rightIdx] = 1; }
  }

  // BFS flood fill — expand background to nearby dark pixels
  while (queue.length > 0) {
    const idx = queue.pop()!
    const x = idx % width
    const y = Math.floor(idx / width)

    const neighbors = [
      [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1],
    ]

    for (const [nx, ny] of neighbors) {
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
      const nIdx = ny * width + nx
      if (visited[nIdx]) continue

      const nr = data[nIdx * channels]
      const ng = data[nIdx * channels + 1]
      const nb = data[nIdx * channels + 2]
      const na = data[nIdx * channels + 3]
      const nMax = Math.max(nr, ng, nb)
      const nMin = Math.min(nr, ng, nb)
      const nSat = nMax - nMin

      // If neighbor is background or dark and not clearly part of the figure
      if (isBackground[nIdx] || (nMax < 60 && nSat < 20 && na < 100)) {
        visited[nIdx] = 1
        isBackground[nIdx] = 1
        queue.push(nIdx)
      }
    }
  }

  // Third pass: create output — keep only non-background pixels
  for (let i = 0; i < width * height; i++) {
    if (!isBackground[i]) {
      out[i * channels] = data[i * channels]
      out[i * channels + 1] = data[i * channels + 1]
      out[i * channels + 2] = data[i * channels + 2]
      out[i * channels + 3] = 255
    } else {
      out[i * channels + 3] = 0
    }
  }

  // Fourth pass: heavy feathering — any opaque pixel next to transparent gets alpha gradient
  for (let pass = 0; pass < 3; pass++) {
    const newAlpha = Buffer.alloc(width * height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x
        const ci = idx * channels
        if (out[ci + 3] === 0) {
          newAlpha[idx] = 0
          continue
        }

        // Count transparent neighbors
        let transparentCount = 0
        let totalCount = 0
        for (let dy = -4; dy <= 4; dy++) {
          for (let dx = -4; dx <= 4; dx++) {
            const nx = x + dx
            const ny = y + dy
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
            totalCount++
            const ni = (ny * width + nx) * channels
            if (out[ni + 3] === 0) transparentCount++
          }
        }

        const ratio = transparentCount / totalCount
        if (ratio > 0.1) {
          newAlpha[idx] = Math.round(255 * (1 - ratio * 1.5))
        } else {
          newAlpha[idx] = 255
        }
      }
    }

    // Apply new alpha
    for (let i = 0; i < width * height; i++) {
      out[i * channels + 3] = Math.min(out[i * channels + 3], newAlpha[i])
    }
  }

  // Edge fade
  const fadeWidth = 40
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      if (out[i + 3] > 0) {
        if (x < fadeWidth) out[i + 3] = Math.min(out[i + 3], Math.round(255 * (x / fadeWidth)))
        if (x > width - fadeWidth) out[i + 3] = Math.min(out[i + 3], Math.round(255 * ((width - x) / fadeWidth)))
        if (y > height - fadeWidth) out[i + 3] = Math.min(out[i + 3], Math.round(255 * ((height - y) / fadeWidth)))
        if (y < 15) out[i + 3] = Math.min(out[i + 3], Math.round(255 * (y / 15)))
      }
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png()
    .toFile(OUTPUT)

  const meta = await sharp(OUTPUT).metadata()
  console.log(`Generated: ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)

  // Stats
  const verify = await sharp(OUTPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  let opaque = 0, darkOpaque = 0, semi = 0
  for (let i = 0; i < verify.info.width * verify.info.height; i++) {
    const a = verify.data[i * verify.info.channels + 3]
    if (a > 200) {
      opaque++
      const r = verify.data[i * verify.info.channels]
      const g = verify.data[i * verify.info.channels + 1]
      const b = verify.data[i * verify.info.channels + 2]
      if (r < 50 && g < 50 && b < 50) darkOpaque++
    }
    else if (a > 0) semi++
  }
  console.log(`Opaque: ${opaque}, Dark opaque: ${darkOpaque} (${(darkOpaque/opaque*100).toFixed(1)}%), Semi: ${semi}`)
}

main().catch((err) => { console.error(err); process.exit(1); })
