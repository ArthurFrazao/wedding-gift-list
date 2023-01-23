import { useNavigate } from 'react-router-dom'
import { WarningOctagon } from 'phosphor-react'

import { Button } from '../../components/Button'

import { Container } from './styles'
import { useEffect } from 'react'

export function PageNotFound() {
  const navigate = useNavigate()

  const redirectToHome = (url: string) => {
    navigate(url)
  }

  useEffect(() => {
    setTimeout(() => {
      redirectToHome('/home')
    }, 4000)
  }, [])

  return (
    <Container>
      <WarningOctagon size={64} />
      <h1>Ops!</h1>
      <span>
        Página não encontrada! <br />
        Aguarde e você será redirecionado para a página inicial ou clique no
        botão abaixo.
      </span>
      <Button onClick={() => redirectToHome('/home')}>Recarregar</Button>
    </Container>
  )
}
