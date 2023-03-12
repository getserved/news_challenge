import React, { FC, useEffect, useState, useRef, Suspense } from 'react'
import $ from "./LazyImage.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component";

interface LazyImageProps {
    alt: string,
    src: string,
    placeholderSrc?: string,
    className?: string,
    timeout?: number
}

  
const LazyImage: FC<LazyImageProps> = ({ 
    alt, 
    src, 
    placeholderSrc = '/images/placeholder.jpg', 
    className,
    timeout = 3000
}) => {
    // imgError for handle Image fetching error
    const [imgError, setImgError] = useState<boolean>(false)
    // thumbnailSrc for handle timeout image fetching
    const [thumbnailSrc, setThumbnailSrc] = useState(src)

    const [placeholder, setPlaceHolder] = useState(false)
    // ref for image onLoad
    const imgLoadedOnInitSrc = useRef(false)

    // add timeout for image fetching
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!imgLoadedOnInitSrc.current) {
                setThumbnailSrc(placeholderSrc)
                setPlaceHolder(true)
            }
        }, timeout)
  
        return () => clearTimeout(timer)
     }, [])

    // when image fetching failed, set imgError to true
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.preventDefault()
        setImgError(true)
    }

    return (
        <React.Fragment>
            <div className={$.imgWrapper}>
                <Suspense fallback={<img className={$.placeholder} src={placeholderSrc} alt={alt} />}>
                    {imgError && <img className={`${$.img} ${$.placeholder}`} src={placeholderSrc} alt={alt} />}
                    {!imgError && <LazyLoadImage
                        src={thumbnailSrc}
                        alt={alt}
                        className={`${$.img} ${placeholder?$.placeholder: ''}`}
                        width={0} height={0}
                        onError={handleImageError}
                        onLoad={() => {imgLoadedOnInitSrc.current = true}}
                    />}
                </Suspense>
            </div>
        </React.Fragment>
    )
};

export default LazyImage