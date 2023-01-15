import React, { ReactNode } from 'react'
import { Container } from './styles'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children }: ButtonProps) {
  return <Container>{children}</Container>
}
