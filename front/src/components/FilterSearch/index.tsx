import { FadersHorizontal } from 'phosphor-react'
import { Button } from '../Button'
import { Container } from './styles'

export function FilterSearch() {
  return (
    <Container>
      <div>
        <Button>Todos os itens</Button>
        <Button>Itens não presenteados</Button>
      </div>

      <section className="filter">
        <Button>Adicionar sugestão</Button>
        <input type="text" placeholder="Buscar presente pelo nome" />
        <span role="button">
          <FadersHorizontal size={32} />
        </span>
      </section>
    </Container>
  )
}
