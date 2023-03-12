import React, { FC, useMemo, useEffect, useState, useRef, Suspense } from 'react'
import type { Story } from '../../types'
import $ from "./StoryBrief.module.css"
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { LazyLoadImage } from "react-lazy-load-image-component";

interface StoryProps {
    story: Story,
    className?: string
}

  
const StoryBrief: FC<StoryProps> = ({ story, className }) => {
    // imgError for handle Image fetching error
    const [imgError, setImgError] = useState<boolean>(false)
    // thumbnailSrc for handle timeout image fetching
    const [thumbnailSrc, setThumbnailSrc] = useState(story.thumbnail)

    const [placeholder, setPlaceHolder] = useState(false)
    // ref for image onLoad
    const imgLoadedOnInitSrc = useRef(false)

    // add timeout for image fetching
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!imgLoadedOnInitSrc.current) {
                setThumbnailSrc('/images/placeholder.jpg')
                setPlaceHolder(true)
            }
        }, 3000)
  
        return () => clearTimeout(timer)
     }, [])

    // when image fetching failed, set imgError to true
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.preventDefault()
        setImgError(true)
    }

    const createdAt = useMemo(() => {
        return new Date(story.date.created).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }, [story.date.created])

    return (
        <React.Fragment>
            <article className={`${className} ${$.story}`}>
                <h3 className={$.headline}>
                    <Link className={$.link} to={story.link.canonical} target="_blank">
                        {story.headline}
                    </Link>
                </h3>
                <div className={$.thumbnail}>
                    <Link className={$.link} to={story.link.canonical} target="_blank">
                        <div className={$.thumbnailImgWrapper}>
                        <Suspense fallback={<img className={$.thumbnailPlaceholder} src="/images/placeholder.jpg" alt={story.headline} />}>
                            {imgError && <img className={`${$.thumbnailImg} ${$.thumbnailPlaceholder}`} src="/images/placeholder.jpg" alt={story.headline} />}
                            {!imgError && <LazyLoadImage
                                src={thumbnailSrc}
                                alt={story.headline}
                                className={`${$.thumbnailImg} ${placeholder?$.thumbnailPlaceholder: ''}`}
                                width={0} height={0}
                                onError={handleImageError}
                                onLoad={() => {imgLoadedOnInitSrc.current = true}}
                            />}
                        </Suspense>
                            
                        </div>
                        <div className={$.date}>
                            created at {createdAt}
                        </div>
                    </Link>
                </div>   
                <div className={$.standfirst}>
                    {parse(story.standfirst)}
                </div>
            </article>
        </React.Fragment>
    )
};

export default StoryBrief