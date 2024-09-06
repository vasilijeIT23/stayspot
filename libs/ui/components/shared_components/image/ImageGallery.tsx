import { CldImage } from 'next-cloudinary'

const ImageGallery = ({ images }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {images.map((image, index) => (
        <CldImage
          key={index}
          width="200"
          height="160"
          src={image}
          sizes="100vw"
          alt={`Image ${index}`}
          style={{ borderRadius: '8px' }}
        />
      ))}
    </div>
  )
}

export default ImageGallery
