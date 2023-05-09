import { useNavigate } from 'react-router-dom'

import { Button } from '../Button'
import { MenuCategories } from '../MenuCategories'

import { Container } from './styles'
import { Countdown } from '../Countdown'

export function HeroCard() {
  const navigate = useNavigate()

  const redirectToGiftList = (url: string) => {
    navigate(url)
  }

  const description = `<span>Aqui, você encontrará todas as informações importantes sobre nosso grande dia:<br>
  <br><b>Na página da lista de presentes</b>, você poderá encontrar os itens selecionados por nós para a nossa lista de casamento e escolher o presente que deseja nos presentear.<br>
  <br><b>Na página da cerimônia</b>, você poderá ver detalhes importantes sobre a data, horário e local do evento, incluindo um mapa para ajudá-lo a chegar ao local.<br>
  <br><b>E na página de confirmação de presença</b>, você poderá nos informar se estará presente em nosso casamento, quantas pessoas estarão vindo com você e detalhes adicionais, se necessário.</span>`

  return (
    <Container>
      <div className="description">
        <h2>Aguardamos vocês no nosso grande dia! </h2>

        <span dangerouslySetInnerHTML={{ __html: description }} />

        <Button onClick={() => redirectToGiftList('/category/gift-list')}>
          Visualizar lista
        </Button>
      </div>

      <section>
        <MenuCategories />
        <Countdown />
      </section>
    </Container>
  )
}
