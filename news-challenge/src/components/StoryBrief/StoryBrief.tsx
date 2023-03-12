import React, { FC, useState, useMemo } from 'react'
import type { Story } from '../../types'
import $ from "./StoryBrief.module.css"
import { Link } from 'react-router-dom';

interface StoryProps {
    story: Story
}

  
const StoryBrief: FC<StoryProps> = ({ story }) => {

    const [imgError, setImgError] = useState<boolean>(false)

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
            <article className={$.story}>
                <h3 className={$.headline}>
                    <Link className={$.link} to={story.link.canonical} target="_blank">
                        {story.headline}
                    </Link>
                </h3>
                <div className={$.thumbnail}>
                    <Link className={$.link} to={story.link.canonical} target="_blank">
                        {imgError && <img className={$.thumbnailImg} alt={story.headline} src={require("../../images/placeholder.jpg")} width="100"/>}
                        {!imgError && <img className={$.thumbnailImg} alt={story.headline} src={story.thumbnail} onError={handleImageError}/>}
                        <div className={$.date}>
                            created at {createdAt}
                        </div>
                    </Link>
                </div>   
                <div dangerouslySetInnerHTML={{ __html: story.standfirst }} className={$.standfirst} />
            </article>
        </React.Fragment>
    )
};

export default StoryBrief