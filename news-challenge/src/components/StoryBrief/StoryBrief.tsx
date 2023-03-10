import React, { FC } from 'react'
import type { Story } from '../../types'
import $ from "./StoryBrief.module.css"

interface StoryProps {
    story: Story
}

  
const StoryBrief: FC<StoryProps> = ({ story }) => {
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
                    <img alt={story.headline} src={story.thumbnail} />
                </div>
            </a>
        </React.Fragment>
    )
};

export default StoryBrief