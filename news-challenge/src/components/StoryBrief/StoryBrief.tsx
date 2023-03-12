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
            <Link className={$.link} to={story.link.canonical} target="_blank">
                <div className={$.container}>
                    <div className={$.story}>
                        <div className={$.thumbnail}>
                            {imgError && <img alt={story.headline} src={require("../../images/placeholder.jpg")} width="100"/>}
                            {!imgError && <img alt={story.headline} src={story.thumbnail} onError={handleImageError}/>}
                            <div className={$.date}>
                                created at {createdAt}
                            </div>
                        </div>
                        <div className={$.content}>
                            <h3 className={$.headline}>
                                {story.headline}
                            </h3>
                            <div dangerouslySetInnerHTML={{ __html: story.standfirst }} className={$.standfirst}>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </React.Fragment>
    )
};

export default StoryBrief