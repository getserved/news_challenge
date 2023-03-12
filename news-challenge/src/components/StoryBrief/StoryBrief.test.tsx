import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import StoryBrief from './StoryBrief'
import { Story } from '../../types';

const date = new Date()

const props = {
  story: {
    id: '1',
    headline: 'headline',
    standfirst: 'standfirst',
    date: {
        created: date,
        custom: date,
        live: date,
        processed: date,
        updated: date
    },
    thumbnail: 'thumbnail',
    link: {
        canonical: 'link'
    } 
  } as Story
}

describe('StoryBrief component', () => {
  it('renders the StoryBrief with init state', () => {
    const {container} = render(
      <MemoryRouter>
        <StoryBrief {...props} />
      </MemoryRouter>  
    );
    expect(container).toBeInTheDocument()
    expect(screen.getByText('headline')).toBeInTheDocument()
    expect(screen.getByText('standfirst')).toBeInTheDocument()
    expect(screen.getByText(`created at ${date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}`)).toBeInTheDocument()
    expect(screen.getByText('headline').getAttribute('href')).toBe('/link')
  });
});
