import { Button } from '../Button'
import { Container } from './styles'

export function HeroCard() {
  return (
    <Container>
      <div className="description">
        <h2>Aguardamos vocês no nosso grande dia! </h2>

        <span>
          Criamos esse site para compartilhar com vocês os detalhes da
          organização do nosso casamento. Estamos muito felizes e contamos com a
          presença de todos no nosso grande dia! Aqui vocês encontrarão também
          dicas para hospedagem, salão de beleza, trajes, estacionamento, etc.
          Ah, é importante também confirmar sua presença. Para isto contamos com
          sua ajuda clicando no menu “Confirme sua Presença” e preenchendo os
          dados necessários. Para nos presentear, escolha qualquer item da Lista
          de Casamento, seja um item de algum dos sites, lojas físicas, ou então
          vocês podem utilizar a opção de cotas. Fiquem à vontade!
        </span>

        <Button>Visualizar lista</Button>
      </div>

      <div className="categories"></div>
    </Container>
  )
}
