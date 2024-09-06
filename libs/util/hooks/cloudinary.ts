import { useState } from 'react'
import crypto from 'crypto'

export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false)

  const generateSignature = (
    asset_id: string,
    version_id: string,
    timestamp: number,
  ) => {
    const stringToSign =
      'asset_id=' +
      asset_id +
      '&timestamp=' +
      timestamp +
      '&version_id=' +
      version_id

    return crypto
      .createHmac('sha1', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      .update(stringToSign)
      .digest('hex')
  }

  const upload = async (file: File) => {
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
      )

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      )

      if (!response.ok) {
        //console.log(response)
        const errorText = await response.text()
        throw new Error('Upload failed: ' + errorText)
      }
      //console.log(response)

      const data = await response.json()
      //console.log(data)
      const imageUrl = data.secure_url as string

      return { imageUrl, data }
    } catch (error) {
      console.log(error)
      throw new Error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const uploadMany = async (fileList: File[]) => {
    setUploading(true)

    try {
      const uploadPromises = Array.from(fileList).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
        )

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/stayspot/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        )

        if (!response.ok) {
          console.log(response)
          const errorText = await response.text()
          throw new Error('Upload failed: ' + errorText)
        }

        const data = await response.json()
        const imageUrl = data.secure_url as string

        return { imageUrl, data }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      return uploadedImages
    } catch (error) {
      console.log(error)
      throw new Error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const download = async (file: string) => {
    setUploading(true)

    try {
      const ids = file.split('   ')
      const asset_id = ids[0]
      const version_id = ids[1]
      const timestamp = Math.round(new Date().getTime() / 1000)
      const signature = generateSignature(asset_id, version_id, timestamp)
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/demo/download_backup?asset_id=${asset_id}&timestamp=${timestamp}&version_id=${version_id}&signature=${signature}&api_key=${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`,
        {
          method: 'GET',
        },
      )

      if (!response.ok) {
        console.log(response)
        const errorText = await response.text()
        throw new Error('Download failed: ' + errorText)
      }
      console.log(response)

      return response
    } catch (error) {
      console.log(error)
      throw new Error('Download failed')
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploadMany, download, uploading }
}
