import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import Header from './Header'

describe('App', () => {
  beforeEach(() => {
    render(<Header />)
  })

  it('should render', () => {
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Sistema de Carga de Datos')
  })
})
