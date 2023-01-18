import { Gift } from 'phosphor-react'
import { Link } from 'react-router-dom'
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

      <Link to="/home">
        <h4 className="engaged" role="button">
          Nathalia & Arthur
        </h4>
      </Link>
    </Container>
  )
}
