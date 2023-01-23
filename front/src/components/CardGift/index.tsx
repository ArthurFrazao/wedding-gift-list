import { useEffect, useState } from 'react'
import { Button } from '../Button'

import { GiftProps } from '../../interfaces/props'

import { Container } from './styles'

interface CardGiftProps {
  dataGift: GiftProps
}

export function CardGift({ dataGift }: CardGiftProps) {
  const [showPrice, setShowPrice] = useState(false)
  const [giftImg, setGiftImg] = useState<string>('')

  function handleShowPrice() {
    setShowPrice(true)
  }

  function handleHiddenPrice() {
    setShowPrice(false)
  }

  useEffect(() => {
    setGiftImg(dataGift.image_url)
  }, [])

  return (
    <Container>
      <img src={giftImg} alt="Imagem do Produto" />
      <span>{dataGift?.name}</span>

      {showPrice && <span> R$ {dataGift?.price} </span>}

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
