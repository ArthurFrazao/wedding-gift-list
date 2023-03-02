import { Link } from 'react-router-dom'

import { Gift, HouseLine, CalendarCheck } from 'phosphor-react'
import { Container } from './styles'

export function MenuCategories() {
  return (
    <Container>
      <Link to="/category/gift-list" role="button">
        <div className="icon">
          <Gift size={60} />
        </div>
        <span>Lista de presentes</span>
      </Link>

      <Link to="/category/ceremony" role="button">
        <div className="icon">
          <HouseLine size={60} />
        </div>
        <span>Cerimônia</span>
      </Link>

      <Link to="/category/confirm-presence" role="button">
        <div className="icon">
          <CalendarCheck size={60} />
        </div>
        <span>Confirme sua presença</span>
      </Link>
    </Container>
  )
}
