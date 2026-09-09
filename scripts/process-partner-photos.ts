import sharp from 'sharp'
import path from 'path'

const PUBLIC = '/home/z/my-project/public/partners-photos'

async function process(src: string, dst: string, w: number, h: number) {
  await sharp(src).resize(w, h, { fit: 'cover', position: 'center' }).jpeg({ quality: 80 }).toFile(path.join(PUBLIC, dst))
  console.log('Generated: ' + dst)
}

async function main() {
  await process('/home/z/my-project/upload/pasted_image_1788737815563.png', 'partner-1.jpg', 600, 400)
  await process('/home/z/my-project/upload/pasted_image_1788737955227.png', 'partner-2.jpg', 600, 400)
  await process('/home/z/my-project/upload/pasted_image_1788738050305.png', 'partner-3.jpg', 600, 400)
  await process('/home/z/my-project/upload/pasted_image_1788737754776.png', 'partner-4.jpg', 600, 400)
}

main().catch(console.error)
