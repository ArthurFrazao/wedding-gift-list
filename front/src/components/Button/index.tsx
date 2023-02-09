import React, { ReactNode } from 'react'
import { Container } from './styles'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({ children, onClick, type, disabled }: ButtonProps) {
  return (
    <Container type={type} onClick={onClick} disabled={disabled}>
      {children}
    </Container>
  )
}
