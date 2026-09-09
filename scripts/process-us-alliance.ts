import sharp from 'sharp'
import path from 'path'

async function process(src: string, dst: string, w: number, h: number) {
  await sharp(src).resize(w, h, { fit: 'cover', position: 'center' }).jpeg({ quality: 80 }).toFile(dst)
  console.log('Generated: ' + dst)
}

async function main() {
  await process('/home/z/my-project/upload/pasted_image_1788949241898.png', '/home/z/my-project/public/partners-photos/partner-5.jpg', 600, 400)
  await process('/home/z/my-project/upload/pasted_image_1788949283064.png', '/home/z/my-project/public/partners-photos/partner-6.jpg', 600, 400)
}

main().catch(console.error)
