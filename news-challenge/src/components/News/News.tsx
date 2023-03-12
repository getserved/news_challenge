import { useMemo } from 'react';
import $ from './News.module.css';
import data from "../../data/capi.json"
import StoryBrief from '../StoryBrief/StoryBrief';
import Pagination from '../Pagination/Pagination';
import { useParams } from 'react-router-dom';
import { Story } from '../../types';

function News() {

  const { results } = data

  const numberPerPage = 9

  const { page = "1" } = useParams();

  const currentPage = parseInt(page)

  const transformStories = (stories: any[]) => {
    return stories.map(story => {
      const thumbnails = story.related?.thumbnail?.default as string[]
      let ref;
      if (thumbnails && thumbnails.length > 0) {
        const thumbnailId:string = thumbnails[0]
        ref = story.references[thumbnailId]
      }
    
      return {
        id: story.id,
        headline: story.headline.default,
        standfirst: story.standfirst.default,
        date: story.date,
        thumbnail: ref?.link?.media,
        link: story.link
      } as Story
    })
  }

  const stories = useMemo(() => {
    return transformStories(results)
  }, [results])

  const filteredStories = currentPage > 0 && stories.slice((currentPage - 1) * numberPerPage, currentPage * numberPerPage)

  return (
    <div className={$.news}>
        <div className={$.container}>
            <div className={$.content}>
                {filteredStories && filteredStories.map(story => {
                    return (
                        <div className={$.story} key={story.id}>
                            <StoryBrief story={story}/>
                        </div>
                    )
                })}
            </div>
            <div className={$.pagination}>
            <Pagination totalNumber={results.length} numberPerPage={numberPerPage} currentPage={currentPage}/>
            </div>
            
      </div>
      
    </div>
  );
}

export default News;
