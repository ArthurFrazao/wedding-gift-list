import { useEffect, useState } from 'react'

import { Modal } from '../Modal'
import { Button } from '../Button'
import { GiftModal } from '../GiftModal'

import { GiftProps } from '../../interfaces/props'

import { Container } from './styles'
import { GiftForm } from '../GiftForm'

interface GiftCardProps {
  dataGift: GiftProps
}
export function GiftCard({ dataGift }: GiftCardProps) {
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

        <Modal textButton="Presentear">
          <GiftModal />
          <GiftForm />
        </Modal>
      </div>
    </Container>
  )
}
