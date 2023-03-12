import React, { FC, useState, useMemo } from 'react'
import type { Story } from '../../types'
import $ from "./StoryBrief.module.css"
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

interface StoryProps {
    story: Story,
    className?: string
}

  
const StoryBrief: FC<StoryProps> = ({ story, className }) => {

    // set state for imgError
    const [imgError, setImgError] = useState<boolean>(false)

    // when image fetching failed, set imgError to true
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.preventDefault()
        setImgError(true)
    }

    // cache memo for createdAt
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
                            {imgError && <img className={$.thumbnailImg} alt={story.headline} src={require("../../images/placeholder.jpg")} width="100"/>}
                            {!imgError && <img className={$.thumbnailImg} alt={story.headline} src={story.thumbnail} onError={handleImageError}/>}
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