import { Button } from '../Button'
import { Container } from './styles'

export function FilterSearch() {
  return (
    <Container>
      <div>
        <Button>Todos os itens</Button>
        <Button>Itens não presenteados</Button>
      </div>

      <input type="text" placeholder="Buscar presente pelo nome" />
    </Container>
  )
}
