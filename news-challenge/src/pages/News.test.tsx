import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import News from './News'

describe('News component', () => {
  it('renders the News with init state', () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/news/1']}>
        <News />
      </MemoryRouter>  
    );
    expect(container).toBeInTheDocument()
    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    
  });
});
