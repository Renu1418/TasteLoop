
import ImageKit, { toFile } from '@imagekit/nodejs'

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

export const uploadFile = async (file, fileName) => {
  try {
    const imageKitFile = await toFile(file, fileName)

    const response = await client.files.upload({
      file: imageKitFile,
      fileName,
    })

    if (!response?.url) {
      throw new Error('ImageKit did not return a file URL.')
    }

    return response
  } catch (error) {
    console.error('ImageKit upload error:', error)
    throw error
  }
}
