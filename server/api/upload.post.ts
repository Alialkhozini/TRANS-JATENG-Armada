import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const cloudName = config.cloudinaryCloudName
  const apiKey = config.cloudinaryApiKey
  const apiSecret = config.cloudinaryApiSecret

  if (!cloudName || !apiKey || !apiSecret) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cloudinary credentials are not configured on the server.'
    })
  }

  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded.'
    })
  }

  // Find the file block
  const fileBlock = files.find(f => f.name === 'file')
  if (!fileBlock || !fileBlock.data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Form data must contain a "file" field.'
    })
  }

  // Convert buffer to data URI
  const base64Data = fileBlock.data.toString('base64')
  const mimeType = fileBlock.type || 'image/jpeg'
  const dataUri = `data:${mimeType};base64,${base64Data}`

  const timestamp = Math.round(new Date().getTime() / 1000)
  
  // Create signature
  const stringToSign = `timestamp=${timestamp}${apiSecret}`
  const signature = crypto
    .createHash('sha1')
    .update(stringToSign)
    .digest('hex')

  // Build FormData for Cloudinary API
  const formData = new FormData()
  formData.append('file', dataUri)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp.toString())
  formData.append('signature', signature)

  try {
    const response: any = await $fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    })
    
    return {
      url: response.secure_url || response.url
    }
  } catch (err: any) {
    console.error('Cloudinary upload error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err.data?.error?.message || 'Failed to upload to Cloudinary.'
    })
  }
})
