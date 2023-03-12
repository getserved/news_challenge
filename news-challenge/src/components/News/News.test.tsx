import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import News from './News'

jest.mock('axios');

describe('News component', () => {
  it('renders the news with init state', () => {
    const {container} = render(
      <MemoryRouter>
        <News />
      </MemoryRouter>  
    );
    expect(container).toBeInTheDocument()
  });
});
