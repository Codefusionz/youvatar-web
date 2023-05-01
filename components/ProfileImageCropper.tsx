import { getSingedUrl } from '@/utils/helpers'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Spinner from './Spinner'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export default function App({ userId }) {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const { data: session } = useSession()
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined)
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }

    previewCanvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)

      setUploading(true)

      const profileImageHex = userId + '-profile'
      const profileImageUrl = await getSingedUrl(profileImageHex)

      await axios.put(profileImageUrl, blob, {
        headers: {
          'Content-Type': 'image/png',
        },
      })

      await axios.patch(`/api/users/${session.sub}`, {
        image: profileImageHex,
      })
      setImgSrc('')
      setCompletedCrop(undefined)
      setUploading(false)
    })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0
        )
      }
    },
    100,
    [completedCrop]
  )

  return (
    <div className="w-full">
      <div className="text-primary w-full text-left">
        <button onClick={() => fileInputRef.current.click()}>
          Change profile picture
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onSelectFile}
          style={{ display: 'none' }}
        />
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          minHeight={300}
          minWidth={300}
          circularCrop
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${1}) rotate(${0}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div className="hidden">
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={onDownloadCropClick}
              disabled={uploading}
              className="w-32 bg-primary  disabled:bg-secondary text-white rounded-md mt-6 p-2 font-semibold flex items-center justify-center"
            >
              {uploading && <Spinner height={19} width={19} color="#fff" />}
              Save
            </button>
          </div>
        </>
      )}
    </div>
  )
}
