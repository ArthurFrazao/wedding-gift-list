import React, { ReactNode } from 'react'
import { Container } from './styles'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: () => void
}

export function Button({ children, onClick }: ButtonProps) {
  return <Container onClick={onClick}>{children}</Container>
}
