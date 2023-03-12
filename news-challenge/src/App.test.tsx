import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App'

describe('App component', () => {
  it('renders the App with init state', async () => {
    render(<App />, {wrapper: BrowserRouter})
  });
});
