import React, { ReactNode } from 'react'
import { Container } from './styles'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export function Button({ children, onClick, type }: ButtonProps) {
  return (
    <Container type={type} onClick={onClick}>
      {children}
    </Container>
  )
}
