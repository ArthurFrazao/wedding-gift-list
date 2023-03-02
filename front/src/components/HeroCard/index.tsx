import { useNavigate } from 'react-router-dom'

import { Button } from '../Button'
import { MenuCategories } from '../MenuCategories'

import { Container } from './styles'

interface HeroCardProps {
  description: string
}

export function HeroCard({ description }: HeroCardProps) {
  const navigate = useNavigate()

  const redirectToGiftList = (url: string) => {
    navigate(url)
  }

  return (
    <Container>
      <div className="description">
        <h2>Aguardamos vocês no nosso grande dia! </h2>

        <span dangerouslySetInnerHTML={{ __html: description }} />

        <Button onClick={() => redirectToGiftList('/category/gift-list')}>
          Visualizar lista
        </Button>
      </div>

      <MenuCategories />
    </Container>
  )
}
