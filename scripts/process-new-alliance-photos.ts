import sharp from 'sharp'

async function main() {
  await sharp('/home/z/my-project/upload/pasted_image_1788950148947.png')
    .resize(600, 400, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 80 })
    .toFile('/home/z/my-project/public/partners-photos/partner-5.jpg')
  console.log('Generated partner-5.jpg')

  await sharp('/home/z/my-project/upload/pasted_image_1788950172822.png')
    .resize(600, 400, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 80 })
    .toFile('/home/z/my-project/public/partners-photos/partner-6.jpg')
  console.log('Generated partner-6.jpg')
}

main().catch(console.error)
