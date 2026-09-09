import sharp from 'sharp'

async function main() {
  // China = partner-1 (already exists, keep as is)
  // Russia = partner-2 (already exists, keep as is)
  // Arabs = partner-3 (already exists, keep as is)
  // USA = new image from upload

  // Process USA photo as partner-4 (replacing the old AlArab showcase)
  await sharp('/home/z/my-project/upload/pasted_image_1788950084437.png')
    .resize(600, 400, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 80 })
    .toFile('/home/z/my-project/public/partners-photos/partner-4.jpg')
  console.log('Generated partner-4.jpg (USA)')

  // Delete old partner-5 and partner-6
  const fs = await import('fs')
  try { fs.unlinkSync('/home/z/my-project/public/partners-photos/partner-5.jpg') } catch {}
  try { fs.unlinkSync('/home/z/my-project/public/partners-photos/partner-6.jpg') } catch {}
  try { fs.unlinkSync('/home/z/my-project/public/partners-photos/partner-5-src.png') } catch {}
  try { fs.unlinkSync('/home/z/my-project/public/partners-photos/partner-6-src.png') } catch {}
  console.log('Cleaned up old partner-5 and partner-6')
}

main().catch(console.error)
