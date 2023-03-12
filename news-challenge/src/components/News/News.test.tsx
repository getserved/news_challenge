import { fireEvent, screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import News from './News'
import axios from 'axios'

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
