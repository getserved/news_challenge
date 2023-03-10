import React, { FC, useState } from 'react'
import type { Story } from '../../types'
import $ from "./StoryBrief.module.css"

interface StoryProps {
    story: Story
}

  
const StoryBrief: FC<StoryProps> = ({ story }) => {

    const [imgError, setImgError] = useState<boolean>(false)

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.preventDefault()
        setImgError(true)
    }

    return (
        <React.Fragment>
            <a href={story.link.canonical}>
                <div className={$.headline}>
                    {story.headline}
                </div>
                <div className={$.date}>
                    created at {story.date.created.toString()}
                </div>
                <div dangerouslySetInnerHTML={{ __html: story.standfirst }} className={$.standfirst}>
                </div>
                <div className={$.thumbnail}>
                    {imgError && <img alt={story.headline} src={require("../../images/placeholder.jpg")} width="100"/>}
                    {!imgError && <img alt={story.headline} src={story.thumbnail} onError={handleImageError}/>}
                </div>
            </a>
        </React.Fragment>
    )
};

export default StoryBrief