import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import LazyImage from './LazyImage'

const props = {
  alt:"test",
  src:"https://content.api.news/v3/images/bin/cca3bdd91f0a2d57d2cebf47521780ea",
}

describe('LazyImage component', () => {
  it('renders the LazyImage with init state', () => {
    const {container} = render(
     <LazyImage {...props} /> 
    );
    expect(container).toBeInTheDocument()
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('src')).toBe("https://content.api.news/v3/images/bin/cca3bdd91f0a2d57d2cebf47521780ea")
    expect(img.getAttribute('alt')).toBe("test")
  });
});
