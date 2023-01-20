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
        <input type="text" placeholder="Buscar presente pelo nome" />
        <span role="button">Filtrar</span>
      </section>
    </Container>
  )
}
