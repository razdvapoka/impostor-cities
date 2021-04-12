import NextImage from 'next/image'
import cn from 'classnames'

const Image = ({ src, width, height, className }) => {
  return (
    <div
      className={cn('relative h-0 overflow-hidden', className)}
      style={{ paddingTop: `${(height / width) * 100}%` }}
    >
      <div className="overlay">
        <NextImage
          layout="responsive"
          src={src}
          width={width}
          height={height}
        />
      </div>
    </div>
  )
}

export default Image
