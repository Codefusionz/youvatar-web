import { s3 } from '@/lib/aws'
import { getToken } from 'next-auth/jwt'

export default async function (req, res) {
  const token = await getToken({ req })

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  try {
    switch (req.method) {
      case 'GET':
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: req.query.key,
          ContentType: 'image/jpg',
          ACL: 'public-read',
          Expires: 600,
        }
        const signedUrl = await s3.getSignedUrlPromise('putObject', params)
        res.status(200).send({ success: true, uploadUrl: signedUrl })
        break

      default:
        res.status(405).json({ message: 'This request cannot be processed' })
        break
    }
  } catch (error) {
    console.log(error)
    res.status(503).send({ message: 'Something went wrong' })
  }
}
