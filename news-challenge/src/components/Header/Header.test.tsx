import { fireEvent, screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import Header from './Header'

describe('Header component', () => {
  it('renders the header', () => {
    const {container} = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>  
    );
    expect(container).toBeInTheDocument()

    const logo = screen.getByRole('img')
    expect(logo).toBeInTheDocument()
  });

  it('click on the logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>  
    );

    const logo = screen.getByRole('link')
    fireEvent.click(logo)
    expect(window.location.pathname).toBe('/');
  });

});
