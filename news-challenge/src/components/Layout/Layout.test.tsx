import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Layout from '../Layout/Layout'

test('Layout rendering', async () => {
  render(<Layout>test</Layout>)
  expect(screen.getByText(/test/i)).toBeInTheDocument()
})