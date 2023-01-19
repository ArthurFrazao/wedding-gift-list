import { useEffect, useState } from 'react'
import { Button } from '../Button'

import { GiftProps } from '../../interfaces/props'

import { Container } from './styles'

interface CardGiftProps {
  dataGift: GiftProps
}

const IMAGE_URL =
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.rganimal.com.br%2Fweb%2Fimages%2Fpresentes.png&f=1&nofb=1&ipt=e2b7a2d0d1372a75dc17b881c33bcfe38e347a92243301d2e4dd69bc2d3944b2&ipo=images'

export function CardGift({ dataGift }: CardGiftProps) {
  const [showPrice, setShowPrice] = useState(false)
  const [giftName, setGiftName] = useState('')
  const [giftPrice, setGiftPrice] = useState(0)

  function handleShowPrice() {
    setShowPrice(true)
    setGiftPrice(dataGift.price)
  }

  function handleHiddenPrice() {
    setShowPrice(false)
    setGiftPrice(0)
  }

  useEffect(() => {
    setGiftName(dataGift.name)
  }, [])

  return (
    <Container>
      <img src={IMAGE_URL} alt="Image de Produto" />
      <span>{giftName}</span>

      {showPrice && <span> R$ {giftPrice} </span>}

      <div className="group-buttons">
        {showPrice ? (
          <Button onClick={handleHiddenPrice}>Ocultar</Button>
        ) : (
          <Button onClick={handleShowPrice}>Ver preço</Button>
        )}

        <Button>Presentear</Button>
      </div>
    </Container>
  )
}
