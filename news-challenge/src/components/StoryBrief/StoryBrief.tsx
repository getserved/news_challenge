import React, { FC, useMemo } from 'react'
import type { Story } from '../../types'
import $ from "./StoryBrief.module.css"
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import LazyImage from "../LazyImage/LazyImage";

interface StoryProps {
    story: Story,
    className?: string
}

  
const StoryBrief: FC<StoryProps> = ({ story, className }) => {

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
                        <LazyImage
                            alt={story.headline}
                            src={story.thumbnail}
                            className={$.thumbnailImg}
                        />                            
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