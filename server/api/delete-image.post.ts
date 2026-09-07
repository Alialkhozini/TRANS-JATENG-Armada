import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const cloudName = config.cloudinaryCloudName
  const apiKey = config.cloudinaryApiKey
  const apiSecret = config.cloudinaryApiSecret

  if (!cloudName || !apiKey || !apiSecret) {
    return {
      success: false,
      message: 'Cloudinary credentials are not configured on the server.'
    }
  }

  const body = await readBody(event)
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Request body is required.'
    })
  }

  // Support single url/public_id or array of urls
  const urls: string[] = []
  if (Array.isArray(body.urls)) {
    urls.push(...body.urls)
  } else if (typeof body.url === 'string') {
    urls.push(body.url)
  }

  if (urls.length === 0 && body.public_id) {
    urls.push(body.public_id)
  }

  const extractPublicId = (targetUrl: string): string | null => {
    if (!targetUrl) return null
    if (!targetUrl.includes('cloudinary.com')) {
      // If directly a public_id
      return targetUrl.startsWith('http') ? null : targetUrl
    }
    const parts = targetUrl.split('/image/upload/')
    if (parts.length < 2 || !parts[1]) return null
    let path = parts[1]
    // Strip version prefix e.g. v123456789/
    path = path.replace(/^v\d+\//, '')
    // Strip file extension e.g. .jpg, .png
    path = path.replace(/\.[^/.]+$/, '')
    return path
  }

  const deleteResults: { id: string; result: string }[] = []

  for (const item of urls) {
    const publicId = extractPublicId(item)
    if (!publicId) continue

    const timestamp = Math.round(new Date().getTime() / 1000)
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto
      .createHash('sha1')
      .update(stringToSign)
      .digest('hex')

    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('api_key', apiKey)
    formData.append('timestamp', timestamp.toString())
    formData.append('signature', signature)

    try {
      const res: any = await $fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: 'POST',
        body: formData
      })
      deleteResults.push({ id: publicId, result: res?.result || 'ok' })
    } catch (err: any) {
      console.warn(`Failed to destroy Cloudinary image ${publicId}:`, err?.data || err?.message)
      deleteResults.push({ id: publicId, result: 'failed' })
    }
  }

  return {
    success: true,
    deleted: deleteResults
  }
})
