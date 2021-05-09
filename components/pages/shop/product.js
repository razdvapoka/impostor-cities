import { useState, useRef } from 'react'
import { useMouse } from 'react-use'
import { Layout } from '@/components'
import Image from 'next/image'
import { useEmblaCarousel } from 'embla-carousel/react'
import cn from 'classnames'
import styles from './styles.module.scss'

const OverlayButton = ({ disabled, handleClick, className, isReversed }) => {
  const ref = useRef(null)
  const { elX, elY } = useMouse(ref, { whenHovered: true })
  return (
    <button
      ref={ref}
      className={cn(
        'absolute top-0 h-full w-1/2 border-none bg-none',
        styles.overlayButton,
        className
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      <div
        className={cn(styles.overlayButtonCursor, 'absolute')}
        style={{
          left: elX,
          top: elY,
          transform: `translate(-50%, -50%) scale(${
            isReversed ? '-1' : '1'
          }, 1)`,
        }}
      />
    </button>
  )
}

const Slider = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const scrollNext = () => {
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext()
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }
  const scrollPrev = () => {
    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev()
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  const isPrevDisabled = emblaApi ? !emblaApi.canScrollPrev() : false
  const isNextDisabled = emblaApi ? !emblaApi.canScrollNext() : false

  return (
    <div className="relative">
      <div className={cn('overlay z-10', styles.overlay)}>
        <OverlayButton
          disabled={isPrevDisabled}
          handleClick={scrollPrev}
          className="left-0"
          isReversed
        />
        <OverlayButton
          disabled={isNextDisabled}
          handleClick={scrollNext}
          className="right-0"
        />
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>
    </div>
  )
}

const Product = ({ commonData, product }) => {
  const images = product.en.images
  return (
    <Layout {...commonData}>
      <div className="mt-22 my-grid">
        <div className="w-4/8">
          <Slider>
            {images.map((image, imageIndex) => (
              <div key={imageIndex} className="embla__slide">
                <div className="aspect-w-1 aspect-h-1">
                  <Image layout="fill" src={image.src} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  )
}

export default Product
