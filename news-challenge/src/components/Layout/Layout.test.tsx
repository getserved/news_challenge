import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout'

describe('Layout component', () => {
  it('renders the title', () => {
    render(
      <MemoryRouter>
        <Layout>test</Layout>
      </MemoryRouter>  
    );
    expect(screen.getByText('test')).toBeInTheDocument()
  });

});