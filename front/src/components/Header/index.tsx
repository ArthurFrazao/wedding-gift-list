import { Gift } from 'phosphor-react'
import { Container } from './styles'

export function Header() {
  return (
    <Container>
      <div className="title__gift">
        <Gift size={40} />
        <span>
          Lista de <br /> <b>Presentes</b>
        </span>
      </div>

      <h4 className="engaged">Nathalia & Arthur</h4>
    </Container>
  )
}
