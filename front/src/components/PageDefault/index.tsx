import { ReactNode } from 'react'
import { Header } from '../Header'
import { Container, Main } from './styles'
import { Footer } from '../Footer'

interface PageDefaultProps {
  children: ReactNode
}

export function PageDefault({ children }: PageDefaultProps) {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Container>
  )
}
