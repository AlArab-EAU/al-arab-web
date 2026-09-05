/**
 * Improved coin background removal.
 *
 * Algorithm:
 * 1. Sample the 4 corner pixels to determine the actual background color
 * 2. Remove all pixels within a tolerance of that background color
 * 3. Also remove pixels that are "near-background" (similar brightness/saturation)
 * 4. Use a distance metric in RGB space for robust detection
 *
 * This fixes the previous issues:
 *  - ARAMCO coin had green background (kept because it was "colored")
 *  - DEFI coin had black background (kept because it was "dark" = shadow)
 */
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

interface ProcessSpec {
  uploadPath: string
  sourceName: string
  outputName: string
}

const SPECS: ProcessSpec[] = [
  {
    uploadPath: '/home/z/my-project/upload/Aramco.png',
    sourceName: 'alarab-coin-aramco.png',
    outputName: 'alarab-coin-aramco-clean.png',
  },
  {
    uploadPath: '/home/z/my-project/upload/Al-arab Oficial 2.png',
    sourceName: 'alarab-coin-defi.png',
    outputName: 'alarab-coin-defi-clean.png',
  },
]

interface RGB {
  r: number
  g: number
  b: number
}

function colorDistance(a: RGB, b: RGB): number {
  // Weighted Euclidean distance (accounts for human perception)
  const dr = a.r - b.r
  const dg = a.g - b.g
  const db = a.b - b.b
  return Math.sqrt(2 * dr * dr + 4 * dg * dg + 3 * db * db)
}

async function processCoin(spec: ProcessSpec): Promise<void> {
  const sourcePath = path.join(PUBLIC_DIR, spec.sourceName)
  const outputPath = path.join(PUBLIC_DIR, spec.outputName)

  fs.copyFileSync(spec.uploadPath, sourcePath)

  const { data, info } = await sharp(sourcePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info

  // Step 1: Sample background color from all 4 corners + edge midpoints
  const samplePoints: [number, number][] = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
    [Math.floor(width / 2), 0],
    [Math.floor(width / 2), height - 1],
    [0, Math.floor(height / 2)],
    [width - 1, Math.floor(height / 2)],
  ]

  const bgSamples: RGB[] = samplePoints.map(([x, y]) => {
    const i = (y * width + x) * channels
    return { r: data[i], g: data[i + 1], b: data[i + 2] }
  })

  // Average background color
  const avgBg: RGB = {
    r: Math.round(bgSamples.reduce((s, c) => s + c.r, 0) / bgSamples.length),
    g: Math.round(bgSamples.reduce((s, c) => s + c.g, 0) / bgSamples.length),
    b: Math.round(bgSamples.reduce((s, c) => s + c.b, 0) / bgSamples.length),
  }

  console.log(`${spec.outputName}: detected background rgb(${avgBg.r}, ${avgBg.g}, ${avgBg.b})`)

  // Step 2: For each pixel, decide if it's background or coin
  const out = Buffer.alloc(width * height * channels)
  const TOLERANCE = 80 // color distance threshold

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels]
    const g = data[i * channels + 1]
    const b = data[i * channels + 2]
    const px: RGB = { r, g, b }

    const dist = colorDistance(px, avgBg)

    // Background if within tolerance of detected bg color
    const isBackground = dist < TOLERANCE

    // Also check: is this pixel similar to any of the corner samples?
    // (handles gradients in background)
    let minCornerDist = Infinity
    for (const c of bgSamples) {
      const d = colorDistance(px, c)
      if (d < minCornerDist) minCornerDist = d
    }
    const isNearAnyCorner = minCornerDist < TOLERANCE

    // Gold detection: keep gold pixels (high R, moderate G, low B)
    const isGold = r > 130 && g > 90 && b < 150 && r > g && g > b

    // Keep if NOT background AND NOT near corner AND (is gold OR has high saturation)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min
    const isColored = sat > 40

    const keep = !isBackground && !isNearAnyCorner && (isGold || isColored || (max < 50 && max > 20))

    out[i * channels] = r
    out[i * channels + 1] = g
    out[i * channels + 2] = b
    out[i * channels + 3] = keep ? 255 : 0
  }

  // Step 3: Trim transparent borders
  await sharp(out, { raw: { width, height, channels } })
    .trim({ threshold: 20, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outputPath)

  const meta = await sharp(outputPath).metadata()
  console.log(`  → ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)

  // Step 4: Verify corner transparency
  const verify = await sharp(outputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const vInfo = verify.info
  const cornerCheck = [0, 0, 0, 0].map((_, idx) => {
    const x = idx % 2 === 0 ? 0 : vInfo.width - 1
    const y = idx < 2 ? 0 : vInfo.height - 1
    const i = (y * vInfo.width + x) * vInfo.channels
    return verify.data[i + 3]
  })
  console.log(`  → corner alphas: [${cornerCheck.join(', ')}] (should all be 0)`)
}

async function main() {
  for (const spec of SPECS) {
    console.log(`\nProcessing ${spec.outputName}...`)
    await processCoin(spec)
  }
  console.log('\nAll coins processed.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
