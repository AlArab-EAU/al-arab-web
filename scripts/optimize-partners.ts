/**
 * Optimize partner logos for web
 */
import sharp from 'sharp'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

async function main() {
  // GCRM logo — already 350x100, just optimize
  await sharp(path.join(PUBLIC_DIR, 'partner-gcrm.png'))
    .resize(280, 80, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'partner-gcrm-opt.png'))
  console.log('Generated partner-gcrm-opt.png')

  // QFS coin — resize from 4167x4167 to 200x200
  await sharp(path.join(PUBLIC_DIR, 'partner-qfs.png'))
    .resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'partner-qfs-opt.png'))
  console.log('Generated partner-qfs-opt.png')

  // QFS-GCRM alliance — resize from 687x1024 to 200x300
  await sharp(path.join(PUBLIC_DIR, 'partner-qfs-alliance.png'))
    .resize(200, 300, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'partner-qfs-alliance-opt.png'))
  console.log('Generated partner-qfs-alliance-opt.png')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
