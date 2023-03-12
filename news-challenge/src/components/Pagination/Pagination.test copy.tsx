import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';
import Pagination from './Pagination'

const props = {
  totalNumber:50,
  numberPerPage: 9,
  currentPage: 1
}

describe('Pagination component', () => {
  it('renders the Pagination with init state', () => {
    const {container} = render(
      <MemoryRouter>
        <Pagination {...props} />
      </MemoryRouter>  
    );
    expect(container).toBeInTheDocument()

    expect(screen.getByText(1)).toBeInTheDocument()
    expect(screen.getByText(2)).toBeInTheDocument()
    expect(screen.getByText(3)).toBeInTheDocument()
    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()

    expect(screen.getByText('2').getAttribute('href')).toBe('/2')
    expect(screen.getByText('1').getAttribute('class')).toContain('paginationNone')
    expect(screen.getByText('Prev').getAttribute('class')).toContain('paginationNone')
    expect(screen.getByText('2').getAttribute('class')).not.toContain('paginationNone')
    expect(screen.getByText('Next').getAttribute('class')).not.toContain('paginationNone')
  });

  it('renders the Pagination with last page', () => {
    const newProps = {
      ...props,
      currentPage: 6
    }
    const {container} = render(
      <MemoryRouter>
        <Pagination {...newProps} />
      </MemoryRouter>  
    );
    expect(container).toBeInTheDocument()

    expect(screen.getByText('1...')).toBeInTheDocument()
    expect(screen.getByText(4)).toBeInTheDocument()
    expect(screen.getByText(5)).toBeInTheDocument()
    expect(screen.getByText(6)).toBeInTheDocument()
    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()

    expect(screen.getByText('6').getAttribute('href')).toBe('/6')
    expect(screen.getByText('1...').getAttribute('class')).not.toContain('paginationNone')
    expect(screen.getByText('Prev').getAttribute('class')).not.toContain('paginationNone')
    expect(screen.getByText('Next').getAttribute('class')).toContain('paginationNone')
  });
});
