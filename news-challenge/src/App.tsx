import React from 'react';
import './App.css';
import data from "./data/capi.json"
import StoryBrief from './components/StoryBrief/StoryBrief';
import { Story } from './types';

function App() {

  const { results } = data

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

  const stories = transformStories(results)

  console.log(data)

  return (
    <div className="App">
      {stories && stories.map(story => {
        return (
          <React.Fragment key={story.id}>
            <StoryBrief story={story}/>
          </React.Fragment>
        )
      })}
    </div>
  );
}

export default App;
